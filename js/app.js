/* ==========================================================================
   FOODIE - app.js
   Shared functionality that runs on every page:
   - Mobile navbar toggle
   - Cart badge count
   - Toast notifications
   - localStorage helpers (cart, auth, orders)
   ========================================================================== */

const STORAGE_KEYS = {
  CART: "foodie_cart",
  USERS: "foodie_users",
  CURRENT_USER: "foodie_current_user",
  ORDERS: "foodie_orders"
};

/* ---------------- Generic localStorage helpers ---------------- */
function getStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("Storage read error:", e);
    return fallback;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

/* ---------------- Cart helpers (used across pages) ---------------- */
function getCart() {
  return getStorage(STORAGE_KEYS.CART, []);
}

function saveCart(cart) {
  setStorage(STORAGE_KEYS.CART, cart);
  updateCartCount();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

/* ---------------- Toast notifications ---------------- */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast--visible"));

  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/* ---------------- Auth helpers ---------------- */
function getCurrentUser() {
  return getStorage(STORAGE_KEYS.CURRENT_USER, null);
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

/* ---------------- Navbar (shared across all pages) ---------------- */
function initNavbar() {
  const toggleBtn = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("navbar__menu--open");
      toggleBtn.setAttribute("aria-expanded", isOpen);
      toggleBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Reflect login state in navbar login/profile link
  const authLink = document.querySelector("[data-auth-link]");
  if (authLink) {
    const user = getCurrentUser();
    if (user) {
      authLink.innerHTML = `<i class="fa-solid fa-circle-user"></i><span>${user.fullName.split(" ")[0]}</span>`;
      authLink.setAttribute("href", "profile.html");
    } else {
      authLink.innerHTML = `<i class="fa-solid fa-circle-user"></i><span>Login</span>`;
      authLink.setAttribute("href", "login.html");
    }
  }

  updateCartCount();
}

/* ---------------- Footer year ---------------- */
function initFooterYear() {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------------- Run shared init on every page ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFooterYear();
});
