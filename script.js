// Data Dummy Produk UMKM
const products = [
  { id: 1, name: "Keripik Singkong Pedas", price: 15000, category: "makanan", desc: "Keripik singkong renyah rasa pedas manis khas UMKM local." },
  { id: 2, name: "Kemeja Batik Solo", price: 120000, category: "pakaian", desc: "Kemeja batik katun berkualitas tinggi, nyaman dipakai." },
  { id: 3, name: "Tas Anyaman Bambu", price: 75000, category: "kerajinan", desc: "Tas ramah lingkungan buatan pengrajin lokal." },
  { id: 4, name: "Kopi Arabika 250g", price: 45000, category: "makanan", desc: "Biji kopi pilihan yang disangrai dengan presisi." }
];

let cart = [];

// Fungsi Navigasi Halaman
function showSection(sectionId) {
  const sections = ['home', 'products', 'product-detail', 'cart', 'checkout'];
  sections.forEach(id => {
    document.getElementById(`${id}-section`).classList.add('hidden');
  });

  if (sectionId === 'products') renderProducts(products);
  if (sectionId === 'cart') renderCart();
  if (sectionId === 'checkout') renderCheckoutTotal();

  document.getElementById(`${sectionId}-section`).classList.remove('hidden');
}

// Render Produk ke Halaman
function renderProducts(items) {
  const listContainer = document.getElementById('product-list');
  listContainer.innerHTML = '';

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Rp ${product.price.toLocaleString('id-ID')}</p>
      <button onclick="viewDetail(${product.id})">Detail Produk</button>
      <button class="btn-primary" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    listContainer.appendChild(card);
  });
}

// Fitur Search dan Filter Kategori
function filterProducts() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const categoryValue = document.getElementById('category-filter').value;

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchValue);
    const matchesCategory = categoryValue === 'all' || p.category === categoryValue;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

// Fitur Detail Produk
function viewDetail(productId) {
  const product = products.find(p => p.id === productId);
  const detailContainer = document.getElementById('product-detail');
  
  detailContainer.innerHTML = `
    <h2>${product.name}</h2>
    <p><strong>Kategori:</strong> ${product.category}</p>
    <p><strong>Harga:</strong> Rp ${product.price.toLocaleString('id-ID')}</p>
    <p><strong>Deskripsi:</strong> ${product.desc}</p>
    <br>
    <button class="btn-primary" onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
  `;
  
  showSection('product-detail');
}

// Fitur Keranjang Belanja
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, qty: 1 });
  }
  updateCartBadge();
  alert('Produk berhasil ditambahkan ke keranjang!');
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').innerText = totalCount;
}

function updateQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
  }
  updateCartBadge();
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
    checkoutBtn.disabled = true;
    document.getElementById('total-price').innerText = 'Rp 0';
    return;
  }

  checkoutBtn.disabled = false;
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.qty} = Rp ${itemTotal.toLocaleString('id-ID')}</p>
      </div>
      <div class="qty-controls">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  document.getElementById('total-price').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function renderCheckoutTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  document.getElementById('checkout-total').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Fitur Checkout Form
function processOrder(e) {
  e.preventDefault();
  alert('Terima kasih! Pesanan Anda telah diterima.');
  cart = [];
  updateCartBadge();
  document.getElementById('checkout-form').reset();
  showSection('home');
                                           }
