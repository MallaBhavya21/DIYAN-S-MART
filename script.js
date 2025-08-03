// Sample product data (use your own or from product.js)
const products = [
  { id: 1, name: "Apple", price: 20, category: "Fruits" },
  { id: 2, name: "Milk", price: 25, category: "Dairy" },
  { id: 3, name: "Shampoo", price: 120, category: "Personal Care" },
  // Add more products...
];

// Render products
function displayProducts(productsToDisplay) {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";

  if (productsToDisplay.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsToDisplay.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(p => p.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} added to cart`);
}

// Search products
function searchProducts() {
  const searchInput = document.getElementById("search");
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

// Filter by category
function filterCategory(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

// Cart count in nav
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = count;
}

// Setup event listeners safely
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayProducts(products);

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
  }
});
