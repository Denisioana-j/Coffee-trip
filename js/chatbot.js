<<<<<<< HEAD
=======
// Coffee Trip — EVA Barista AI Engine
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b
function initChatbot() {
  const launcher = document.getElementById('barista-launcher') || document.getElementById('chatLauncher');
  const panel = document.getElementById('chat') || document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const messages = document.getElementById('messages') || document.getElementById('chatMessages');
  const backdrop = document.getElementById('backdrop');

  if (!launcher || !panel || !input || !send || !messages) return;

  launcher.addEventListener('click', () => {
<<<<<<< HEAD
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && messages.children.length === 0) {
      appendChatMessage('bot', chatCopy().greeting);
=======
    const isOpen = panel.classList.contains('open');
    if (isOpen) {
      panel.classList.remove('open');
      backdrop?.classList.remove('visible');
    } else {
      panel.classList.add('open');
      backdrop?.classList.add('visible');
      if (messages.children.length === 0) {
        appendChatMessage('bot', 'Bun venit la Coffee Trip. Sunt EVA, Barista AI. Spune-mi ce note aromatice sau ce mod de preparare preferi și îți recomand cafeaua ideală!');
      }
      setTimeout(() => input.focus(), 250);
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b
    }
  });

<<<<<<< HEAD
  close?.addEventListener('click', () => panel.classList.remove('open'));
  send.addEventListener('click', () => processChat(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') processChat(input.value);
=======
  close?.addEventListener('click', () => {
    panel.classList.remove('open');
    backdrop?.classList.remove('visible');
  });

  backdrop?.addEventListener('click', () => {
    panel.classList.remove('open');
  });

  send?.addEventListener('click', () => processChat(input.value));
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      processChat(input.value);
    }
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b
  });

  document.querySelectorAll('[data-chat-suggestion]').forEach((button) => {
    button.addEventListener('click', () => processChat(button.dataset.chatSuggestion));
  });

  function processChat(text) {
    const query = text.trim();
    if (!query) return;
    appendChatMessage('user', query);
    input.value = '';
    const response = getEVAResponse(query);
    setTimeout(() => appendChatMessage('bot', response.text, response.products), 280);
  }

  function appendChatMessage(sender, text, products = []) {
    const element = document.createElement('div');
    element.className = sender === 'bot' ? 'message bot' : 'message user';

    let content = `<div>${escapeHTML(text)}</div>`;
<<<<<<< HEAD
    if (products.length) {
      content += products.slice(0, 2).map((product) => {
        const localized = window.CoffeeTripI18n?.product(product) || product;
        const viewLabel = chatCopy().view;
        const addLabel = chatCopy().add;
        return `
          <div class="recommendation">
            <strong>${escapeHTML(product.name)}</strong>
            <small>${escapeHTML(localized.origin)} · ${getPriceLabel(product)}</small>
            <a href="product.html?id=${product.id}">${escapeHTML(viewLabel)}</a>
            <button data-chat-add="${product.id}">+ ${escapeHTML(addLabel)}</button>
          </div>
        `;
      }).join('');
=======
    if (products && products.length) {
      content += products.slice(0, 2).map((product) => `
        <div class="recommendation" style="margin-top:12px;padding:12px;background:rgba(216,180,116,0.06);border:1px solid rgba(216,180,116,0.25);border-radius:4px;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="color:var(--gold-light);font-size:14px;font-family:var(--serif);">${escapeHTML(product.name)}</strong>
            <span style="font-weight:600;font-size:13px;color:var(--gold);">${typeof formatPrice === 'function' ? formatPrice(product.price) : product.price + ' LEI'}</span>
          </div>
          <small style="color:var(--text-muted);font-size:11px;">${escapeHTML(product.origin)} · ${escapeHTML(product.roast || 'Medium')}</small>
          <div style="display:flex;gap:8px;margin-top:4px;">
            <a href="product.html?id=${product.id}" style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--cream);text-decoration:underline;">Vezi detalii →</a>
            <button data-chat-add="${product.id}" style="margin-left:auto;background:var(--gold);color:var(--black);border:none;padding:4px 10px;font-size:10px;font-weight:600;letter-spacing:1px;border-radius:2px;cursor:pointer;">+ ADAUGĂ ÎN COȘ</button>
          </div>
        </div>
      `).join('');
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b
    }

    element.innerHTML = content;
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
  }

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-chat-add]');
    if (!add) return;
<<<<<<< HEAD
    addToCart(Number(add.dataset.chatAdd));
    add.textContent = `✓ ${chatCopy().added}`;
=======
    const pid = Number(add.dataset.chatAdd);
    if (typeof addToCart === 'function') {
      addToCart(pid);
    }
    add.textContent = '✓ Adăugat';
    add.style.background = '#4CAF50';
    add.style.color = '#fff';
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b
  });
}

function chatCopy() {
  const locale = window.CoffeeTripI18n?.locale() || 'ro';
  return {
    ro: {
      greeting: 'Bun venit la Coffee Trip. Sunt EVA, Barista AI. Spune-mi ce gusturi îți plac și îți fac o recomandare.',
      view: 'Vezi produsul →', add: 'Adaugă în coș', added: 'Adăugat'
    },
    en: {
      greeting: 'Welcome to Coffee Trip. I’m EVA, your AI barista. Tell me what flavors you enjoy and I’ll find a coffee for you.',
      view: 'View product →', add: 'Add to cart', added: 'Added'
    },
    fr: {
      greeting: 'Bienvenue chez Coffee Trip. Je suis EVA, votre barista IA. Dites-moi quels goûts vous aimez et je vous conseillerai un café.',
      view: 'Voir le produit →', add: 'Ajouter au panier', added: 'Ajouté'
    },
    es: {
      greeting: 'Te damos la bienvenida a Coffee Trip. Soy EVA, tu barista de IA. Cuéntame qué sabores te gustan y te recomendaré un café.',
      view: 'Ver producto →', add: 'Añadir al carrito', added: 'Añadido'
    }
  }[locale];
}

function getEVAResponse(query) {
  const normalized = normalizeText(query);
<<<<<<< HEAD
  const topIntent = getIntents(normalized)[0]?.intent || 'recommendation';
  const recommendations = recommend(normalized);
  const selected = recommendations[0] || window.COFFEE_TRIP_PRODUCTS[0];
  const localized = window.CoffeeTripI18n?.product(selected) || selected;
  const copy = responseCopy()[topIntent] || responseCopy().recommendation;
  const price = window.CoffeeTripI18n?.priceLabel(selected) || getPriceLabel(selected);
=======
  const products = window.COFFEE_TRIP_PRODUCTS || [];

  if (normalized.includes('dulce') || normalized.includes('ciocolat') || normalized.includes('caramel')) {
    const list = products.filter(p => p.notes?.some(n => /caramel|chocolate|toffee|dulce/i.test(n)) || p.category === 'Single Origin');
    const selected = list[0] || products[1];
    return {
      text: `Pentru un profil dulce și reconfortant, îți recomand cu căldură ${selected.name}. ${selected.description}`,
      products: list.slice(0, 2)
    };
  }

  if (normalized.includes('floral') || normalized.includes('flori') || normalized.includes('jasmine') || normalized.includes('ceai')) {
    const list = products.filter(p => p.notes?.some(n => /jasmine|bergamot|floral|rose|peach/i.test(n)) || p.roast === 'Light');
    const selected = list[0] || products[0];
    return {
      text: `Dacă apreciezi aromaticele florale și finețea citrică, alegerea de referință este ${selected.name}. ${selected.description}`,
      products: list.slice(0, 2)
    };
  }
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b

  if (normalized.includes('espresso') || normalized.includes('tare') || normalized.includes('intens') || normalized.includes('crema')) {
    const list = products.filter(p => p.category === 'Espresso' || (p.roast && p.roast.includes('Dark')));
    const selected = list[0] || products[4];
    return {
      text: `Pentru un espresso intens cu corp dens și cremă bogată, profilul impecabil este ${selected.name}. ${selected.description}`,
      products: list.slice(0, 2)
    };
  }

  if (normalized.includes('rar') || normalized.includes('geisha') || normalized.includes('special') || normalized.includes('lux') || normalized.includes('cadou')) {
    const list = products.filter(p => p.category === 'Rare Coffee' || p.badge === 'LIMITED');
    const selected = list[0] || products[3];
    return {
      text: `Pentru o experiență exclusivistă din recolte limitate, bijuteria colecției este ${selected.name}. ${selected.description}`,
      products: list.slice(0, 2)
    };
  }

  // Fallback
  return {
<<<<<<< HEAD
    text: copy(localized, price),
    products: recommendations.slice(0, 2)
  };
}

function responseCopy() {
  const locale = window.CoffeeTripI18n?.locale() || 'ro';
  return {
    ro: {
      sweet: (p) => `Pentru un profil dulce și ciocolatos, aș începe cu ${p.name}. ${p.description}`,
      floral: (p) => `Pentru un profil floral și elegant, ${p.name} este potrivit. ${p.description}`,
      fruity: (p) => `Pentru ceva fructat și vibrant, ${p.name} ar putea fi alegerea perfectă. ${p.description}`,
      strong: (p) => `Dacă vrei ceva intens, ${p.name} te poate surprinde. ${p.description}`,
      light: (p) => `Pentru un profil ușor și delicat, ${p.name} este o opțiune excelentă. ${p.description}`,
      rare: (p) => `Dacă vrei ceva rar și premium, ${p.name} este o selecție extraordinară. ${p.description}`,
      origin: (p) => `Aș recomanda ${p.name} pentru originea menționată. ${p.description}`,
      recommendation: (p) => `Cred că ${p.name} ar fi perfect pentru tine. ${p.description}`,
      price: (p, value) => `${p.name}: ${value}. ${p.description}`,
      greeting: () => 'Bun venit la Coffee Trip. Spune-mi ce gusturi îți plac și îți recomand ceva potrivit.'
    },
    en: {
      sweet: (p) => `For a sweet, chocolatey profile, try ${p.name}. ${p.description}`,
      floral: (p) => `For an elegant floral profile, ${p.name} is a lovely choice. ${p.description}`,
      fruity: (p) => `For something vibrant and fruity, try ${p.name}. ${p.description}`,
      strong: (p) => `If you want an intense cup, ${p.name} is worth exploring. ${p.description}`,
      light: (p) => `For a delicate, lighter profile, try ${p.name}. ${p.description}`,
      rare: (p) => `For a rare, premium coffee, consider ${p.name}. ${p.description}`,
      origin: (p) => `${p.name} is a great match for that origin. ${p.description}`,
      recommendation: (p) => `I think ${p.name} could be a great match for you. ${p.description}`,
      price: (p, value) => `${p.name}: ${value}. ${p.description}`,
      greeting: () => 'Welcome to Coffee Trip. Tell me what flavors you enjoy and I’ll recommend a coffee.'
    },
    fr: {
      sweet: (p) => `Pour un profil doux et chocolaté, essayez ${p.name}. ${p.description}`,
      floral: (p) => `Pour un profil floral et élégant, ${p.name} est un excellent choix. ${p.description}`,
      fruity: (p) => `Pour un café fruité et vibrant, essayez ${p.name}. ${p.description}`,
      strong: (p) => `Pour une tasse intense, découvrez ${p.name}. ${p.description}`,
      light: (p) => `Pour un profil léger et délicat, essayez ${p.name}. ${p.description}`,
      rare: (p) => `Pour un café rare et premium, découvrez ${p.name}. ${p.description}`,
      origin: (p) => `${p.name} est un excellent choix pour cette origine. ${p.description}`,
      recommendation: (p) => `${p.name} pourrait vous plaire. ${p.description}`,
      price: (p, value) => `${p.name} : ${value}. ${p.description}`,
      greeting: () => 'Bienvenue chez Coffee Trip. Dites-moi quels goûts vous aimez et je vous conseillerai un café.'
    },
    es: {
      sweet: (p) => `Para un perfil dulce y achocolatado, prueba ${p.name}. ${p.description}`,
      floral: (p) => `Para un perfil floral y elegante, ${p.name} es una gran opción. ${p.description}`,
      fruity: (p) => `Para un café afrutado y vibrante, prueba ${p.name}. ${p.description}`,
      strong: (p) => `Si buscas una taza intensa, descubre ${p.name}. ${p.description}`,
      light: (p) => `Para un perfil ligero y delicado, prueba ${p.name}. ${p.description}`,
      rare: (p) => `Para un café excepcional y prémium, descubre ${p.name}. ${p.description}`,
      origin: (p) => `${p.name} es una gran opción para ese origen. ${p.description}`,
      recommendation: (p) => `Creo que ${p.name} puede ser ideal para ti. ${p.description}`,
      price: (p, value) => `${p.name}: ${value}. ${p.description}`,
      greeting: () => 'Te damos la bienvenida a Coffee Trip. Cuéntame qué sabores te gustan y te recomendaré un café.'
    }
  }[locale];
}

function getIntents(text) {
  const intentKeywords = {
    greeting: ['salut', 'buna', 'hello', 'hi', 'bonjour', 'hola'],
    sweet: ['dulce', 'ciocolat', 'caramel', 'chocolate', 'chocolat', 'chocolatado', 'sucre', 'sweet'],
    floral: ['floral', 'iasomie', 'jasmine', 'jasmin', 'jazmin', 'bergamot', 'rose', 'trandafir'],
    fruity: ['fructat', 'fruta', 'fruit', 'peach', 'piersica', 'peche', 'melocoton', 'apricot', 'citrus', 'orange', 'naranja'],
    strong: ['tare', 'puternic', 'intens', 'espresso', 'dark', 'corsé', 'fuerte', 'intense'],
    light: ['light', 'usoara', 'delicata', 'delicat', 'leger', 'ligero'],
    rare: ['rar', 'premium', 'rare', 'exceptionnel', 'excepcional', 'geisha'],
    origin: ['ethiopia', 'etiopia', 'ethiopie', 'etiopia', 'colombia', 'colombie', 'brazil', 'bresil', 'brasil', 'guatemala', 'kenya', 'panama'],
    price: ['ieftin', 'cheap', 'pas cher', 'barato', 'pret', 'precio', 'prix', 'budget']
  };

  return Object.entries(intentKeywords)
    .map(([intent, keywords]) => ({
      intent,
      score: keywords.filter((keyword) => fuzzyContains(text, keyword)).length
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

function recommend(text) {
  return window.COFFEE_TRIP_PRODUCTS
    .map((product) => ({ product, score: scoreProduct(product, text) }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product)
    .slice(0, 4);
}

function scoreProduct(product, text) {
  const localized = window.CoffeeTripI18n?.product(product) || product;
  const combined = [product.name, localized.origin, localized.category, product.roast, ...product.notes].join(' ').toLowerCase();
  const notes = product.notes.join(' ').toLowerCase();
  let score = 0;

  if (/(dulce|sweet|chocol|caramel|chocolat|sucre)/.test(text) && /caramel|chocolate|chocolat|cocoa|hazelnut|ciocol|cacao|alune/.test(notes)) score += 6;
  if (/(floral|iasomie|jasmine|jasmin|jazmin|bergamot|rose|trandafir)/.test(text) && /jasmine|rose|bergamot|floral|iasomie|trandafir/.test(notes)) score += 6;
  if (/(espresso|expresso)/.test(text) && /espresso|expresso/.test(`${product.name} ${product.category}`.toLowerCase())) score += 6;
  if (/(tare|strong|intens|fuerte|cors)/.test(text) && /dark|intens|espresso/.test(`${product.roast} ${product.category}`.toLowerCase())) score += 6;
  if (/(ieftin|cheap|barato|pas cher|budget)/.test(text) && product.price <= 70) score += 6;
  if (/premium|rare|rar|exceptionnel|excepcional/.test(text) && product.price >= 150) score += 6;
  if (/(panama)/.test(text) && /panama/.test(localized.origin.toLowerCase())) score += 8;
  if (/(ethiopia|etiopia|ethiopie)/.test(text) && /(ethiopia|etiopia|ethiopie)/.test(localized.origin.toLowerCase())) score += 8;
  if (fuzzyContains(combined, text)) score += 4;

  return score;
=======
    text: `Iată două dintre cele mai apreciate origini din atelierul nostru. Îmi poți spune dacă preferi note florale, dulci-ciocolatoase sau un espresso puternic!`,
    products: products.filter(p => p.featured).slice(0, 2)
  };
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHTML(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
>>>>>>> 4599d79d9dddadf03943b7e00ed19a97114d8a9b
}

window.addEventListener('DOMContentLoaded', initChatbot);
