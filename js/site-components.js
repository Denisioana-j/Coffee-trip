function renderSharedFooter() {
  const footer = document.querySelector('footer.site-footer, footer#contact');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand">
            <span>THE ART OF</span>
            <strong>COFFEE TRIP</strong>
          </span>
          <p>Specialty coffee, carefully selected. Designed for meaningful moments.</p>
        </div>
        <div class="footer-col">
          <div class="footer-title">EXPLORE</div>
          <a href="shop.html">Shop</a>
          <a href="collections.html">Collections</a>
          <a href="atelier.html">Atelier</a>
          <a href="story.html">Our Story</a>
        </div>
        <div class="footer-col">
          <div class="footer-title">SUPPORT</div>
          <a href="faq.html#shipping">Delivery</a>
          <a href="faq.html#returns">Returns</a>
          <a href="faq.html">Frequently Asked Questions</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <div class="footer-title">CONTACT</div>
          <p>București, România</p>
          <p>hello@coffeetrip.ro</p>
          <p>+40 700 000 000</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 COFFEE TRIP — FIRMĂ DE EXERCIȚIU</span>
        <span>MADE FOR THE LOVE OF COFFEE</span>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', renderSharedFooter);
