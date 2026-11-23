/* Buton lingvistic independent, cu steaguri și salvarea limbii. */
(() => {
  const LANGUAGE_KEY = 'coffeeTrip_language';
  const languages = {
    ro: { flag: '🇷🇴', label: 'Română', code: 'RO' },
    en: { flag: '🇬🇧', label: 'English', code: 'EN' },
    de: { flag: '🇩🇪', label: 'Deutsch', code: 'DE' },
    fr: { flag: '🇫🇷', label: 'Français', code: 'FR' }
  };
  let current = localStorage.getItem(LANGUAGE_KEY);
  if (!languages[current]) current = 'ro';

  function applyLanguage(language) {
    if (!languages[language]) return;
    current = language;
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
  }

  function buildLanguageMenu() {
    document.querySelectorAll('.header-actions').forEach((actions) => {
      if (actions.querySelector('.language-menu')) return;

      const menu = document.createElement('div');
      menu.className = 'language-menu';
      menu.innerHTML = `
        <button class="language-button" type="button" aria-label="Selectează limba" aria-haspopup="menu" aria-expanded="false">
          <span class="language-flag">${languages[current].flag}</span>
          <span class="language-code">${languages[current].code}</span>
          <svg class="language-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3"></path></svg>
        </button>
        <div class="language-options" role="menu" aria-label="Limbi disponibile">
          ${Object.entries(languages).map(([code, item]) => `
            <button type="button" role="menuitem" data-language="${code}" class="${code === current ? 'active' : ''}">
              <span class="language-flag">${item.flag}</span>
              <span>${item.label}</span>
            </button>
          `).join('')}
        </div>`;

      const trigger = menu.querySelector('.language-button');
      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });

      menu.querySelectorAll('[data-language]').forEach((option) => {
        option.addEventListener('click', () => {
          const language = option.dataset.language;
          applyLanguage(language);
          trigger.querySelector('.language-flag').textContent = languages[language].flag;
          trigger.querySelector('.language-code').textContent = languages[language].code;
          menu.querySelectorAll('[data-language]').forEach((item) => item.classList.toggle('active', item === option));
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        });
      });

      actions.insertBefore(menu, actions.firstChild);
    });
  }

  function closeMenus() {
    document.querySelectorAll('.language-menu.open').forEach((menu) => {
      menu.classList.remove('open');
      menu.querySelector('.language-button')?.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.language-menu')) closeMenus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenus();
  });

  window.addEventListener('DOMContentLoaded', () => {
    applyLanguage(current);
    buildLanguageMenu();
  });
})();
