import { auth, db } from "./login.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


window.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    const cartDiv = document.getElementById("cart");

    // 🚨 Not logged in
    if (!user) {
      console.log("am here ✅");

      cartDiv.innerHTML = `
        <p style="font-size: 32px; color: #5AC6CA; text-align: center;">
          Please login to see your cart.
        </p>`;
      return;
    }

    // ✅ User logged in
    const uid = user.uid;

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
    snap.forEach(docSnap => {
      const item = docSnap.data();
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

    cartDiv.innerHTML = html;
  });
});

// OPTIONAL: remove an item
export async function removeFromCart(productId) {
  const user = auth.currentUser;
  if (!user) return;

  onAuthStateChanged(auth, user => {
  if (!user) return;
  const uid = user.uid;
  });

  await deleteDoc(doc(db, "users", uid, "cart", productId.toString()));
}