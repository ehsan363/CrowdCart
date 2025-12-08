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

// Check if we are on product.html, product detail page
if (document.getElementById("product")) {

    const params = new URLSearchParams(window.location.search); // URL parameters into params
    const id = params.get("id"); // Taking "id" from the URL through params

    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById("product").innerHTML = `
                <div id = 'product_details_display'>
                    <h1 id='product-title_detail'>${product.title}</h1>
                    <div id = "detail_row">
                        <img id='product-image_detail' src="${product.thumbnail}" width="300">
                        <div id = 'rating_price_buttons_detail'>
                            <p><strong>Rating: </strong> ${product.rating} &#127775;</p>
                            <p id='discount_percentage'></p>
                            <p><strong>Price:</strong> AED ${product.price}</p>
                            <button id = "fav_button" type = "button"><img src="icons/heart_off.png" height = '40px'></button><br>
                            <button id = "cart_button" type = "button"><img src="icons/cart.png" height = '40px'></button>
                        </div>
                    </div>
                    <p id='description_detail'><strong>Description:</strong> ${product.description}</p>
                    <hr>
                    <p id = 'dimension_details_head'><strong>Dimensions:</strong></p>
                    <p class = 'dimension_details'><strong>Height:</strong> ${product.dimensions.height}cm</p>
                    <p class = 'dimension_details'><strong>Width:</strong> ${product.dimensions.width}cm</p>
                    <p class = 'dimension_details'><strong>Depth: </strong> ${product.dimensions.depth}cm</p>

                    <p id = 'shipping_detail'><strong>Shipping Duration:</strong> ${product.shippingInformation}</p>
                    <p id = 'warranty_detail'><strong>Warranty:</strong> ${product.warrantyInformation}</p>

                    <div id='reviews'>
                        <h2 id =
                        'review_heading'>Review</h2>
                        <ul class='review'>
                                <li><p class = 'reviewer_name'>${product.reviews[0].reviewerName}</p></li>
                                <li><p class = 'comment'>${product.reviews[0].comment}</p></li>
                        </ul>

                        <ul class='review'>
                                <li><p class = 'reviewer_name'>${product.reviews[1].reviewerName}</p></li>
                                <li><p class = 'comment'>${product.reviews[1].comment}</p></li>
                        </ul>

                        <ul class='review'>
                                <li><p class = 'reviewer_name'>${product.reviews[2].reviewerName}</p></li>
                                <li><p class = 'comment'>${product.reviews[2].comment}</p></li>
                        </ul>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            document.getElementById("product").innerHTML =
                "<p>Error loading product.</p>";
            console.error(err);
        });
}
