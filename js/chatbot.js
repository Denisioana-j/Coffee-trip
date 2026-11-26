const CHAT_STORAGE_KEY = 'coffeeTripBaristaConversation';

const BARISTA_CUP_SVG = `
      <svg class="barista-cup" viewBox="0 0 48 48" role="img" aria-label="Pahar de cafea Barista cu ochi expresivi">
        <path class="cup-steam" d="M20 8c-3-3 3-4 0-7M28 8c3-3-3-4 0-7" fill="none" stroke="#00704A" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M11 14h26l-1.8 3H12.8z" fill="#1E3932"/>
        <rect x="10" y="11" width="28" height="5" rx="2" fill="#00704A" stroke="#EFE3CE" stroke-width=".8"/>
        <path d="M13 17h22l-3.4 25H16.4z" fill="#EFE3CE" stroke="#F4EFE6" stroke-width="1"/>
        <path d="M15.2 24h17.6l-1.1 10H16.3z" fill="#006039"/>
        <path d="M18 28.5c1.2-1.2 3.4-1.2 4.6 0M25.4 28.5c1.2-1.2 3.4-1.2 4.6 0" fill="none" stroke="#EFE3CE" stroke-width="1.4" stroke-linecap="round"/>
        <ellipse class="cup-eye left" cx="20.3" cy="27.5" rx="2.1" ry="3" fill="#11110F"/>
        <ellipse class="cup-eye right" cx="27.7" cy="27.5" rx="2.1" ry="3" fill="#11110F"/>
        <circle cx="19.7" cy="26.6" r=".55" fill="#F4EFE6"/>
        <circle cx="27.1" cy="26.6" r=".55" fill="#F4EFE6"/>
        <path d="M16.4 42h15.2l-.8 3H17.2z" fill="#00704A"/>
      </svg>`;

const CHAT_SUGGESTIONS = [
  ['Vreau ceva floral și fructat', 'Floral & fructat'],
  ['Prefer gustul de ciocolată și caramel', 'Ciocolată & caramel'],
  ['Cum prepar o cafea la V60?', 'Preparare V60']
];

const COFFEE_PREFERENCES = [
  { name: 'floral', terms: ['floral', 'iasomie', 'jasmine', 'bergamota', 'trandafir', 'rose'], weight: 6 },
  { name: 'fructat', terms: ['fructat', 'fructata', 'fructe', 'piersica', 'citrice', 'coacaze', 'berry', 'afina', 'prune', 'pere'], weight: 5 },
  { name: 'ciocolatos', terms: ['ciocolata', 'ciocolatos', 'cacao', 'chocolate', 'cocoa'], weight: 6 },
  { name: 'caramelizat', terms: ['caramel', 'zahar ars', 'toffee', 'miere', 'honey'], weight: 5 },
  { name: 'corpolent', terms: ['corp plin', 'corpolent', 'pamantiu', 'intens', 'puternic', 'robust', 'bold'], weight: 5 },
  { name: 'delicat', terms: ['delicat', 'catifelat', 'echilibrat', 'light', 'fin'], weight: 3 },
  { name: 'aciditate scăzută', terms: ['aciditate scazuta', 'fara aciditate', 'putin acid', 'nu acida', 'nu acru'], weight: 4 }
];

const BREW_METHODS = [
  { name: 'V60', terms: ['v60', 'pour over', 'pour-over'] },
  { name: 'Moka pot', terms: ['moka pot', 'moka', 'espressor moka'] },
  { name: 'espresso', terms: ['espresso', 'espressor'] },
  { name: 'French press', terms: ['french press', 'presa franceza'] },
  { name: 'cold brew', terms: ['cold brew', 'infuzie la rece'] },
  { name: 'Aeropress', terms: ['aeropress', 'aero press'] },
  { name: 'batch brew', terms: ['batch brew', 'filtru automat'] }
];

function ensureChatbotMarkup() {
  document.querySelectorAll('#chatLauncher, #chatPanel, #barista-launcher, #chat').forEach((element) => element.remove());

  const suggestions = CHAT_SUGGESTIONS.map(([prompt, label]) => (
    `<button type="button" data-chat-suggestion="${escapeHTML(prompt)}">${escapeHTML(label)}</button>`
  )).join('');

  document.body.insertAdjacentHTML('beforeend', `
    <button id="barista-launcher" type="button" aria-label="Deschide Barista AI" aria-controls="chat" aria-expanded="false">
      <div class="bot-head" aria-hidden="true">${BARISTA_CUP_SVG}</div>
      <span class="barista-text">BARISTA</span>
    </button>
    <aside id="chat" aria-label="Barista AI" aria-hidden="true">
      <div class="chat-head">
        <div class="bot-head" aria-hidden="true">${BARISTA_CUP_SVG}</div>
        <div class="chat-agent">
          <strong>EVA · BARISTA AI</strong>
          <span><i class="online-dot"></i> ONLINE · RECOMANDĂRI DIN CATALOG</span>
        </div>
        <button id="chatClose" class="chat-close" type="button" aria-label="Închide conversația">×</button>
      </div>
      <div class="chat-intro">
        <p class="eyebrow gold">COFFEE CONCIERGE</p>
        <h3>Cu ce cafea<br>începem?</h3>
        <p>Întreabă-mă orice despre cafea sau spune-mi ce gusturi preferi.</p>
      </div>
      <div class="chat-toolbar">
        <button id="chatReset" type="button">Conversație nouă</button>
      </div>
      <div class="chat-suggestions">${suggestions}</div>
      <div id="messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="chat-input">
        <input type="text" id="chatInput" placeholder="Scrie un mesaj..." autocomplete="off" maxlength="1000" enterkeyhint="send" aria-label="Mesaj pentru Barista AI">
        <button id="chatSend" type="button" aria-label="Trimite mesajul">→</button>
      </div>
      <div class="chat-status">Răspunsuri locale · Catalog Coffee Trip</div>
    </aside>
  `);
}

function initChatbot() {
  ensureChatbotMarkup();

  const launcher = document.getElementById('barista-launcher');
  const panel = document.getElementById('chat');
  const close = document.getElementById('chatClose');
  const reset = document.getElementById('chatReset');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const messages = document.getElementById('messages');
  const products = Array.isArray(window.COFFEE_TRIP_PRODUCTS) ? window.COFFEE_TRIP_PRODUCTS : [];
  let chatHistory = loadChatHistory();

  if (!launcher || !panel || !close || !reset || !input || !send || !messages) return;

  renderHistory();

  launcher.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    launcher.setAttribute('aria-expanded', String(isOpen));
    panel.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen && chatHistory.length === 0) {
      addMessage('assistant', 'Bun venit la Coffee Trip. Sunt EVA. Poți întreba despre preparare, gusturi sau produse; țin cont de mesajele tale pe parcursul conversației.');
    }
    if (isOpen) window.setTimeout(() => input.focus(), 150);
  });

  close.addEventListener('click', closeChat);
  reset.addEventListener('click', resetConversation);
  send.addEventListener('click', submitMessage);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      submitMessage();
    }
  });

  document.querySelectorAll('[data-chat-suggestion]').forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.chatSuggestion || '';
      submitMessage();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeChat();
  });

  messages.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-chat-add]');
    if (!addButton) return;

    const product = products.find((item) => item.sku === addButton.dataset.chatAdd);
    if (!product || typeof window.addToCart !== 'function') {
      console.error('Barista AI: produsul sau funcția de adăugare în coș nu este disponibilă.');
      addButton.textContent = 'Indisponibil';
      addButton.disabled = true;
      return;
    }

    window.addToCart(product.id);
    addButton.textContent = 'Adăugat în coș';
    addButton.disabled = true;
  });

  function submitMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    addMessage('user', text);
    panel.classList.add('is-thinking');

    window.setTimeout(() => {
      const response = buildResponse(text);
      panel.classList.remove('is-thinking');
      addMessage('assistant', response.text, response.products, response.cardTitle);
      if (response.products.length) {
        panel.classList.add('is-recommending');
        window.setTimeout(() => panel.classList.remove('is-recommending'), 900);
      }
    }, 180);
  }

  function buildResponse(query) {
    const userMessages = chatHistory.filter((message) => message.role === 'user').map((message) => message.text);
    const profileText = userMessages.join(' ');
    const queryText = normalizeText(query);
    const productMention = findProductMention(query);
    const explicitRecommendation = asksForRecommendation(queryText);
    const userTurnCount = userMessages.length;
    const alreadyRecommended = chatHistory.some((message) => (
      message.role === 'assistant'
      && ['Cafeaua care te definește', 'Produsul care ți se potrivește'].includes(message.cardTitle)
    ));
    const shouldRecommend = explicitRecommendation || (userTurnCount >= 3 && !alreadyRecommended);

    const answer = answerQuestion(query, queryText, productMention, profileText);
    if (!shouldRecommend || products.length === 0) return answer;

    const recommendation = chooseRecommendation(profileText, queryText);
    if (!recommendation) return answer;

    const title = recommendation.category === 'Cafea de Origine'
      || recommendation.category === 'Cafea Rară'
      || recommendation.category === 'Blenduri de Cafea'
      ? 'Cafeaua care te definește'
      : 'Produsul care ți se potrivește';
    const reason = explainRecommendation(recommendation, profileText);
    const recommendationText = `${title}: ${recommendation.name}. ${reason}`;

    return {
      text: answer.text ? `${answer.text}\n\n${recommendationText}` : recommendationText,
      products: [recommendation],
      cardTitle: title
    };
  }

  function answerQuestion(query, normalizedQuery, productMention, profileText) {
    if (/\b(compara|comparatie|diferenta|diferente|versus|vs)\b/.test(normalizedQuery)) {
      if (containsAny(normalizedQuery, ['arabica', 'robusta'])) {
        const blend = productBySku('CT-008');
        return {
          text: `Arabica este asociată de obicei cu profile mai aromatice și variate, iar Robusta cu mai mult corp și un gust mai intens. Ca exemplu concret din catalog, ${blend?.name || 'Coffee Trip Signature Blend'} este descrisă ca ${blend?.specifications || '80% Arabica / 20% Robusta'}.`,
          products: blend ? [blend] : [],
          cardTitle: 'Exemplu din catalog'
        };
      }
      return { text: compareProducts(query), products: [], cardTitle: '' };
    }

    const productIntent = /\b(ct[-\s]*0*\d{1,3}|sku|catalog|produs)\b/.test(normalizedQuery);
    if (productMention && (productIntent || /\b(pret|costa|specificatii|ambalaj|cat)\b/.test(normalizedQuery))) {
      return {
        text: describeProduct(productMention),
        products: [productMention],
        cardTitle: 'Detalii din catalog'
      };
    }

    const method = BREW_METHODS.find((item) => item.terms.some((term) => normalizedQuery.includes(normalizeText(term))));
    if (method && /\b(cum|prepar\w*|fac\w*|macin\w*|rasn\w*|metod\w*|retet\w*|brew|grind)\b/.test(normalizedQuery)) {
      return { text: preparationAnswer(method.name), products: [], cardTitle: '' };
    }

    if (/\b(aciditate|acida|acru|acrisor)\b/.test(normalizedQuery)) {
      return {
        text: 'În degustare, aciditatea descrie senzația vie/fructată a cafelei, nu neapărat un gust neplăcut. O ceașcă prea acră poate indica și o extracție insuficientă; ajustează măcinătura mai fin sau prelungește puțin timpul. În catalog, Columbia Supremo este notată cu aciditate medie.',
        products: productBySku('CT-003') ? [productBySku('CT-003')] : [],
        cardTitle: 'Exemplu din catalog'
      };
    }

    if (/\b(decaf|decafeinizat|cofeina|cafeina)\b/.test(normalizedQuery)) {
      const decaf = products.find((product) => product.sku === 'CT-012');
      return {
        text: decaf
          ? `În catalog există ${decaf.name} (${decaf.sku}), descrisă ca „${decaf.specifications}”. Catalogul nu precizează cantitatea de cofeină rămasă, așa că nu pot confirma o valoare exactă.`
          : 'Nu găsesc o cafea decafeinizată în catalogul încărcat.',
        products: decaf ? [decaf] : [],
        cardTitle: 'Opțiune din catalog'
      };
    }

    if (asksForRecommendation(normalizedQuery)) {
      const profile = summarizeProfile(profileText);
      return {
        text: profile
          ? `Țin cont de profilul pe care l-ai descris: ${profile}. Îți aleg o cafea din catalog care se potrivește acestor preferințe.`
          : 'Încă nu mi-ai descris preferințele, așa că îți voi propune un punct de pornire din catalog. Spune-mi apoi ce ai vrea să fie diferit.',
        products: [],
        cardTitle: ''
      };
    }

    if (/\b(pret|costa|cost|buget|ieftin|ieftina|ieftina|lei|ron)\b/.test(normalizedQuery)) {
      return answerPriceQuestion(query, productMention, profileText);
    }

    if (/\b(gust|aroma|arome|note|profil|prefer)\b/.test(normalizedQuery) && containsAny(normalizedQuery, ['ce gust', 'ce aroma', 'ce arome', 'ce profil'])) {
      return {
        text: `În catalog, de exemplu, ${productBySku('CT-001')?.name || 'Etiopia Yirgacheffe'} are note florale, ${productBySku('CT-002')?.name || 'Brazilia Santos'} are note de ciocolată, iar ${productBySku('CT-007')?.name || 'Sumatra Mandheling'} este descrisă cu corp plin și profil pământiu. Ce direcție te atrage?`,
        products: [],
        cardTitle: ''
      };
    }

    if (/\b(salut|buna|buna ziua|hello|hei|servus)\b/.test(normalizedQuery)) {
      return { text: 'Bună! Poți să-mi scrii liber despre gusturi, metoda de preparare, cofeină, buget sau un produs din catalog.', products: [], cardTitle: '' };
    }

    const preference = latestPreferenceSummary(query);
    if (preference) {
      return {
        text: `Am notat: ${preference}. ${followUpForProfile(profileText)}`,
        products: [],
        cardTitle: ''
      };
    }

    if (productMention) {
      return { text: describeProduct(productMention), products: [productMention], cardTitle: 'Produs din catalog' };
    }

    if (/\b(cafea|cafeaua|espresso|macinare|rasnita|filtru|ceai|matcha)\b/.test(normalizedQuery)) {
      return {
        text: `Pot răspunde pe baza catalogului și a metodelor de preparare. Pentru detalii de produs, scrie numele sau codul CT; pentru o recomandare, spune-mi ce arome îți plac, cum o prepari și ce buget ai. ${profileText ? `Din ce ai spus până acum, am reținut: ${summarizeProfile(profileText)}.` : ''}`.trim(),
        products: [],
        cardTitle: ''
      };
    }

    return {
      text: 'Sunt specializată în cafea și produsele Coffee Trip. Întreabă-mă despre metode de preparare, gusturi, cofeină, prețuri sau un produs anume din catalog.',
      products: [],
      cardTitle: ''
    };
  }

  function answerPriceQuestion(query, productMention, profileText) {
    if (productMention) {
      return { text: describeProduct(productMention), products: [productMention], cardTitle: 'Preț și specificații' };
    }

    const budget = extractBudget(query);
    const candidates = products.filter(isCoffeeProduct).sort((a, b) => a.price - b.price);
    if (budget) {
      const withinBudget = candidates.filter((product) => product.price <= budget);
      if (withinBudget.length) {
        const picks = rankProducts(profileText, query).filter((product) => withinBudget.includes(product)).slice(0, 3);
        return {
          text: `Pentru bugetul de aproximativ ${budget} RON, aceste cafele din catalog se încadrează după prețul listat. Prețurile marcate estimativ trebuie confirmate înainte de comandă.`,
          products: picks,
          cardTitle: 'Cafele în buget'
        };
      }
      return {
        text: `Nu găsesc în catalog o cafea cu preț listat de cel mult ${budget} RON. Cea mai apropiată este ${describeProduct(candidates[0])}`,
        products: [candidates[0]],
        cardTitle: 'Cea mai apropiată de buget'
      };
    }

    const exact = candidates.filter((product) => !product.isEstimatedPrice);
    const lowest = exact[0] || candidates[0];
    const highest = [...candidates].sort((a, b) => b.price - a.price)[0];
    return {
      text: `În catalog sunt cafele cu prețuri exacte de la ${formatProductPrice(lowest)} (${lowest.name}) și selecții cu prețuri estimative. ${highest.name} este listată la ${formatProductPrice(highest)}. Întreabă-mă după codul CT pentru detaliile unui produs.`,
      products: [lowest, highest],
      cardTitle: 'Exemple de prețuri'
    };
  }

  function addMessage(role, text, messageProducts = [], cardTitle = '') {
    const entry = {
      role,
      text,
      products: messageProducts.map((product) => product.sku),
      cardTitle
    };
    chatHistory.push(entry);
    saveChatHistory(chatHistory);
    renderMessage(entry);
  }

  function renderHistory() {
    messages.replaceChildren();
    chatHistory.forEach(renderMessage);
  }

  function renderMessage(entry) {
    const element = document.createElement('div');
    element.className = `message ${entry.role === 'user' ? 'user' : 'bot'}`;

    const text = document.createElement('div');
    text.textContent = entry.text;
    element.appendChild(text);

    const messageProducts = (entry.products || []).map(productBySku).filter(Boolean);
    if (messageProducts.length) {
      const cards = document.createElement('div');
      cards.className = 'chat-product-cards';
      messageProducts.forEach((product) => cards.appendChild(renderProductCard(product, entry.cardTitle || 'Produs din catalog')));
      element.appendChild(cards);
    }

    messages.appendChild(element);
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
  }

  function renderProductCard(product, title) {
    const card = document.createElement('div');
    card.className = 'recommendation';
    const price = `${formatProductPrice(product)}${product.isEstimatedPrice ? ' (estimativ)' : ''}`;
    const detailsUrl = `product.html?id=${encodeURIComponent(product.sku)}`;

    card.innerHTML = `
      <span class="recommendation-label">${escapeHTML(title)}</span>
      <strong>${escapeHTML(product.name)}</strong>
      <small>${escapeHTML(product.sku)} · ${escapeHTML(product.category)}</small>
      <small>${escapeHTML(product.specifications)}</small>
      <small>Preț: ${escapeHTML(price)}</small>
      ${product.isEstimatedPrice ? '<small class="price-estimate-note">Preț estimativ, conform catalogului.</small>' : ''}
      <a href="${escapeHTML(detailsUrl)}">Vezi produsul</a>
      <button type="button" data-chat-add="${escapeHTML(product.sku)}">Adaugă în coș</button>
    `;
    return card;
  }

  function resetConversation() {
    chatHistory = [];
    messages.replaceChildren();
    try {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (error) {
      console.warn('Barista AI: nu s-a putut șterge conversația salvată local.', error);
    }
    addMessage('assistant', 'Am început o conversație nouă. Spune-mi ce gusturi, metode de preparare sau buget ai în minte.');
    input.focus();
  }

  function closeChat() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.setAttribute('aria-expanded', 'false');
  }

  function productBySku(sku) {
    return products.find((product) => product.sku === sku);
  }
}

function loadChatHistory() {
  try {
    const serialized = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!serialized) return [];
    const history = JSON.parse(serialized);
    if (!Array.isArray(history)) {
      console.warn('Barista AI: formatul conversației salvate nu este valid.');
      return [];
    }
    return history.filter((entry) => (
      entry
      && (entry.role === 'user' || entry.role === 'assistant')
      && typeof entry.text === 'string'
    )).map((entry) => ({
      role: entry.role,
      text: entry.text,
      products: Array.isArray(entry.products) ? entry.products.filter((sku) => typeof sku === 'string') : [],
      cardTitle: typeof entry.cardTitle === 'string' ? entry.cardTitle : ''
    }));
  } catch (error) {
    console.warn('Barista AI: conversația salvată nu a putut fi citită.', error);
    return [];
  }
}

function saveChatHistory(history) {
  try {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Barista AI: conversația nu a putut fi salvată local.', error);
  }
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsAny(text, terms) {
  const normalized = normalizeText(text);
  return terms.some((term) => normalized.includes(normalizeText(term)));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function formatProductPrice(product) {
  return `${Number(product.price).toLocaleString('ro-RO')} RON`;
}

function isCoffeeProduct(product) {
  return ['Cafea de Origine', 'Cafea Rară', 'Blenduri de Cafea'].includes(product.category);
}

function productBySku(sku) {
  return (window.COFFEE_TRIP_PRODUCTS || []).find((product) => product.sku === sku);
}

function findProductMention(query) {
  const products = window.COFFEE_TRIP_PRODUCTS || [];
  const normalized = normalizeText(query);
  const skuMatch = normalized.match(/\bct[-\s]*0*(\d{1,3})\b/);
  if (skuMatch) {
    const sku = `CT-${String(Number(skuMatch[1])).padStart(3, '0')}`;
    return products.find((product) => product.sku === sku) || null;
  }

  return products
    .filter((product) => {
      const name = normalizeText(product.name);
      if (normalized.includes(name)) return true;
      const distinctive = name.split(' ').filter((word) => word.length > 3);
      return distinctive.length >= 2 && normalized.includes(distinctive.slice(0, 2).join(' '));
    })
    .sort((a, b) => normalizeText(b.name).length - normalizeText(a.name).length)[0] || null;
}

function describeProduct(product) {
  return `${product.name} (${product.sku}) este în categoria „${product.category}”. Specificații: ${product.specifications}. Preț: ${formatProductPrice(product)}${product.isEstimatedPrice ? ', estimativ' : ''}.`;
}

function asksForRecommendation(text) {
  return /\b(recomand|recomanzi|recomandare|potriveste|define|defineste|mi se potriv|pentru mine|ce aleg|sugereaza|surprinde-ma)\b/.test(text)
    || /\bce cafea\b/.test(text);
}

function isNegated(text, term) {
  const normalized = normalizeText(text);
  const searchTerm = normalizeText(term);
  const index = normalized.indexOf(searchTerm);
  if (index < 0) return false;
  const preceding = normalized.slice(Math.max(0, index - 32), index);
  return /\b(nu|fara|evit|displac|nu-mi place|nu imi place|nu vreau)\b/.test(preceding);
}

function containsPositive(text, terms) {
  return terms.some((term) => normalizeText(text).includes(normalizeText(term)) && !isNegated(text, term));
}

function extractBudget(text) {
  const normalized = normalizeText(text);
  const explicit = normalized.match(/(?:buget(?:ul)?|max(?:im)?|sub|pana la)\D{0,12}(\d{1,4})/);
  const currency = normalized.match(/\b(\d{1,4})\s*(?:ron|lei)\b/);
  const amount = explicit?.[1] || currency?.[1];
  return amount ? Number(amount) : null;
}

function chooseRecommendation(profileText, latestQuery) {
  return rankProducts(profileText, latestQuery)[0] || null;
}

function rankProducts(profileText, latestQuery) {
  const products = window.COFFEE_TRIP_PRODUCTS || [];
  const normalizedProfile = normalizeText(profileText);
  const targetText = normalizeText(`${profileText} ${latestQuery}`);
  const budget = extractBudget(profileText);
  const wantsTea = containsAny(targetText, ['ceai', 'matcha', 'rooibos']);
  const wantsAccessory = containsAny(targetText, ['rasnita', 'filtru v60', 'dripper', 'cantar', 'aeropress']);
  let candidates = products.filter((product) => {
    if (wantsTea) return product.category === 'Ceaiuri Premium';
    if (wantsAccessory) return product.category === 'Accesorii & Consumabile';
    return isCoffeeProduct(product);
  });

  if (!candidates.length) candidates = products.filter(isCoffeeProduct);

  const scores = candidates.map((product) => {
    const details = normalizeText(`${product.name} ${product.category} ${product.specifications} ${product.notes.join(' ')}`);
    let score = isCoffeeProduct(product) ? 3 : 0;

    COFFEE_PREFERENCES.forEach((preference) => {
      const positive = containsPositive(profileText, preference.terms);
      const negative = preference.terms.some((term) => isNegated(profileText, term));
      if (positive && containsAny(details, preference.terms)) score += preference.weight;
      if (negative && containsAny(details, preference.terms)) score -= preference.weight * 1.5;
    });

    BREW_METHODS.forEach((method) => {
      if (containsAny(normalizedProfile, method.terms)) {
        if (containsAny(details, method.terms)) score += 6;
        if (method.name === 'V60' && isCoffeeProduct(product) && /250g|light|medie-deschisa|note florale|note de fructe/i.test(`${product.specifications} ${product.roast}`)) score += 2;
      }
    });

    if (containsAny(normalizedProfile, ['decaf', 'decafeinizat', 'fara cofeina']) && containsAny(details, ['decaf', 'decafeinizata natural', 'fara cofeina'])) score += 12;
    if (containsAny(normalizedProfile, ['dimineata', 'dimineata devreme', 'energie', 'trezesc']) && containsAny(details, ['morning', 'espresso', 'prăjire intensă'])) score += 4;
    if (containsAny(normalizedProfile, ['relax', 'calm', 'liniste', 'seara', 'odihna'])
      && product.sku === 'CT-012') score += 6;
    if (containsAny(normalizedProfile, ['premium', 'rar', 'special', 'geisha']) && product.category === 'Cafea Rară') score += 5;
    if (budget) {
      score += product.price <= budget ? 4 : -Math.min(12, (product.price - budget) / Math.max(budget, 1));
    }
    if (!product.isEstimatedPrice) score += 0.25;
    if (/ceai|sirop|condiment|accesoriu/i.test(product.category) && !wantsTea && !wantsAccessory) score -= 4;
    return { product, score };
  });

  scores.sort((left, right) => right.score - left.score || left.product.price - right.product.price);
  return scores.map((entry) => entry.product);
}

function explainRecommendation(product, profileText) {
  const reasons = [];
  COFFEE_PREFERENCES.forEach((preference) => {
    if (containsPositive(profileText, preference.terms)
      && containsAny(`${product.name} ${product.specifications}`, preference.terms)) {
      reasons.push(`ai menționat un profil ${preference.name}, iar specificațiile produsului se potrivesc`);
    }
  });
  const method = BREW_METHODS.find((item) => containsAny(profileText, item.terms)
    && containsAny(`${product.name} ${product.specifications}`, item.terms));
  if (method) reasons.push(`ai menționat prepararea la ${method.name}`);

  if (containsAny(profileText, ['relax', 'calm', 'liniste', 'seara', 'odihna'])
    && product.sku === 'CT-012') reasons.push('ai descris un moment de relaxare, iar cafeaua este decafeinizată natural');
  if (containsAny(profileText, ['dimineata', 'energie', 'trezesc'])
    && product.sku === 'CT-009') reasons.push('ai menționat energia de dimineață, iar produsul este un espresso cu prăjire intensă');

  const budget = extractBudget(profileText);
  if (budget && product.price <= budget) reasons.push(`prețul listat se încadrează în bugetul de ${budget} RON`);
  if (containsAny(profileText, ['decaf', 'decafeinizat', 'fara cofeina'])
    && containsAny(`${product.name} ${product.specifications}`, ['decaf', 'decafeinizata natural', 'fara cofeina'])) {
    reasons.push('ai cerut o cafea decafeinizată, iar catalogul o descrie ca decafeinizată natural');
  }

  if (!reasons.length) {
    const profile = summarizeProfile(profileText);
    return profile
      ? `Am ales-o ținând cont de ce ai spus despre ${profile}.`
      : 'Ai oferit puține detalii până acum, așa că aceasta este o primă propunere din catalog; spune-mi ce ai schimba și o rafinez.';
  }
  return `Am ales-o pentru că ${reasons.join(' și ')}.`;
}

function summarizeProfile(text) {
  const parts = [];
  COFFEE_PREFERENCES.forEach((preference) => {
    if (containsPositive(text, preference.terms)) parts.push(preference.name);
  });
  const method = BREW_METHODS.find((item) => containsAny(text, item.terms));
  if (method) parts.push(method.name);
  const budget = extractBudget(text);
  if (budget) parts.push(`buget de ${budget} RON`);
  if (containsAny(text, ['dimineata', 'energie', 'trezesc'])) parts.push('cafea de dimineață');
  if (containsAny(text, ['relax', 'calm', 'liniste', 'seara', 'odihna'])) parts.push('un moment de relaxare');
  return parts.slice(0, 3).join(', ');
}

function latestPreferenceSummary(query) {
  const normalized = normalizeText(query);
  const found = COFFEE_PREFERENCES.find((preference) => containsPositive(normalized, preference.terms));
  if (found) return `preferi un profil ${found.name}`;
  const method = BREW_METHODS.find((item) => containsAny(normalized, item.terms));
  if (method) return `folosești metoda ${method.name}`;
  const budget = extractBudget(query);
  if (budget) return `ai un buget de aproximativ ${budget} RON`;
  if (containsAny(normalized, ['dimineata', 'dimineata devreme'])) return 'bei cafeaua dimineața';
  if (containsAny(normalized, ['relax', 'calm', 'liniste', 'seara', 'odihna'])) return 'cauți o cafea pentru un moment de relaxare';
  return '';
}

function followUpForProfile(text) {
  const questions = [];
  if (!COFFEE_PREFERENCES.some((preference) => containsPositive(text, preference.terms))) {
    questions.push('Ce note preferi: florale, fructate sau ciocolatoase?');
  }
  if (!BREW_METHODS.some((method) => containsAny(text, method.terms))) {
    questions.push('Cum o prepari de obicei?');
  }
  return questions[0] || 'Mai poți adăuga metoda de preparare, intensitatea dorită sau un buget.';
}

function preparationAnswer(method) {
  const advice = {
    'V60': 'Pentru o ceașcă V60, încearcă 15 g cafea măcinată mediu și 250 g apă la aproximativ 92–96°C. Toarnă întâi 40–50 g, lasă cafeaua să înflorească 30–45 de secunde, apoi toarnă restul lent, în cercuri. Un timp total de 2:30–3:30 este un reper bun; ajustează măcinătura dacă extracția e prea rapidă sau lentă.',
    'Moka pot': 'Umple baza moka pot-ului cu apă până sub valvă și coșul cu cafea măcinată mediu-fin, fără să presezi. Închide vasul și încălzește la foc mic; ia-l de pe foc când cafeaua începe să curgă deschis la culoare și să bolborosească. O măcinătură prea fină sau tasarea pot bloca curgerea.',
    'espresso': 'Ca reper de pornire, folosește 18 g cafea măcinată fin pentru aproximativ 36 g espresso, în 25–30 de secunde. Dacă curge prea repede, macină mai fin; dacă durează prea mult, macină mai grosier. Ajustează apoi după gust și echipament.',
    'French press': 'Pentru French press, încearcă 15 g cafea măcinată grosier la 250 g apă fierbinte. Amestecă ușor, lasă la infuzat aproximativ 4 minute și coboară pistonul lent. Dacă rezultatul e prea amar sau tulbure, folosește o măcinătură mai grosieră.',
    'cold brew': 'Pentru cold brew, încearcă 1 parte cafea măcinată grosier la 8 părți apă pentru concentrat sau 1:12 pentru o băutură mai lejeră. Lasă la infuzat 12–16 ore la frigider, apoi filtrează. Timpul și raportul se pot ajusta după intensitatea dorită.',
    'Aeropress': 'La Aeropress, începe cu 15 g cafea măcinată mediu-fin și 220 g apă fierbinte. Amestecă scurt, infuzează aproximativ 1–2 minute și presează lin, fără să forțezi. Schimbă măcinătura și timpul în pași mici ca să ajustezi gustul.',
    'batch brew': 'Pentru cafea la filtru automat, un raport de aproximativ 1:16 este un punct de pornire: 15 g cafea la 240 g apă. Folosește o măcinătură medie; dacă băutura e prea slabă sau prea amară, ajustează treptat măcinătura.'
  };
  return advice[method] || 'Spune-mi metoda de preparare și îți dau un raport și pași potriviți.';
}

function compareProducts(query) {
  const products = window.COFFEE_TRIP_PRODUCTS || [];
  const normalizedQuery = normalizeText(query);
  const mentionedSkus = [...normalizedQuery.matchAll(/\bct[-\s]*0*(\d{1,3})\b/g)]
    .map((match) => `CT-${String(Number(match[1])).padStart(3, '0')}`);
  const found = products.filter((product) => {
    const name = normalizeText(product.name);
    if (mentionedSkus.includes(product.sku) || normalizedQuery.includes(name)) return true;
    const distinctive = name.split(' ').filter((word) => word.length > 3);
    return distinctive.length >= 2 && normalizedQuery.includes(distinctive.slice(0, 2).join(' '));
  });
  if (found.length >= 2) {
    return found.slice(0, 2).map((product) => `${product.name} (${product.sku}): ${product.specifications}; ${formatProductPrice(product)}${product.isEstimatedPrice ? ', estimativ' : ''}`).join('\n');
  }
  const yirgacheffe = productBySku('CT-001');
  const santos = productBySku('CT-002');
  const sumatra = productBySku('CT-007');
  return `Ca diferență de profil din catalog: ${yirgacheffe?.name || 'Etiopia Yirgacheffe'} are note florale, ${santos?.name || 'Brazilia Santos'} are note de ciocolată, iar ${sumatra?.name || 'Sumatra Mandheling'} are corp plin și profil pământiu. Spune-mi codurile sau numele a două produse pentru o comparație punctuală de ambalaj și preț.`;
}

window.addEventListener('DOMContentLoaded', initChatbot);
