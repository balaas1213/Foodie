# Foodie – Online Food Delivery Web Application

A complete, responsive, front-end food delivery web application built with **pure HTML5, CSS3 and Vanilla JavaScript** — no frameworks, no libraries beyond Font Awesome icons and Google Fonts. Built as a college portfolio project to demonstrate real-world front-end engineering skills: DOM manipulation, state management, routing via URL parameters, and persistent data with `localStorage`.

> 🍔 **Brand:** Foodie — *"Good food. Great mood. Delivered."*
> This is an original UI/UX design and is not a clone of any existing food delivery platform.

---

## About

Foodie lets a user browse restaurants, search and filter by cuisine/rating/veg preference, view a restaurant's menu, add items to a cart, apply coupons, check out with a delivery address and payment method, and track their order history — all running entirely in the browser.

---

## Features

- 🏠 **Home page** with hero search, food categories, popular restaurants and promotional offers
- 🍽️ **Restaurant listing** with live search, cuisine/rating/veg filters and sorting
- 📋 **Restaurant menu page** with categorized menu items and sticky category navigation
- 🛒 **Shopping cart** with quantity controls, coupon codes and dynamic bill calculation
- 💳 **Checkout** with address form validation and a simulated payment method selector
- ✅ **Order confirmation** with a visual order-tracking timeline
- 👤 **Authentication** (demo, `localStorage`-based) — register, login, logout
- 🧾 **Profile page** — edit details, saved addresses, favorite restaurants
- 📦 **Order history** with one-click **Reorder**
- 📱 Fully **responsive** design for desktop, tablet and mobile
- 🔔 Toast notifications, empty states, and smooth hover/transition effects throughout

---

## Technologies Used

- **HTML5** — semantic markup
- **CSS3** — Flexbox, Grid, CSS variables, media queries (no Bootstrap/Tailwind)
- **Vanilla JavaScript (ES6+)** — DOM manipulation, event delegation, array methods, modules split by page
- **localStorage** — cart, demo auth, orders, coupons
- **Font Awesome** (CDN) — icons
- **Google Fonts** — Poppins & Inter

---

## Project Structure

```
Foodie/
│
├── index.html              Home page
├── restaurants.html        Restaurant listing (search/filter/sort)
├── restaurant-menu.html    Single restaurant + menu (reads ?id=)
├── cart.html                Shopping cart
├── checkout.html           Delivery + payment + place order
├── order-success.html      Order confirmation + tracking timeline
├── login.html               Login (demo auth)
├── register.html           Register (demo auth)
├── profile.html             User profile
├── orders.html               Order history + reorder
│
├── css/
│   ├── style.css            Design system, navbar, footer, buttons, forms
│   ├── home.css              Hero, categories, restaurant cards, offers
│   ├── restaurants.css      Toolbar + filters sidebar
│   ├── menu.css               Restaurant header + menu items
│   ├── cart.css                Cart items + order summary
│   ├── checkout.css          Checkout form + payment options
│   ├── auth.css                Login / register cards
│   ├── profile.css            Profile + order history cards
│   └── responsive.css       Media queries for all pages
│
├── js/
│   ├── data.js                Demo data: restaurants, menu items, offers, coupons
│   ├── app.js                 Shared: navbar, toast, cart badge, auth helpers
│   ├── home.js                Homepage rendering
│   ├── restaurants.js       Search / filter / sort logic
│   ├── menu.js                 Menu rendering + add-to-cart
│   ├── cart.js                  Cart rendering, totals, coupons
│   ├── checkout.js            Form validation + order creation
│   ├── auth.js                 Register / login (demo)
│   ├── profile.js              Profile view/edit
│   └── orders.js               Order history + reorder + tracking view
│
├── images/                    (external images are loaded via URLs; folder kept for structure)
└── README.md
```

---

## How to Run

1. **Download or clone** this project folder to your computer.
2. Open the `Foodie` folder in **VS Code**.
3. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
4. Right-click `index.html` → **"Open with Live Server"**.
5. The app opens in your browser at `http://127.0.0.1:5500` (or similar).

> You need an active internet connection the first time you load the app, since restaurant/food images and Font Awesome icons are loaded from CDNs.

No build step, no `npm install`, no server required — it's a static front-end project.

---

## Application Flow

```
Home → Restaurants → Restaurant Menu → Add to Cart → Cart
   → Checkout → Order Confirmation → Orders (history)
```

A user can also register/login at any point, and manage their profile, saved addresses and favorite restaurants independently of the ordering flow.

---

## Key JavaScript Concepts Demonstrated

- **DOM manipulation** — dynamically building restaurant/menu/cart HTML from data
- **Event handling & delegation** — single listeners on containers instead of per-item listeners
- **Array methods** — `map`, `filter`, `reduce`, `find`, `sort`, `some` used throughout for data operations
- **Objects & data modeling** — restaurants, menu items, cart items, orders and users as structured objects
- **`localStorage`** — persisting cart, demo user accounts, session, coupons and order history across page reloads
- **URL parameters** — `restaurant-menu.html?id=3`, `restaurants.html?search=pizza`
- **Form validation** — custom validation for checkout, login and registration forms
- **Dynamic rendering** — category/restaurant/menu/cart/order lists all rendered from JS data at runtime

---

## Future Enhancements

- 🔗 Spring Boot backend with REST APIs
- 🗄️ MySQL database for restaurants, users, and orders
- 🔐 Real authentication (JWT / OAuth) with hashed passwords
- 💳 Real payment gateway integration (Razorpay / Stripe)
- 🖥️ Restaurant admin dashboard for menu & order management
- 🛵 Delivery partner tracking with live map integration
- ⏱️ Real-time order status updates (WebSockets)

---

## Disclaimer

This is a **frontend portfolio/demo application**. Authentication (login/register) and payments are **simulated entirely using `localStorage`** — no real accounts are created, no passwords are securely stored, and no real transactions are processed. Do **not** use this authentication approach in a production application.

---

Built as a personal portfolio project to demonstrate front-end web development skills using HTML, CSS and JavaScript.
