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

  try {
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

      // Use document ID for removal (more reliable than item.id)
      const docId = docSnap.id;

      html += `
        <div class="cart-item-container" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        ">
          <a href="product.html?id=${item.id}" class="product-link" style="
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
          ">
            <div class="product" style="display: flex; align-items: center; gap: 20px;">
              <img src="${item.image}" width="150" loading="lazy" style="border-radius: 4px;">
              <div>
                <h3>${item.title}</h3>
                <p class="product-price">AED ${item.price}</p>
                <p class="product-quantity">Qty: ${item.quantity}</p>
                <p class="product-total" style="font-weight: bold; color: #5AC6CA;">
                  Subtotal: AED ${itemTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </a>

          <button class="remove-btn" data-product-id="${docId}" style="
            background-color: #ff4444;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-left: 20px;
          ">
            REMOVE
          </button>
        </div>
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

    // Attach remove button event listeners
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault(); // Prevent any default behavior
        const productId = btn.getAttribute("data-product-id");
        await removeFromCart(productId, uid, cartDiv);
      });

      // Hover effect for remove buttons
      btn.addEventListener("mouseenter", () => {
        btn.style.backgroundColor = "#cc0000";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.backgroundColor = "#ff4444";
      });
    });

  } catch (error) {
    console.error("Error loading cart:", error);
    cartDiv.innerHTML = `
      <p style="font-size: 24px; color: #ff4444; text-align: center;">
        Error loading cart. Please refresh the page.
      </p>
    `;
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

// Remove individual item from cart
async function removeFromCart(productId, uid, cartDiv) {
  if (!uid) {
    console.error("User not logged in");
    alert("Please login to remove items");
    return;
  }

  try {
    // Delete the document from Firestore
    await deleteDoc(doc(db, "users", uid, "cart", productId));
    console.log("Item removed successfully");

    // Reload cart display to show updated cart
    await loadCart(uid, cartDiv);

  } catch (error) {
    console.error("Error removing item:", error);
    alert("Error removing item. Please try again.");
  }
}