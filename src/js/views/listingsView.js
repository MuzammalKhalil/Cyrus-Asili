import { renderExactPageView } from './exactPageView.js';

export function renderListingsView(params = {}) {
  return renderExactPageView('listings', params);
}

export function renderPropertyCardHtml(property) {
  return `
    <article class="property-card">
      <div class="property-image-wrapper">
        <img src="${property.image}" alt="${property.title}" class="property-image" />
        <span class="property-badge tag-gold">${property.badge}</span>
        <span class="property-country-tag">${property.country.toUpperCase()}</span>
      </div>
      <div class="property-body">
        <div class="property-price">${property.price}</div>
        <h3 class="property-title">${property.title}</h3>
        <div class="property-location">${property.location}</div>
        <div class="property-features">
          <span class="feature-item">${property.bedrooms} Beds</span>
          <span class="feature-item">${property.bathrooms} Baths</span>
          <span class="feature-item">${property.area}</span>
        </div>
      </div>
      <div class="property-footer">
        <span>${property.type}</span>
        <button class="btn-card-action" onclick="window.router.navigate('property', { id: '${property.id}' })">View Details</button>
      </div>
    </article>
  `;
}
