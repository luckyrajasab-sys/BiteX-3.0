/* ===== State ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* ===== Toast (replaces alert()) ===== */
function showToast(message, type = "success") {
  let box = document.getElementById("toast-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "toast-box";
    box.className = "toast-box";
    document.body.appendChild(box);
  }
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  box.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/* ===== Cart ===== */
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  showToast(`${name} added to cart`);
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add something delicious from the menu.</p>
        <a href="menu.html"><button class="btn btn-primary">Browse Menu</button></a>
      </div>`;
    if (totalBox) totalBox.innerText = "₹0";
    return;
  }

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>
        <button class="btn btn-dark" onclick="removeItem(${index})">Remove</button>
      </div>`;
  });

  totalBox.innerText = "₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach(el => {
    el.innerText = cart.length;
    el.style.display = cart.length > 0 ? "inline-flex" : "none";
  });
}

function placeOrder(event) {
  if (event) event.preventDefault();
  if (cart.length === 0) {
    showToast("Your cart is empty", "danger");
    return;
  }
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = {
    id: "BX" + Math.floor(100000 + Math.random() * 900000),
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price, 0),
    date: new Date().toISOString(),
    status: "Preparing"
  };
  orders.unshift(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("lastOrder", order.id);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "order-success.html";
}

/* ===== Favorites ===== */
function toggleFavorite(name, price, img, btn) {
  const idx = favorites.findIndex(f => f.name === name);
  if (idx > -1) {
    favorites.splice(idx, 1);
    if (btn) btn.classList.remove("active");
    showToast(`${name} removed from favorites`, "warning");
  } else {
    favorites.push({ name, price, img });
    if (btn) btn.classList.add("active");
    showToast(`${name} saved to favorites`);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(name) {
  return favorites.some(f => f.name === name);
}

function renderFavorites() {
  const box = document.getElementById("favorites-grid");
  if (!box) return;

  if (favorites.length === 0) {
    box.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">♡</div>
        <h3>No favorites yet</h3>
        <p>Tap the heart on any dish to save it here.</p>
        <a href="menu.html"><button class="btn btn-primary">Browse Menu</button></a>
      </div>`;
    return;
  }

  box.innerHTML = favorites.map(f => `
    <div class="card glass">
      <img src="${f.img}">
      <h3>${f.name}</h3>
      <div class="price">₹${f.price}</div>
      <div class="card-actions">
        <button class="btn btn-primary" onclick="addToCart('${f.name}', ${f.price})">Add</button>
        <button class="btn btn-dark" onclick="toggleFavorite('${f.name}', ${f.price}, '${f.img}'); renderFavorites();">Remove</button>
      </div>
    </div>
  `).join("");
}

/* ===== Order history ===== */
function renderOrders() {
  const box = document.getElementById("orders-list");
  if (!box) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    box.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No orders yet</h3>
        <p>Your past orders will show up here.</p>
        <a href="menu.html"><button class="btn btn-primary">Order Now</button></a>
      </div>`;
    return;
  }

  box.innerHTML = orders.map(o => `
    <div class="order-card glass">
      <div class="order-card-top">
        <div>
          <h3>Order ${o.id}</h3>
          <p class="muted">${new Date(o.date).toLocaleString()}</p>
        </div>
        <span class="status-pill status-${o.status.toLowerCase().replace(" ", "-")}">${o.status}</span>
      </div>
      <div class="order-card-items">
        ${o.items.map(i => `<span>${i.name}</span>`).join(" · ")}
      </div>
      <div class="order-card-bottom">
        <strong>₹${o.total}</strong>
        <a href="track-order.html?id=${o.id}"><button class="btn btn-dark">Track Order</button></a>
      </div>
    </div>
  `).join("");
}

/* ===== Order tracking ===== */
function initTracking() {
  const wrap = document.getElementById("tracking-wrap");
  if (!wrap) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || localStorage.getItem("lastOrder") || "BX000000";
  document.getElementById("tracking-id").innerText = id;

  const steps = document.querySelectorAll(".track-step");
  let current = 0;

  function activate(i) {
    steps.forEach((s, idx) => {
      s.classList.toggle("done", idx < i);
      s.classList.toggle("active", idx === i);
    });
  }

  activate(current);
  const interval = setInterval(() => {
    current++;
    if (current >= steps.length) {
      clearInterval(interval);
      return;
    }
    activate(current);
  }, 2200);
}

/* ===== Contact form ===== */
function submitContact(event) {
  event.preventDefault();
  showToast("Message sent — we'll get back to you soon");
  event.target.reset();
}

/* ===== Search / filter on menu ===== */
function filterMenu() {
  const input = document.getElementById("menu-search");
  const activeCategory = document.querySelector(".filter-chip.active");
  const query = input ? input.value.toLowerCase() : "";
  const category = activeCategory ? activeCategory.dataset.category : "all";

  document.querySelectorAll(".food-grid .card").forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cat = card.dataset.category;
    const matchesQuery = name.includes(query);
    const matchesCategory = category === "all" || cat === category;
    card.style.display = matchesQuery && matchesCategory ? "" : "none";
  });
}

function setFilter(chip) {
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  filterMenu();
}

/* ===== Init on load ===== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCart();
  renderFavorites();
  renderOrders();
  initTracking();

  document.querySelectorAll(".fav-btn").forEach(btn => {
    const name = btn.dataset.name;
    if (isFavorite(name)) btn.classList.add("active");
  });
});
