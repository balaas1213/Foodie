/* ==========================================================================
   FOODIE - restaurants.js
   Handles restaurant search, filtering, sorting and rendering.
   ========================================================================== */

const state = {
  search: "",
  minRating: 0,
  cuisines: [],
  vegOnly: false,
  sort: "default"
};

function restaurantCardHTML(r) {
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

/* Convert delivery time string like "30-35 min" into a comparable number */
function parseDeliveryMinutes(str) {
  const match = str.match(/\d+/);
  return match ? Number(match[0]) : 999;
}

function matchesSearch(restaurant, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const nameMatch = restaurant.name.toLowerCase().includes(q);
  const cuisineMatch = restaurant.cuisine.toLowerCase().includes(q);
  const dishMatch = getMenuByRestaurantId(restaurant.id).some(item => item.name.toLowerCase().includes(q));
  return nameMatch || cuisineMatch || dishMatch;
}

function getFilteredRestaurants() {
  let results = restaurants.filter(r => {
    if (!matchesSearch(r, state.search)) return false;
    if (r.rating < state.minRating) return false;
    if (state.vegOnly && !r.veg) return false;
    if (state.cuisines.length > 0 && !state.cuisines.some(c => r.tags.includes(c))) return false;
    return true;
  });

  if (state.sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else if (state.sort === "delivery") {
    results.sort((a, b) => parseDeliveryMinutes(a.deliveryTime) - parseDeliveryMinutes(b.deliveryTime));
  } else if (state.sort === "price") {
    results.sort((a, b) => a.priceForTwo - b.priceForTwo);
  }

  return results;
}

function renderResults() {
  const grid = document.getElementById("restaurantGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const results = getFilteredRestaurants();

  resultsCount.textContent = `${results.length} restaurant${results.length !== 1 ? "s" : ""} found`;

  if (results.length === 0) {
    grid.innerHTML = "";
    grid.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  grid.style.display = "grid";
  grid.innerHTML = results.map(restaurantCardHTML).join("");
}

function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");
  const category = params.get("category");

  if (search) {
    state.search = search;
    document.getElementById("searchInput").value = search;
  }
  if (category) {
    state.cuisines = [category];
    const checkbox = document.querySelector(`.cuisine-filter[value="${category}"]`);
    if (checkbox) checkbox.checked = true;
  }
}

function initToolbar() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    state.search = searchInput.value.trim();
    renderResults();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderResults();
  });

  document.getElementById("resetSearchBtn").addEventListener("click", () => {
    state.search = "";
    searchInput.value = "";
    renderResults();
  });
}

function initFilters() {
  document.querySelectorAll('input[name="rating"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      state.minRating = Number(e.target.value);
      renderResults();
    });
  });

  document.querySelectorAll(".cuisine-filter").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      state.cuisines = Array.from(document.querySelectorAll(".cuisine-filter:checked")).map(c => c.value);
      renderResults();
    });
  });

  document.getElementById("vegOnly").addEventListener("change", (e) => {
    state.vegOnly = e.target.checked;
    renderResults();
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    state.minRating = 0;
    state.cuisines = [];
    state.vegOnly = false;
    document.querySelector('input[name="rating"][value="0"]').checked = true;
    document.querySelectorAll(".cuisine-filter").forEach(c => (c.checked = false));
    document.getElementById("vegOnly").checked = false;
    renderResults();
  });

  // Mobile filter panel toggle
  const filtersPanel = document.getElementById("filtersPanel");
  document.getElementById("filterToggle").addEventListener("click", () => {
    filtersPanel.classList.add("filters-panel--open");
  });
  document.getElementById("closeFilters").addEventListener("click", () => {
    filtersPanel.classList.remove("filters-panel--open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFromURL();
  initToolbar();
  initFilters();
  renderResults();
});
