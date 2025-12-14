import { db } from "./login.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function loadWeeklyVote() {
  const voteContainer = document.getElementById("voteContainer");

  const ref = doc(db, "weeklySelection", "currentWeek");
  const snap = await getDoc(ref);

  console.log("🔥 Weekly snap exists:", snap.exists());

  if (!snap.exists()) {
    voteContainer.innerHTML =
      "<p style='color:white;'>No weekly products available.</p>";
    return;
  }

  const data = snap.data();
  console.log("🔥 Weekly data:", data);

  const products = Array.isArray(data.products)
    ? data.products
    : Object.values(data.products || {});

  if (products.length === 0) {
    voteContainer.innerHTML =
      "<p style='color:white;'>No weekly products available.</p>";
    return;
  }

  let html = "<div id = 'votingCandidates'>";

  products.forEach(p => {
    html += `
    <a href = 'product.html?id=${p.id}' class = 'product-link'>
        <p id = 'votingCat'>${p.category}</p>
        <div class="vote-card">
            <img src="${p.thumbnail}" width="300">
            <div id= 'votingDetails'>
                <h2>${p.title}</h2>
                <p class = 'priceAndRating'>Rating: ${p.rating}</p>
                <p class = 'priceAndRating'>Price: AED ${p.price}</p>
                <button id = 'voteButton' data-id="${p.id}">VOTE</button>
            </div>
        </div>
        <hr>
    </a>
    `;
  });

  voteContainer.innerHTML = html+='</div>';
}

window.addEventListener("DOMContentLoaded", loadWeeklyVote);
