import { db } from "./login.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function seedWeeklyProducts() {
  const weekRef = doc(db, "weeklySelection", "currentWeek");

  // 🔒 Prevent overwriting an active week
  const existingSnap = await getDoc(weekRef);
  if (existingSnap.exists() && !existingSnap.data().processed) {
    console.log("⏳ Current week still active. No reseed.");
    return;
  }

  // 🗓️ Week timing
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);

  const weekId = startDate.toISOString().slice(0, 10);

  // 📦 Fetch products
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();
  const products = data.products;

  // 🔢 Trending score
  products.forEach(p => {
    p.trendingScore =
      p.rating * 10 +
      (p.discountPercentage || 0) +
      (100 - p.stock);
  });

  // 📂 Group by category
  const categories = {};
  products.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  // 🎯 Pick 4 random categories
  const pickedCategories = Object.keys(categories)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const weeklyProducts = [];

  pickedCategories.forEach(cat => {
    const top10 = categories[cat]
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 10);

    const chosen = top10[Math.floor(Math.random() * top10.length)];

    weeklyProducts.push({
      id: chosen.id,
      title: chosen.title,
      category: chosen.category,
      thumbnail: chosen.thumbnail,
      rating: chosen.rating,
      price: chosen.price,
      trendingScore: chosen.trendingScore
    });
  });

  // 🧾 Save week
  await setDoc(weekRef, {
    weekId,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    processed: false,
    products: weeklyProducts,
    createdAt: serverTimestamp()
  });

  console.log("✅ New weekly products seeded:", weeklyProducts);
}

seedWeeklyProducts();