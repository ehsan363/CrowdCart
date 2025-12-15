const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

function calculateTrendingScore(product) {
  return (
    (product.rating * 10) +
    product.discountPercentage +
    (100 - product.stock)
  );
}

exports.weeklyFeaturedProducts = functions.pubsub
  .schedule("monday 00:00") //monday 00:00
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
import { db } from "./login.js";
import {doc, getDoc} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function loadWeeklyVote() {
  const voteContainer = document.getElementById("voteContainer");


  const ref = doc(db, "weeklySelection", "currentWeek");
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    voteContainer.innerHTML = "<p style = 'color: white;'>No weekly products available.</p>";
    return;}

  const {products} = snap.data();

  let html = "";

  for (const category in products) {
    const p = products[category];

    html += `
      <div class="vote-card">
        <h2>${category}</h2>
        <img src="${p.thumbnail}" width="200">
        <h3>${p.title}</h3>
        <p>Rating: ${p.rating}</p>
        <p>Price: AED ${p.price}</p>
        <p>Trending Score: ${p.trendingScore}</p>
        <button data-id="${p.id}">Vote</button>
      </div>
    `;
  }

  voteContainer.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", loadWeeklyVote);

    const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"];

    const results = {};
    const now = new Date().toISOString();

    for (const category of categories) {

      const snap = await db.collection("products")
        .where("category", "==", category)
        .get();

      if (snap.empty) continue;

      let products = [];

      snap.forEach(doc => {
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
          trendingScore: calculateTrendingScore(data)
        });
      });

      // Sort by trending score
      products.sort((a, b) => b.trendingScore - a.trendingScore);

      // Take top 10 (or fewer)
      const topProducts = products.slice(0, 10);

      // 🎲 RANDOM PICK
      const randomIndex = Math.floor(Math.random() * topProducts.length);
      results[category] = topProducts[randomIndex];
    }

    // 🔁 OVERWRITE weekly results
    await db.collection("weeklyFeatured").doc("current").set({
      date: now,
      products: results
    });

    console.log("Weekly featured products updated");
  });
