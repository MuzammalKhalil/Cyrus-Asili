import { mountMarketplace, escape } from './marketplace.js';
import { renderEnquiryFooterHtml, bindEnquiryFooter } from '../components/enquiryFooter.js';
import '../../css/pages/listings.css';

export function renderListingsView(params = {}) {
  const container = document.createElement('div');
  container.className = 'listings-page';
  const selected = (name,value) => (name === 'bedrooms' ? String(params[name] || '').replace(/ Bedrooms?/, '') : params[name]) === value ? 'selected' : '';
  const options = (name, entries) => entries.map(value=>`<option value="${value}" ${selected(name,value)}>${value}</option>`).join('');
  container.innerHTML = `<section class="listing-hero"><video autoplay muted loop playsinline poster="/assets/listings/hero.png"><source src="/assets/0714.mp4" type="video/mp4"></video><div class="listing-hero-copy"><h1>Property Marketplace</h1><p>Browse vetted investment and lifestyle properties across the UK, UAE, Greece, Turkey &amp; Cyprus.</p></div></section>
    <section class="listing-search-band"><div class="listing-shell"><p class="listing-search-kicker">Search Your Property</p><form class="listing-search-form" aria-label="Search properties"><input name="location" placeholder="Location" aria-label="Location" value="${escape(params.location)}"><input name="postcode" placeholder="Post Code" aria-label="Post code" value="${escape(params.postcode)}"><input name="reference" placeholder="Reference" aria-label="Reference" value="${escape(params.reference)}"><select name="type" aria-label="Property type"><option value="">Type</option>${options('type',['Apartment','Villa','Off-plan','Commercial'])}</select><select name="bedrooms" aria-label="Bedrooms"><option value="">Bedrooms</option>${options('bedrooms',['1','2','3','4','5+','3+','Studio'])}</select><button type="submit" class="listing-dark-button">Search <span aria-hidden="true">&#9702;</span></button></form><button class="listing-advanced" type="button" aria-controls="listing-filters" aria-expanded="false">Advanced Search &nbsp; &#9776;</button></div></section>
    <section class="listing-area"><div class="listing-shell listing-layout"></div></section>
    ${renderEnquiryFooterHtml()}`;
  bindEnquiryFooter(container);
  mountMarketplace(container, params);
  return container;
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
