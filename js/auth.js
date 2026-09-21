/* ==========================================================================
   FOODIE - auth.js
   DEMO FRONTEND AUTHENTICATION ONLY.
   Users and passwords are stored in plain text in localStorage purely to
   simulate a login/register flow for this portfolio project. This is NOT
   secure and must never be used as a real authentication system.
   ========================================================================== */

function getUsers() {
  return getStorage(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
  setStorage(STORAGE_KEYS.USERS, users);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------------- Register ---------------- */
function initRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("regName");
    const email = document.getElementById("regEmail");
    const phone = document.getElementById("regPhone");
    const password = document.getElementById("regPassword");
    const confirmPassword = document.getElementById("regConfirmPassword");

    let valid = true;
    valid = toggleValid(name, name.value.trim().length >= 2) && valid;
    valid = toggleValid(email, isValidEmail(email.value.trim())) && valid;
    valid = toggleValid(phone, /^[0-9]{10}$/.test(phone.value.trim())) && valid;
    valid = toggleValid(password, password.value.length >= 6) && valid;
    valid = toggleValid(confirmPassword, confirmPassword.value === password.value && password.value.length >= 6) && valid;

    if (!valid) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    const users = getUsers();
    const emailExists = users.some(u => u.email.toLowerCase() === email.value.trim().toLowerCase());
    if (emailExists) {
      toggleValid(email, false);
      showToast("An account with this email already exists.", "error");
      return;
    }

    const newUser = {
      fullName: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      password: password.value, // Demo only — never store plain-text passwords in production
      addresses: [],
      favorites: [],
      joinedAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    setStorage(STORAGE_KEYS.CURRENT_USER, newUser);

    showToast("Account created successfully!");
    setTimeout(() => (window.location.href = "profile.html"), 700);
  });
}

/* ---------------- Login ---------------- */
function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    let valid = true;
    valid = toggleValid(email, isValidEmail(email.value.trim())) && valid;
    valid = toggleValid(password, password.value.length > 0) && valid;

    if (!valid) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.value.trim().toLowerCase() && u.password === password.value);

    if (!user) {
      toggleValid(password, false);
      showToast("Invalid email or password.", "error");
      return;
    }

    setStorage(STORAGE_KEYS.CURRENT_USER, user);
    showToast(`Welcome back, ${user.fullName.split(" ")[0]}!`);
    setTimeout(() => (window.location.href = "profile.html"), 700);
  });

  const forgotLink = document.getElementById("forgotPasswordLink");
  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Password reset is simulated in this demo project.", "info");
    });
  }
}

function toggleValid(input, isValid) {
  input.classList.toggle("invalid", !isValid);
  return isValid;
}

document.addEventListener("DOMContentLoaded", () => {
  initRegisterForm();
  initLoginForm();
});
