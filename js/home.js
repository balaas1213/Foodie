/* ==========================================================================
   FOODIE - home.js
   Renders dynamic homepage content: categories, popular restaurants,
   offers, and handles the hero search redirect.
   ========================================================================== */

function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;

  grid.innerHTML = categories.map(cat => `
    <a href="restaurants.html?category=${cat.id}" class="category-card">
      <span class="category-card__icon"><i class="${cat.icon}"></i></span>
      <span>${cat.name}</span>
    </a>
  `).join("");
}

function buildRestaurantCard(r) {
  const vegTagClass = r.veg ? "veg-tag" : "veg-tag veg-tag--nonveg";
  return `
    <article class="restaurant-card">
      <a href="restaurant-menu.html?id=${r.id}" class="restaurant-card__image-wrap">
        <img src="${r.image}" alt="${r.name} restaurant" loading="lazy" />
        <span class="restaurant-card__veg"><span class="${vegTagClass}" aria-hidden="true"></span></span>
        <span class="restaurant-card__rating rating-pill"><i class="fa-solid fa-star"></i> ${r.rating}</span>
      </a>
      <div class="restaurant-card__body">
        <h3 class="restaurant-card__name">${r.name}</h3>
        <p class="restaurant-card__cuisine">${r.cuisine}</p>
        <div class="restaurant-card__meta">
          <span><i class="fa-solid fa-clock"></i> ${r.deliveryTime}</span>
          <span><i class="fa-solid fa-indian-rupee-sign"></i> ${r.priceForTwo} for two</span>
        </div>
        <a href="restaurant-menu.html?id=${r.id}" class="btn btn--secondary btn--block">View Menu</a>
      </div>
    </article>
  `;
}

function renderPopularRestaurants() {
  const grid = document.getElementById("popularRestaurants");
  if (!grid) return;

  const popular = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 8);
  grid.innerHTML = popular.map(buildRestaurantCard).join("");
}

function renderOffers() {
  const grid = document.getElementById("offersGrid");
  if (!grid) return;

  grid.innerHTML = offers.map(offer => `
    <div class="offer-card offer-card--${offer.theme}">
      <div>
        <i class="offer-card__icon ${offer.icon}"></i>
        <h3>${offer.title}</h3>
        <p>${offer.description}</p>
      </div>
      <span class="offer-card__code">CODE: ${offer.code}</span>
    </div>
  `).join("");
}

function initHeroSearch() {
  const form = document.getElementById("heroSearchForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("heroSearchInput").value.trim();
    const url = query ? `restaurants.html?search=${encodeURIComponent(query)}` : "restaurants.html";
    window.location.href = url;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderPopularRestaurants();
  renderOffers();
  initHeroSearch();
});
