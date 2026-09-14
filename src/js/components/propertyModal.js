import { properties } from '../data.js';

export function renderPropertyModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'property-modal';

  overlay.innerHTML = `
    <div class="modal-container animate-fade-in" style="max-width: 800px;">
      <div class="modal-header">
        <div id="prop-modal-badge-wrapper"></div>
        <button class="modal-close-btn" id="close-prop-modal">&times;</button>
      </div>
      <div class="modal-body" id="prop-modal-content">
        <!-- Dynamic Content -->
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('close-prop-modal').addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

export function openPropertyModal(propId) {
  const prop = properties.find(p => p.id === propId);
  if (!prop) return;

  const modal = document.getElementById('property-modal');
  const content = document.getElementById('prop-modal-content');
  const badgeWrapper = document.getElementById('prop-modal-badge-wrapper');

  badgeWrapper.innerHTML = `
    <span class="tag-gold">${prop.badge}</span>
    <h3 class="modal-title" style="margin-top:0.35rem;">${prop.title}</h3>
  `;

  content.innerHTML = `
    <div style="height: 320px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
      <img src="${prop.image}" alt="${prop.title}" style="width:100%; height:100%; object-fit:cover;" />
    </div>

    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
      <div>
        <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.25rem;">📍 ${prop.location}</div>
        <div style="font-family:var(--font-heading); font-size:2rem; font-weight:700; color:var(--primary-gold);">${prop.price}</div>
      </div>
      <button class="btn-primary" onclick="window.openBookingModal()">
        Enquire About Property
      </button>
    </div>

    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; padding:1.25rem; background:var(--bg-input); border-radius:var(--radius-md); margin-bottom:1.5rem; text-align:center;">
      <div>
        <div style="font-size:0.75rem; color:var(--text-gold); text-transform:uppercase;">Property Type</div>
        <div style="font-weight:600; font-size:1rem; color:#FFF; margin-top:0.25rem;">${prop.type}</div>
      </div>
      <div>
        <div style="font-size:0.75rem; color:var(--text-gold); text-transform:uppercase;">Bedrooms</div>
        <div style="font-weight:600; font-size:1rem; color:#FFF; margin-top:0.25rem;">${prop.bedrooms} Beds</div>
      </div>
      <div>
        <div style="font-size:0.75rem; color:var(--text-gold); text-transform:uppercase;">Bathrooms</div>
        <div style="font-weight:600; font-size:1rem; color:#FFF; margin-top:0.25rem;">${prop.bathrooms} Baths</div>
      </div>
      <div>
        <div style="font-size:0.75rem; color:var(--text-gold); text-transform:uppercase;">Area</div>
        <div style="font-weight:600; font-size:1rem; color:#FFF; margin-top:0.25rem;">${prop.area}</div>
      </div>
    </div>

    <h4 style="font-family:var(--font-heading); font-size:1.15rem; color:#FFF; margin-bottom:0.5rem;">Property Description</h4>
    <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
      ${prop.description}
    </p>

    <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
      ${prop.goldenVisa ? '<span class="tag-gold">Golden Visa Eligible</span>' : ''}
      ${prop.offPlan ? '<span class="tag-gold">Off-Plan Opportunity</span>' : ''}
      ${prop.newBuild ? '<span class="tag-gold">New Build Warranty</span>' : ''}
    </div>
  `;

  if (modal) modal.classList.add('active');
}
