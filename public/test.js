const sortSelect = document.getElementById("sort-feature");
const productList = document.getElementById("product-list");
let products = [];     // This will store the fetched products

// Fetch products (example)
fetch("https://dummyjson.com/products?limit=200")
  .then(res => res.json())
  .then(data => {
    products = data.products;
    displayProducts(products);
  });

// Re-render products into the page
function displayProducts(list) {
  productList.innerHTML = "";

  list.forEach(product => {
    productList.innerHTML += `
        <div class="product">
            <img src="${product.thumbnail}" width="150" loading = 'lazy'>
            <h3>${product.title}</h3>
            <p>AED ${product.price}</p>
        </div>
    `;
  });
}

// Handle sorting
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;

  if (value === "AZ") {
    products.sort((a, b) => a.title.localeCompare(b.title));
  }
  else if (value === "ZA") {
    products.sort((a, b) => b.title.localeCompare(a.title));
  }
  else if (value === "L-H") {
    products.sort((a, b) => a.price - b.price);
  }
  else if (value === "H-L") {
    products.sort((a, b) => b.price - a.price);
  }
  else if (value === "Rating") {
    products.sort((a, b) => b.rating - a.rating);
  }
  else {
    // Default / Relevant (reload original order)
    products.sort((a, b) => a.id - b.id);
  }

  displayProducts(products); // Re-display
});