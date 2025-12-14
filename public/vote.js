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

  let html = "";

  products.forEach(p => {
    html += `
      <div class="vote-card">
        <h2>${p.category}</h2>
        <img src="${p.thumbnail}" width="200">
        <h3>${p.title}</h3>
        <p>Rating: ${p.rating}</p>
        <p>Price: AED ${p.price}</p>
        <p>Trending Score: ${p.trendingScore}</p>
        <button data-id="${p.id}">Vote</button>
      </div>
    `;
  });

  voteContainer.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", loadWeeklyVote);
