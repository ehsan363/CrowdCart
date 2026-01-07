import { auth, db } from "./login.js";
import { collection, getDocs, deleteDoc, doc, writeBatch } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

let currentUserId = null; // Store user ID globally

window.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    const cartDiv = document.getElementById("cart");

    // 🚨 Not logged in
    if (!user) {
      cartDiv.innerHTML = `
        <p style="font-size: 32px; color: #5AC6CA; text-align: center;">
          Please login to see your cart.
        </p>`;
      currentUserId = null; // Reset user ID
      return;
    }

    // ✅ User logged in
    currentUserId = user.uid; // Store for checkout function
    await loadCart(user.uid, cartDiv);
  });
});

// Load and display cart items
async function loadCart(uid, cartDiv) {
  const cartRef = collection(db, "users", uid, "cart");
  const snap = await getDocs(cartRef);

  // 🛒 Empty cart
  if (snap.empty) {
    cartDiv.innerHTML = `
      <p style="font-size: 32px; color: #5AC6CA; text-align: center;">
        No items added to cart.
      </p>
    `;
    return;
  }

  // 🧾 Render cart items
  let html = "";
  let totalPrice = 0;

  snap.forEach(docSnap => {
    const item = docSnap.data();
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    html += `
      <a href="product.html?id=${item.id}" class="product-link">
        <div class="product">
          <img src="${item.image}" width="150" loading="lazy">
          <h3>${item.title}</h3>
          <p id="product_price">AED ${item.price}</p>
          <p id="product_quantity">Qty: ${item.quantity}</p>
        </div>
      </a>
      <hr>
    `;
  });

  // Add total and checkout button
  html += `
    <div style="text-align: center; margin-top: 30px;">
      <h2 style="color: #5AC6CA;">Total: AED ${totalPrice.toFixed(2)}</h2>
      <button id="checkoutBtn" style="
        background-color: #5AC6CA;
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 20px;
        transition: background-color 0.3s;
      ">
        CHECKOUT
      </button>
    </div>
  `;

  cartDiv.innerHTML = html;

  // Attach checkout event listener
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);

    // Hover effect
    checkoutBtn.addEventListener("mouseenter", () => {
      checkoutBtn.style.backgroundColor = "#48a4a8";
    });
    checkoutBtn.addEventListener("mouseleave", () => {
      checkoutBtn.style.backgroundColor = "#5AC6CA";
    });
  }
}

// Handle checkout: clear cart and show success
async function handleCheckout() {
  if (!currentUserId) {
    alert("Please login to checkout");
    return;
  }

  const checkoutBtn = document.getElementById("checkoutBtn");

  // Disable button during processing
  checkoutBtn.disabled = true;
  checkoutBtn.textContent = "Processing...";
  checkoutBtn.style.cursor = "not-allowed";
  checkoutBtn.style.opacity = "0.6";

  try {
    // Get all cart items
    const cartRef = collection(db, "users", currentUserId, "cart");
    const snap = await getDocs(cartRef);

    if (snap.empty) {
      alert("Your cart is empty");
      return;
    }

    // Use batch delete for better performance
    const batch = writeBatch(db);

    snap.forEach(docSnap => {
      batch.delete(docSnap.ref);
    });

    // Execute all deletions at once
    await batch.commit();

    // Show success message
    alert("Order Successful!");

    // Reload the cart display
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = `
      <p style="font-size: 32px; color: #5AC6CA; text-align: center;">
        No items added to cart.
      </p>
    `;

  } catch (error) {
    console.error("Checkout error:", error);
    alert("Error processing order. Please try again.");

    // Re-enable button on error
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = "CHECKOUT";
    checkoutBtn.style.cursor = "pointer";
    checkoutBtn.style.opacity = "1";
  }
}

// OPTIONAL: Remove individual item from cart
export async function removeFromCart(productId) {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return;
  }

  const uid = user.uid;

  try {
    await deleteDoc(doc(db, "users", uid, "cart", productId.toString()));
    console.log("Item removed successfully");

    // Reload cart display
    const cartDiv = document.getElementById("cart");
    await loadCart(uid, cartDiv);
  } catch (error) {
    console.error("Error removing item:", error);
  }
}