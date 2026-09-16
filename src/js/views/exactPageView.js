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

function getBannerInfo(page, params = {}) {
  if (page === 'about') {
    return {
      title: 'ABOUT ASILI',
      subtitle: 'Proudly getting it done for our clients for over four decades.'
    };
  }
  if (page === 'listings') {
    return {
      title: 'PROPERTY MARKETPLACE',
      subtitle: 'Poperty Marketplace Browse vetted investment and lifestyle properties across the UK, UAE, Greece, Turkey & Cyprus.'
    };
  }
  if (page === 'contact') {
    return {
      title: 'CONTACT US',
      subtitle: "Whether you're exploring your first international purchase or adding to an existing portfolio, our team is here to help - across every market we operate in."
    };
  }
  if (page === 'services') {
    const country = params.country || 'uk';
    const servicesData = {
      uk: {
        title: 'INVEST IN UK REAL ESTATE',
        subtitle: 'From central London new-builds to high-yield regional buy-to-lets - ASILI Holding gives international investors direct, vetted access to the UK property market.'
      },
      uae: {
        title: 'INVEST IN UAE REAL ESTATE',
        subtitle: 'Tax-free rental yields, Golden Visa eligibility, and ultra-luxury off-plan developments in Dubai & Abu Dhabi.'
      },
      greece: {
        title: 'INVEST IN GREECE REAL ESTATE',
        subtitle: 'Golden Visa access, Mediterranean holiday home income, and Athens urban regeneration opportunities.'
      },
      cyprus: {
        title: 'INVEST IN CYPRUS REAL ESTATE',
        subtitle: 'Permanent residency pathways, thriving expat communities, and coastal villa investments.'
      },
      turkey: {
        title: 'INVEST IN TURKEY REAL ESTATE',
        subtitle: 'Citizenship-by-investment entry points, vibrant Istanbul market dynamics, and high capital growth.'
      }
    };
    return servicesData[country] || servicesData.uk;
  }
  return null;
}

export function renderExactPageView(page, params = {}) {
  const container = document.createElement('div');
  container.className = 'exact-page';

  const src = getAssetForPage(page, params);
  const isHome = page === 'home';

  let bannerVideoHtml = '';

  if (isHome) {
    bannerVideoHtml = `
      <div class="exact-banner-hero-container">
        <video class="exact-banner-video" autoplay loop muted playsinline poster="/assets/Group_1160445096-2003_1809.png">
          <source src="/assets/0714.mp4" type="video/mp4">
        </video>
        <div class="exact-banner-video-overlay"></div>
        <div class="exact-banner-content-card">
          <span class="exact-banner-tagline">Buy, Build, Invest – Turning Bricks to Gold™...</span>
          <h1 class="exact-banner-title">
            INTERNATIONAL REAL ESTATE<br>
            INVESTMENT &amp; CONSTRUCTION<br>
            AGENCY
          </h1>
          <p class="exact-banner-subtitle">
            International Real Estate Investment Opportunities Across the<br>
            United Kingdom, UAE, Greece, Cyprus, &amp; Turkey.
          </p>
        </div>
      </div>
    `;
  } else {
    const bannerInfo = getBannerInfo(page, params);
    if (bannerInfo) {
      bannerVideoHtml = `
        <div class="exact-banner-hero-container exact-banner-inner">
          <video class="exact-banner-video" autoplay loop muted playsinline>
            <source src="/assets/0714.mp4" type="video/mp4">
          </video>
          <div class="exact-banner-video-overlay exact-banner-inner-overlay"></div>
          <div class="exact-banner-inner-content">
            <h1 class="exact-banner-inner-title">${bannerInfo.title}</h1>
            <p class="exact-banner-inner-subtitle">${bannerInfo.subtitle}</p>
          </div>
        </div>
      `;
    }
  }

  const hasSearchBar = isHome || page === 'listings';
  const searchBarHtml = hasSearchBar ? renderSearchBarHtml(page, params) : '';

  container.innerHTML = `
    <div class="exact-page-stage">
      <img class="exact-page-image" src="${src}" alt="ASILI Holding ${page} page design" />
      ${bannerVideoHtml}
      ${searchBarHtml}
      ${hotspots.map(renderHotspot).join('')}
    </div>
  `;

  // Ensure autoplay triggers on mount for all pages
  const video = container.querySelector('.exact-banner-video');
  if (video) {
    video.play().catch(() => {});
  }

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

function renderSearchBarHtml(page, params = {}) {
  const selectedLocation = params.location || '';
  const selectedType = params.type || '';
  const selectedBedrooms = params.bedrooms || '';
  const enteredPostcode = params.postcode || '';
  const enteredReference = params.reference || '';

  const isLocationSelected = Boolean(selectedLocation);
  const isTypeSelected = Boolean(selectedType);
  const isBedroomsSelected = Boolean(selectedBedrooms);

  return `
    <div class="exact-home-search-section exact-search-section-${page}">
      <form class="exact-search-form" onsubmit="window.handleExactSearch(event)">
        <div class="exact-search-field-wrap">
          <select class="exact-search-select" id="exact-search-location" name="location" data-selected="${isLocationSelected}" onchange="this.dataset.selected = this.value ? 'true' : 'false'">
            <option value="" ${!selectedLocation ? 'selected' : ''}>Location</option>
            <option value="United Kingdom" ${selectedLocation === 'United Kingdom' ? 'selected' : ''}>United Kingdom</option>
            <option value="UAE" ${selectedLocation === 'UAE' ? 'selected' : ''}>UAE</option>
            <option value="Greece" ${selectedLocation === 'Greece' ? 'selected' : ''}>Greece</option>
            <option value="Cyprus" ${selectedLocation === 'Cyprus' ? 'selected' : ''}>Cyprus</option>
            <option value="Turkey" ${selectedLocation === 'Turkey' ? 'selected' : ''}>Turkey</option>
          </select>
        </div>
        <div class="exact-search-field-wrap">
          <input type="text" class="exact-search-input" id="exact-search-postcode" name="postcode" value="${enteredPostcode}" placeholder="Post Code" />
        </div>
        <div class="exact-search-field-wrap">
          <input type="text" class="exact-search-input" id="exact-search-reference" name="reference" value="${enteredReference}" placeholder="Reference" />
        </div>
        <div class="exact-search-field-wrap">
          <select class="exact-search-select" id="exact-search-type" name="type" data-selected="${isTypeSelected}" onchange="this.dataset.selected = this.value ? 'true' : 'false'">
            <option value="" ${!selectedType ? 'selected' : ''}>Type</option>
            <option value="Apartment" ${selectedType === 'Apartment' ? 'selected' : ''}>Apartment</option>
            <option value="Villa" ${selectedType === 'Villa' ? 'selected' : ''}>Villa</option>
            <option value="Commercial" ${selectedType === 'Commercial' ? 'selected' : ''}>Commercial</option>
            <option value="Off-plan" ${selectedType === 'Off-plan' ? 'selected' : ''}>Off-plan</option>
          </select>
        </div>
        <div class="exact-search-field-wrap">
          <select class="exact-search-select" id="exact-search-bedrooms" name="bedrooms" data-selected="${isBedroomsSelected}" onchange="this.dataset.selected = this.value ? 'true' : 'false'">
            <option value="" ${!selectedBedrooms ? 'selected' : ''}>Bedrooms</option>
            <option value="Studio" ${selectedBedrooms === 'Studio' ? 'selected' : ''}>Studio</option>
            <option value="1 Bedroom" ${selectedBedrooms === '1 Bedroom' ? 'selected' : ''}>1 Bedroom</option>
            <option value="2 Bedrooms" ${selectedBedrooms === '2 Bedrooms' ? 'selected' : ''}>2 Bedrooms</option>
            <option value="3+ Bedrooms" ${selectedBedrooms === '3+ Bedrooms' ? 'selected' : ''}>3+ Bedrooms</option>
          </select>
        </div>
        <div class="exact-search-field-wrap exact-search-btn-wrap">
          <button type="submit" class="exact-search-btn" aria-label="Search">
            <span>Search</span>
            <span class="exact-search-diamond">⋄</span>
          </button>
        </div>
      </form>
      <button type="button" class="exact-advanced-search-hotspot" aria-label="Advanced Search" onclick="window.router && window.router.navigate('listings')"></button>
    </div>
  `;
}

window.handleExactSearch = function(event) {
  if (event) event.preventDefault();
  const form = document.querySelector('.exact-search-form');
  if (!form) return;
  const location = form.location ? form.location.value : '';
  const type = form.type ? form.type.value : '';
  const bedrooms = form.bedrooms ? form.bedrooms.value : '';
  const postcode = form.postcode ? form.postcode.value : '';
  const reference = form.reference ? form.reference.value : '';

  if (window.router) {
    window.router.navigate('listings', { location, type, bedrooms, postcode, reference });
  }
};


