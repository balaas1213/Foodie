/* ==========================================================================
   FOODIE - menu.js
   Reads the restaurant id from the URL, renders restaurant info + menu,
   and wires up add-to-cart / quantity controls.
   ========================================================================== */

let currentRestaurant = null;
let currentMenu = [];

function getRestaurantIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderRestaurantInfo(restaurant) {
  const container = document.getElementById("restaurantInfo");
  const vegTagClass = restaurant.veg ? "veg-tag" : "veg-tag veg-tag--nonveg";

  container.innerHTML = `
    <div class="restaurant-hero">
      <div class="restaurant-hero__cover">
        <img src="${restaurant.image}" alt="${restaurant.name} cover image" />
      </div>
    </div>
    <div class="restaurant-info-card">
      <div class="restaurant-info-card__top">
        <div>
          <h1>${restaurant.name}</h1>
          <p class="restaurant-info-card__cuisine">${restaurant.cuisine}</p>
          <p class="restaurant-info-card__desc">${restaurant.description}</p>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="${vegTagClass}" aria-hidden="true"></span>
          <span class="rating-pill"><i class="fa-solid fa-star"></i> ${restaurant.rating}</span>
        </div>
      </div>
      <div class="restaurant-info-card__meta">
        <div><i class="fa-solid fa-clock"></i> ${restaurant.deliveryTime}</div>
        <div><i class="fa-solid fa-indian-rupee-sign"></i> ${restaurant.priceForTwo} for two</div>
        <div><i class="fa-solid fa-location-dot"></i> ${restaurant.address}</div>
      </div>
    </div>
  `;

  document.title = `${restaurant.name} Menu | Foodie`;
  document.getElementById("breadcrumbName").textContent = restaurant.name;
}

function groupMenuBySection(menu) {
  const order = ["Recommended", "Starters", "Main Course", "Rice & Biryani", "Pizza", "Burgers", "South Indian", "Desserts", "Beverages"];
  const grouped = {};
  menu.forEach(item => {
    if (!grouped[item.section]) grouped[item.section] = [];
    grouped[item.section].push(item);
  });
  // Return sections in a sensible, consistent order
  return order.filter(section => grouped[section]).map(section => ({ section, items: grouped[section] }));
}

function getQuantityInCart(itemId) {
  const cart = getCart();
  const entry = cart.find(c => c.id === itemId);
  return entry ? entry.quantity : 0;
}

function foodCardHTML(item) {
  const vegTagClass = item.veg ? "veg-tag" : "veg-tag veg-tag--nonveg";
  const qty = getQuantityInCart(item.id);

  return `
    <article class="food-card" data-item-id="${item.id}">
      <div class="food-card__info">
        <div class="food-card__top">
          <span class="${vegTagClass}" aria-hidden="true"></span>
          <h3 class="food-card__name">${item.name}</h3>
        </div>
        <div class="food-card__rating"><i class="fa-solid fa-star"></i> ${item.rating}</div>
        <p class="food-card__desc">${item.description}</p>
        <p class="food-card__price">₹${item.price}</p>
      </div>
      <div class="food-card__image-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <button class="food-card__add-btn" data-add-btn style="${qty > 0 ? "display:none;" : ""}">ADD</button>
        <div class="food-card__qty" data-qty-control style="${qty > 0 ? "display:flex;" : ""}">
          <button data-decrease aria-label="Decrease quantity">−</button>
          <span data-qty-value>${qty}</span>
          <button data-increase aria-label="Increase quantity">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderMenu(menu) {
  const sections = groupMenuBySection(menu);
  const sidebar = document.getElementById("menuCategories");
  const itemsContainer = document.getElementById("menuItemsContainer");

  sidebar.innerHTML = sections.map((s, i) => `
    <button data-section-btn="${s.section}" class="${i === 0 ? "active" : ""}">${s.section} (${s.items.length})</button>
  `).join("");

  itemsContainer.innerHTML = sections.map(s => `
    <div class="menu-section" id="section-${s.section.replace(/\s+/g, "-")}">
      <h2>${s.section}</h2>
      ${s.items.map(foodCardHTML).join("")}
    </div>
  `).join("");

  sidebar.querySelectorAll("[data-section-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      sidebar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const targetId = `section-${btn.dataset.sectionBtn.replace(/\s+/g, "-")}`;
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  itemsContainer.addEventListener("click", handleMenuClick);
}

function handleMenuClick(e) {
  const card = e.target.closest(".food-card");
  if (!card) return;
  const itemId = Number(card.dataset.itemId);
  const item = getMenuItemById(itemId);

  if (e.target.closest("[data-add-btn]")) {
    addItemToCart(item);
    refreshCardControls(card, 1);
    showToast(`${item.name} added to cart`);
  } else if (e.target.closest("[data-increase]")) {
    const qty = increaseCartItem(itemId);
    refreshCardControls(card, qty);
  } else if (e.target.closest("[data-decrease]")) {
    const qty = decreaseCartItem(itemId);
    refreshCardControls(card, qty);
  }
}

function refreshCardControls(card, qty) {
  const addBtn = card.querySelector("[data-add-btn]");
  const qtyControl = card.querySelector("[data-qty-control]");
  const qtyValue = card.querySelector("[data-qty-value]");

  if (qty <= 0) {
    addBtn.style.display = "block";
    qtyControl.style.display = "none";
  } else {
    addBtn.style.display = "none";
    qtyControl.style.display = "flex";
    qtyValue.textContent = qty;
  }
}

/* ---------------- Cart mutation helpers (also used conceptually in cart.js) ---------------- */
function addItemToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      veg: item.veg,
      restaurantId: currentRestaurant.id,
      restaurantName: currentRestaurant.name,
      quantity: 1
    });
  }
  saveCart(cart);
}

function increaseCartItem(itemId) {
  const cart = getCart();
  const entry = cart.find(c => c.id === itemId);
  if (entry) entry.quantity += 1;
  saveCart(cart);
  return entry ? entry.quantity : 0;
}

function decreaseCartItem(itemId) {
  let cart = getCart();
  const entry = cart.find(c => c.id === itemId);
  if (!entry) return 0;

  entry.quantity -= 1;
  if (entry.quantity <= 0) {
    cart = cart.filter(c => c.id !== itemId);
  }
  saveCart(cart);
  const updated = cart.find(c => c.id === itemId);
  return updated ? updated.quantity : 0;
}

function initMenuPage() {
  const id = getRestaurantIdFromURL();
  currentRestaurant = getRestaurantById(id);

  if (!currentRestaurant) {
    document.getElementById("restaurantInfo").innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h3>Restaurant not found</h3>
        <p>The restaurant you're looking for doesn't exist.</p>
        <a href="restaurants.html" class="btn btn--primary">Browse Restaurants</a>
      </div>`;
    return;
  }

  currentMenu = getMenuByRestaurantId(currentRestaurant.id);
  renderRestaurantInfo(currentRestaurant);
  renderMenu(currentMenu);
}

document.addEventListener("DOMContentLoaded", initMenuPage);
