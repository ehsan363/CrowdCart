import { db, auth } from "./login.js";
import {
  doc,
  getDoc,
  setDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let currentWeekId = null;

/* ---------------- LOAD WEEKLY PRODUCTS ---------------- */

async function loadWeeklyVote() {
  const voteContainer = document.getElementById("voteContainer");

  const ref = doc(db, "weeklySelection", "currentWeek");
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    window.addEventListener("DOMContentLoaded", () => {
        voteContainer.innerHTML =
        "<p style='color:white;'>No weekly products available.</p>";
    });
    return;
  }

  const data = snap.data();

  // ✅ REQUIRED FIELD
  currentWeekId = data.weekId;

  if (!currentWeekId) {
    console.error("❌ weekId missing in weeklySelection/currentWeek");
    window.addEventListener("DOMContentLoaded", () => {
        voteContainer.innerHTML =
          "<p style='color:white;'>Voting not ready.</p>";
    });
    return;
  }

  const products = Array.isArray(data.products)
    ? data.products
    : Object.values(data.products || {});

  if (products.length === 0) {
    window.addEventListener("DOMContentLoaded", () => {
        voteContainer.innerHTML =
          "<p style='color:white;'>No weekly products available.</p>";
    });
    return;
  }

  let html = "<div id='votingCandidates'>";

  products.forEach(p => {
    html += `
      <div class="vote-card-wrapper">
        <a href="product.html?id=${p.id}" class="product-link">
          <p id="votingCat">${toTitleCase(p.category)}</p>

          <div class="vote-card">
            <img src="${p.thumbnail}" width="300">
            <div class="votingDetails">
              <h2>${toTitleCase(p.title)}</h2>
              <p class='priceAndRating'>Rating: ${p.rating}</p>
              <p class='priceAndRating'>Price: AED ${p.price}</p>
            </div>
          </div>
        </a>

        <button class="voteButton" data-id="${p.id}">
          VOTE
        </button>

        <hr>
      </div>
    `;
  });
  window.addEventListener("DOMContentLoaded", () => {
      voteContainer.innerHTML = html + "</div>";
  });
}

window.addEventListener("DOMContentLoaded", loadWeeklyVote);

/* ---------------- HANDLE VOTE CLICK ---------------- */

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("voteButton")) {
    e.preventDefault();
    e.stopPropagation();
    voteProduct(e.target.dataset.id);
  }
});

/* ---------------- VOTING LOGIC ---------------- */

async function voteProduct(productId) {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login to vote");
    return;
  }

  if (!currentWeekId) {
    alert("Voting week not loaded");
    return;
  }

    onAuthStateChanged(auth, user => {
        if (!user) return;
        const uid = user.uid;
    });


  const voteRef = doc(
    db,
    "weeklyVotes",
    currentWeekId,
    "products",
    productId.toString()
  );

  const userVoteRef = doc(
    db,
    "userVotes",
    uid,
    "weeks",
    currentWeekId
  );

  // 🔒 Prevent double voting THIS WEEK
  const userVoteSnap = await getDoc(userVoteRef);

  if (userVoteSnap.exists()) {
    alert("You already voted this week");
    return;
  }

  // 🔼 Increment vote count
  await setDoc(
    voteRef,
    { productId, votes: increment(1) },
    { merge: true }
  );

  // 🧾 Record user's vote for THIS week
  await setDoc(userVoteRef, {
    productId,
    votedAt: new Date().toISOString()
  });

  alert("✅ Vote counted!");
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
