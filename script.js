document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const searchInput = document.getElementById("search-input");
  const cartCount = document.getElementById("cart-count");

  let filteredProducts = products;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderProducts(productsToRender) {
    productList.innerHTML = "";

    if (productsToRender.length === 0) {
      productList.innerHTML = "<p>No products found.</p>";
      return;
    }

    productsToRender.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

      productList.appendChild(productCard);
    });
  }

  function filterByCategory(category) {
    if (category === "All") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(p => p.category === category);
    }
    renderProducts(filteredProducts);
  }

  function searchProducts(query) {
    const results = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(results);
  }

  window.addToCart = function (productId) {
    const item = products.find(p => p.id === productId);
    const cartItem = cart.find(p => p.id === productId);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  };

  function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      filterByCategory(category);
    });
  });

  searchInput.addEventListener("input", e => {
    searchProducts(e.target.value);
  });

  renderProducts(products);
  updateCartCount();
});
