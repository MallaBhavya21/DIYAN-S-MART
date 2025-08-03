import { products } from './products.js';

const productList = document.getElementById('product-list');
const searchBar = document.getElementById('search-bar');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartCount = document.getElementById('cart-count');
const locationBtn = document.getElementById('location-btn');
const locationOutput = document.getElementById('location-output');
const logoutBtn = document.getElementById('logout-btn');

// Check login
window.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('name');
  const phone = localStorage.getItem('phone');
  const address = localStorage.getItem('address');

  if (!name || !phone || !address) {
    window.location.href = 'login.html';
  }

  updateCartCount();
  renderProducts(products);
});

// Render products
function renderProducts(items) {
  productList.innerHTML = '';
  if (items.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }

  items.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button data-id="${product.id}" class="add-btn">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  // Add to cart event
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      addToCart(id);
    });
  });
}

// Add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Filter by category
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    if (category === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    }
  });
});

// Search
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Use location
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await res.json();
      locationOutput.textContent = `📍 ${data.display_name}`;
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('name');
  localStorage.removeItem('phone');
  localStorage.removeItem('address');
  window.location.href = 'login.html';
});
