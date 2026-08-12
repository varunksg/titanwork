const products = [
  {
    id: 1,
    name: "Minimalist Backpack",
    description: "Lightweight carry for everyday work, travel, and commuting.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    description: "Crisp audio, comfortable fit, and all-day battery life.",
    price: 59.0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Ceramic Mug Set",
    description: "A modern set of durable mugs for coffee or tea rituals.",
    price: 34.5,
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Smart Desk Lamp",
    description: "Adjustable warm light with wireless charging base.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Cozy Throw Blanket",
    description: "Soft, breathable fabric for living room or bedroom comfort.",
    price: 42.0,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Everyday Sunglasses",
    description: "UV protection with a modern matte frame.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
];

const productGrid = document.getElementById("productGrid");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");

const cart = new Map();

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function renderProducts() {
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span>${formatPrice(product.price)}</span>
          <button class="button button-primary">Add to cart</button>
        </div>
      </div>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => addToCart(product));

    productGrid.appendChild(card);
  });
}

function addToCart(product) {
  const item = cart.get(product.id) || { ...product, quantity: 0 };
  item.quantity += 1;
  cart.set(product.id, item);
  updateCart();
  openCart();
}

function updateCart() {
  cartItemsEl.innerHTML = "";
  let count = 0;
  let total = 0;

  cart.forEach((item) => {
    count += item.quantity;
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <span>${item.quantity} × ${formatPrice(item.price)}</span>
      </div>
      <div>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
    `;

    cartItemsEl.appendChild(row);
  });

  cartCountEl.textContent = count;
  cartTotalEl.textContent = formatPrice(total);
}

function openCart() {
  cartDrawer.classList.add("visible");
  cartDrawer.classList.remove("hidden");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("visible");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);

renderProducts();
updateCart();
