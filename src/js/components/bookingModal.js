import { companyInfo } from '../data.js';
export function renderBookingModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'booking-modal';

  overlay.innerHTML = `
    <div class="modal-container animate-fade-in" role="dialog" aria-modal="true" aria-label="Book a consultation" tabindex="-1">
      <div class="modal-header">
        <div>
          <span class="tag-gold" style="margin-bottom: 0.35rem; display: inline-block;">Private Advisory</span>
          <h3 class="modal-title">Book A Consultation</h3>
        </div>
        <button class="modal-close-btn" id="close-booking-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
          Speak with our international real estate specialists for tailored property sourcing, yield analysis, and Golden Visa guidance.
        </p>

        <form id="consultation-form" onsubmit="event.preventDefault(); window.handleBookingSubmit(this);">
          <div class="modal-form-grid">
            <div>
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">FIRST NAME *</label>
              <input type="text" required placeholder="John" style="width:100%;" />
            </div>
            <div>
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">LAST NAME *</label>
              <input type="text" required placeholder="Doe" style="width:100%;" />
            </div>
            <div>
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">EMAIL ADDRESS *</label>
              <input type="email" required placeholder="john@example.com" style="width:100%;" />
            </div>
            <div>
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">PHONE NUMBER *</label>
              <input type="tel" required placeholder="+44 7123 456789" style="width:100%;" />
            </div>
            <div>
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">TARGET DESTINATION</label>
              <select style="width:100%;">
                <option value="uk">United Kingdom</option>
                <option value="uae">United Arab Emirates (Dubai / Abu Dhabi)</option>
                <option value="greece">Greece (Golden Visa)</option>
                <option value="cyprus">Cyprus</option>
                <option value="turkey">Turkey (Citizenship)</option>
                <option value="multiple">Multiple / Undecided</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">INVESTMENT BUDGET</label>
              <select style="width:100%;">
                <option value="below-250k">Under £250,000 / $300k</option>
                <option value="250k-500k">£250,000 - £500,000</option>
                <option value="500k-1m">£500,000 - £1,000,000</option>
                <option value="above-1m">£1,000,000+ / Ultra-Prime</option>
              </select>
            </div>
            <div class="full-width">
              <label style="display:block; font-size: 0.8rem; font-weight:600; color:var(--text-gold); margin-bottom:0.35rem;">YOUR MESSAGE & SPECIFIC REQUIREMENTS</label>
              <textarea rows="3" placeholder="Tell us about your investment timeline, property type preferences, or residency goals..." style="width:100%;"></textarea>
            </div>
            <div class="full-width" style="margin-top: 0.5rem;">
              <button type="submit" class="btn-primary" style="width:100%; justify-content:center;">
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </form>

        <div id="booking-success-msg" style="display:none; text-align:center; padding: 2rem 1rem;">
          <div style="font-size: 3rem; color: var(--primary-gold); margin-bottom: 0.5rem;">✓</div>
          <h4 style="font-family: var(--font-heading); font-size: 1.5rem; color: #FFF; margin-bottom: 0.5rem;">Consultation Requested!</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Thank you for reaching out to ASILI Holding Ltd. Our senior investment advisor will contact you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);


  const form = overlay.querySelector('form');
  const names = ['firstName','lastName','email','phone','destination','budget','message'];
  form.querySelectorAll('input, select, textarea').forEach((field, index) => {
    field.name = names[index];
    field.id = `booking-${names[index]}`;
    field.previousElementSibling?.setAttribute('for', field.id);
  });
  const status = document.getElementById('booking-success-msg');
  status.setAttribute('role', 'status');
  let returnFocus;
  const close = () => {
    overlay.classList.remove('active');
    returnFocus?.focus();
  };
  overlay.addEventListener('booking-open', () => {
    returnFocus = document.activeElement;
    status.style.display = 'none';
    form.style.display = 'block';
    form.querySelector('input').focus();
  });
  document.getElementById('close-booking-modal').setAttribute('aria-label', 'Close consultation');
  document.getElementById('close-booking-modal').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const fields = [...overlay.querySelectorAll('button,input,select,textarea,a[href]')].filter(el => !el.disabled && el.getClientRects().length);
      const first = fields[0], last = fields.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.handleBookingSubmit = async function(form) {
    if (!form.reportValidity()) return;
    const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;
    const button = form.querySelector('[type="submit"]');
    const data = new FormData(form);
    if (window.router?.currentRoute === 'property') data.set('property', window.router.currentParams.id);
    if (window.router?.currentParams.country) data.set('sourceCountry', window.router.currentParams.country);
    status.style.display = 'block';
    if (!endpoint) {
      const body = [...data].map(([key,value]) => `${key}: ${value}`).join('\n');
      const link = document.createElement('a');
      link.href = `mailto:${companyInfo.email}?subject=${encodeURIComponent('ASILI consultation enquiry')}&body=${encodeURIComponent(body)}`;
      link.textContent = 'Open email draft';
      status.replaceChildren(document.createTextNode('Send your enquiry using your email app. Your message has not been sent yet. '), link);
      return;
    }
    button.disabled = true;
    status.textContent = 'Sending your enquiry...';
    try {
      const response = await fetch(endpoint, {method:'POST', headers:{Accept:'application/json'}, body:data});
      if (!response.ok) throw new Error('Submission failed');
      status.textContent = 'Thank you. Your enquiry has been sent.';
      form.reset();
    } catch {
      status.textContent = `Your enquiry could not be sent. Please try again or email ${companyInfo.email}.`;
    } finally { button.disabled = false; }
  };
}

export function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    document.getElementById('property-modal')?.classList.remove('active');
    modal.classList.add('active');
    modal.dispatchEvent(new Event('booking-open'));
  }
}
