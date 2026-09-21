/* ==========================================================================
   FOODIE - cart.js
   Cart rendering, quantity controls, coupon application and total
   calculations. Cart data lives in localStorage (see app.js helpers).
   ========================================================================== */

const CART_CONSTANTS = {
  DELIVERY_FEE: 40,
  PLATFORM_FEE: 6,
  TAX_RATE: 0.05,
  FREE_DELIVERY_THRESHOLD: 299
};

const COUPON_STORAGE_KEY = "foodie_applied_coupon";

function getAppliedCoupon() {
  return getStorage(COUPON_STORAGE_KEY, null);
}

function setAppliedCoupon(code) {
  setStorage(COUPON_STORAGE_KEY, code);
}

/* ---------------- Calculations ---------------- */
function calculateSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateDeliveryFee(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= CART_CONSTANTS.FREE_DELIVERY_THRESHOLD ? 0 : CART_CONSTANTS.DELIVERY_FEE;
}

function calculatePlatformFee(subtotal) {
  return subtotal === 0 ? 0 : CART_CONSTANTS.PLATFORM_FEE;
}

function calculateDiscount(subtotal, couponCode) {
  if (!couponCode || !coupons[couponCode]) return 0;
  const coupon = coupons[couponCode];
  if (subtotal < coupon.minOrder) return 0;
  return coupon.type === "percent" ? Math.round(subtotal * (coupon.value / 100)) : coupon.value;
}

function calculateTax(taxableAmount) {
  return Math.round(taxableAmount * CART_CONSTANTS.TAX_RATE);
}

/* ---------------- Cart item mutation ---------------- */
function removeFromCart(itemId) {
  const cart = getCart().filter(c => c.id !== itemId);
  saveCart(cart);
}

function increaseQuantity(itemId) {
  const cart = getCart();
  const item = cart.find(c => c.id === itemId);
  if (item) item.quantity += 1;
  saveCart(cart);
}

function decreaseQuantity(itemId) {
  let cart = getCart();
  const item = cart.find(c => c.id === itemId);
  if (!item) return;
  item.quantity -= 1;
  if (item.quantity <= 0) cart = cart.filter(c => c.id !== itemId);
  saveCart(cart);
}

/* ---------------- Coupon ---------------- */
function applyCoupon(code, subtotal) {
  const messageEl = document.getElementById("couponMessage");
  const cleanCode = code.trim().toUpperCase();

  if (!cleanCode) {
    messageEl.textContent = "Please enter a coupon code.";
    messageEl.className = "coupon-message coupon-message--error";
    return;
  }

  const coupon = coupons[cleanCode];
  if (!coupon) {
    messageEl.textContent = "Invalid coupon code.";
    messageEl.className = "coupon-message coupon-message--error";
    setAppliedCoupon(null);
    renderSummary();
    return;
  }

  if (subtotal < coupon.minOrder) {
    messageEl.textContent = `Add ₹${coupon.minOrder - subtotal} more to use this coupon.`;
    messageEl.className = "coupon-message coupon-message--error";
    setAppliedCoupon(null);
    renderSummary();
    return;
  }

  setAppliedCoupon(cleanCode);
  messageEl.textContent = `"${cleanCode}" applied — ${coupon.description}`;
  messageEl.className = "coupon-message coupon-message--success";
  renderSummary();
}

/* ---------------- Rendering ---------------- */
function cartItemHTML(item) {
  const vegTagClass = item.veg ? "veg-tag" : "veg-tag veg-tag--nonveg";
  return `
    <div class="cart-item" data-item-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item__info">
        <div class="cart-item__name">
          <span class="${vegTagClass}" aria-hidden="true"></span>
          ${item.name}
        </div>
        <div class="cart-item__price">₹${item.price} x ${item.quantity}</div>
      </div>
      <div class="cart-item__controls">
        <div class="qty-stepper">
          <button data-decrease aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button data-increase aria-label="Increase quantity">+</button>
        </div>
        <span class="cart-item__total">₹${item.price * item.quantity}</span>
        <button class="cart-item__remove" data-remove aria-label="Remove ${item.name}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `;
}

function renderCartItems(cart) {
  const container = document.getElementById("cartItemsSection");

  // Group items by restaurant so the cart reads naturally
  const groups = {};
  cart.forEach(item => {
    if (!groups[item.restaurantId]) groups[item.restaurantId] = { name: item.restaurantName, items: [] };
    groups[item.restaurantId].items.push(item);
  });

  container.innerHTML = Object.values(groups).map(group => `
    <div class="cart-restaurant-group">
      <div class="cart-restaurant-group__name"><i class="fa-solid fa-shop"></i> ${group.name}</div>
      ${group.items.map(cartItemHTML).join("")}
    </div>
  `).join("");

  container.addEventListener("click", handleCartClick);
}

function handleCartClick(e) {
  const itemEl = e.target.closest(".cart-item");
  if (!itemEl) return;
  const itemId = Number(itemEl.dataset.itemId);

  if (e.target.closest("[data-increase]")) {
    increaseQuantity(itemId);
  } else if (e.target.closest("[data-decrease]")) {
    decreaseQuantity(itemId);
  } else if (e.target.closest("[data-remove]")) {
    removeFromCart(itemId);
    showToast("Item removed from cart", "info");
  }
  renderPage();
}

function renderSummary() {
  const cart = getCart();
  const subtotal = calculateSubtotal(cart);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const platformFee = calculatePlatformFee(subtotal);
  const couponCode = getAppliedCoupon();
  const discount = calculateDiscount(subtotal, couponCode);
  const taxableAmount = Math.max(subtotal - discount, 0);
  const tax = calculateTax(taxableAmount);
  const grandTotal = taxableAmount + deliveryFee + platformFee + tax;

  document.getElementById("itemTotal").textContent = `₹${subtotal}`;
  document.getElementById("deliveryFee").textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
  document.getElementById("platformFee").textContent = `₹${platformFee}`;
  document.getElementById("taxAmount").textContent = `₹${tax}`;
  document.getElementById("grandTotal").textContent = `₹${grandTotal}`;

  const discountRow = document.getElementById("discountRow");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("discountAmount").textContent = `−₹${discount}`;
  } else {
    discountRow.style.display = "none";
  }

  // Persist the computed order totals so checkout.html can reuse them
  setStorage("foodie_order_totals", { subtotal, deliveryFee, platformFee, discount, tax, grandTotal, couponCode });

  return { subtotal, deliveryFee, platformFee, discount, tax, grandTotal };
}

function renderPage() {
  const cart = getCart();
  const cartLayout = document.getElementById("cartLayout");
  const emptyState = document.getElementById("emptyCartState");
  const subHeading = document.getElementById("cartSubHeading");

  if (cart.length === 0) {
    cartLayout.style.display = "none";
    emptyState.style.display = "block";
    subHeading.textContent = "Your cart is currently empty.";
    return;
  }

  cartLayout.style.display = "grid";
  emptyState.style.display = "none";
  subHeading.textContent = `You have ${getCartCount()} item(s) in your cart.`;

  renderCartItems(cart);
  renderSummary();
}

function initCouponControls() {
  const applyBtn = document.getElementById("applyCouponBtn");
  const input = document.getElementById("couponInput");

  const existingCoupon = getAppliedCoupon();
  if (existingCoupon) input.value = existingCoupon;

  applyBtn.addEventListener("click", () => {
    const subtotal = calculateSubtotal(getCart());
    applyCoupon(input.value, subtotal);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyBtn.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
  initCouponControls();
});
