// homepage products details fetching from API
// Check if we are on home.html (product list page)
if (document.getElementById("product-list")) {

    const sortSelect = document.getElementById("sort-feature");
    const productList = document.getElementById("product-list");
    let products = [];     // This will store the fetched products

    // Fetch products
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
            <a href="product.html?id=${product.id}" class = 'product-link'>
                <div class="product">
                    <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                    <h3>${product.title}</h3>
                    <p id = "product_rating">Rating: ${product.rating}&#127775;</p>
                    <p id = "product_price">AED ${product.price}</p>
                </div>
            </a>
        `;

        // Results number display
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
      });
    }

    // Handle sorting
    sortSelect.addEventListener("change", () => {
      const value = sortSelect.value;

      if (value === "AZ") {
        products.sort((a, b) => a.title.localeCompare(b.title)); // Asc Order
      }
      else if (value === "ZA") {
        products.sort((a, b) => b.title.localeCompare(a.title)); // Desc order
      }
      else if (value === "L-H") {
        products.sort((a, b) => a.price - b.price); // Price low to high
      }
      else if (value === "H-L") {
        products.sort((a, b) => b.price - a.price); // Price high to low
      }
      else if (value === "Rating") {
        products.sort((a, b) => b.rating - a.rating); // Customer rating order
      }
      else {
        products.sort((a, b) => a.id - b.id);   // Default order
      }

      displayProducts(products); // Redisplay

    });
}

// Smartphones categories details fetching from API
if (document.getElementById("phone-list")) {

    const sortSelect = document.getElementById("sort-feature");
    const productList = document.getElementById("phone-list");
    let products = [];     // This will store the fetched products

    // Fetch products
    fetch("https://dummyjson.com/products/category/smartphones")
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
            <a href="product.html?id=${product.id}" class = 'product-link'>
                <div class="product">
                    <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                    <h3>${product.title}</h3>
                    <p id = "product_rating">Rating: ${product.rating}&#127775;</p>
                    <p id = "product_price">AED ${product.price}</p>
                </div>
            </a>
        `;

        // Results number display
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
      });
    }

    // Handle sorting
    sortSelect.addEventListener("change", () => {
      const value = sortSelect.value;

      if (value === "AZ") {
        products.sort((a, b) => a.title.localeCompare(b.title)); // Asc Order
      }
      else if (value === "ZA") {
        products.sort((a, b) => b.title.localeCompare(a.title)); // Desc order
      }
      else if (value === "L-H") {
        products.sort((a, b) => a.price - b.price); // Price low to high
      }
      else if (value === "H-L") {
        products.sort((a, b) => b.price - a.price); // Price high to low
      }
      else if (value === "Rating") {
        products.sort((a, b) => b.rating - a.rating); // Customer rating order
      }
      else {
        products.sort((a, b) => a.id - b.id);   // Default order
      }

      displayProducts(products); // Redisplay

    });
}

if (document.getElementById("shirt-list")) {

    const sortSelect = document.getElementById("sort-feature");
    const productList = document.getElementById("shirt-list");
    let products = [];     // This will store the fetched products

    // Fetch products
    fetch("https://dummyjson.com/products/category/mens-shirts")
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
            <a href="product.html?id=${product.id}" class = 'product-link'>
                <div class="product">
                    <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                    <h3>${product.title}</h3>
                    <p id = "product_rating">Rating: ${product.rating}&#127775;</p>
                    <p id = "product_price">AED ${product.price}</p>
                </div>
            </a>
        `;

        // Results number display
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
      });
    }

    // Handle sorting
    sortSelect.addEventListener("change", () => {
      const value = sortSelect.value;

      if (value === "AZ") {
        products.sort((a, b) => a.title.localeCompare(b.title)); // Asc Order
      }
      else if (value === "ZA") {
        products.sort((a, b) => b.title.localeCompare(a.title)); // Desc order
      }
      else if (value === "L-H") {
        products.sort((a, b) => a.price - b.price); // Price low to high
      }
      else if (value === "H-L") {
        products.sort((a, b) => b.price - a.price); // Price high to low
      }
      else if (value === "Rating") {
        products.sort((a, b) => b.rating - a.rating); // Customer rating order
      }
      else {
        products.sort((a, b) => a.id - b.id);   // Default order
      }

      displayProducts(products); // Redisplay

    });
}

if (document.getElementById("laptop-list")) {

    const sortSelect = document.getElementById("sort-feature");
    const productList = document.getElementById("laptop-list");
    let products = [];     // This will store the fetched products

    // Fetch products
    fetch("https://dummyjson.com/products/category/laptops")
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
            <a href="product.html?id=${product.id}" class = 'product-link'>
                <div class="product">
                    <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                    <h3>${product.title}</h3>
                    <p id = "product_rating">Rating: ${product.rating}&#127775;</p>
                    <p id = "product_price">AED ${product.price}</p>
                </div>
            </a>
        `;

        // Results number display
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
      });
    }

    // Handle sorting
    sortSelect.addEventListener("change", () => {
      const value = sortSelect.value;

      if (value === "AZ") {
        products.sort((a, b) => a.title.localeCompare(b.title)); // Asc Order
      }
      else if (value === "ZA") {
        products.sort((a, b) => b.title.localeCompare(a.title)); // Desc order
      }
      else if (value === "L-H") {
        products.sort((a, b) => a.price - b.price); // Price low to high
      }
      else if (value === "H-L") {
        products.sort((a, b) => b.price - a.price); // Price high to low
      }
      else if (value === "Rating") {
        products.sort((a, b) => b.rating - a.rating); // Customer rating order
      }
      else {
        products.sort((a, b) => a.id - b.id);   // Default order
      }

      displayProducts(products); // Redisplay

    });
}

if (document.getElementById("fav-list")) {

    const sortSelect = document.getElementById("sort-feature");
    const productList = document.getElementById("fav-list");
    let products = [];     // This will store the fetched products

    // Fetch products
    /* fetch("https://dummyjson.com/products/category/laptops")
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
            <a href="product.html?id=${product.id}" class = 'product-link'>
                <div class="product">
                    <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                    <h3>${product.title}</h3>
                    <p id = "product_rating">Rating: ${product.rating}&#127775;</p>
                    <p id = "product_price">AED ${product.price}</p>
                </div>
            </a>
        `;

        // Results number display
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
      });
    } */

    // Handle sorting
    sortSelect.addEventListener("change", () => {
      const value = sortSelect.value;

      if (value === "AZ") {
        products.sort((a, b) => a.title.localeCompare(b.title)); // Asc Order
      }
      else if (value === "ZA") {
        products.sort((a, b) => b.title.localeCompare(a.title)); // Desc order
      }
      else if (value === "L-H") {
        products.sort((a, b) => a.price - b.price); // Price low to high
      }
      else if (value === "H-L") {
        products.sort((a, b) => b.price - a.price); // Price high to low
      }
      else if (value === "Rating") {
        products.sort((a, b) => b.rating - a.rating); // Customer rating order
      }
      else {
        products.sort((a, b) => a.id - b.id);   // Default order
      }

      displayProducts(products); // Redisplay

    });
}

// Check if we are on product.html (single product page)
if (document.getElementById("product")) {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById("product").innerHTML = `
                <h1>${product.title}</h1>
                <img src="${product.thumbnail}" width="300">
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Rating:</strong> ${product.rating}</p>
            `;
        })
        .catch(err => {
            document.getElementById("product").innerHTML =
                "<p>Error loading product.</p>";
            console.error(err);
        });
}
