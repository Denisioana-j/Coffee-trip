const CART_KEY = 'coffeeTrip_cart';
const WISHLIST_KEY = 'coffeeTrip_wishlist';
const RECENTLY_VIEWED_KEY = 'coffeeTrip_recentlyViewed';
const ACCOUNT_DEMO_KEY = 'coffeeTrip_accountDemo';
const NEWSLETTER_KEY = 'coffeeTrip_newsletter';

const state = {
  cart: loadStorage(CART_KEY, []),
  wishlist: loadStorage(WISHLIST_KEY, []),
  recent: loadStorage(RECENTLY_VIEWED_KEY, []),
  account: loadStorage(ACCOUNT_DEMO_KEY, {
    signedIn: false,
    name: 'Coffee Trip Guest'
  }),
  newsletter: loadStorage(NEWSLETTER_KEY, [])
};

function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatPrice(value) {
  return window.CoffeeTripI18n
    ? window.CoffeeTripI18n.formatPrice(value)
    : `${Number(value).toLocaleString('ro-RO')} RON`;
}

function getPriceLabel(product) {
  if (window.CoffeeTripI18n) return window.CoffeeTripI18n.priceLabel(product);
  if (!product?.price) return 'PREȚ NECUNOSCUT';
  return product.isEstimatedPrice
    ? `${formatPrice(product.price)} · Preț estimativ`
    : formatPrice(product.price);
}

function getLocalizedProduct(product) {
  return window.CoffeeTripI18n ? window.CoffeeTripI18n.product(product) : product;
}

function translate(key) {
  return window.CoffeeTripI18n ? window.CoffeeTripI18n.t(key) : key;
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(title, message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMessage').textContent = message;
  toast.classList.add('visible');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

function updateCounters() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  const cartBadge = document.getElementById('cartCount');
  const wishlistBadge = document.getElementById('wishlistCount');

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'grid' : 'none';
  }

  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.style.display = wishlistCount > 0 ? 'grid' : 'none';
  }
}

function getProductById(id) {
  return window.COFFEE_TRIP_PRODUCTS.find((product) => product.id === Number(id));
}

function isFavorite(id) {
  return state.wishlist.includes(Number(id));
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      origin: product.origin,
      price: product.price,
      isEstimatedPrice: product.isEstimatedPrice,
      image: product.image,
      weight: product.weight,
      quantity
    });
  }

  saveStorage(CART_KEY, state.cart);
  updateCounters();
  renderCart();
  document.getElementById('cartButton')?.classList.remove('cart-pulse');
  requestAnimationFrame(() => document.getElementById('cartButton')?.classList.add('cart-pulse'));
  showToast(translate('Adăugat în coș'), `${product.name} × ${quantity}`);
}

function changeCartQuantity(id, delta) {
  const item = state.cart.find((entry) => entry.id === Number(id));
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== Number(id));
  }

  saveStorage(CART_KEY, state.cart);
  updateCounters();
  renderCart();
}

function removeCartItem(id) {
  state.cart = state.cart.filter((entry) => entry.id !== Number(id));
  saveStorage(CART_KEY, state.cart);
  updateCounters();
  renderCart();
}

function toggleWishlist(id) {
  const product = getProductById(id);
  if (!product) return;

  const pid = Number(id);

  if (state.wishlist.includes(pid)) {
    state.wishlist = state.wishlist.filter((entry) => entry !== pid);
    showToast(translate('Eliminat din favorite'), product.name);
  } else {
    state.wishlist.push(pid);
    showToast(translate('Adăugat la favorite'), product.name);
  }

  saveStorage(WISHLIST_KEY, state.wishlist);
  updateCounters();
  renderWishlist();
  renderProductCards();
  document.querySelector(`[data-favorite="${pid}"]`)?.classList.add('favorite-pulse');
}

function cartSubtotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
  const targets = [
    document.getElementById('cartItems'),
    document.getElementById('cartPageItems')
  ].filter(Boolean);

  if (!targets.length) return;

  const subtotal = cartSubtotal();
  const cartSubtotalElement = document.getElementById('cartSubtotal');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
  const shippingSummary = document.getElementById('shippingSummary');
  const shippingMessage = document.getElementById('shippingMessage');

  if (cartSubtotalElement) cartSubtotalElement.textContent = formatPrice(subtotal);
  if (checkoutTotal) checkoutTotal.textContent = formatPrice(subtotal);
  if (checkoutGrandTotal) checkoutGrandTotal.textContent = formatPrice(subtotal);
  if (shippingSummary) shippingSummary.textContent = translate('Available at order confirmation');

  if (shippingMessage) {
    shippingMessage.textContent = translate('Final prices are available when your order is confirmed.');
  }

  const emptyMarkup = `
    <div class="empty-state">
      <div>
        <h4>${translate('Your cart is empty.')}</h4>
        <p>${translate('The barista has a recommendation for you.')}</p>
      </div>
    </div>
  `;

  const itemsMarkup = state.cart.map((item) => `
    ${(() => {
      const product = getLocalizedProduct(getProductById(item.id) || item);
      return `
    <div class="drawer-item">
      <div class="drawer-thumb">
        <img src="${product.image || item.image}" alt="${escapeHTML(product.name)}">
      </div>
      <div>
        <h4>${escapeHTML(product.name)}</h4>
        <div class="meta">${escapeHTML(product.origin)} · ${escapeHTML(product.weight)}</div>
        <div class="qty-box">
          <button data-cart-minus="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button data-cart-plus="${item.id}">+</button>
        </div>
      </div>
      <div>
        <div class="item-price">${getPriceLabel(product)}</div>
        <button class="item-remove" data-cart-remove="${item.id}">×</button>
      </div>
    </div>
      `;
    })()}
  `).join('');

  targets.forEach((target) => {
    target.innerHTML = state.cart.length ? itemsMarkup : emptyMarkup;
  });
}

function renderWishlist() {
  const targets = [
    document.getElementById('wishlistItems'),
    document.getElementById('wishlistPageItems')
  ].filter(Boolean);

  if (!targets.length) return;

  const items = window.COFFEE_TRIP_PRODUCTS.filter((product) => state.wishlist.includes(product.id)).map(getLocalizedProduct);

  const emptyMarkup = `
    <div class="empty-state">
      <div>
        <h4>${translate('Your favorites')}</h4>
        <p>${translate('Nothing added yet.')}</p>
      </div>
    </div>
  `;

  const itemsMarkup = items.map((product) => `
    <div class="drawer-item">
      <div class="drawer-thumb">
        <img src="${product.image}" alt="${escapeHTML(product.name)}">
      </div>
      <div>
        <h4>${escapeHTML(product.name)}</h4>
        <div class="meta">${escapeHTML(product.origin)} · ${getPriceLabel(product)}</div>
        <a class="view-link" href="product.html?id=${product.id}">${translate('View product →')}</a>
        <button class="btn btn-light" data-wishlist-add="${product.id}" style="margin-top:12px; min-height:32px; padding:0 12px;">+ ${translate('Add to cart')}</button>
      </div>
      <div>
        <button class="item-remove" data-wishlist-remove="${product.id}">×</button>
      </div>
    </div>
  `).join('');

  targets.forEach((target) => {
    target.innerHTML = items.length ? itemsMarkup : emptyMarkup;
  });
}

function renderProductCards() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const category = new URLSearchParams(window.location.search).get('category');
  const encodedCategory = category;
  const products = encodedCategory && encodedCategory !== 'All'
    ? window.COFFEE_TRIP_PRODUCTS.filter((product) => product.category === encodedCategory)
    : window.COFFEE_TRIP_PRODUCTS;
  const count = document.getElementById('catalogCount');
  if (count) count.textContent = `${products.length} ${translate('produse')}`;

  container.innerHTML = products.map((sourceProduct) => {
    const product = getLocalizedProduct(sourceProduct);
    return `
    <article class="product-card reveal">
      <div class="product-visual">
        <span class="product-badge">${escapeHTML(product.badge || 'Curated')}</span>
        <button class="product-favorite ${isFavorite(product.id) ? 'active' : ''}" data-favorite="${product.id}" aria-label="Favorite">${isFavorite(product.id) ? '♥' : '♡'}</button>
        <img src="${product.image}" alt="${escapeHTML(product.name)}">
        <button class="btn btn-dark product-quick-add" data-add-cart="${product.id}">+ ${translate('Add to cart')}</button>
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${escapeHTML(product.name)}</h3>
          <div class="product-price-wrap">
            <span class="product-price">${getPriceLabel(product)}</span>
            
          </div>
        </div>
        <div class="product-meta">${escapeHTML(product.origin)} · ${escapeHTML(product.roast)}</div>
        <div class="product-ratings">
          <span class="product-rating-stars">★★★★★</span>
          <span><strong>${product.rating}</strong> (${product.reviews} reviews)</span>
        </div>
        <div class="product-notes">
          ${product.notes.map((note) => `<span class="product-note">${escapeHTML(note)}</span>`).join('')}
        </div>
        <a class="view-link" href="product.html?id=${product.id}">${translate('View product →')}</a>
      </div>
    </article>
  `;
  }).join('');

  if (window.observeRevealElements) window.observeRevealElements();
}

function renderRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  const products = window.COFFEE_TRIP_PRODUCTS.slice(0, 4).map(getLocalizedProduct);
  container.innerHTML = products.map((product) => `
    <article class="product-card reveal">
      <div class="product-visual">
        <img src="${product.image}" alt="${escapeHTML(product.name)}">
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${escapeHTML(product.name)}</h3>
          <span class="product-price">${getPriceLabel(product)}</span>
        </div>
        <div class="product-meta">${escapeHTML(product.origin)} · ${escapeHTML(product.roast)}</div>
        <a class="view-link" href="product.html?id=${product.id}">${translate('View product →')}</a>
      </div>
    </article>
  `).join('');

  if (window.observeRevealElements) window.observeRevealElements();
}

function renderProductPage() {
  const productId = new URLSearchParams(window.location.search).get('id');
  const container = document.getElementById('productDetail');
  if (!container || !productId) return;

  const sourceProduct = getProductById(productId);
  if (!sourceProduct) {
    container.innerHTML = `<div class="empty-state"><div><h4>${translate('Product not found.')}</h4><p><a href="shop.html">${translate('Back to shop')}</a></p></div></div>`;
    return;
  }
  const product = getLocalizedProduct(sourceProduct);

  const reviews = window.COFFEE_TRIP_REVIEWS[product.id] || [];
  const averageRating = reviews.length ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1) : product.rating;

  state.recent = [product.id, ...state.recent.filter((id) => id !== product.id)].slice(0, 4);
  saveStorage(RECENTLY_VIEWED_KEY, state.recent);

  container.innerHTML = `
    <div class="product-detail-wrap">
      <div>
        <div class="gallery-main">
          <img src="${product.image}" alt="${escapeHTML(product.name)}">
        </div>
        <div class="gallery-thumbs">
          <div class="gallery-thumb"><img src="${product.image}" alt="thumbnail"></div>
          <div class="gallery-thumb"><img src="${product.image}" alt="thumbnail"></div>
          <div class="gallery-thumb"><img src="${product.image}" alt="thumbnail"></div>
          <div class="gallery-thumb"><img src="${product.image}" alt="thumbnail"></div>
        </div>
      </div>

      <div class="product-detail">
        <span class="eyebrow">${escapeHTML(product.badge || 'Curated')}</span>
        <h1>${escapeHTML(product.name)}</h1>
        <div class="meta-line">
          <span>${escapeHTML(product.origin)}</span>
          <span>•</span>
          <span>${escapeHTML(product.category)}</span>
          <span>•</span>
          <span>${escapeHTML(product.roast)}</span>
        </div>
        <div class="rating-line">
          <span class="product-rating-stars">★★★★★</span>
          <strong>${averageRating} / 5</strong>
          <span>(${reviews.length} reviews)</span>
        </div>

        <div class="price-block">
          <span class="price-current">${getPriceLabel(product)}</span>
          <span class="price-note">Prețurile finale sunt disponibile la confirmarea comenzii.</span>
        </div>

        <p class="product-description">${escapeHTML(product.description)}</p>

        <div class="detail-grid">
          <div class="metric-box"><span>Taste profile</span><strong>${escapeHTML(product.flavor || product.notes[0])}</strong></div>
          <div class="metric-box"><span>Roast</span><strong>${escapeHTML(product.roast)}</strong></div>
          <div class="metric-box"><span>Body</span><strong>${escapeHTML(product.body || 'Medium')}</strong></div>
          <div class="metric-box"><span>Acidity</span><strong>${escapeHTML(product.acidity || 'Balanced')}</strong></div>
          <div class="metric-box"><span>Sweetness</span><strong>${escapeHTML(product.sweetness || 'Medium')}</strong></div>
          <div class="metric-box"><span>Weight</span><strong>${escapeHTML(product.weight || '250g')}</strong></div>
        </div>

        <div class="option-group">
          <h4>Weight</h4>
          <div class="option-list">
            <button class="option-pill active">100g</button>
            <button class="option-pill">250g</button>
            <button class="option-pill">500g</button>
            <button class="option-pill">1kg</button>
          </div>
        </div>

        <div class="option-group">
          <h4>Grind</h4>
          <div class="option-list">
            <button class="option-pill active">Whole Bean</button>
            <button class="option-pill">Espresso</button>
            <button class="option-pill">Filter</button>
            <button class="option-pill">French Press</button>
            <button class="option-pill">Moka Pot</button>
          </div>
        </div>

        <div class="buy-actions">
          <div class="qty-control">
            <button data-qty-minus>-</button>
            <span id="productQty">1</span>
            <button data-qty-plus>+</button>
          </div>
          <div class="primary-actions">
            <button class="btn btn-primary" data-add-product="${product.id}">${translate('Add to cart')}</button>
            <button class="btn btn-light" data-favorite="${product.id}">${isFavorite(product.id) ? `♥ ${translate('Saved')}` : `♡ ${translate('Add to wishlist')}`}</button>
          </div>
        </div>

        <div class="secondary-links">
          <a href="shop.html">Back to shop</a>
          <a href="checkout.html">Buy now</a>
        </div>
      </div>
    </div>

    <div class="tabs">
      <div class="tab-list">
        <button class="tab-button active" data-tab="description">Description</button>
        <button class="tab-button" data-tab="tasting">Tasting Notes</button>
        <button class="tab-button" data-tab="origin">Origin</button>
        <button class="tab-button" data-tab="roasting">Roasting</button>
        <button class="tab-button" data-tab="brew">Brewing Guide</button>
        <button class="tab-button" data-tab="shipping">Shipping</button>
      </div>
      <div class="tab-panel">
        <div class="tab-content active" data-content="description">
          <p>${escapeHTML(product.description)}</p>
        </div>
        <div class="tab-content" data-content="tasting">
          <p>${escapeHTML(product.notes.join(', '))}</p>
        </div>
        <div class="tab-content" data-content="origin">
          <p>${escapeHTML(product.origin)} — a carefully curated origin selected for its profile and integrity.</p>
        </div>
        <div class="tab-content" data-content="roasting">
          <p>Roasted in small batches at the Coffee Trip atelier with attention to clarity, sweetness and balance.</p>
        </div>
        <div class="tab-content" data-content="brew">
          <p>For best results, use a medium grind and brew with a ratio of 1:16. Experiment with water temperature between 92–95°C.</p>
        </div>
        <div class="tab-content" data-content="shipping">
          <p>Freshly roasted and shipped within 24 hours. Secure checkout and easy returns.</p>
        </div>
      </div>
    </div>

    <div class="section-block">
      <div class="related-head">
        <h3>You may also like</h3>
      </div>
      <div class="products-grid" id="relatedProducts"></div>
    </div>

    <div class="section-block">
      <div class="related-head">
        <h3>Reviews</h3>
      </div>
      <div class="review-grid">
        ${reviews.slice(0, 6).map((review) => `
          <div class="review-card">
            <div class="stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
            <p>“${escapeHTML(review.text)}”</p>
            <strong>${escapeHTML(review.user)}</strong>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section-block product-journey">
      <div class="related-head"><h3>Complete your ritual</h3></div>
      <div class="cta-grid journey-grid">
        <a class="category-card" href="collections.html#morning"><h3>Morning Collection</h3><span class="view-link">Discover -></span></a>
        <a class="category-card" href="atelier.html"><h3>Visit the Atelier</h3><span class="view-link">Explore -></span></a>
        <a class="category-card" href="guide.html"><h3>Find your brew</h3><span class="view-link">Read guide -></span></a>
      </div>
    </div>

    ${state.recent.length ? `<div class="section-block"><div class="related-head"><h3>Recently viewed</h3></div><div class="products-grid">${state.recent.map((id) => {
      const recentProduct = getProductById(id);
      return recentProduct ? `<a class="product-card" href="product.html?id=${recentProduct.id}"><div class="product-visual"><img src="${recentProduct.image}" alt="${escapeHTML(recentProduct.name)}"></div><div class="product-body"><h3>${escapeHTML(recentProduct.name)}</h3><span class="product-price">${getPriceLabel(recentProduct)}</span></div></a>` : '';
    }).join('')}</div></div>` : ''}
  `;

  renderRelatedProducts();
  setupProductPageInteractions(product.id);
}

function setupProductPageInteractions(productId) {
  let quantity = 1;
  const qtySpan = document.getElementById('productQty');

  document.querySelector('[data-qty-plus]')?.addEventListener('click', () => {
    quantity += 1;
    qtySpan.textContent = quantity;
  });

  document.querySelector('[data-qty-minus]')?.addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    qtySpan.textContent = quantity;
  });

  document.querySelector('[data-add-product]')?.addEventListener('click', () => {
    addToCart(productId, quantity);
  });

  document.querySelector('[data-favorite]')?.addEventListener('click', () => {
    toggleWishlist(productId);
    const btn = document.querySelector('[data-favorite]');
    if (btn) btn.textContent = isFavorite(productId) ? `♥ ${translate('Saved')}` : `♡ ${translate('Add to wishlist')}`;
  });

  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach((btn) => btn.classList.toggle('active', btn === button));
      document.querySelectorAll('.tab-content').forEach((content) => content.classList.toggle('active', content.dataset.content === button.dataset.tab));
    });
  });
}

function setupGlobalInteractions() {
  document.querySelectorAll('.main-nav').forEach((nav) => {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="coffee.html">Coffee</a>
      <a href="rare-coffee.html">Rare Coffee</a>
      <a href="espresso.html">Espresso</a>
      <a href="signature-blends.html">Blends</a>
      <a href="collections.html">Collections</a>
      <a href="atelier.html">Atelier</a>
      <a href="journal.html">Journal</a>
      <a href="guide.html">Guide</a>
      <div class="mega-menu">
        <div class="mega-group"><h4>Shop</h4><a href="shop.html">All Coffee</a><a href="shop.html?badge=best">Best Sellers</a><a href="shop.html?badge=new">New Arrivals</a><a href="shop.html?badge=budget">Budget Luxury</a><a href="shop.html?badge=premium">Premium Selection</a></div>
        <div class="mega-group"><h4>Coffee</h4><a href="coffee.html?category=single-origin">Single Origin</a><a href="rare-coffee.html">Rare Coffee</a><a href="espresso.html">Espresso</a><a href="signature-blends.html">Signature Blends</a></div>
        <div class="mega-group"><h4>Collections</h4><a href="collections.html#morning">Morning Collection</a><a href="collections.html#espresso">Espresso Collection</a><a href="collections.html#rare">Rare Collection</a><a href="collections.html#gift">Gift Collection</a><a href="collections.html#beginner">Beginner Collection</a><a href="collections.html#connoisseur">Coffee Connoisseur</a></div>
        <div class="mega-feature"><div class="meta">Editorial</div><h5>Discover your next coffee</h5><p>Curated selections, rare origins and a ritual built for slow mornings.</p><a class="btn btn-primary" href="collections.html">Explore collection</a></div>
      </div>`;
  });

  document.querySelectorAll('.header-actions').forEach((actions) => {
    if (!actions.querySelector('[data-account-link]')) {
      const account = document.createElement('a');
      account.className = 'header-action';
      account.href = 'account.html';
      account.dataset.accountLink = 'true';
      account.setAttribute('aria-label', 'Account');
      account.textContent = '◎';
      actions.insertBefore(account, actions.firstChild);
    }
  });

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-add-cart]');
    const favorite = event.target.closest('[data-favorite]');
    const cartPlus = event.target.closest('[data-cart-plus]');
    const cartMinus = event.target.closest('[data-cart-minus]');
    const cartRemove = event.target.closest('[data-cart-remove]');
    const wishlistAdd = event.target.closest('[data-wishlist-add]');
    const wishlistRemove = event.target.closest('[data-wishlist-remove]');
    const closeDrawer = event.target.closest('[data-close-drawer]');
    const closeModal = event.target.closest('[data-close-modal]');

    if (add) {
      addToCart(Number(add.dataset.addCart));
      return;
    }

    if (favorite) {
      toggleWishlist(Number(favorite.dataset.favorite));
      return;
    }

    if (cartPlus) {
      changeCartQuantity(Number(cartPlus.dataset.cartPlus), 1);
      return;
    }

    if (cartMinus) {
      changeCartQuantity(Number(cartMinus.dataset.cartMinus), -1);
      return;
    }

    if (cartRemove) {
      removeCartItem(Number(cartRemove.dataset.cartRemove));
      return;
    }

    if (wishlistAdd) {
      addToCart(Number(wishlistAdd.dataset.wishlistAdd));
      return;
    }

    if (wishlistRemove) {
      toggleWishlist(Number(wishlistRemove.dataset.wishlistRemove));
      return;
    }

    if (closeDrawer) {
      closeDrawers();
      return;
    }

    if (closeModal) {
      closeOverlays();
    }
  });

  document.getElementById('wishlistButton')?.addEventListener('click', () => {
    renderWishlist();
    openDrawer('wishlistDrawer');
  });

  document.getElementById('cartButton')?.addEventListener('click', () => {
    renderCart();
    openDrawer('cartDrawer');
  });

  document.getElementById('searchButton')?.addEventListener('click', () => {
    openOverlay('searchOverlay');
    setTimeout(() => document.getElementById('searchInput')?.focus(), 150);
  });

  document.getElementById('searchInput')?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    const results = document.getElementById('searchResults');

    if (!results) return;

    if (!query) {
        results.innerHTML = `<div class="empty-state"><div><h4>${translate('Search collection')}</h4><p>${translate('Type to explore the catalog.')}</p></div></div>`;
      return;
    }

    const matches = window.COFFEE_TRIP_PRODUCTS.filter((sourceProduct) => {
      const product = getLocalizedProduct(sourceProduct);
      const haystack = [product.name, product.origin, product.category, product.roast, ...product.notes].join(' ').toLowerCase();
      return fuzzyContains(haystack, query);
    });

    if (!matches.length) {
      results.innerHTML = `<div class="empty-state"><div><h4>${translate('No results found.')}</h4><p>${translate('Try floral, espresso, Ethiopia, or premium.')}</p></div></div>`;
      return;
    }

    results.innerHTML = matches.map((sourceProduct) => {
      const product = getLocalizedProduct(sourceProduct);
      return `
      <button class="search-result" data-search-id="${product.id}">
        <span>
          <strong>${escapeHTML(product.name)}</strong>
          <small>${escapeHTML(product.origin)} · ${escapeHTML(product.category)}</small>
        </span>
        <span>${getPriceLabel(product)}</span>
      </button>
      `;
    }).join('');

    results.querySelectorAll('[data-search-id]').forEach((button) => {
      button.addEventListener('click', () => {
        closeOverlays();
        window.location.href = `product.html?id=${button.dataset.searchId}`;
      });
    });
  });

  document.getElementById('checkoutButton')?.addEventListener('click', () => {
    if (!state.cart.length) {
      showToast(translate('Your cart is empty.'), translate('Add a coffee before checkout.'));
      return;
    }

    window.location.href = 'checkout.html';
  });

  document.getElementById('checkoutPageButton')?.addEventListener('click', () => {
    if (!state.cart.length) {
      showToast(translate('Your cart is empty.'), translate('Add a coffee before checkout.'));
      return;
    }

    window.location.href = 'checkout.html';
  });

  document.getElementById('newsletterForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput || !emailInput.value) return;

    state.newsletter.push(emailInput.value);
    saveStorage(NEWSLETTER_KEY, state.newsletter);

    const message = document.getElementById('newsletterMessage');
    if (message) message.textContent = translate('Thank you. You will receive exclusive selections in your inbox.');
    emailInput.value = '';
  });

  document.getElementById('mobileMenuButton')?.addEventListener('click', () => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    nav.classList.toggle('mobile-open');
  });

  document.getElementById('filterToggle')?.addEventListener('click', () => {
    const panel = document.getElementById('filterPanel');
    if (panel) panel.classList.toggle('open');
  });

  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach((btn) => btn.classList.toggle('active', btn === button));
      document.querySelectorAll('.tab-content').forEach((content) => content.classList.toggle('active', content.dataset.content === button.dataset.tab));
    });
  });
}

function ensureJourneyLinks() {
  document.querySelectorAll('main.page-content').forEach((main) => {
    if (main.querySelector('.journey-links')) return;
    const section = document.createElement('section');
    section.className = 'section-block journey-links';
    section.innerHTML = `
      <div class="container">
        <div class="section-head"><div><p class="eyebrow">Continue your coffee journey</p><h2>Discover what comes next.</h2></div><p>Move naturally between the collection, the ritual and the people behind every cup.</p></div>
        <div class="cta-grid journey-grid">
          <a class="category-card" href="rare-coffee.html"><p class="eyebrow">01 / Selection</p><h3>Rare Coffee</h3><span class="view-link">Explore -></span></a>
          <a class="category-card" href="espresso.html"><p class="eyebrow">02 / Ritual</p><h3>Espresso</h3><span class="view-link">Explore -></span></a>
          <a class="category-card" href="signature-blends.html"><p class="eyebrow">03 / House style</p><h3>Signature Blends</h3><span class="view-link">Explore -></span></a>
          <a class="category-card" href="atelier.html"><p class="eyebrow">04 / Experience</p><h3>Visit the Atelier</h3><span class="view-link">Discover -></span></a>
        </div>
      </div>`;
    main.appendChild(section);
  });
}

function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  const backdrop = document.getElementById('backdrop');
  if (!drawer || !backdrop) return;

  document.querySelectorAll('.drawer').forEach((item) => item.classList.remove('open'));
  drawer.classList.add('open');
  backdrop.classList.add('visible');
  document.body.classList.add('locked');
}

function closeDrawers() {
  document.querySelectorAll('.drawer').forEach((item) => item.classList.remove('open'));
  const backdrop = document.getElementById('backdrop');
  if (backdrop) backdrop.classList.remove('visible');
  document.body.classList.remove('locked');
}

function openOverlay(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.classList.add('locked');
}

function closeOverlays() {
  document.querySelectorAll('.overlay').forEach((overlay) => overlay.classList.remove('open'));
  document.body.classList.remove('locked');
}

function fuzzyContains(text, query) {
  if (!text || !query) return false;
  const normalizedText = normalizeText(text);
  const normalizedQuery = normalizeText(query);

  if (normalizedText.includes(normalizedQuery)) return true;

  const tokens = normalizedText.split(' ');
  return tokens.some((token) => similarity(token, normalizedQuery) >= 0.75 || token.startsWith(normalizedQuery.slice(0, 3)));
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(a, b) {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (!maxLen) return 0;
  return 1 - levenshtein(a, b) / maxLen;
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0));

  for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[b.length][a.length];
}

function setupRevealObserver() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((element) => element.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach((element) => observer.observe(element));
  window.observeRevealElements = () => setupRevealObserver();
}

function setupLuxuryInteractions() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<span>↑</span><small>TOP</small>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
    const cursor = document.createElement('span');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    window.addEventListener('pointermove', (event) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }, { passive: true });
    document.querySelectorAll('a, button, input, select, textarea').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
    });
  }
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${ratio})`;
    backToTop.classList.toggle('visible', window.scrollY > 500);
    document.querySelector('.main-header')?.classList.toggle('scrolled', window.scrollY > 24);
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateScrollUI();
      ticking = false;
    });
  }, { passive: true });
  updateScrollUI();

  document.querySelectorAll('.products-grid, .journal-grid, .collection-grid, .cta-grid').forEach((grid) => {
    [...grid.children].forEach((item, index) => item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 350)}ms`));
  });

  if (!reducedMotion) {
    document.querySelectorAll('.page-hero, .home-hero').forEach((hero) => hero.addEventListener('pointermove', (event) => {
      if (window.innerWidth < 800) return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      hero.style.setProperty('--hero-shift-x', `${x * 8}px`);
      hero.style.setProperty('--hero-shift-y', `${y * 8}px`);
    }));
  }

  document.querySelectorAll('a[href]').forEach((link) => {
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname || link.target === '_blank' || link.hasAttribute('download')) return;
    link.addEventListener('click', (event) => {
      if (reducedMotion || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(() => { window.location.href = link.href; }, 260);
    });
  });
}

function buildCollections() {
  const collectionList = document.getElementById('collectionsList');
  if (!collectionList) return;

  const collections = [
    { title: 'The Morning Collection', description: 'Balanced favorites for slow, beautiful starts.', items: 4 },
    { title: 'The Espresso Collection', description: 'For silky shots, creamy milk drinks and deep comfort.', items: 3 },
    { title: 'The Rare Collection', description: 'Micro-lots and limited releases from exceptional origins.', items: 5 },
    { title: 'The Gift Collection', description: 'Curated boxes with premium tasting notes and thoughtful rituals.', items: 4 },
    { title: 'The Beginner Collection', description: 'Easy, rewarding coffees for a confident first step.', items: 3 },
    { title: 'The Coffee Connoisseur', description: 'Complex, expressive coffees for deeply curious palates.', items: 4 }
  ];

  collectionList.innerHTML = collections.map((collection) => `
    <article class="collection-card reveal">
      <div class="thumb"></div>
      <h3>${escapeHTML(collection.title)}</h3>
      <p>${escapeHTML(collection.description)}</p>
      <div class="pill-group">
        <span>${collection.items} coffees</span>
        <span>Curated</span>
      </div>
      <a class="view-link" href="shop.html">Explore collection →</a>
    </article>
  `).join('');
}

function setupHomePage() {
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    renderProductCards();
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim().toLowerCase();
      const results = document.getElementById('searchResults');
      if (!results) return;

      if (!query) {
        results.innerHTML = `<div class="empty-state"><div><h4>${translate('Search collection')}</h4><p>${translate('Type to explore the catalog.')}</p></div></div>`;
        return;
      }

      const matches = window.COFFEE_TRIP_PRODUCTS.filter((sourceProduct) => {
        const product = getLocalizedProduct(sourceProduct);
        const haystack = [product.name, product.origin, product.category, product.roast, ...product.notes].join(' ').toLowerCase();
        return fuzzyContains(haystack, query);
      });

      results.innerHTML = matches.slice(0, 6).map((sourceProduct) => {
        const product = getLocalizedProduct(sourceProduct);
        return `
        <button class="search-result" data-search-id="${product.id}">
          <span>
            <strong>${escapeHTML(product.name)}</strong>
            <small>${escapeHTML(product.origin)} · ${escapeHTML(product.category)}</small>
          </span>
          <span>${getPriceLabel(product)}</span>
        </button>
        `;
      }).join('');

      results.querySelectorAll('[data-search-id]').forEach((button) => {
        button.addEventListener('click', () => {
          closeOverlays();
          window.location.href = `product.html?id=${button.dataset.searchId}`;
        });
      });
    });
  }
}

function initPage() {
  updateCounters();
  renderCart();
  renderWishlist();
  renderProductPage();
  buildCollections();
  setupHomePage();
  setupGlobalInteractions();
  ensureJourneyLinks();
  setupRevealObserver();
  setupLuxuryInteractions();

  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hide'), 1900);
  }

  document.getElementById('backdrop')?.addEventListener('click', closeDrawers);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDrawers();
      closeOverlays();
      const chat = document.getElementById('chatPanel');
      if (chat) chat.classList.remove('open');
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openOverlay('searchOverlay');
      document.getElementById('searchInput')?.focus();
    }
  });
}

window.addEventListener('coffeeTrip:languageChanged', () => {
  renderCart();
  renderWishlist();
  renderProductCards();
  renderRelatedProducts();
  renderProductPage();

  const searchInput = document.getElementById('searchInput');
  if (searchInput?.value.trim()) searchInput.dispatchEvent(new Event('input'));
});

window.addEventListener('DOMContentLoaded', initPage);
