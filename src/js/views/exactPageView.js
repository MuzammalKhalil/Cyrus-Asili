const pageAssets = {
  home: '/assets/Redesign_-_R5-2003_2143.png',
  about: '/assets/01__About_Us-2003_2439.png',
  listings: '/assets/02__Listings-2003_2562.png',
  contact: '/assets/04__Contact_Us-2003_4011.png',
  services: {
    uk: '/assets/03__Services_-_Invest_In_UK_Real_Estate-2003_3009.png',
    uae: '/assets/03__Services_-_Invest_In_UAE_Real_Estate-2003_4350.png',
    greece: '/assets/03__Services_-_Invest_In_GREECE_Real_Estate-2003_4684.png',
    cyprus: '/assets/03__Services_-_Invest_In_Cyprus_Real_Estate-2003_3677.png',
    turkey: '/assets/03__Services_-_Invest_In_Turkey_Real_Estate-2003_3343.png'
  }
};

const hotspots = [
  { label: 'Home', route: 'home', className: 'hotspot-logo' },
  { label: 'About', route: 'about', className: 'hotspot-about' },
  { label: 'Listings', route: 'listings', className: 'hotspot-listings' },
  { label: 'Services', route: 'services', className: 'hotspot-services' },
  { label: 'Contact', route: 'contact', className: 'hotspot-contact' },
  { label: 'Search listings', route: 'listings', className: 'hotspot-search' },
  { label: 'Book a consultation', action: 'booking', className: 'hotspot-book' }
];

export function renderExactPageView(page, params = {}) {
  const container = document.createElement('div');
  container.className = 'exact-page';

  const src = getAssetForPage(page, params);
  container.innerHTML = `
    <div class="exact-page-stage">
      <img class="exact-page-image" src="${src}" alt="ASILI Holding ${page} page design" />
      ${hotspots.map(renderHotspot).join('')}
    </div>
  `;

  return container;
}

function getAssetForPage(page, params) {
  if (page === 'services') {
    const country = params.country || 'uk';
    return pageAssets.services[country] || pageAssets.services.uk;
  }

  return pageAssets[page] || pageAssets.home;
}

function renderHotspot(item) {
  if (item.action === 'booking') {
    return `<button class="exact-hotspot ${item.className}" type="button" aria-label="${item.label}" onclick="window.openBookingModal()"></button>`;
  }

  return `<button class="exact-hotspot ${item.className}" type="button" aria-label="${item.label}" onclick="window.router.navigate('${item.route}')"></button>`;
}
