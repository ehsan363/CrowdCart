import { auth, db } from "./login.js";
import {collection, getDocs, deleteDoc, doc, getFirestore} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


const db = getFirestore(app);
export { auth, db };

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login first");
    return;
  }

  console.log("Logged in UID:", user.uid);
});

export async function loadCart() {
  const user = auth.currentUser;
  if (!user) {
    document.getElementById("cart").innerHTML = "Please login to see your cart.";
    return;
  }

  const uid = user.uid;
  const cartRef = collection(db, "users", uid, "cart");
  const snapshot = await getDocs(cartRef);

  let items = [];
  snapshot.forEach(doc => {
    items.push(doc.data());
  });

  displayCart(items);
}


// 2
function displayCart(items) {
  const container = document.getElementById("cart");
  container.innerHTML = "";

  items.forEach(item => {
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <p>${item.title}</p>
        <p>$${item.price}</p>
        <p>Qty: ${item.quantity}</p>
      </div>
    `;
  });
}

export async function removeFromCart(productId) {
  const user = auth.currentUser;
  if (!user) return;

  const uid = user.uid;
  await deleteDoc(doc(db, "users", uid, "cart", productId.toString()));
}

window.addEventListener("DOMContentLoaded", loadCart);