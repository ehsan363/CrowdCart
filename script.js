// homepage products details fetching from API
// Check if we are on home.html (product list page)
if (document.getElementById("product-list")) {

    // Explanation:
    //fetching data from link below
    fetch("https://dummyjson.com/products?limit=200")
    .then(res => res.json()) //fetched data into 'res'
    .then(data => { //each part into 'data'
        const container = document.getElementById("product-list");

        data.products.forEach(product => {
            container.innerHTML += `
                <a href="product.html?id=${product.id}" class = 'product-link'>
                    <div class="product">
                        <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                        <h3>${product.title}</h3>
                        <p>AED ${product.price}</p>
                    </div>
                </a>
            `;
        });
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
    });

}

// Smartphones categories details fetching from API
if (document.getElementById("phone-list")) {

    // Explanation:
    //fetching data from link below
    fetch("https://dummyjson.com/products/category/smartphones")
    .then(res => res.json()) //fetched data into 'res'
    .then(data => { //each part into 'data'
        const container = document.getElementById("phone-list");

        data.products.forEach(product => {
            container.innerHTML += `
                <a href="product.html?id=${product.id}" class = 'product-link'>
                    <div class="product">
                        <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                        <h3>${product.title}</h3>
                        <p>AED ${product.price}</p>
                    </div>
                </a>
            `;
        });
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
    });

}

if (document.getElementById("shirt-list")) {

    // Explanation:
    //fetching data from link below
    fetch("https://dummyjson.com/products/category/mens-shirts")
    .then(res => res.json()) //fetched data into 'res'
    .then(data => { //each part into 'data'
        const container = document.getElementById("shirt-list");

        data.products.forEach(product => {
            container.innerHTML += `
                <a href="product.html?id=${product.id}" class = 'product-link'>
                    <div class="product">
                        <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                        <h3>${product.title}</h3>
                        <p>AED ${product.price}</p>
                    </div>
                </a>
            `;
        });
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
    });

}

if (document.getElementById("laptop-list")) {

    // Explanation:
    //fetching data from link below
    fetch("https://dummyjson.com/products/category/laptops")
    .then(res => res.json()) //fetched data into 'res'
    .then(data => { //each part into 'data'
        const container = document.getElementById("laptop-list");

        data.products.forEach(product => {
            container.innerHTML += `
                <a href="product.html?id=${product.id}" class = 'product-link'>
                    <div class="product">
                        <img src="${product.thumbnail}" width="150" loading = 'lazy'>
                        <h3>${product.title}</h3>
                        <p>AED ${product.price}</p>
                    </div>
                </a>
            `;
        });
        const productCount = document.querySelectorAll('.product').length;
        document.getElementById('results').innerHTML = productCount+" Results";
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
