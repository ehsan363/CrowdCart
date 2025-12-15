import { db } from "./login.js";
import { doc, setDoc } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function seedWeeklyProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=194");
  const data = await res.json();
  const products = data.products;

  // 🔢 trending score
  products.forEach(p => {
    p.trendingScore =
      p.rating * 10 +
      (p.discountPercentage || 0) +
      (100 - p.stock);
  });

  // 📂 group by category
  const categories = {};
  products.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  // 🎯 pick 4 random categories
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

  const weekId = new Date().toISOString().slice(0, 10);

  await setDoc(doc(db, "weeklySelection", "currentWeek"), {
    weekId,
    date: new Date().toISOString(),
    products: weeklyProducts
  });

  console.log("✅ Weekly products seeded:", weeklyProducts);
}

seedWeeklyProducts();