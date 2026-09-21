/* ==========================================================================
   FOODIE - data.js
   Central demo data store for the whole application.
   In a real product this would come from a backend API.
   ========================================================================== */

/* ---------- Food Categories ---------- */
const categories = [
  { id: "pizza", name: "Pizza", icon: "fa-solid fa-pizza-slice" },
  { id: "burger", name: "Burger", icon: "fa-solid fa-burger" },
  { id: "biryani", name: "Biryani", icon: "fa-solid fa-bowl-rice" },
  { id: "chinese", name: "Chinese", icon: "fa-solid fa-bowl-food" },
  { id: "south-indian", name: "South Indian", icon: "fa-solid fa-plate-wheat" },
  { id: "north-indian", name: "North Indian", icon: "fa-solid fa-utensils" },
  { id: "desserts", name: "Desserts", icon: "fa-solid fa-ice-cream" },
  { id: "beverages", name: "Beverages", icon: "fa-solid fa-mug-saucer" },
  { id: "healthy", name: "Healthy", icon: "fa-solid fa-leaf" }
];

/* ---------- Restaurants ---------- */
const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "South Indian, Biryani",
    tags: ["biryani", "south-indian"],
    rating: 4.5,
    deliveryTime: "30-35 min",
    priceForTwo: 400,
    veg: false,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    address: "12 MG Road, Coimbatore",
    description: "Authentic South Indian flavours with a legendary biryani recipe passed down three generations."
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "Fast Food, American",
    tags: ["burger"],
    rating: 4.2,
    deliveryTime: "20-25 min",
    priceForTwo: 350,
    veg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    address: "45 Race Course Road, Coimbatore",
    description: "Juicy, flame-grilled burgers stacked high with fresh toppings and house-made sauces."
  },
  {
    id: 3,
    name: "Pizza Craft",
    cuisine: "Italian, Pizza",
    tags: ["pizza"],
    rating: 4.6,
    deliveryTime: "25-30 min",
    priceForTwo: 500,
    veg: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    address: "8 Avinashi Road, Coimbatore",
    description: "Wood-fired, hand-tossed pizzas made with a slow-fermented dough and premium cheese."
  },
  {
    id: 4,
    name: "Chennai Bites",
    cuisine: "South Indian, Chettinad",
    tags: ["south-indian", "north-indian"],
    rating: 4.3,
    deliveryTime: "30-40 min",
    priceForTwo: 300,
    veg: false,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80",
    address: "22 Trichy Road, Coimbatore",
    description: "Spicy, aromatic Chettinad classics served the way grandma used to make them."
  },
  {
    id: 5,
    name: "Green Bowl",
    cuisine: "Healthy, Salads",
    tags: ["healthy"],
    rating: 4.4,
    deliveryTime: "20-30 min",
    priceForTwo: 380,
    veg: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    address: "3 DB Road, Coimbatore",
    description: "Fresh, wholesome bowls and salads for people who care about what they eat."
  },
  {
    id: 6,
    name: "The Biryani Hub",
    cuisine: "Biryani, Mughlai",
    tags: ["biryani", "north-indian"],
    rating: 4.7,
    deliveryTime: "35-40 min",
    priceForTwo: 450,
    veg: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    address: "17 Gandhipuram, Coimbatore",
    description: "Slow-cooked dum biryani sealed with love and a secret blend of whole spices."
  },
  {
    id: 7,
    name: "Dosa Corner",
    cuisine: "South Indian, Tiffin",
    tags: ["south-indian"],
    rating: 4.1,
    deliveryTime: "15-20 min",
    priceForTwo: 200,
    veg: true,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80",
    address: "9 RS Puram, Coimbatore",
    description: "Crispy dosas and fluffy idlis served fresh off the tawa, all day long."
  },
  {
    id: 8,
    name: "Wok & Roll",
    cuisine: "Chinese, Asian",
    tags: ["chinese"],
    rating: 4.0,
    deliveryTime: "25-35 min",
    priceForTwo: 350,
    veg: false,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
    address: "28 Cross Cut Road, Coimbatore",
    description: "Wok-tossed noodles, fried rice and Indo-Chinese favourites made to order."
  },
  {
    id: 9,
    name: "Sweet Treats",
    cuisine: "Desserts, Bakery",
    tags: ["desserts"],
    rating: 4.5,
    deliveryTime: "20-25 min",
    priceForTwo: 250,
    veg: true,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
    address: "5 Race Course, Coimbatore",
    description: "Decadent cakes, brownies and ice creams to satisfy every sweet craving."
  },
  {
    id: 10,
    name: "Punjabi Tadka",
    cuisine: "North Indian, Punjabi",
    tags: ["north-indian"],
    rating: 4.3,
    deliveryTime: "30-35 min",
    priceForTwo: 420,
    veg: false,
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&q=80",
    address: "14 Saibaba Colony, Coimbatore",
    description: "Rich curries, buttery naans and tandoori classics bursting with Punjabi flavour."
  }
];

/* ---------- Menu Items ---------- */
/* Each item belongs to a restaurantId and a menu "section" used for grouping */
const menuItems = [
  // Spice Garden (1)
  { id: 101, restaurantId: 1, name: "Chicken Biryani", description: "Fragrant basmati rice slow-cooked with tender chicken and spices.", price: 220, veg: false, rating: 4.6, section: "Recommended", image: "https://images.unsplash.com/photo-1633945274309-2c6dcc435916?w=500&q=80" },
  { id: 102, restaurantId: 1, name: "Paneer Biryani", description: "Aromatic biryani rice tossed with soft paneer cubes.", price: 190, veg: true, rating: 4.3, section: "Rice & Biryani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" },
  { id: 103, restaurantId: 1, name: "Mutton Biryani", description: "Slow-cooked mutton in a rich blend of whole spices.", price: 260, veg: false, rating: 4.7, section: "Rice & Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80" },
  { id: 104, restaurantId: 1, name: "Chicken 65", description: "Spicy, deep-fried chicken bites tossed in curry leaves.", price: 180, veg: false, rating: 4.4, section: "Starters", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&q=80" },
  { id: 105, restaurantId: 1, name: "Gobi Manchurian", description: "Crispy cauliflower florets tossed in a tangy sauce.", price: 150, veg: true, rating: 4.1, section: "Starters", image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=500&q=80" },
  { id: 106, restaurantId: 1, name: "Butter Naan", description: "Soft, buttery leavened flatbread from the tandoor.", price: 45, veg: true, rating: 4.2, section: "Main Course", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&q=80" },
  { id: 107, restaurantId: 1, name: "Chicken Curry", description: "Home-style chicken curry simmered in onion-tomato gravy.", price: 210, veg: false, rating: 4.3, section: "Main Course", image: "https://images.unsplash.com/photo-1631452180775-e6b9dc8dd83f?w=500&q=80" },
  { id: 108, restaurantId: 1, name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose-flavoured sugar syrup.", price: 90, veg: true, rating: 4.5, section: "Desserts", image: "https://images.unsplash.com/photo-1601303516361-e3f79ffdb2ff?w=500&q=80" },
  { id: 109, restaurantId: 1, name: "Masala Chaas", description: "Chilled spiced buttermilk, perfect with biryani.", price: 40, veg: true, rating: 4.0, section: "Beverages", image: "https://images.unsplash.com/photo-1621866103428-3b3dee2e1b02?w=500&q=80" },

  // Burger House (2)
  { id: 201, restaurantId: 2, name: "Classic Cheeseburger", description: "Beef-style patty, cheddar, lettuce and house sauce.", price: 160, veg: false, rating: 4.5, section: "Recommended", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
  { id: 202, restaurantId: 2, name: "Paneer Burger", description: "Crispy paneer patty with mint mayo and fresh veggies.", price: 140, veg: true, rating: 4.2, section: "Burgers", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=500&q=80" },
  { id: 203, restaurantId: 2, name: "Double Patty Burger", description: "Two juicy patties stacked with double cheese.", price: 210, veg: false, rating: 4.6, section: "Burgers", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80" },
  { id: 204, restaurantId: 2, name: "Peri Peri Fries", description: "Crispy fries tossed in tangy peri-peri seasoning.", price: 110, veg: true, rating: 4.3, section: "Starters", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80" },
  { id: 205, restaurantId: 2, name: "Chicken Nuggets", description: "Golden, crunchy nuggets served with dip.", price: 130, veg: false, rating: 4.1, section: "Starters", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80" },
  { id: 206, restaurantId: 2, name: "Choco Milkshake", description: "Thick and creamy chocolate milkshake.", price: 120, veg: true, rating: 4.4, section: "Beverages", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80" },
  { id: 207, restaurantId: 2, name: "Brownie Sundae", description: "Warm brownie topped with vanilla ice cream.", price: 140, veg: true, rating: 4.5, section: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" },
  { id: 208, restaurantId: 2, name: "Veggie Burger", description: "Loaded veggie patty with a smoky BBQ sauce.", price: 130, veg: true, rating: 4.0, section: "Burgers", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&q=80" },

  // Pizza Craft (3)
  { id: 301, restaurantId: 3, name: "Margherita Pizza", description: "Classic pizza with mozzarella, basil and tomato sauce.", price: 250, veg: true, rating: 4.6, section: "Recommended", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
  { id: 302, restaurantId: 3, name: "Chicken Pizza", description: "Loaded with grilled chicken, peppers and mozzarella.", price: 320, veg: false, rating: 4.5, section: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
  { id: 303, restaurantId: 3, name: "Farmhouse Pizza", description: "A garden mix of capsicum, onion, tomato and corn.", price: 280, veg: true, rating: 4.3, section: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
  { id: 304, restaurantId: 3, name: "Pepperoni Pizza", description: "Spicy pepperoni-style topping over gooey cheese.", price: 340, veg: false, rating: 4.7, section: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
  { id: 305, restaurantId: 3, name: "Garlic Breadsticks", description: "Warm breadsticks brushed with garlic butter.", price: 120, veg: true, rating: 4.2, section: "Starters", image: "https://images.unsplash.com/photo-1619531038896-097dfa9e2eb4?w=500&q=80" },
  { id: 306, restaurantId: 3, name: "Pasta Alfredo", description: "Creamy white sauce pasta with herbs.", price: 220, veg: true, rating: 4.1, section: "Main Course", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80" },
  { id: 307, restaurantId: 3, name: "Tiramisu", description: "Classic Italian coffee-flavoured dessert.", price: 160, veg: true, rating: 4.5, section: "Desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80" },
  { id: 308, restaurantId: 3, name: "Iced Tea", description: "Refreshing chilled lemon iced tea.", price: 80, veg: true, rating: 4.0, section: "Beverages", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80" },

  // Chennai Bites (4)
  { id: 401, restaurantId: 4, name: "Chettinad Chicken", description: "Fiery Chettinad-style chicken curry with fresh spices.", price: 230, veg: false, rating: 4.5, section: "Recommended", image: "https://images.unsplash.com/photo-1631452180775-e6b9dc8dd83f?w=500&q=80" },
  { id: 402, restaurantId: 4, name: "Mutton Chukka", description: "Dry-roasted mutton bursting with Chettinad spices.", price: 260, veg: false, rating: 4.6, section: "Main Course", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80" },
  { id: 403, restaurantId: 4, name: "Veg Kurma", description: "Mixed vegetables in a coconut based mild curry.", price: 170, veg: true, rating: 4.0, section: "Main Course", image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=500&q=80" },
  { id: 404, restaurantId: 4, name: "Parotta", description: "Flaky, layered flatbread, a South Indian favourite.", price: 40, veg: true, rating: 4.3, section: "Main Course", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&q=80" },
  { id: 405, restaurantId: 4, name: "Prawn Fry", description: "Crispy shallow-fried prawns tossed in spices.", price: 240, veg: false, rating: 4.4, section: "Starters", image: "https://images.unsplash.com/photo-1585932389872-b4a7c9a9d4b3?w=500&q=80" },
  { id: 406, restaurantId: 4, name: "Filter Coffee", description: "Traditional South Indian decoction filter coffee.", price: 40, veg: true, rating: 4.6, section: "Beverages", image: "https://images.unsplash.com/photo-1621866103428-3b3dee2e1b02?w=500&q=80" },
  { id: 407, restaurantId: 4, name: "Payasam", description: "Sweet, creamy South Indian rice pudding.", price: 80, veg: true, rating: 4.2, section: "Desserts", image: "https://images.unsplash.com/photo-1601303516361-e3f79ffdb2ff?w=500&q=80" },

  // Green Bowl (5)
  { id: 501, restaurantId: 5, name: "Quinoa Salad Bowl", description: "Quinoa, roasted veggies and a light lemon dressing.", price: 220, veg: true, rating: 4.5, section: "Recommended", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
  { id: 502, restaurantId: 5, name: "Grilled Chicken Bowl", description: "Grilled chicken breast over greens and brown rice.", price: 260, veg: false, rating: 4.6, section: "Main Course", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
  { id: 503, restaurantId: 5, name: "Sprouts Salad", description: "Crunchy mixed sprouts with a tangy dressing.", price: 150, veg: true, rating: 4.1, section: "Starters", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80" },
  { id: 504, restaurantId: 5, name: "Avocado Toast", description: "Multigrain toast topped with smashed avocado.", price: 190, veg: true, rating: 4.3, section: "Starters", image: "https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?w=500&q=80" },
  { id: 505, restaurantId: 5, name: "Green Detox Juice", description: "Spinach, cucumber and apple cold-pressed juice.", price: 110, veg: true, rating: 4.4, section: "Beverages", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&q=80" },
  { id: 506, restaurantId: 5, name: "Protein Bites", description: "No-sugar energy bites with nuts and oats.", price: 100, veg: true, rating: 4.0, section: "Desserts", image: "https://images.unsplash.com/photo-1490567674331-72a24cf68d1b?w=500&q=80" },

  // The Biryani Hub (6)
  { id: 601, restaurantId: 6, name: "Hyderabadi Dum Biryani", description: "Slow-cooked dum-style biryani with saffron aroma.", price: 240, veg: false, rating: 4.8, section: "Recommended", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80" },
  { id: 602, restaurantId: 6, name: "Veg Dum Biryani", description: "Layered vegetable biryani sealed and slow cooked.", price: 190, veg: true, rating: 4.3, section: "Rice & Biryani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" },
  { id: 603, restaurantId: 6, name: "Egg Biryani", description: "Fragrant rice tossed with spiced boiled eggs.", price: 180, veg: false, rating: 4.2, section: "Rice & Biryani", image: "https://images.unsplash.com/photo-1633945274309-2c6dcc435916?w=500&q=80" },
  { id: 604, restaurantId: 6, name: "Mirchi Ka Salan", description: "Tangy chilli curry, the perfect biryani companion.", price: 90, veg: true, rating: 4.1, section: "Starters", image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=500&q=80" },
  { id: 605, restaurantId: 6, name: "Boondi Raita", description: "Cool yogurt with crispy boondi and spices.", price: 60, veg: true, rating: 4.0, section: "Starters", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" },
  { id: 606, restaurantId: 6, name: "Double Ka Meetha", description: "Hyderabadi bread pudding soaked in sweet milk.", price: 100, veg: true, rating: 4.4, section: "Desserts", image: "https://images.unsplash.com/photo-1601303516361-e3f79ffdb2ff?w=500&q=80" },

  // Dosa Corner (7)
  { id: 701, restaurantId: 7, name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato masala.", price: 90, veg: true, rating: 4.4, section: "Recommended", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&q=80" },
  { id: 702, restaurantId: 7, name: "Idli (4 pcs)", description: "Steamed rice cakes served with chutney and sambar.", price: 60, veg: true, rating: 4.2, section: "Recommended", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80" },
  { id: 703, restaurantId: 7, name: "Rava Dosa", description: "Thin, crispy semolina crepe, golden and light.", price: 100, veg: true, rating: 4.3, section: "South Indian", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&q=80" },
  { id: 704, restaurantId: 7, name: "Medu Vada", description: "Crispy fried lentil doughnuts, soft on the inside.", price: 70, veg: true, rating: 4.1, section: "South Indian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80" },
  { id: 705, restaurantId: 7, name: "Pongal", description: "Comforting rice and moong dal, tempered with ghee.", price: 80, veg: true, rating: 4.0, section: "South Indian", image: "https://images.unsplash.com/photo-1589301773859-1731758de908?w=500&q=80" },
  { id: 706, restaurantId: 7, name: "Filter Coffee", description: "Strong, frothy South Indian filter coffee.", price: 35, veg: true, rating: 4.5, section: "Beverages", image: "https://images.unsplash.com/photo-1621866103428-3b3dee2e1b02?w=500&q=80" },

  // Wok & Roll (8)
  { id: 801, restaurantId: 8, name: "Veg Fried Rice", description: "Wok-tossed rice with crisp vegetables and soy.", price: 160, veg: true, rating: 4.2, section: "Recommended", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80" },
  { id: 802, restaurantId: 8, name: "Chicken Noodles", description: "Stir-fried noodles tossed with chicken and veggies.", price: 190, veg: false, rating: 4.4, section: "Main Course", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80" },
  { id: 803, restaurantId: 8, name: "Veg Manchurian", description: "Deep-fried veg balls tossed in a tangy sauce.", price: 170, veg: true, rating: 4.1, section: "Starters", image: "https://images.unsplash.com/photo-1626082927389-6cd097cee6a6?w=500&q=80" },
  { id: 804, restaurantId: 8, name: "Chilli Chicken", description: "Spicy, sticky Indo-Chinese chilli chicken.", price: 220, veg: false, rating: 4.5, section: "Starters", image: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=500&q=80" },
  { id: 805, restaurantId: 8, name: "Spring Rolls", description: "Crispy rolls stuffed with fresh vegetables.", price: 130, veg: true, rating: 4.0, section: "Starters", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80" },
  { id: 806, restaurantId: 8, name: "Lemon Iced Tea", description: "Chilled tea with a zesty citrus twist.", price: 70, veg: true, rating: 4.1, section: "Beverages", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=500&q=80" },

  // Sweet Treats (9)
  { id: 901, restaurantId: 9, name: "Chocolate Brownie", description: "Rich, fudgy brownie with molten chocolate chunks.", price: 110, veg: true, rating: 4.6, section: "Recommended", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" },
  { id: 902, restaurantId: 9, name: "Vanilla Ice Cream", description: "Classic creamy vanilla bean ice cream.", price: 80, veg: true, rating: 4.3, section: "Desserts", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80" },
  { id: 903, restaurantId: 9, name: "Red Velvet Cake", description: "Soft red velvet slice with cream cheese frosting.", price: 140, veg: true, rating: 4.5, section: "Desserts", image: "https://images.unsplash.com/photo-1586985289906-406988974504?w=500&q=80" },
  { id: 904, restaurantId: 9, name: "Choco Lava Cake", description: "Warm cake with a gooey molten chocolate center.", price: 120, veg: true, rating: 4.7, section: "Desserts", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80" },
  { id: 905, restaurantId: 9, name: "Fresh Lime Soda", description: "Sweet and tangy fizzy lime refresher.", price: 60, veg: true, rating: 4.2, section: "Beverages", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80" },

  // Punjabi Tadka (10)
  { id: 1001, restaurantId: 10, name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken.", price: 260, veg: false, rating: 4.7, section: "Recommended", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80" },
  { id: 1002, restaurantId: 10, name: "Paneer Butter Masala", description: "Soft paneer cubes in a rich, buttery gravy.", price: 220, veg: true, rating: 4.5, section: "Main Course", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80" },
  { id: 1003, restaurantId: 10, name: "Dal Makhani", description: "Slow-simmered black lentils finished with cream.", price: 180, veg: true, rating: 4.4, section: "Main Course", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80" },
  { id: 1004, restaurantId: 10, name: "Tandoori Chicken", description: "Char-grilled chicken marinated in yogurt and spices.", price: 280, veg: false, rating: 4.6, section: "Starters", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80" },
  { id: 1005, restaurantId: 10, name: "Butter Naan", description: "Soft tandoori bread brushed with butter.", price: 45, veg: true, rating: 4.3, section: "Main Course", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&q=80" },
  { id: 1006, restaurantId: 10, name: "Lassi", description: "Thick, sweet, chilled yogurt-based drink.", price: 70, veg: true, rating: 4.4, section: "Beverages", image: "https://images.unsplash.com/photo-1626200926749-7d99c6f1f1a0?w=500&q=80" }
];

/* ---------- Offers (shown on the homepage) ---------- */
const offers = [
  {
    title: "50% OFF",
    description: "On your favorite meals, every weekend.",
    code: "WEEKEND50",
    icon: "fa-solid fa-tags",
    theme: "orange"
  },
  {
    title: "Free Delivery",
    description: "On orders above ₹299, all day long.",
    code: "FREESHIP",
    icon: "fa-solid fa-truck-fast",
    theme: "green"
  },
  {
    title: "20% OFF",
    description: "On your first order with Foodie.",
    code: "WELCOME20",
    icon: "fa-solid fa-gift",
    theme: "purple"
  }
];

/* ---------- Coupons (used in the cart) ---------- */
const coupons = {
  FOODIE10: { type: "percent", value: 10, minOrder: 0, description: "10% off on your order" },
  WELCOME50: { type: "flat", value: 50, minOrder: 300, description: "₹50 off on orders above ₹300" }
};

/* ---------- Helper lookups ---------- */
function getRestaurantById(id) {
  return restaurants.find(r => r.id === Number(id));
}

function getMenuByRestaurantId(id) {
  return menuItems.filter(m => m.restaurantId === Number(id));
}

function getMenuItemById(id) {
  return menuItems.find(m => m.id === Number(id));
}
