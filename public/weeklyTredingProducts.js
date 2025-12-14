import { db } from "./login.js";
import { doc, getDoc, setDoc } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* ---------- CONFIG ---------- */
const WEEK_MS = 10 * 1000;

/* ---------- TRENDING SCORE ---------- */
function calculateTrendingScore(product) {
  return (
    (product.rating * 10) +
    product.discountPercentage +
    (100 - product.stock)
  );
}

/* ---------- RANDOM HELPERS ---------- */
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* ---------- MAIN SEED FUNCTION ---------- */
async function seedWeeklyProducts() {
  const weeklyRef = doc(db, "weeklySelection", "currentWeek");

  // Check if weekly data already exists
  const existingSnap = await getDoc(weeklyRef);

  if (existingSnap.exists()) {
    const savedDate = new Date(existingSnap.data().date);
    const now = new Date();

    // If less than a week passed → STOP
    if (now - savedDate < WEEK_MS) {
      console.log("⏳ Weekly products still valid");
      return;
    }
  }

  console.log("🔄 Generating new weekly products...");

  /* ---------- FETCH PRODUCTS ---------- */
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();
  const products = data.products;

  /* ---------- GROUP BY CATEGORY ---------- */
  const categories = {};

  products.forEach(p => {
    const score = calculateTrendingScore(p);
    const enriched = { ...p, trendingScore: score };

    if (!categories[p.category]) {
      categories[p.category] = [];
    }
    categories[p.category].push(enriched);
  });

  /* ---------- TOP 10 PER CATEGORY ---------- */
  Object.keys(categories).forEach(cat => {
    categories[cat]
      .sort((a, b) => b.trendingScore - a.trendingScore);
    categories[cat] = categories[cat].slice(0, 10);
  });

  /* ---------- PICK 4 RANDOM CATEGORIES ---------- */
  const allCategories = Object.keys(categories);
  const selectedCategories = shuffleArray(allCategories).slice(0, 4);

  /* ---------- PICK 1 RANDOM PRODUCT PER CATEGORY ---------- */
  const weeklyProducts = [];

  selectedCategories.forEach(cat => {
    const list = categories[cat];
    if (list.length > 0) {
      const randomProduct =
        list[Math.floor(Math.random() * list.length)];
      weeklyProducts.push({
        id: randomProduct.id,
        title: randomProduct.title,
        category: cat,
        thumbnail: randomProduct.thumbnail,
        rating: randomProduct.rating,
        price: randomProduct.price,
        trendingScore: randomProduct.trendingScore
      });
    }
  });

  /* ---------- SAVE TO FIRESTORE ---------- */
  await setDoc(weeklyRef, {
    date: new Date().toISOString(),
    products: weeklyProducts
  });

  console.log("✅ Weekly products updated!");
}

/* ---------- RUN ONCE ---------- */
seedWeeklyProducts();