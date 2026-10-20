// Coffee Trip — EVA Barista AI Engine
function initChatbot() {
  const launcher = document.getElementById('barista-launcher') || document.getElementById('chatLauncher');
  const panel = document.getElementById('chat') || document.getElementById('chatPanel');
  const close = document.getElementById('chatClose');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const messages = document.getElementById('messages') || document.getElementById('chatMessages');
  const backdrop = document.getElementById('backdrop');

  if (!launcher || !panel || !input || !messages) return;

  launcher.addEventListener('click', () => {
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
    }
  });

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
    }

    element.innerHTML = content;
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
  }

  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-chat-add]');
    if (!add) return;
    const pid = Number(add.dataset.chatAdd);
    if (typeof addToCart === 'function') {
      addToCart(pid);
    }
    add.textContent = '✓ Adăugat';
    add.style.background = '#4CAF50';
    add.style.color = '#fff';
  });
}

function getEVAResponse(query) {
  const normalized = normalizeText(query);
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
}

window.addEventListener('DOMContentLoaded', initChatbot);
