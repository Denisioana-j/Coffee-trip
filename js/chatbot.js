const CHAT_PROMPTS = [
  'ce cafea recomanzi?',
  'vreau ceva ieftin',
  'vreau ceva premium',
  'vreau ceva floral',
  'vreau ceva dulce',
  'vreau espresso',
  'vreau ceva tare',
  'ce merge cu lapte?',
  'ce merge cu french press?',
  'care e cea mai bună cafea?',
  'care e cea mai rară?',
  'ce cafea recomanzi?'
];

function initChatbot() {
  const launcher = document.getElementById('chatLauncher');
  const panel = document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const messages = document.getElementById('chatMessages');

  if (!launcher || !panel || !input || !messages) return;

  launcher.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && messages.children.length === 0) {
      appendChatMessage('bot', 'Bun venit la Coffee Trip. Sunt EVA, Barista AI. Spune-mi ce gusturi îți plac și îți fac o recomandare.');
    }
    setTimeout(() => input.focus(), 250);
  });

  close?.addEventListener('click', () => panel.classList.remove('open'));

  send.addEventListener('click', () => processChat(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      processChat(input.value);
    }
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
    element.className = `chat-message ${sender}`;

    let content = `<div>${escapeHTML(text)}</div>`;
    if (products.length) {
      content += products.slice(0, 2).map((product) => `
        <div class="recommendation">
          <strong>${escapeHTML(product.name)}</strong>
          <small>${escapeHTML(product.origin)} · ${getPriceLabel(product)}</small>
          <a href="product.html?id=${product.id}">Vezi produsul →</a>
          <button data-chat-add="${product.id}">+ Adaugă în coș</button>
        </div>
      `).join('');
    }

    element.innerHTML = content;
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
  }

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-chat-add]');
    if (!add) return;
    addToCart(Number(add.dataset.chatAdd));
    add.textContent = '✓ Adăugat';
  });
}

function getEVAResponse(query) {
  const normalized = normalizeText(query);
  const intents = getIntents(normalized);
  const topIntent = intents[0]?.intent || 'recommendation';

  const recommendations = recommend(normalized);
  const selected = recommendations[0] || window.COFFEE_TRIP_PRODUCTS[0];

  const responseMap = {
    sweet: `Pentru un profil dulce și ciocolatos, aș începe cu ${selected.name}. ${selected.description}`,
    floral: `Pentru un profil floral și elegant, ${selected.name} este potrivit. ${selected.description}`,
    fruity: `Pentru ceva fructat și vibrant, ${selected.name} ar putea fi alegerea perfectă. ${selected.description}`,
    strong: `Dacă vrei ceva tare, ${selected.name} te poate surprinde cu profunzime și intensitate. ${selected.description}`,
    light: `Pentru un profil ușor și delicat, ${selected.name} este o opțiune excelentă. ${selected.description}`,
    rare: `Dacă vrei ceva rar și premium, ${selected.name} este o selecție extraordinară. ${selected.description}`,
    origin: `Aș recomanda ${selected.name} pentru originea menționată. ${selected.description}`,
    recommendation: `Cred că ${selected.name} ar fi perfect pentru tine. ${selected.description}`,
    price: `${selected.name} este una dintre selecțiile Coffee Trip. Prețul este momentan necunoscut. Îți pot arăta produsul sau îți pot recomanda alte cafele.`,
    greeting: 'Bun venit la Coffee Trip. Spune-mi ce gusturi îți plac și îți recomand ceva potrivit.'
  };

  return {
    text: responseMap[topIntent] || 'Sunt EVA și pot recomanda cafele în funcție de gusturi, intensitate și origine.',
    products: recommendations.slice(0, 2)
  };
}

function getIntents(text) {
  const intentKeywords = {
    greeting: ['salut', 'bună', 'buna', 'hello', 'hei', 'hey'],
    sweet: ['dulce', 'ciocolatos', 'ciocolatos', 'caramel', 'toffee', 'hazelnut', 'cacao', 'chocolate'],
    floral: ['floral', 'iasomie', 'jasmine', 'bergamot', 'rose', 'trandafir'],
    fruity: ['fructat', 'fructata', 'peach', 'piersică', 'apricot', 'citrus', 'orange', 'tangerine'],
    strong: ['tare', 'puternic', 'intens', 'espresso', 'dark'],
    light: ['light', 'ușoară', 'usoara', 'delicata', 'delicat'],
    rare: ['rar', 'premium', 'exclusive', 'geisha', 'mountain'],
    origin: ['ethiopia', 'colombia', 'brazil', 'guatemala', 'kenya', 'panama'],
    price: ['ieftin', 'pret', 'preț', 'buget', 'sub 70']
  };

  return Object.entries(intentKeywords)
    .map(([intent, keywords]) => ({ intent, score: keywords.filter((keyword) => fuzzyContains(text, keyword)).length }))
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
  const combined = [product.name, product.origin, product.category, product.roast, ...product.notes].join(' ').toLowerCase();
  let score = 0;

  if (fuzzyContains(text, 'dulce') && product.notes.some((note) => /caramel|chocolate|cocoa|hazelnut/.test(note.toLowerCase()))) score += 6;
  if (fuzzyContains(text, 'floral') && product.notes.some((note) => /jasmine|rose|bergamot|floral/.test(note.toLowerCase()))) score += 6;
  if (fuzzyContains(text, 'espresso') && product.category.toLowerCase().includes('espresso')) score += 6;
  if (fuzzyContains(text, 'tare') && (product.roast.toLowerCase().includes('dark') || product.category.toLowerCase().includes('espresso'))) score += 6;
  if (fuzzyContains(text, 'ieftin') && product.price <= 70) score += 6;
  if (fuzzyContains(text, 'premium') && product.price >= 150) score += 6;
  if (fuzzyContains(text, 'panama') && product.origin.toLowerCase().includes('panama')) score += 8;
  if (fuzzyContains(text, 'ethiopia') && product.origin.toLowerCase().includes('ethiopia')) score += 8;

  if (fuzzyContains(combined, text)) score += 4;

  return score;
}

window.addEventListener('DOMContentLoaded', initChatbot);
