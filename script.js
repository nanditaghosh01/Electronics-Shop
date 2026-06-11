/* ============================================================
   NEXORA ELECTRONICS — app.js
   © 2026 Nandita Ghosh. All Rights Reserved.
   ============================================================ */

'use strict';

// ── STATE ─────────────────────────────────────────────────
let state = {
  currentPage: 'home',
  currentCategory: null,
  currentBrand: null,
  currentProduct: null,
  cart: [],
  wishlist: [],
  orders: [],
  sortBy: 'featured',
  filterPrice: 200000,
  filterBrands: [],
  filterRating: 0,
  deliveryMethod: 'standard',
  paymentMethod: 'upi',
  checkoutStep: 1,
};

// ── DATA ──────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'smartphones', name: 'Smartphones', icon: '📱', count: 142 },
  { id: 'laptops',     name: 'Laptops',     icon: '💻', count: 86  },
  { id: 'audio',       name: 'Audio',       icon: '🎧', count: 78  },
  { id: 'gaming',      name: 'Gaming',      icon: '🎮', count: 65  },
  { id: 'tablets',     name: 'Tablets',     icon: '📟', count: 44  },
  { id: 'watches',     name: 'Smart Watches',icon: '⌚', count: 53  },
  { id: 'cameras',     name: 'Cameras',     icon: '📷', count: 38  },
  { id: 'accessories', name: 'Accessories', icon: '🔌', count: 210 },
];

const BRANDS_BY_CATEGORY = {
  smartphones: ['Apple','Samsung','OnePlus','Nothing','Google','Xiaomi','Realme','Motorola','Oppo','Vivo'],
  laptops:     ['Apple','Dell','HP','Lenovo','Asus','Acer','Microsoft','MSI','Razer','LG'],
  audio:       ['Sony','Bose','Apple','Sennheiser','JBL','Jabra','Nothing','OnePlus','Samsung','Skullcandy'],
  gaming:      ['Sony','Microsoft','Razer','Logitech','Corsair','SteelSeries','HyperX','Asus ROG','Alienware','Acer Predator'],
  tablets:     ['Apple','Samsung','Lenovo','Microsoft','Xiaomi','Realme','OnePlus','Amazon','Huawei','TCL'],
  watches:     ['Apple','Samsung','Garmin','Fitbit','OnePlus','Noise','boAt','Amazfit','Fossil','Titan'],
  cameras:     ['Sony','Canon','Nikon','Fujifilm','Panasonic','Olympus','Leica','GoPro','DJI','Insta360'],
  accessories: ['Anker','Belkin','Apple','Samsung','OnePlus','boAt','Mi','JBL','Logitech','HyperX'],
};

const PRODUCTS = [
  // Smartphones
  { id:'p001', name:'iPhone 16 Pro', brand:'Apple', category:'smartphones', price:134900, originalPrice:149900, discount:10, rating:4.8, reviews:2341, badge:'New', stock:true, emoji:'📱', specs:'A18 Pro · 6.3" ProMotion · 48MP', desc:'The most powerful iPhone ever. Titanium design, A18 Pro chip, and a revolutionary camera system.' },
  { id:'p002', name:'iPhone 16',     brand:'Apple', category:'smartphones', price:79900, originalPrice:89900, discount:11, rating:4.7, reviews:1842, badge:'Hot', stock:true, emoji:'📱', specs:'A18 · 6.1" OLED · 48MP', desc:'Supercharged by A18, iPhone 16 brings Camera Control, longer battery, and vibrant colors.' },
  { id:'p003', name:'iPhone 15 Pro Max', brand:'Apple', category:'smartphones', price:159900, originalPrice:179900, discount:11, rating:4.9, reviews:3102, badge:'', stock:true, emoji:'📱', specs:'A17 Pro · 6.7" ProMotion · 48MP', desc:'Titanium. A17 Pro. Action button. A ridiculously powerful camera.' },
  { id:'p004', name:'Samsung Galaxy S25 Ultra', brand:'Samsung', category:'smartphones', price:129999, originalPrice:149999, discount:13, rating:4.8, reviews:1765, badge:'New', stock:true, emoji:'📱', specs:'Snapdragon 8 Elite · 6.9" QHD · 200MP S Pen', desc:'Galaxy AI meets the pro-grade camera of S25 Ultra with embedded S Pen.' },
  { id:'p005', name:'Samsung Galaxy S25+', brand:'Samsung', category:'smartphones', price:99999, originalPrice:109999, discount:9, rating:4.7, reviews:1122, badge:'', stock:true, emoji:'📱', specs:'Snapdragon 8 Elite · 6.7" AMOLED · 50MP', desc:'Galaxy S25+ balances powerful performance with a refined premium design.' },
  { id:'p006', name:'OnePlus 13', brand:'OnePlus', category:'smartphones', price:69999, originalPrice:74999, discount:7, rating:4.6, reviews:987, badge:'', stock:true, emoji:'📱', specs:'Snapdragon 8 Elite · 6.82" 120Hz · 50MP Hasselblad', desc:'OnePlus 13 redefines speed with Snapdragon 8 Elite and Hasselblad-tuned optics.' },
  { id:'p007', name:'Nothing Phone (3)', brand:'Nothing', category:'smartphones', price:59999, originalPrice:64999, discount:8, rating:4.5, reviews:743, badge:'New', stock:true, emoji:'📱', specs:'Snapdragon 8s Gen 3 · 6.7" AMOLED · Glyph Interface', desc:'Unique, transparent design with iconic Glyph Interface and clean OS of Nothing.' },
  { id:'p008', name:'Google Pixel 9 Pro', brand:'Google', category:'smartphones', price:109999, originalPrice:119999, discount:8, rating:4.7, reviews:1034, badge:'', stock:true, emoji:'📱', specs:'Google Tensor G4 · 6.3" LTPO · 50MP', desc:'Best Google camera experience. Pure Android. Gemini AI built-in.' },
  // Laptops
  { id:'p009', name:'MacBook Air M4', brand:'Apple', category:'laptops', price:114900, originalPrice:124900, discount:8, rating:4.9, reviews:2109, badge:'New', stock:true, emoji:'💻', specs:'M4 chip · 13.6" Liquid Retina · 16GB RAM', desc:'The best thin-and-light laptop ever. Blazing M4 performance, 18-hour battery.' },
  { id:'p010', name:'MacBook Pro 16" M4 Pro', brand:'Apple', category:'laptops', price:249900, originalPrice:269900, discount:7, rating:4.9, reviews:1456, badge:'', stock:true, emoji:'💻', specs:'M4 Pro · 16.2" Liquid Retina XDR · 24GB', desc:'Pro-level performance for demanding workflows. Incredible display, MagSafe, HDMI.' },
  { id:'p011', name:'Dell XPS 15 (2026)', brand:'Dell', category:'laptops', price:179900, originalPrice:199900, discount:10, rating:4.7, reviews:876, badge:'', stock:true, emoji:'💻', specs:'Intel Core Ultra 9 · 15.6" OLED · 32GB', desc:'Iconic XPS design meets next-gen Intel performance. Stunning OLED display.' },
  { id:'p012', name:'Razer Blade 16', brand:'Razer', category:'laptops', price:289999, originalPrice:319999, discount:9, rating:4.6, reviews:543, badge:'Gaming', stock:true, emoji:'💻', specs:'RTX 5080 · 16" QHD 240Hz · Intel Core Ultra 9', desc:'The ultimate gaming laptop. RTX 5080 power in an impossibly thin chassis.' },
  // Audio
  { id:'p013', name:'Sony WH-1000XM6', brand:'Sony', category:'audio', price:34990, originalPrice:39990, discount:13, rating:4.9, reviews:3421, badge:'Best Seller', stock:true, emoji:'🎧', specs:'ANC · 30hr battery · LDAC · Speak-to-Chat', desc:'Industry-leading noise cancelling. Crystal clear calls. 30 hours of music.' },
  { id:'p014', name:'AirPods Pro (3rd Gen)', brand:'Apple', category:'audio', price:24900, originalPrice:26900, discount:7, rating:4.8, reviews:4102, badge:'New', stock:true, emoji:'🎧', specs:'H2 chip · Active ANC · Adaptive Audio · MagSafe', desc:'Unreal sound with Personalized Spatial Audio and Transparency mode.' },
  { id:'p015', name:'Bose QuietComfort Ultra', brand:'Bose', category:'audio', price:32900, originalPrice:36900, discount:11, rating:4.8, reviews:2134, badge:'', stock:true, emoji:'🎧', specs:'Immersive Audio · 24hr · CustomTune · USB-C', desc:'Bose CustomTune technology tunes sound to your ear shape. Immersive audio.' },
  { id:'p016', name:'Nothing Ear (2)', brand:'Nothing', category:'audio', price:8999, originalPrice:9999, discount:10, rating:4.4, reviews:1876, badge:'', stock:true, emoji:'🎧', specs:'11mm driver · ANC · LHDC 5.0 · IP54', desc:'High-fidelity audio with ear-tip fit test and ChatGPT shortcut.' },
  // Gaming
  { id:'p017', name:'PlayStation 5 Pro', brand:'Sony', category:'gaming', price:62990, originalPrice:69990, discount:10, rating:4.9, reviews:5432, badge:'Hot', stock:true, emoji:'🎮', specs:'Custom AMD · 2TB SSD · 8K · Ray Tracing · PlayStation Spectral Super Resolution', desc:'The most powerful PlayStation ever. Stunning visuals and lightning-fast SSD.' },
  { id:'p018', name:'Xbox Series X', brand:'Microsoft', category:'gaming', price:49990, originalPrice:54990, discount:9, rating:4.8, reviews:3241, badge:'', stock:true, emoji:'🎮', specs:'Custom AMD Zen 2 · 1TB NVMe · 120fps · Xbox Game Pass', desc:'The fastest, most powerful Xbox ever. True 4K gaming at 120fps.' },
  { id:'p019', name:'Razer DeathAdder V3 Pro', brand:'Razer', category:'gaming', price:12999, originalPrice:14999, discount:13, rating:4.7, reviews:1243, badge:'', stock:true, emoji:'🖱️', specs:'Focus Pro 30K · 90hr · HyperSpeed Wireless', desc:'Ergonomic wireless mouse. 30K DPI optical sensor. Ultra-light 64g.' },
  { id:'p020', name:'Logitech G Pro X Superlight 2', brand:'Logitech', category:'gaming', price:13499, originalPrice:15499, discount:13, rating:4.8, reviews:987, badge:'', stock:true, emoji:'🖱️', specs:'HERO 25K · 95hr · 60g · LIGHTSPEED wireless', desc:'Designed with pro esports players. Ultra-light 60g, HERO 25K sensor.' },
  // Tablets
  { id:'p021', name:'iPad Pro M4 13"', brand:'Apple', category:'tablets', price:149900, originalPrice:159900, discount:6, rating:4.9, reviews:1876, badge:'New', stock:true, emoji:'📟', specs:'M4 chip · 13" Ultra Retina XDR · OLED · Apple Pencil Pro', desc:'Impossibly thin at 5.1mm. M4 power. Stunning tandem OLED display.' },
  { id:'p022', name:'Samsung Galaxy Tab S10 Ultra', brand:'Samsung', category:'tablets', price:109999, originalPrice:119999, discount:8, rating:4.8, reviews:1234, badge:'', stock:true, emoji:'📟', specs:'Snapdragon 8 Gen 3 · 14.6" Super AMOLED · S Pen', desc:'The ultimate Android tablet. 14.6" display, Galaxy AI, DeX mode.' },
  { id:'p023', name:'Microsoft Surface Pro 11', brand:'Microsoft', category:'tablets', price:139900, originalPrice:149900, discount:7, rating:4.6, reviews:876, badge:'', stock:true, emoji:'📟', specs:'Snapdragon X Plus · 13" OLED · Copilot+ PC', desc:'A full Windows PC in tablet form. Copilot+ AI features built in.' },
  // Smart Watches
  { id:'p024', name:'Apple Watch Series 10', brand:'Apple', category:'watches', price:44900, originalPrice:49900, discount:10, rating:4.8, reviews:3421, badge:'New', stock:true, emoji:'⌚', specs:'S10 SiP · 46mm · Always-On · ECG · crash detection', desc:'Thinnest Apple Watch ever. Sleep apnea detection. 18-hour battery.' },
  { id:'p025', name:'Samsung Galaxy Watch 7', brand:'Samsung', category:'watches', price:34999, originalPrice:39999, discount:13, rating:4.7, reviews:2134, badge:'', stock:true, emoji:'⌚', specs:'Exynos W1000 · 44mm · BioActive Sensor · Google Pixel', desc:'Next-gen health monitoring. Advanced sleep coaching. Ultra-bright display.' },
  { id:'p026', name:'Garmin Fenix 8 Solar', brand:'Garmin', category:'watches', price:89990, originalPrice:99990, discount:10, rating:4.9, reviews:1102, badge:'', stock:true, emoji:'⌚', specs:'Solar charging · 16-day battery · built-in maps · multi-sport', desc:'The ultimate adventure watch. Solar charging, Amoled display, all-activity tracking.' },
  // Cameras
  { id:'p027', name:'Sony A7R VI', brand:'Sony', category:'cameras', price:289990, originalPrice:319990, discount:9, rating:4.9, reviews:876, badge:'', stock:true, emoji:'📷', specs:'61MP · AI autofocus · 8K video · 5-axis IBIS', desc:'Resolution king with AI Subject Recognition. Perfect for landscape and studio pros.' },
  { id:'p028', name:'Canon EOS R8', brand:'Canon', category:'cameras', price:139990, originalPrice:149990, discount:7, rating:4.7, reviews:654, badge:'', stock:true, emoji:'📷', specs:'24.2MP · RF mount · Dual Pixel AF · 4K 60fps', desc:'Full-frame mirrorless at entry-level price. Exceptional Dual Pixel autofocus.' },
  { id:'p029', name:'DJI Osmo Pocket 3', brand:'DJI', category:'cameras', price:44990, originalPrice:49990, discount:10, rating:4.8, reviews:1432, badge:'Best Seller', stock:true, emoji:'📷', specs:'1" CMOS · 4K 120fps · 3-axis gimbal · 2hr battery', desc:'Pocket-sized cinema. 1-inch sensor, stunning stabilization, creator-ready.' },
  // Accessories
  { id:'p030', name:'Anker 727 Charging Station', brand:'Anker', category:'accessories', price:5999, originalPrice:6999, discount:14, rating:4.6, reviews:2341, badge:'', stock:true, emoji:'🔌', specs:'140W · 4 USB-C · 2 USB-A · GaN technology', desc:'Power 6 devices simultaneously with GaN technology. 140W total output.' },
  { id:'p031', name:'Apple MagSafe Charger (USB-C)', brand:'Apple', category:'accessories', price:3900, originalPrice:4500, discount:13, rating:4.5, reviews:1876, badge:'', stock:true, emoji:'🔌', specs:'15W · MagSafe · 1m cable · USB-C connector', desc:'Fast wireless charging for MagSafe-compatible iPhone and accessories.' },
  { id:'p032', name:'Logitech MX Keys Mini', brand:'Logitech', category:'accessories', price:8495, originalPrice:9495, discount:11, rating:4.7, reviews:1234, badge:'', stock:true, emoji:'⌨️', specs:'Backlit · Bluetooth · USB-C · Windows & Mac', desc:'Compact, comfortable keyboard for creators. Easy-Switch between 3 devices.' },
];

const FAQS = [
  { q:'How do I track my order?', a:'Go to My Orders and click "Track" on any order. You\'ll see real-time updates on your delivery status.' },
  { q:'What is your return policy?', a:'We offer a 10-day hassle-free return policy on all products. Items must be in original condition with all accessories.' },
  { q:'Are all products genuine?', a:'Yes! Nexora is an authorized reseller for all listed brands. Every product comes with a manufacturer warranty.' },
  { q:'How long does delivery take?', a:'Standard delivery takes 5–7 business days. Express (2–3 days) and Same Day options are also available at checkout.' },
  { q:'What payment methods do you accept?', a:'We accept UPI, Credit/Debit Cards, Net Banking, EMI, major Wallets, and Cash on Delivery.' },
  { q:'How do I cancel an order?', a:'Orders can be cancelled within 1 hour of placement from the My Orders page. After that, contact our support team.' },
  { q:'Is there a warranty on products?', a:'All products carry the manufacturer\'s standard warranty. Extended warranty plans are available at checkout.' },
  { q:'Can I change my delivery address?', a:'You can update the delivery address before your order is shipped. Contact support immediately after placing the order.' },
];

const MARQUEE_ITEMS = ['Free Shipping on ₹499+','10-Day Easy Returns','100% Genuine Products','24/7 Customer Support','500+ Premium Products','50+ Top Brands','Secure Payments','Same Day Delivery Available','No-Cost EMI Available','2M+ Happy Customers'];

// ── STORAGE ───────────────────────────────────────────────
function saveState() {
  try {
    localStorage.setItem('nexora_cart', JSON.stringify(state.cart));
    localStorage.setItem('nexora_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('nexora_orders', JSON.stringify(state.orders));
  } catch(e) {}
}
function loadState() {
  try {
    const c = localStorage.getItem('nexora_cart');
    const w = localStorage.getItem('nexora_wishlist');
    const o = localStorage.getItem('nexora_orders');
    if(c) state.cart = JSON.parse(c);
    if(w) state.wishlist = JSON.parse(w);
    if(o) state.orders = JSON.parse(o);
  } catch(e) {}
}

// ── NAVIGATION ────────────────────────────────────────────
function navigate(page, params = {}) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: isMobile() ? 'auto' : 'smooth'
  });

  state.currentPage = page;

  // Special routing
  if (page === 'category') {
    state.currentCategory = params.category || state.currentCategory;
    renderCategoryPage();
    show('page-category');
  } else if (page === 'products') {
    state.currentCategory = params.category || state.currentCategory;
    state.currentBrand    = params.brand    || null;
    renderPLP();
    show('page-products');
  } else if (page === 'product') {
    state.currentProduct = params.id || state.currentProduct;
    renderPDP();
    show('page-product');
  } else if (page === 'tracking') {
    renderTracking(params.orderId);
    show('page-tracking');
  } else {
    show('page-' + page);
  }

  // Page-specific renders
  if (page === 'home')       renderHome();
  if (page === 'categories') renderCategoriesPage();
  if (page === 'cart')       renderCart();
  if (page === 'wishlist')   renderWishlist();
  if (page === 'checkout')   { state.checkoutStep = 1; renderCheckout(); }
  if (page === 'orders')     renderOrders();
  if (page === 'profile')    renderProfile();
  if (page === 'faq')        renderFAQ();

  updateBadges();
}

function show(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ── CURSOR ────────────────────────────────────────────────
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // dot follows instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animate() {
    // smooth follow (lerp)
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animate);
  }

  animate();
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️', cart:'🛒', wish:'🤍' };
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]||icons.info}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(t);
  t.addEventListener('click', () => t.remove());
  setTimeout(() => t.remove(), 3500);
}

// ── BADGES ────────────────────────────────────────────────
function updateBadges() {
  const cb = document.getElementById('cartBadge');
  const wb = document.getElementById('wishlistBadge');
  const cartCount = state.cart.reduce((a,i) => a + i.qty, 0);
  cb.textContent = cartCount;
  cb.style.display = cartCount > 0 ? 'flex' : 'none';
  wb.textContent = state.wishlist.length;
  wb.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
}

// ── NAVBAR SCROLL ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── MARQUEE ───────────────────────────────────────────────
function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  track.innerHTML = doubled.map(t => `
    <div class="marquee-item">
      <span class="marquee-dot"></span>
      <span>${t}</span>
    </div>`).join('');
}

// ── DEAL TIMER ────────────────────────────────────────────
function initTimer() {
  let end = Date.now() + (8*3600 + 32*60 + 47) * 1000;
  setInterval(() => {
    let diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const h = String(Math.floor(diff/3600)).padStart(2,'0');
    const m = String(Math.floor((diff%3600)/60)).padStart(2,'0');
    const s = String(diff%60).padStart(2,'0');
    const hEl = document.getElementById('timerH');
    const mEl = document.getElementById('timerM');
    const sEl = document.getElementById('timerS');
    if(hEl) hEl.textContent = h;
    if(mEl) mEl.textContent = m;
    if(sEl) sEl.textContent = s;
  }, 1000);
}

// ── SEARCH ────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('globalSearch');
  const dropdown = document.getElementById('searchDropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.remove('open'); return; }
    const results = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);
    if (!results.length) { dropdown.classList.remove('open'); return; }
    dropdown.innerHTML = results.map(p => `
      <div class="search-item" onclick="navigate('product',{id:'${p.id}'});document.getElementById('globalSearch').value='';document.getElementById('searchDropdown').classList.remove('open')">
        <span class="search-item-icon">${p.emoji}</span>
        <div>
          <div class="search-item-name">${p.name}</div>
          <div class="search-item-cat">${p.brand} · ${formatPrice(p.price)}</div>
        </div>
      </div>`).join('');
    dropdown.classList.add('open');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search-wrap')) {
      dropdown.classList.remove('open');
    }
  });
}

// ── HELPERS ───────────────────────────────────────────────
function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function starsHTML(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
function isMobile() {
  return window.innerWidth <= 768;
}

function productCardHTML(p, showRemove = false) {
  const inWish = state.wishlist.some(w => w.id === p.id);
  return `
  <div class="product-card" onclick="navigate('product',{id:'${p.id}'})">
    <div class="product-img-wrap">
      <span class="product-img-placeholder">${p.emoji}</span>
      ${p.badge ? `<div class="product-badge"><span class="tag tag-purple">${p.badge}</span></div>` : ''}
      <button class="product-wishlist-btn ${inWish?'active':''}" onclick="toggleWishlist(event,'${p.id}')">${inWish?'❤️':'🤍'}</button>
    </div>
    <div class="product-info">
      <div class="product-brand">${p.brand}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-specs">${p.specs}</div>
      <div class="rating">
        <span class="stars">${starsHTML(p.rating)}</span>
        <span class="rating-count">(${p.reviews.toLocaleString()})</span>
      </div>
      <div class="product-footer">
        <div>
          <div class="price-wrap">
            <span class="price-current">${formatPrice(p.price)}</span>
            <span class="price-original">${formatPrice(p.originalPrice)}</span>
          </div>
          <span class="price-discount">${p.discount}% off</span>
        </div>
        <button class="quick-add-btn" onclick="addToCart(event,'${p.id}')">+ Cart</button>
      </div>
    </div>
  </div>`;
}

// ── HOME PAGE ─────────────────────────────────────────────
function renderHome() {
  // Category grid
  const catGrid = document.getElementById('homeCatGrid');
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(c => `
      <div class="cat-card" onclick="navigate('category',{category:'${c.id}'})">
        <div class="cat-icon">${c.icon}</div>
        <div class="cat-name">${c.name}</div>
        <div class="cat-count">${c.count} products</div>
      </div>`).join('');
  }
  // Featured products (first 8)
  const featGrid = document.getElementById('featuredGrid');
  if (featGrid) {
    featGrid.innerHTML = PRODUCTS.slice(0, 8).map(p => productCardHTML(p)).join('');
  }
  // Deals grid (discounted products)
  const dealsGrid = document.getElementById('dealsGrid');
  if (dealsGrid) {
    const deals = [...PRODUCTS].sort((a,b) => b.discount - a.discount).slice(0, 4);
    dealsGrid.innerHTML = deals.map(p => productCardHTML(p)).join('');
  }
}

// ── CATEGORIES PAGE ───────────────────────────────────────
function renderCategoriesPage() {
  const grid = document.getElementById('catBigGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-big-card" onclick="navigate('category',{category:'${c.id}'})">
      <div class="cat-big-icon">${c.icon}</div>
      <div class="cat-big-name">${c.name}</div>
      <div class="cat-big-count">${c.count} products</div>
      <div class="cat-big-brands">
        ${(BRANDS_BY_CATEGORY[c.id]||[]).slice(0,4).map(b=>`<span class="cat-big-brand-tag">${b}</span>`).join('')}
      </div>
    </div>`).join('');
}

// ── CATEGORY (BRANDS) PAGE ────────────────────────────────
function renderCategoryPage() {
  const cat = CATEGORIES.find(c => c.id === state.currentCategory);
  if (!cat) return;
  document.getElementById('catPageTitle').textContent = cat.name;
  document.getElementById('catPageSub').textContent = `${cat.count} products · Select a brand`;
  document.getElementById('catBreadcrumb').innerHTML = breadcrumb([
    {label:'Home', page:'home'}, {label:'Categories', page:'categories'}, {label:cat.name}
  ]);
  const brands = BRANDS_BY_CATEGORY[cat.id] || [];
  document.getElementById('brandGrid').innerHTML = brands.map(b => `
    <div class="brand-card" onclick="navigate('products',{category:'${cat.id}',brand:'${b}'})">
      <div class="brand-logo-wrap">${b[0]}</div>
      <div class="brand-name">${b}</div>
      <div class="brand-count">${PRODUCTS.filter(p=>p.brand===b&&p.category===state.currentCategory).length} products</div>
    </div>`).join('');
}

// ── PLP ───────────────────────────────────────────────────
let currentSortKey = 'featured';

function renderPLP() {
  const cat   = CATEGORIES.find(c => c.id === state.currentCategory);
  const catName = cat ? cat.name : 'Products';
  document.getElementById('plpBreadcrumb').innerHTML = breadcrumb([
    {label:'Home', page:'home'},
    {label:'Categories', page:'categories'},
    {label:catName, page:'category', params:{category:state.currentCategory}},
    ...(state.currentBrand ? [{label:state.currentBrand}] : []),
  ]);

  // Build brand filter
  const brandSet = new Set(
    PRODUCTS.filter(p => p.category === state.currentCategory || state.currentCategory === 'all')
            .map(p => p.brand)
  );
  document.getElementById('brandFilterList').innerHTML = [...brandSet].map(b => `
    <label class="filter-option">
      <input type="checkbox" value="${b}" onchange="toggleBrandFilter('${b}')" ${state.filterBrands.includes(b)?'checked':''} />
      ${b}
    </label>`).join('');

  filterProducts();
}

function filterProducts() {
  const priceSlider = document.getElementById('priceRange');
  state.filterPrice = priceSlider ? parseInt(priceSlider.value) : 200000;
  const priceLabel = document.getElementById('priceRangeVal');
  if(priceLabel) priceLabel.textContent = `Up to ${formatPrice(state.filterPrice)}`;
  const ratingEl = document.querySelector('input[name="ratingFilter"]:checked');
  state.filterRating = ratingEl ? parseFloat(ratingEl.value) : 0;

  let products = PRODUCTS.filter(p => {
    if (state.currentCategory && state.currentCategory !== 'all' && p.category !== state.currentCategory) return false;
    if (state.currentBrand && p.brand !== state.currentBrand) return false;
    if (p.price > state.filterPrice) return false;
    if (state.filterBrands.length && !state.filterBrands.includes(p.brand)) return false;
    if (p.rating < state.filterRating) return false;
    return true;
  });

  // Sort
  if (currentSortKey === 'price-asc')  products = [...products].sort((a,b) => a.price - b.price);
  if (currentSortKey === 'price-desc') products = [...products].sort((a,b) => b.price - a.price);
  if (currentSortKey === 'rating')     products = [...products].sort((a,b) => b.rating - a.rating);

  document.getElementById('plpResultCount').textContent = `Showing ${products.length} product${products.length!==1?'s':''}`;
  document.getElementById('plpGrid').innerHTML = products.length
    ? products.map(p => productCardHTML(p)).join('')
    : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><div class="empty-title">No products found</div><div class="empty-sub">Try adjusting your filters</div></div>`;
}

function toggleBrandFilter(brand) {
  const idx = state.filterBrands.indexOf(brand);
  if (idx > -1) state.filterBrands.splice(idx,1);
  else state.filterBrands.push(brand);
  filterProducts();
}

function clearFilters() {
  state.filterBrands = [];
  state.filterPrice  = 200000;
  state.filterRating = 0;
  const slider = document.getElementById('priceRange');
  if(slider) slider.value = 200000;
  document.querySelectorAll('#brandFilterList input').forEach(i => i.checked = false);
  const radioAll = document.querySelector('input[name="ratingFilter"][value="0"]');
  if(radioAll) radioAll.checked = true;
  filterProducts();
}

function setSortChip(el, key) {
  document.querySelectorAll('.sort-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  currentSortKey = key;
  filterProducts();
}

// ── PDP ───────────────────────────────────────────────────
function renderPDP() {
  const p = PRODUCTS.find(x => x.id === state.currentProduct);
  if (!p) return;
  const inWish = state.wishlist.some(w => w.id === p.id);
  const inCart = state.cart.some(c => c.id === p.id);
  const cat = CATEGORIES.find(c => c.id === p.category);

  document.getElementById('pdpBreadcrumb').innerHTML = breadcrumb([
    {label:'Home', page:'home'},
    {label:'Categories', page:'categories'},
    {label: cat?cat.name:p.category, page:'category', params:{category:p.category}},
    {label:p.brand, page:'products', params:{category:p.category, brand:p.brand}},
    {label:p.name},
  ]);

  document.getElementById('pdpLayout').innerHTML = `
  <!-- Gallery -->
  <div class="pdp-gallery">
    <div class="pdp-main-img">
      <span style="font-size:10rem">${p.emoji}</span>
      <div class="pdp-zoom-badge">🔍 Click to zoom</div>
    </div>
    <div class="pdp-thumbs">
      ${[p.emoji, p.emoji, p.emoji, p.emoji].map((e,i) => `
        <div class="pdp-thumb ${i===0?'active':''}" onclick="selectThumb(this)">${e}</div>`).join('')}
    </div>
  </div>

  <!-- Info -->
  <div class="pdp-info">
    <div class="pdp-eyebrow">
      <span class="pdp-brand">${p.brand}</span>
      ${p.badge ? `<span class="tag tag-purple">${p.badge}</span>` : ''}
      ${p.stock ? '<span class="tag tag-green">In Stock</span>' : '<span style="color:#ff6060;font-size:0.8rem;font-weight:600">Out of Stock</span>'}
    </div>
    <h1 class="pdp-title">${p.name}</h1>
    <div class="pdp-rating-row">
      <div class="rating">
        <span class="stars">${starsHTML(p.rating)}</span>
        <span class="rating-count">${p.rating}</span>
      </div>
      <div class="pdp-divider"></div>
      <span class="pdp-review-count">${p.reviews.toLocaleString()} reviews</span>
      <div class="pdp-divider"></div>
      <span class="pdp-stock-in">✓ In Stock</span>
    </div>

    <div class="pdp-price-section">
      <div class="pdp-price-big">${formatPrice(p.price)}</div>
      <div class="price-wrap">
        <span class="price-original">${formatPrice(p.originalPrice)}</span>
        <span class="price-discount">You save ${formatPrice(p.originalPrice - p.price)} (${p.discount}%)</span>
      </div>
      <div class="pdp-emi">EMI from <span>${formatPrice(Math.round(p.price/12))}/month</span> with no-cost EMI</div>
    </div>

    <div class="pdp-options">
      <div class="pdp-options-title">Quantity</div>
      <div class="pdp-qty-wrap" id="pdpQtyWrap">
        <button class="pdp-qty-btn" onclick="pdpQty(-1)">−</button>
        <span class="pdp-qty-val" id="pdpQtyVal">1</span>
        <button class="pdp-qty-btn" onclick="pdpQty(1)">+</button>
      </div>
    </div>

    <div class="pdp-actions">
      <div class="pdp-action-row">
        <button class="btn btn-primary" style="flex:1" onclick="addToCartFromPDP('${p.id}')">
          ${inCart ? '✅ Added to Cart' : '🛒 Add to Cart'}
        </button>
        <button class="btn btn-secondary" onclick="toggleWishlistPDP('${p.id}')" id="pdpWishBtn">
          ${inWish ? '❤️ Wishlisted' : '🤍 Wishlist'}
        </button>
      </div>
      <button class="btn btn-ghost btn-full" onclick="buyNow('${p.id}')">⚡ Buy Now</button>
    </div>

    <div class="pdp-delivery">
      <div class="pdp-delivery-row">
        <span class="pdp-delivery-icon">🚚</span>
        <div><div class="pdp-delivery-title">Free Delivery</div><div class="pdp-delivery-sub">On orders above ₹499 · Estimated 5–7 days</div></div>
      </div>
      <div class="pdp-delivery-row">
        <span class="pdp-delivery-icon">🔄</span>
        <div><div class="pdp-delivery-title">10-Day Returns</div><div class="pdp-delivery-sub">Easy, hassle-free returns & exchanges</div></div>
      </div>
      <div class="pdp-delivery-row">
        <span class="pdp-delivery-icon">🛡️</span>
        <div><div class="pdp-delivery-title">1-Year Warranty</div><div class="pdp-delivery-sub">Manufacturer warranty included</div></div>
      </div>
    </div>

    <div class="pdp-tabs">
      <div class="tab-nav">
        <button class="tab-btn active" onclick="switchTab(this,'desc')">Description</button>
        <button class="tab-btn" onclick="switchTab(this,'specs')">Specifications</button>
        <button class="tab-btn" onclick="switchTab(this,'reviews')">Reviews (${p.reviews.toLocaleString()})</button>
      </div>
      <div class="tab-panel active" id="tab-desc">
        <p style="color:var(--text-secondary);line-height:1.8;font-size:0.9rem">${p.desc}</p>
        <ul style="margin-top:16px;color:var(--text-secondary);font-size:0.88rem;line-height:2;list-style:disc;padding-left:20px">
          ${p.specs.split('·').map(s=>`<li>${s.trim()}</li>`).join('')}
        </ul>
      </div>
      <div class="tab-panel" id="tab-specs">
        <table class="spec-table">
          <tr><td>Brand</td><td>${p.brand}</td></tr>
          <tr><td>Model</td><td>${p.name}</td></tr>
          <tr><td>Category</td><td>${p.category}</td></tr>
          <tr><td>Key Specs</td><td>${p.specs}</td></tr>
          <tr><td>Stock Status</td><td>${p.stock ? 'In Stock' : 'Out of Stock'}</td></tr>
          <tr><td>Warranty</td><td>1 Year Manufacturer Warranty</td></tr>
          <tr><td>Return Policy</td><td>10 Days</td></tr>
          <tr><td>MRP</td><td>${formatPrice(p.originalPrice)}</td></tr>
          <tr><td>Nexora Price</td><td>${formatPrice(p.price)}</td></tr>
          <tr><td>Discount</td><td>${p.discount}%</td></tr>
        </table>
      </div>
      <div class="tab-panel" id="tab-reviews">
        ${generateReviews(p)}
      </div>
    </div>
  </div>
  `;

  // Related products
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  document.getElementById('relatedGrid').innerHTML = related.map(x => productCardHTML(x)).join('');
}

function generateReviews(p) {
  const reviewsData = [
    { name:'Priya S', rating:5, title:'Absolutely amazing product!', body:'Been using this for 3 months and it\'s exceeded every expectation. The build quality is exceptional and performance is top-notch.', date:'2 weeks ago' },
    { name:'Arjun M', rating:4, title:'Great value for money', body:'Solid product overall. Minor nitpicks but nothing that affects the experience. Would recommend to anyone looking for reliable performance.', date:'1 month ago' },
    { name:'Sneha R', rating:5, title:'Best purchase this year!', body:'Literally couldn\'t be happier. Delivered in 2 days, packaging was immaculate, and the product is flawless.', date:'3 weeks ago' },
  ];
  return reviewsData.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.name[0]}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
        <div class="stars" style="margin-left:auto">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      </div>
      <div class="review-title">${r.title}</div>
      <div class="review-body">${r.body}</div>
    </div>`).join('');
}

let pdpQtyValue = 1;
function pdpQty(d) {
  pdpQtyValue = Math.max(1, Math.min(10, pdpQtyValue + d));
  const el = document.getElementById('pdpQtyVal');
  if(el) el.textContent = pdpQtyValue;
}

function selectThumb(el) {
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function switchTab(btn, tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('tab-' + tab);
  if(panel) panel.classList.add('active');
}

// ── CART ──────────────────────────────────────────────────
function addToCart(event, id) {
  event.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const existing = state.cart.find(i => i.id === id);
  if(existing) existing.qty += 1;
  else state.cart.push({id, qty:1, price:p.price, name:p.name, brand:p.brand, emoji:p.emoji, originalPrice:p.originalPrice});
  saveState();
  updateBadges();
  showToast(`${p.name} added to cart`, 'cart');
}

function addToCartFromPDP(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const existing = state.cart.find(i => i.id === id);
  if(existing) existing.qty += pdpQtyValue;
  else state.cart.push({id, qty:pdpQtyValue, price:p.price, name:p.name, brand:p.brand, emoji:p.emoji, originalPrice:p.originalPrice});
  saveState();
  updateBadges();
  showToast(`${p.name} × ${pdpQtyValue} added to cart`, 'cart');
  navigate('cart');
}

function buyNow(id) {
  addToCart({stopPropagation:()=>{}}, id);
  navigate('checkout');
}

function renderCart() {
  const list   = document.getElementById('cartItemsList');
  const empty  = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');

  if (!state.cart.length) {
    list.innerHTML   = '';
    empty.style.display  = 'block';
    summary.style.display = 'none';
    return;
  }
  empty.style.display  = 'none';
  summary.style.display = 'block';

  list.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img"><span style="font-size:2.5rem">${item.emoji}</span></div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${formatPrice(item.price)} each</div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty('${item.id}',-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
    </div>`).join('');

  updateCartSummary();
}

function changeQty(id, d) {
  const item = state.cart.find(i => i.id === id);
  if(!item) return;
  item.qty = Math.max(1, item.qty + d);
  saveState(); updateBadges(); renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  saveState(); updateBadges(); renderCart();
  showToast('Item removed from cart', 'info');
}

function updateCartSummary() {
  const subtotal  = state.cart.reduce((a,i) => a + i.price * i.qty, 0);
  const origTotal = state.cart.reduce((a,i) => a + (i.originalPrice||i.price) * i.qty, 0);
  const discount  = origTotal - subtotal;
  const tax       = Math.round(subtotal * 0.18);
  const total     = subtotal + tax;

  const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  set('cartSubtotal', formatPrice(subtotal));
  set('cartDiscount', `−${formatPrice(discount)}`);
  set('cartDelivery', subtotal > 499 ? 'FREE' : formatPrice(99));
  set('cartTax', formatPrice(tax));
  set('cartTotal', formatPrice(total + (subtotal > 499 ? 0 : 99)));
}

function applyCoupon() {
  const val = document.getElementById('couponInput')?.value.toUpperCase();
  const codes = { 'NEXORA10':'10% off applied!', 'FIRST50':'₹50 off applied!', 'WELCOME':'Welcome discount applied!' };
  if(codes[val]) showToast(codes[val], 'success');
  else showToast('Invalid coupon code', 'error');
}

// ── WISHLIST ──────────────────────────────────────────────
function toggleWishlist(event, id) {
  event.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const idx = state.wishlist.findIndex(w => w.id === id);
  if(idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(`${p.name} removed from wishlist`, 'info');
  } else {
    state.wishlist.push({ id, name:p.name, brand:p.brand, price:p.price, emoji:p.emoji });
    showToast(`${p.name} saved to wishlist`, 'wish');
  }
  saveState(); updateBadges();
  // Refresh product cards
  document.querySelectorAll(`.product-wishlist-btn`).forEach(btn => {
    const card = btn.closest('.product-card');
    if(!card) return;
  });
}

function toggleWishlistPDP(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const idx = state.wishlist.findIndex(w => w.id === id);
  const btn = document.getElementById('pdpWishBtn');
  if(idx > -1) {
    state.wishlist.splice(idx,1);
    if(btn) btn.innerHTML = '🤍 Wishlist';
    showToast(`${p.name} removed from wishlist`, 'info');
  } else {
    state.wishlist.push({id, name:p.name, brand:p.brand, price:p.price, emoji:p.emoji});
    if(btn) btn.innerHTML = '❤️ Wishlisted';
    showToast(`${p.name} saved to wishlist`, 'wish');
  }
  saveState(); updateBadges();
}

function renderWishlist() {
  const grid  = document.getElementById('wishlistGrid');
  const empty = document.getElementById('wishlistEmpty');
  if(!state.wishlist.length) {
    grid.innerHTML = '';
    empty.style.display = 'block'; return;
  }
  empty.style.display = 'none';
  grid.innerHTML = state.wishlist.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if(!p) return '';
    return `
      <div class="wishlist-item">
        <button class="wishlist-remove" onclick="removeFromWishlist('${item.id}')">✕</button>
        ${productCardHTML(p)}
      </div>`;
  }).join('');
}

function removeFromWishlist(id) {
  state.wishlist = state.wishlist.filter(w => w.id !== id);
  saveState(); updateBadges(); renderWishlist();
}

// ── CHECKOUT ──────────────────────────────────────────────
function renderCheckout() {
  // Show step 1
  [1,2,3,4].forEach(n => {
    const panel = document.getElementById(`checkoutStep${n}`);
    if(panel) panel.style.display = n === 1 ? 'block' : 'none';
  });
  updateStepUI(1);
  updateCheckoutSummary();
}

function updateCheckoutSummary() {
  const subtotal  = state.cart.reduce((a,i) => a + i.price * i.qty, 0);
  const origTotal = state.cart.reduce((a,i) => a + (i.originalPrice||i.price)*i.qty, 0);
  const discount  = origTotal - subtotal;
  const delivery  = state.deliveryMethod === 'sameday' ? 199 : state.deliveryMethod === 'express' ? 99 : 0;
  const tax       = Math.round(subtotal * 0.18);
  const total     = subtotal + tax + delivery;

  const items = document.getElementById('checkoutSummaryItems');
  if(items) {
    items.innerHTML = state.cart.map(i => `
      <div class="summary-row" style="font-size:0.82rem">
        <span>${i.emoji} ${i.name} ×${i.qty}</span>
        <span>${formatPrice(i.price*i.qty)}</span>
      </div>`).join('');
  }
  const set = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set('coSubtotal', formatPrice(subtotal));
  set('coDiscount', `−${formatPrice(discount)}`);
  set('coDelivery', delivery > 0 ? formatPrice(delivery) : 'FREE');
  set('coTax', formatPrice(tax));
  set('coTotal', formatPrice(total));
}

function checkoutNext(step) {
  if(step === 2) {
    // Basic validation
    const fname = document.getElementById('fnameInput')?.value.trim();
    const email = document.getElementById('emailInput')?.value.trim();
    if(!fname || !email) { showToast('Please fill in all required fields', 'error'); return; }
  }
  state.checkoutStep = step;
  [1,2,3,4].forEach(n => {
    const panel = document.getElementById(`checkoutStep${n}`);
    if(panel) panel.style.display = n === step ? 'block' : 'none';
  });
  updateStepUI(step);
  if(step === 4) renderReview();
}

function checkoutBack(step) {
  checkoutNext(step);
}

function updateStepUI(active) {
  document.querySelectorAll('.step-item').forEach(el => {
    const n = parseInt(el.dataset.step);
    el.classList.remove('active','done');
    if(n === active) el.classList.add('active');
    if(n < active) el.classList.add('done');
  });
}

function selectDelivery(el, method) {
  document.querySelectorAll('#deliveryOptions .pay-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.deliveryMethod = method;
  updateCheckoutSummary();
}

function selectPayment(el, method) {
  document.querySelectorAll('#paymentOptions .pay-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.paymentMethod = method;
}

function renderReview() {
  const items = document.getElementById('reviewOrderItems');
  if(items) {
    items.innerHTML = state.cart.map(i => `
      <div class="cart-item" style="padding:12px">
        <div class="cart-item-img" style="width:52px;height:52px;font-size:1.5rem"><span>${i.emoji}</span></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-meta">Qty: ${i.qty} · ${formatPrice(i.price)}</div>
        </div>
        <div class="cart-item-price">${formatPrice(i.price*i.qty)}</div>
      </div>`).join('');
  }
  const addrBlock = document.getElementById('reviewAddressBlock');
  if(addrBlock) {
    const fname = document.getElementById('fnameInput')?.value || 'Customer';
    const lname = document.getElementById('lnameInput')?.value || '';
    const addr1 = document.getElementById('addr1Input')?.value || '';
    const city  = document.getElementById('cityInput')?.value || '';
    const pin   = document.getElementById('pinInput')?.value || '';
    addrBlock.innerHTML = `📍 <strong>${fname} ${lname}</strong><br/>${addr1}, ${city} – ${pin}<br/><span style="color:var(--accent-primary)">${state.paymentMethod.toUpperCase()} · ${state.deliveryMethod.charAt(0).toUpperCase()+state.deliveryMethod.slice(1)} Delivery</span>`;
  }
}

function placeOrder() {
  if(!state.cart.length) { showToast('Your cart is empty!', 'error'); return; }
  const orderId = 'NX' + Date.now().toString().slice(-7);
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN'),
    items: [...state.cart],
    status: 'placed',
    total: state.cart.reduce((a,i) => a + i.price*i.qty, 0),
  };
  state.orders.unshift(order);
  state.cart = [];
  saveState();
  updateBadges();
  document.getElementById('successOrderId').textContent = '#' + orderId;
  navigate('success');
  showToast('🎉 Order placed successfully!', 'success');
}

// ── ORDERS ────────────────────────────────────────────────
const STATUS_LABELS = {
  placed:'Order Placed', confirmed:'Confirmed', packed:'Packed', shipped:'Shipped', delivered:'Delivered', cancelled:'Cancelled'
};

function renderOrders() {
  const list  = document.getElementById('ordersList');
  const empty = document.getElementById('ordersEmpty');
  if(!state.orders.length) {
    list.innerHTML = '';
    empty.style.display = 'block'; return;
  }
  empty.style.display = 'none';
  list.innerHTML = state.orders.map(o => `
    <div class="order-card">
      <div class="order-header">
        <div>
          <div class="order-id">Order ID: <span>#${o.id}</span></div>
          <div class="order-date">Placed on ${o.date}</div>
        </div>
        <div class="order-status-badge status-${o.status}">${STATUS_LABELS[o.status]||o.status}</div>
      </div>
      <div class="order-items-row">
        ${o.items.slice(0,4).map(i => `<div class="order-item-thumb">${i.emoji}</div>`).join('')}
        ${o.items.length > 4 ? `<span style="font-size:0.8rem;color:var(--text-muted)">+${o.items.length-4} more</span>` : ''}
        <span style="font-size:0.85rem;color:var(--text-secondary);margin-left:4px">${o.items.map(i=>i.name).join(', ').slice(0,80)}${o.items.map(i=>i.name).join(', ').length>80?'…':''}</span>
      </div>
      <div class="order-footer">
        <div class="order-total">${formatPrice(o.total)}</div>
        <div class="order-actions">
          <button class="btn btn-ghost btn-sm" onclick="navigate('tracking',{orderId:'${o.id}'})">📍 Track</button>
          <button class="btn btn-secondary btn-sm" onclick="reorder('${o.id}')">🔁 Reorder</button>
        </div>
      </div>
    </div>`).join('');
}

function reorder(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if(!order) return;
  order.items.forEach(item => {
    const existing = state.cart.find(i => i.id === item.id);
    if(existing) existing.qty += item.qty;
    else state.cart.push({...item});
  });
  saveState(); updateBadges();
  showToast('Items added to cart!', 'success');
  navigate('cart');
}

// ── TRACKING ──────────────────────────────────────────────
const TRACKING_STEPS = [
  { key:'placed',    label:'Order Placed',       icon:'📋', sub:'We have received your order' },
  { key:'confirmed', label:'Order Confirmed',     icon:'✅', sub:'Seller has confirmed your order' },
  { key:'packed',    label:'Order Packed',        icon:'📦', sub:'Your order has been packed' },
  { key:'shipped',   label:'Out for Shipment',    icon:'🚛', sub:'Your package is on its way' },
  { key:'delivered', label:'Delivered',           icon:'🎉', sub:'Your order has been delivered!' },
];

function renderTracking(orderId) {
  const order = orderId ? state.orders.find(o => o.id === orderId) : state.orders[0];
  document.getElementById('trackingTitle').textContent = 'Order Tracking' + (order ? ' · #' + order.id : '');

  if(!order) {
    document.getElementById('trackingHeader').innerHTML = '<div style="color:var(--text-muted);font-size:0.9rem">No order found. Place an order to track it here.</div>';
    document.getElementById('trackProgressBar').style.width = '0%';
    document.getElementById('trackingTimeline').innerHTML = '<div class="timeline-line"></div>';
    return;
  }

  // For demo, simulate status based on order age (always shows "placed" for new orders)
  const statusOrder = ['placed','confirmed','packed','shipped','delivered'];
  const currentIdx  = statusOrder.indexOf(order.status || 'placed');
  const progressPct = Math.round(((currentIdx + 1) / statusOrder.length) * 100);

  document.getElementById('trackingHeader').innerHTML = `
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted)">Order ID</div>
        <div style="font-family:var(--font-display);font-weight:700;color:var(--accent-cyan)">#${order.id}</div>
      </div>
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted)">Placed On</div>
        <div style="font-weight:600">${order.date}</div>
      </div>
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted)">Items</div>
        <div style="font-weight:600">${order.items.length} item${order.items.length>1?'s':''}</div>
      </div>
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted)">Total</div>
        <div style="font-weight:700;color:var(--accent-green)">${formatPrice(order.total)}</div>
      </div>
    </div>`;

  document.getElementById('trackProgressBar').style.width = progressPct + '%';

  const timeline = document.getElementById('trackingTimeline');
  const now = new Date();
  timeline.innerHTML = `<div class="timeline-line"></div>` + TRACKING_STEPS.map((step, i) => {
    let dotClass = 'pending';
    if(i < currentIdx) dotClass = 'done';
    if(i === currentIdx) dotClass = 'current';
    const timeStr = i <= currentIdx ? new Date(now.getTime() - (currentIdx - i) * 3600000).toLocaleString('en-IN', {dateStyle:'medium',timeStyle:'short'}) : 'Pending';
    return `
      <div class="timeline-step">
        <div class="timeline-dot ${dotClass}">${dotClass==='done'?'✓': dotClass==='current'?'●':'○'}</div>
        <div class="timeline-step-title">${step.icon} ${step.label}</div>
        <div class="timeline-step-sub">${step.sub}</div>
        <div class="timeline-step-time">${timeStr}</div>
      </div>`;
  }).join('');
}

// ── PROFILE ───────────────────────────────────────────────
function renderProfile() {
  document.getElementById('profileOrderCount').textContent = state.orders.length;
  document.getElementById('profileWishCount').textContent  = state.wishlist.length;
}

function switchProfileTab(tab) {
  document.querySelectorAll('.profile-nav-item').forEach(el => el.classList.remove('active'));
  event.currentTarget.classList.add('active');
  // For demo, just navigate
  if(tab === 'orders')   navigate('orders');
  if(tab === 'wishlist') navigate('wishlist');
}

// ── AUTH ──────────────────────────────────────────────────
function fakeLogin() {
  showToast('Welcome back to Nexora! 👋', 'success');
  navigate('home');
}

function fakeRegister() {
  showToast('Account created! Welcome to Nexora! 🎉', 'success');
  navigate('home');
}

function togglePass(id) {
  const el = document.getElementById(id);
  if(!el) return;
  el.type = el.type === 'password' ? 'text' : 'password';
}

// ── FAQ ───────────────────────────────────────────────────
function renderFAQ() {
  const el = document.getElementById('faqList');
  if(!el) return;
  el.innerHTML = FAQS.map((faq, i) => `
    <div class="checkout-card" style="margin-bottom:10px;cursor:pointer" onclick="toggleFAQ(${i})">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <strong style="font-size:0.92rem">${faq.q}</strong>
        <span id="faqIcon${i}" style="font-size:1.2rem;color:var(--accent-primary)">+</span>
      </div>
      <div id="faqAns${i}" style="display:none;margin-top:12px;color:var(--text-secondary);font-size:0.88rem;line-height:1.7">${faq.a}</div>
    </div>`).join('');
}

function toggleFAQ(i) {
  const ans  = document.getElementById(`faqAns${i}`);
  const icon = document.getElementById(`faqIcon${i}`);
  if(!ans) return;
  const open = ans.style.display !== 'none';
  ans.style.display  = open ? 'none' : 'block';
  icon.textContent   = open ? '+' : '−';
}

// ── BREADCRUMB ────────────────────────────────────────────
function breadcrumb(items) {
  return items.map((item, i) => {
    const isLast = i === items.length - 1;
    return `${i > 0 ? '<span class="breadcrumb-sep">›</span>' : ''}${
      isLast
        ? `<span>${item.label}</span>`
        : `<a onclick="navigate('${item.page}'${item.params ? `,${JSON.stringify(item.params)}` : ''})">${item.label}</a>`
    }`;
  }).join('');
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initCursor();
  initMarquee();
  initTimer();
  initSearch();
  updateBadges();

  // Hide loader
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if(loader) loader.classList.add('hidden');
  }, 1400);

  // Render home
  renderHome();

  // Handle browser back
  window.addEventListener('popstate', () => {
    // Simple: just show home
    navigate('home');
  });

  // Mobile menu (simple toggle for now)
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    showToast('Menu: use the nav buttons above on mobile', 'info');
  });
});