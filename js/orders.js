/* ==========================================================================
   FOODIE - orders.js
   Handles two pages:
   1. order-success.html - shows the order just placed + tracking timeline
   2. orders.html - shows full order history with reorder functionality
   ========================================================================== */

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function getOrders() {
  return getStorage(STORAGE_KEYS.ORDERS, []);
}

function getOrderById(orderId) {
  return getOrders().find(o => o.id === orderId);
}

/* ---------------- order-success.html ---------------- */
function renderOrderSuccess() {
  const wrap = document.getElementById("successWrap");
  if (!wrap) return;

  const lastOrderId = getStorage("foodie_last_order_id", null);
  const order = lastOrderId ? getOrderById(lastOrderId) : null;

  if (!order) {
    wrap.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-receipt"></i>
        <h3>No recent order found</h3>
        <p>Place an order to see your confirmation here.</p>
        <a href="restaurants.html" class="btn btn--primary">Explore Restaurants</a>
      </div>`;
    return;
  }

  const itemsList = order.items.map(item => `${item.name} x ${item.quantity}`).join(", ");
  const fullAddress = `${order.address.houseNumber}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`;

  wrap.innerHTML = `
    <div class="success-icon"><i class="fa-solid fa-check"></i></div>
    <h1 class="success-heading">Order placed successfully!</h1>
    <p class="success-sub">Thank you, ${order.address.fullName}. Your delicious food is on the way.</p>

    <div class="tracking">
      <h3>Track your order</h3>
      <div class="tracking-steps">
        <div class="tracking-steps__fill"></div>
        <div class="tracking-step active"><div class="tracking-step__dot"><i class="fa-solid fa-receipt"></i></div><span>Order Confirmed</span></div>
        <div class="tracking-step"><div class="tracking-step__dot"><i class="fa-solid fa-kitchen-set"></i></div><span>Preparing</span></div>
        <div class="tracking-step"><div class="tracking-step__dot"><i class="fa-solid fa-motorcycle"></i></div><span>Out for Delivery</span></div>
        <div class="tracking-step"><div class="tracking-step__dot"><i class="fa-solid fa-box-open"></i></div><span>Delivered</span></div>
      </div>
    </div>

    <div class="order-card">
      <div class="order-card__row"><span>Order ID</span><span>#${order.id}</span></div>
      <div class="order-card__row"><span>Restaurant</span><span>${order.restaurantNames.join(", ")}</span></div>
      <div class="order-card__row"><span>Items</span><span>${itemsList}</span></div>
      <div class="order-card__row"><span>Total Amount</span><span>₹${order.totals.grandTotal}</span></div>
      <div class="order-card__row"><span>Delivery Address</span><span>${fullAddress}</span></div>
      <div class="order-card__row"><span>Payment Method</span><span>${order.paymentMethod}</span></div>
      <div class="order-card__row"><span>Estimated Delivery</span><span>${order.estimatedDelivery}</span></div>
    </div>

    <div class="success-actions">
      <a href="orders.html" class="btn btn--secondary">View Orders</a>
      <a href="restaurants.html" class="btn btn--primary">Continue Shopping</a>
    </div>
  `;
}

/* ---------------- orders.html ---------------- */
function orderCardHTML(order) {
  const itemsList = order.items.map(item => `${item.name} x ${item.quantity}`).join(", ");
  return `
    <div class="order-history-card">
      <div class="order-history-card__top">
        <div>
          <p class="order-history-card__id">Order #${order.id}</p>
          <p class="order-history-card__date">${formatDate(order.date)}</p>
        </div>
        <span class="order-status-badge">${order.status}</span>
      </div>
      <p class="order-history-card__restaurant"><i class="fa-solid fa-shop"></i> ${order.restaurantNames.join(", ")}</p>
      <p class="order-history-card__items">${itemsList}</p>
      <div class="order-history-card__bottom">
        <span class="order-history-card__total">₹${order.totals.grandTotal}</span>
        <button class="btn btn--outline btn--sm" data-reorder="${order.id}"><i class="fa-solid fa-rotate-right"></i> Reorder</button>
      </div>
    </div>
  `;
}

function reorder(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;

  const cart = getCart();
  order.items.forEach(orderedItem => {
    const existing = cart.find(c => c.id === orderedItem.id);
    if (existing) {
      existing.quantity += orderedItem.quantity;
    } else {
      cart.push({ ...orderedItem });
    }
  });

  saveCart(cart);
  showToast("Items added to cart from your previous order");
  setTimeout(() => (window.location.href = "cart.html"), 700);
}

function renderOrdersPage() {
  const container = document.getElementById("ordersList");
  if (!container) return;

  const orders = getOrders();
  const emptyState = document.getElementById("ordersEmptyState");

  if (orders.length === 0) {
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  container.style.display = "flex";
  emptyState.style.display = "none";
  container.innerHTML = orders.map(orderCardHTML).join("");

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-reorder]");
    if (btn) reorder(btn.dataset.reorder);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrderSuccess();
  renderOrdersPage();
});
