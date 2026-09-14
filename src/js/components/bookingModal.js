export function renderBookingModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'booking-modal';

  overlay.innerHTML = `
    <div class="modal-container animate-fade-in">
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

  // Event listeners
  document.getElementById('close-booking-modal').addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  window.handleBookingSubmit = function(form) {
    form.style.display = 'none';
    document.getElementById('booking-success-msg').style.display = 'block';
    setTimeout(() => {
      overlay.classList.remove('active');
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        document.getElementById('booking-success-msg').style.display = 'none';
      }, 400);
    }, 2500);
  };
}

export function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.add('active');
}
