document.addEventListener("DOMContentLoaded", function () {
  const categories = [...new Set(products.map(product => product.category))];
  const categoryContainer = document.querySelector(".categories");
  const productContainer = document.querySelector(".products");
  const searchInput = document.getElementById("searchInput");
  const cartCount = document.getElementById("cart-count");

  let cart = [];

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  function createCategoryButtons() {
    categoryContainer.innerHTML = `<button onclick="displayProducts(products)">All</button>`;
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category;
      button.onclick = () => {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
      };
      categoryContainer.appendChild(button);
    });
  }

  function displayProducts(productList) {
    productContainer.innerHTML = "";
    productList.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productContainer.appendChild(div);
    });
  }

  window.addToCart = function (id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartCount();
    alert(`${item.name} added to cart`);
  };

  searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchValue));
    displayProducts(filtered);
  });

  createCategoryButtons();
  displayProducts(products);
  updateCartCount();
});
