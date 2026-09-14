import { destinations, properties } from '../data.js';
import { renderPropertyCardHtml } from './listingsView.js';

export function renderServicesView(params = {}) {
  const container = document.createElement('div');
  const activeCountryId = params.country || 'uk';
  const activeDest = destinations.find(destination => destination.id === activeCountryId) || destinations[0];
  const regionalProperties = properties.filter(property => property.country === activeDest.id);

  container.innerHTML = `
    <section class="inner-hero services-inner-hero" style="--hero-image: url('${activeDest.heroImage}')">
      <div class="container inner-hero-grid">
        <div class="inner-hero-copy">
          <span class="eyebrow">Destination Advisory</span>
          <h1>Invest in ${activeDest.name} Real Estate</h1>
          <p>${activeDest.description}</p>
          <div class="hero-metrics compact">
            <div><strong>${activeDest.activeListings}+</strong><span>Active Listings</span></div>
            <div><strong>${activeDest.avgYield}</strong><span>Avg. Yield</span></div>
            <div><strong>${activeDest.entryPrice}</strong><span>Entry Price</span></div>
          </div>
        </div>
        <div class="inner-hero-media">
          <img src="${activeDest.heroImage}" alt="${activeDest.name} real estate market" />
        </div>
      </div>
    </section>

    <section class="destination-tabs-band">
      <div class="container country-nav-tabs">
        ${destinations.map(destination => `
          <button class="tab-btn ${destination.id === activeDest.id ? 'active' : ''}" onclick="window.router.navigate('services', { country: '${destination.id}' })">
            ${destination.name}
          </button>
        `).join('')}
      </div>
    </section>

    <section class="page-band">
      <div class="container">
        <div class="snapshot-card">
          <div class="snapshot-header">
            <div>
              <span class="eyebrow">Market Snapshot</span>
              <h2>Strongest ${activeDest.name} Sub-Markets</h2>
            </div>
            <button class="btn-primary" onclick="window.openBookingModal()">Request Market Breakdown</button>
          </div>
          <div class="table-wrap">
            <table class="snapshot-table">
              <thead>
                <tr>
                  <th>City / Area</th>
                  <th>Entry Price</th>
                  <th>Rental Yield</th>
                  <th>Growth Outlook</th>
                </tr>
              </thead>
              <tbody>
                ${activeDest.cities.map(city => `
                  <tr>
                    <td>${city.name}</td>
                    <td>${city.price}</td>
                    <td>${city.yield}</td>
                    <td><span class="tag-gold">${city.outlook}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="section-heading split">
          <div>
            <span class="eyebrow">Represented Inventory</span>
            <h2>Current ${activeDest.name} Properties</h2>
          </div>
          <button class="btn-secondary" onclick="window.router.navigate('listings', { country: '${activeDest.id}' })">Browse All</button>
        </div>
        <div class="property-grid">
          ${(regionalProperties.length ? regionalProperties : properties.slice(0, 3)).map(renderPropertyCardHtml).join('')}
        </div>
      </div>
    </section>
  `;

  return container;
}
