/**
 * ASILI Holding Ltd. - Global Site Footer Component
 * Modular component for universal page footer across all views
 */

export function renderFooter(mountSelector = '#footer-root') {
  const mountEl = typeof mountSelector === 'string'
    ? document.querySelector(mountSelector)
    : mountSelector;

  if (!mountEl) {
    console.error(`Footer mount container "${mountSelector}" not found.`);
    return;
  }

  const footerHtml = `
    <footer class="site-global-footer" style="background: #060910; border-top: 1px solid var(--border-light, rgba(255,255,255,0.1)); padding: 4rem 0 2rem; margin-top: auto;">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;">
          <!-- Column 1: Brand Info -->
          <div>
            <img src="/assets/ASILI_Holding_Long_Logo_WHT_Hollow_1-2003_1620.png" alt="ASILI Holding Ltd." style="height: 38px; margin-bottom: 1.25rem;"
                 onerror="this.onerror=null; this.src='/assets/ASILI_Holding_Long_Logo_WHT_with_BLK_BG_1-2003_190.png';" />
            <p style="font-size: 0.9rem; color: var(--text-secondary, #9aa0a6); line-height: 1.6; margin-bottom: 1.25rem;">
              Buy, Build, Invest – Turning Bricks to Gold™.<br>
              International real estate investment &amp; advisory across London, Dubai, Athens, Cyprus, and Istanbul.
            </p>
            <span class="tag-gold">ISO Certified Partner Network</span>
          </div>

          <!-- Column 2: Quick Navigation -->
          <div>
            <h4 style="font-family: var(--font-heading, 'Cinzel', serif); font-size: 1.1rem; color: #FFF; margin-bottom: 1rem;">Quick Navigation</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.9rem; color: var(--text-secondary, #9aa0a6); padding: 0; margin: 0;">
              <li><a href="#" data-route="home" style="color: inherit; text-decoration: none;">Home</a></li>
              <li><a href="#" data-route="about" style="color: inherit; text-decoration: none;">About Us</a></li>
              <li><a href="#" data-route="listings" style="color: inherit; text-decoration: none;">Property Marketplace</a></li>
              <li><a href="#" data-route="services" style="color: inherit; text-decoration: none;">Services &amp; Destinations</a></li>
              <li><a href="#" data-route="contact" style="color: inherit; text-decoration: none;">Contact Us</a></li>
            </ul>
          </div>

          <!-- Column 3: London HQ Office -->
          <div>
            <h4 style="font-family: var(--font-heading, 'Cinzel', serif); font-size: 1.1rem; color: #FFF; margin-bottom: 1rem;">London Office</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary, #9aa0a6); line-height: 1.6; margin-bottom: 0.75rem;">
              📍 128 Kensington High Street,<br>London, W8 4SG, United Kingdom
            </p>
            <p style="font-size: 0.9rem; color: var(--primary-gold, #c8aa5a);">
              📞 +44 (0)20 7580 8490<br>
              ✉️ info@asili.uk
            </p>
          </div>

          <!-- Column 4: Private Advisory Newsletter -->
          <div>
            <h4 style="font-family: var(--font-heading, 'Cinzel', serif); font-size: 1.1rem; color: #FFF; margin-bottom: 1rem;">Private Advisory</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary, #9aa0a6); margin-bottom: 1rem; line-height: 1.5;">
              Subscribe for off-market investment alerts and global Golden Visa updates.
            </p>
            <form onsubmit="event.preventDefault(); alert('Thank you for subscribing to ASILI Holding Private Advisory.'); this.reset();" style="display: flex; gap: 0.5rem;">
              <input type="email" required placeholder="Enter email..." style="padding: 0.6rem 0.85rem; font-size: 0.85rem; width: 100%; background: #11151c; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; color: #fff;" />
              <button type="submit" class="btn-primary" style="padding: 0.6rem 1rem; font-size: 0.85rem; white-space: nowrap;">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div style="border-top: 1px solid var(--border-light, rgba(255,255,255,0.1)); padding-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; color: var(--text-muted, #70757a);">
          <div>Copyright &copy; 2026 Asili Holding Ltd. All rights reserved.</div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" style="color: inherit; text-decoration: none;">Privacy Policy</a>
            <a href="#" style="color: inherit; text-decoration: none;">Terms &amp; Conditions</a>
            <a href="#" style="color: inherit; text-decoration: none;">Regulatory Information</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  mountEl.innerHTML = footerHtml;
}
