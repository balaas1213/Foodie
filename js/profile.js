/* ==========================================================================
   FOODIE - profile.js
   Displays and edits the logged-in user's demo profile data.
   ========================================================================== */

function renderProfile() {
  const user = getCurrentUser();
  const notLoggedInState = document.getElementById("notLoggedInState");
  const profileLayout = document.getElementById("profileLayout");

  if (!user) {
    notLoggedInState.style.display = "block";
    profileLayout.style.display = "none";
    return;
  }

  notLoggedInState.style.display = "none";
  profileLayout.style.display = "grid";

  document.getElementById("profileAvatar").textContent = user.fullName.charAt(0).toUpperCase();
  document.getElementById("profileName").textContent = user.fullName;
  document.getElementById("profileEmail").textContent = user.email;

  document.getElementById("pFullName").value = user.fullName;
  document.getElementById("pPhone").value = user.phone;
  document.getElementById("pEmail").value = user.email;

  renderAddresses(user);
  renderFavorites(user);
}

function renderAddresses(user) {
  const container = document.getElementById("savedAddresses");
  const addresses = user.addresses || [];

  if (addresses.length === 0) {
    container.innerHTML = `<p style="color:var(--color-text-muted); font-size:0.88rem;">No saved addresses yet. Addresses used during checkout will appear here.</p>`;
    return;
  }

  container.innerHTML = addresses.map(addr => `
    <div class="saved-address">
      <i class="fa-solid fa-location-dot"></i>
      <div>
        <strong>${addr.fullName}</strong>
        ${addr.houseNumber}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}
      </div>
    </div>
  `).join("");
}

function renderFavorites(user) {
  const container = document.getElementById("favoriteRestaurants");
  // Demo: show top 3 rated restaurants as "favorites" if user hasn't picked any
  const favIds = user.favorites && user.favorites.length > 0
    ? user.favorites
    : [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3).map(r => r.id);

  const favRestaurants = favIds.map(id => getRestaurantById(id)).filter(Boolean);

  container.innerHTML = favRestaurants.map(r => `
    <a href="restaurant-menu.html?id=${r.id}" class="favorite-card">
      <img src="${r.image}" alt="${r.name}" />
      <div>
        <strong>${r.name}</strong>
        <small><i class="fa-solid fa-star" style="color:var(--color-star)"></i> ${r.rating}</small>
      </div>
    </a>
  `).join("");
}

function saveLastOrderAddress() {
  // Pull the address from the most recent order (if any) into the user's saved addresses
  const user = getCurrentUser();
  const orders = getStorage(STORAGE_KEYS.ORDERS, []);
  if (!user || orders.length === 0) return;

  const latestAddress = orders[0].address;
  user.addresses = user.addresses || [];
  const alreadySaved = user.addresses.some(a => a.pincode === latestAddress.pincode && a.street === latestAddress.street);

  if (!alreadySaved) {
    user.addresses.unshift(latestAddress);
    updateUserEverywhere(user);
  }
}

function updateUserEverywhere(user) {
  setStorage(STORAGE_KEYS.CURRENT_USER, user);
  const users = getStorage(STORAGE_KEYS.USERS, []);
  const idx = users.findIndex(u => u.email === user.email);
  if (idx !== -1) {
    users[idx] = user;
    setStorage(STORAGE_KEYS.USERS, users);
  }
}

function initEditProfile() {
  const editBtn = document.getElementById("editProfileBtn");
  const saveBtn = document.getElementById("saveProfileBtn");
  const inputs = ["pFullName", "pPhone", "pEmail"].map(id => document.getElementById(id));

  editBtn.addEventListener("click", () => {
    inputs.forEach(input => (input.disabled = false));
    saveBtn.style.display = "inline-flex";
    editBtn.style.display = "none";
  });

  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    user.fullName = document.getElementById("pFullName").value.trim() || user.fullName;
    user.phone = document.getElementById("pPhone").value.trim() || user.phone;

    updateUserEverywhere(user);

    inputs.forEach(input => (input.disabled = true));
    saveBtn.style.display = "none";
    editBtn.style.display = "inline-flex";

    showToast("Profile updated successfully!");
    renderProfile();
  });
}

function initLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    logoutUser();
    showToast("You have been logged out", "info");
    setTimeout(() => (window.location.href = "index.html"), 600);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  saveLastOrderAddress();
  renderProfile();
  initEditProfile();
  initLogout();
});
