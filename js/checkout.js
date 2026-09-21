/* ==========================================================================
   FOODIE - checkout.js
   Renders the order summary, validates the delivery form, and creates
   the final order object on submit.
   ========================================================================== */

const CHECKOUT_CONSTANTS = {
  DELIVERY_FEE: 40,
  PLATFORM_FEE: 6,
  TAX_RATE: 0.05,
  FREE_DELIVERY_THRESHOLD: 299
};

function getOrderTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= CHECKOUT_CONSTANTS.FREE_DELIVERY_THRESHOLD ? 0 : CHECKOUT_CONSTANTS.DELIVERY_FEE);
  const platformFee = subtotal === 0 ? 0 : CHECKOUT_CONSTANTS.PLATFORM_FEE;

  const couponCode = getStorage("foodie_applied_coupon", null);
  let discount = 0;
  if (couponCode && coupons[couponCode] && subtotal >= coupons[couponCode].minOrder) {
    const coupon = coupons[couponCode];
    discount = coupon.type === "percent" ? Math.round(subtotal * (coupon.value / 100)) : coupon.value;
  }

  const taxableAmount = Math.max(subtotal - discount, 0);
  const tax = Math.round(taxableAmount * CHECKOUT_CONSTANTS.TAX_RATE);
  const grandTotal = taxableAmount + deliveryFee + platformFee + tax;

  return { subtotal, deliveryFee, platformFee, discount, tax, grandTotal, couponCode };
}

function renderCheckoutSummary() {
  const cart = getCart();
  const layout = document.getElementById("checkoutLayout");
  const emptyState = document.getElementById("checkoutEmptyState");

  if (cart.length === 0) {
    layout.style.display = "none";
    emptyState.style.display = "block";
    return null;
  }

  layout.style.display = "grid";
  emptyState.style.display = "none";

  document.getElementById("checkoutItems").innerHTML = cart.map(item => `
    <div class="checkout-item-row">
      <span>${item.name} x ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
    </div>
  `).join("");

  const totals = getOrderTotals(cart);

  document.getElementById("csItemTotal").textContent = `₹${totals.subtotal}`;
  document.getElementById("csDeliveryFee").textContent = totals.deliveryFee === 0 ? "FREE" : `₹${totals.deliveryFee}`;
  document.getElementById("csPlatformFee").textContent = `₹${totals.platformFee}`;
  document.getElementById("csTax").textContent = `₹${totals.tax}`;
  document.getElementById("csGrandTotal").textContent = `₹${totals.grandTotal}`;

  const discountRow = document.getElementById("csDiscountRow");
  if (totals.discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("csDiscount").textContent = `−₹${totals.discount}`;
  } else {
    discountRow.style.display = "none";
  }

  return totals;
}

/* ---------------- Validation ---------------- */
function validateField(input, isValid) {
  if (isValid) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }
  return isValid;
}

function validateForm() {
  let valid = true;

  const fullName = document.getElementById("fullName");
  valid = validateField(fullName, fullName.value.trim().length >= 3) && valid;

  const phone = document.getElementById("phone");
  valid = validateField(phone, /^[0-9]{10}$/.test(phone.value.trim())) && valid;

  const pincode = document.getElementById("pincode");
  valid = validateField(pincode, /^[0-9]{6}$/.test(pincode.value.trim())) && valid;

  const houseNumber = document.getElementById("houseNumber");
  valid = validateField(houseNumber, houseNumber.value.trim().length > 0) && valid;

  const street = document.getElementById("street");
  valid = validateField(street, street.value.trim().length > 0) && valid;

  const city = document.getElementById("city");
  valid = validateField(city, city.value.trim().length > 0) && valid;

  const stateField = document.getElementById("stateField");
  valid = validateField(stateField, stateField.value.trim().length > 0) && valid;

  return valid;
}

/* ---------------- Order creation ---------------- */
function generateOrderId() {
  return "FD" + Date.now().toString().slice(-8);
}

function createOrder(cart, totals, address, paymentMethod) {
  const restaurantNames = [...new Set(cart.map(item => item.restaurantName))];

  return {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: cart,
    restaurantNames,
    totals,
    address,
    paymentMethod,
    status: "Order Confirmed",
    estimatedDelivery: "35-40 min"
  };
}

function placeOrder(e) {
  e.preventDefault();

  if (!validateForm()) {
    showToast("Please fix the errors in the form.", "error");
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty.", "error");
    return;
  }

  const totals = getOrderTotals(cart);
  const address = {
    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    houseNumber: document.getElementById("houseNumber").value.trim(),
    street: document.getElementById("street").value.trim(),
    city: document.getElementById("city").value.trim(),
    state: document.getElementById("stateField").value.trim(),
    pincode: document.getElementById("pincode").value.trim()
  };
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

  const order = createOrder(cart, totals, address, paymentMethod);

  const orders = getStorage(STORAGE_KEYS.ORDERS, []);
  orders.unshift(order);
  setStorage(STORAGE_KEYS.ORDERS, orders);

  // Clear cart and coupon after successful order
  setStorage(STORAGE_KEYS.CART, []);
  setStorage("foodie_applied_coupon", null);
  setStorage("foodie_last_order_id", order.id);

  window.location.href = "order-success.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
  document.getElementById("checkoutForm").addEventListener("submit", placeOrder);
});
