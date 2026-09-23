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
  container.className = `exact-page exact-page-${page}`;

  const src = getAssetForPage(page, params);
  const isHome = page === 'home';
  const hasPartners = isHome || page === 'about';

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
  const reachSectionHtml = isHome ? renderGlobalReachSection() : '';
  const destinationsSectionHtml = isHome ? renderOurDestinationsSection() : '';
  const partnersSliderHtml = hasPartners ? renderOurPartnersSlider() : '';
  const contactCardsHtml = page === 'contact' ? renderContactCardsSection() : '';
  const getInTouchFormHtml = renderGetInTouchForm(page);
  const interactiveButtonsHtml = renderInteractiveButtons(page, params);

  container.innerHTML = `
    <div class="exact-page-stage">
      <img class="exact-page-image" src="${src}" alt="ASILI Holding ${page} page design" />
      ${bannerVideoHtml}
      ${searchBarHtml}
      ${contactCardsHtml}
      ${reachSectionHtml}
      ${destinationsSectionHtml}
      ${partnersSliderHtml}
      ${getInTouchFormHtml}
      ${interactiveButtonsHtml}
    </div>
  `;

  // Initialize interactive sliders on pages with partners (Home and About Us)
  if (hasPartners) {
    initPartnersSlider(container);
  }

  // Ensure autoplay triggers on mount for all pages
  const video = container.querySelector('.exact-banner-video');
  if (video) {
    video.play().catch(() => { });
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


const circleIconSvg = `<svg class="btn-circle-svg" width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true"><circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1.3"/></svg>`;

function renderInteractiveButtons(page, params = {}) {
  if (page === 'home') {
    return `
      <!-- Clean Backdrops to eliminate ghost/duplicate non-working buttons from design image -->
      <div class="exact-btn-backdrop exact-home-backdrop-learn-more" aria-hidden="true"></div>
      <div class="exact-btn-backdrop exact-home-backdrop-why-buttons" aria-hidden="true"></div>
      <div class="exact-btn-backdrop exact-home-backdrop-deals" aria-hidden="true"></div>
      <div class="exact-btn-backdrop exact-home-backdrop-news" aria-hidden="true"></div>

      <!-- Home: Learn More (About Asili) -> links to #about -->
      <a href="#about" data-route="about" class="exact-interactive-btn exact-btn-black exact-home-btn-learn-more" title="Learn More About Asili">
        <span>Learn More</span>
        ${circleIconSvg}
      </a>

      <!-- Home: Property Search (Why Choose section - Black) -> links to #listings -->
      <a href="#listings" data-route="listings" class="exact-interactive-btn exact-btn-black exact-home-btn-why-search" title="Search Properties">
        <span>Property Search</span>
        ${circleIconSvg}
      </a>

      <!-- Home: Book A Consultation (Why Choose section - Transparent) -> links to #contact / modal -->
      <a href="#contact" data-route="contact" class="exact-interactive-btn exact-btn-transparent exact-home-btn-why-consult" onclick="if(window.router){window.router.navigate('contact');}" title="Book A Consultation">
        <span>Book A Consultation</span>
        ${circleIconSvg}
      </a>

      <!-- Home: Property Search (Deals section - Black) -> links to #listings -->
      <a href="#listings" data-route="listings" class="exact-interactive-btn exact-btn-black exact-home-btn-deals-search" title="Explore Deals & Listings">
        <span>Property Search</span>
        ${circleIconSvg}
      </a>

      <!-- Home: Submit (News & Blog section - Black) -> links to #news -->
      <a href="#news" data-route="news" class="exact-interactive-btn exact-btn-black exact-home-btn-news-submit" title="The Asili Journal - News & Blogs">
        <span>Submit</span>
        ${circleIconSvg}
      </a>

      <!-- Home Footer Quick Links -->
      <a href="#home" data-route="home" class="exact-footer-link" style="top: 92.15%; left: 32.5%; width: 10%; height: 0.55%;" title="Home"></a>
      <a href="#about" data-route="about" class="exact-footer-link" style="top: 92.70%; left: 32.5%; width: 10%; height: 0.55%;" title="About Us"></a>
      <a href="#listings" data-route="listings" class="exact-footer-link" style="top: 93.25%; left: 32.5%; width: 14%; height: 0.55%;" title="Property Marketplace"></a>
      <a href="#services" data-route="services" class="exact-footer-link" style="top: 93.80%; left: 32.5%; width: 10%; height: 0.55%;" title="Services"></a>
      <a href="#gallery" data-route="gallery" class="exact-footer-link" style="top: 94.35%; left: 32.5%; width: 10%; height: 0.55%;" title="Gallery"></a>
      <a href="#news" data-route="news" class="exact-footer-link" style="top: 94.90%; left: 32.5%; width: 12%; height: 0.55%;" title="News & Blogs"></a>
      <a href="#contact" data-route="contact" class="exact-footer-link" style="top: 92.70%; left: 45.0%; width: 10%; height: 0.55%;" title="Contact Us"></a>
    `;
  }

  if (page === 'listings') {
    return `
      <!-- Listings: Book A Consultation under Can't find the right fit? -->
      <a href="#contact" data-route="contact" class="exact-interactive-btn exact-btn-black exact-listings-btn-consult" onclick="if(window.router){window.router.navigate('contact');}" title="Book A Consultation">
        <span>Book A Consultation</span>
        ${circleIconSvg}
      </a>

      <!-- Listings Highlights Filter Buttons -->
      <button type="button" class="exact-interactive-btn exact-btn-black" style="top: 61.2%; left: 12.97%; width: 9.8%; height: 1.1%; font-size: 13px;" onclick="window.router.navigate('listings')" title="Featured Listings">
        Featured
      </button>
      <button type="button" class="exact-interactive-btn exact-btn-transparent" style="top: 61.2%; left: 23.2%; width: 14.2%; height: 1.1%; font-size: 13px;" onclick="window.router.navigate('listings')" title="Golden Visa Eligible">
        Golden Visa Eligible
      </button>
      <button type="button" class="exact-interactive-btn exact-btn-transparent" style="top: 62.6%; left: 12.97%; width: 8.2%; height: 1.1%; font-size: 13px;" onclick="window.router.navigate('listings')" title="Off-Plan">
        Off-Plan
      </button>
      <button type="button" class="exact-interactive-btn exact-btn-transparent" style="top: 62.6%; left: 21.6%; width: 9.6%; height: 1.1%; font-size: 13px;" onclick="window.router.navigate('listings')" title="New Build">
        New Build
      </button>
    `;
  }

  if (page === 'about') {
    return `
      <!-- About: Submit (News & Blog) -> links to #news -->
      <a href="#news" data-route="news" class="exact-interactive-btn exact-btn-black exact-about-btn-news-submit" title="The Asili Journal - News & Blogs">
        <span>Submit</span>
        ${circleIconSvg}
      </a>
    `;
  }

  if (page === 'services') {
    const country = params.country || 'uk';
    const countryLabels = {
      uk: 'UK',
      uae: 'UAE',
      greece: 'Greece',
      cyprus: 'Cyprus',
      turkey: 'Turkey'
    };
    const label = countryLabels[country] || 'All';
    return `
      <!-- Services: View All [Country] Listings -> links to listings -->
      <a href="#listings?country=${country}" data-route="listings" data-country="${country}" class="exact-interactive-btn exact-btn-black exact-services-btn-view-all" title="View All ${label} Listings">
        <span>View All ${label} Listings</span>
        ${circleIconSvg}
      </a>

      <!-- Services: Book A Consultation -> links to #contact -->
      <a href="#contact" data-route="contact" class="exact-interactive-btn exact-btn-black exact-services-btn-consult" onclick="if(window.router){window.router.navigate('contact');}" title="Book A Consultation">
        <span>Book A Consultation</span>
        ${circleIconSvg}
      </a>
    `;
  }

  if (page === 'contact') {
    return `
      <!-- Contact: View All Cyprus Listings (Interactive Hotspot) -->
      <a href="#listings?country=cyprus" data-route="listings" data-country="cyprus" class="exact-contact-hotspot" style="top: 52.84%; left: 41.15%; width: 17.7%; height: 0.88%;" title="View All Cyprus Listings"></a>

      <!-- Contact: Book A Consultation (Interactive Hotspot -> opens modal) -->
      <button type="button" class="exact-contact-hotspot" style="top: 63.25%; left: 11.2%; width: 15.6%; height: 0.88%;" onclick="if(window.openBookingModal){window.openBookingModal();}" title="Book A Consultation"></button>
    `;
  }

  return '';
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
            ${circleIconSvg}
          </button>
        </div>
      </form>
    </div>
  `;
}

window.handleExactSearch = function (event) {
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

function renderGlobalReachSection() {
  return `
    <section class="exact-global-reach-section" aria-label="Our Global Reach">
      <h2 class="exact-reach-title">Our Global Reach</h2>
      <div class="exact-reach-cards">
        <div class="exact-reach-card exact-reach-card-1" onclick="window.router && window.router.navigate('services')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services')}" role="button" tabindex="0" title="Global Expertise">
          <img src="/assets/reach/reach-card-1-color.png" alt="Global Expertise - Decades of experience in international real estate and investment." class="exact-reach-img" />
        </div>
        <div class="exact-reach-card exact-reach-card-2" onclick="window.router && window.router.navigate('about')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('about')}" role="button" tabindex="0" title="Proven Track Record">
          <img src="/assets/reach/reach-card-2-color.png" alt="Proven Track Record - Over $18M in property sales across Turkey and the UAE." class="exact-reach-img" />
        </div>
        <div class="exact-reach-card exact-reach-card-3" onclick="window.router && window.router.navigate('listings')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('listings')}" role="button" tabindex="0" title="Diverse Portfolio">
          <img src="/assets/reach/reach-card-3.png" alt="Diverse Portfolio - From luxury residences to social housing and commercial properties." class="exact-reach-img" />
        </div>
        <div class="exact-reach-card exact-reach-card-4" onclick="window.router && window.router.navigate('services')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services')}" role="button" tabindex="0" title="Comprehensive Services">
          <img src="/assets/reach/reach-card-4-color.png" alt="Comprehensive Services - Off-plan investments construction, refurbishment, and more." class="exact-reach-img" />
        </div>
        <div class="exact-reach-card exact-reach-card-5" onclick="window.router && window.router.navigate('services')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services')}" role="button" tabindex="0" title="Golden Visa Opportunities">
          <img src="/assets/reach/reach-card-5-color.png" alt="Golden Visa Opportunities - Properties suitable for residency programs in Europe." class="exact-reach-img" />
        </div>
      </div>
    </section>
  `;
}

function renderOurDestinationsSection() {
  return `
    <section class="exact-destinations-section" aria-label="Our Destinations">
      <div class="exact-dest-cards-backdrop" aria-hidden="true"></div>
      <div class="exact-dest-cards">
        <div class="exact-dest-card exact-dest-uae" onclick="window.router && window.router.navigate('services', { country: 'uae' })" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services', { country: 'uae' })}" role="button" tabindex="0" title="UAE Investments">
          <img src="/assets/destinations/dest-uae-gray.png" alt="UAE Real Estate Investments" class="exact-dest-img exact-dest-gray" />
          <img src="/assets/destinations/dest-uae-color.png" alt="" class="exact-dest-img exact-dest-color" aria-hidden="true" />
          <span class="exact-dest-label">UAE</span>
        </div>
        <div class="exact-dest-card exact-dest-greece" onclick="window.router && window.router.navigate('services', { country: 'greece' })" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services', { country: 'greece' })}" role="button" tabindex="0" title="Greece Investments">
          <img src="/assets/destinations/dest-greece-gray.png" alt="Greece Real Estate Investments" class="exact-dest-img exact-dest-gray" />
          <img src="/assets/destinations/dest-greece-color.png" alt="" class="exact-dest-img exact-dest-color" aria-hidden="true" />
          <span class="exact-dest-label">GREECE</span>
        </div>
        <div class="exact-dest-card exact-dest-uk" onclick="window.router && window.router.navigate('services', { country: 'uk' })" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services', { country: 'uk' })}" role="button" tabindex="0" title="UK Investments">
          <img src="/assets/destinations/dest-uk-gray.png" alt="United Kingdom Real Estate Investments" class="exact-dest-img exact-dest-gray" />
          <img src="/assets/destinations/dest-uk-color.png" alt="" class="exact-dest-img exact-dest-color" aria-hidden="true" />
          <span class="exact-dest-label">UK</span>
        </div>
        <div class="exact-dest-card exact-dest-turkey" onclick="window.router && window.router.navigate('services', { country: 'turkey' })" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services', { country: 'turkey' })}" role="button" tabindex="0" title="Turkey Investments">
          <img src="/assets/destinations/dest-turkey-gray.png" alt="Turkey Real Estate Investments" class="exact-dest-img exact-dest-gray" />
          <img src="/assets/destinations/dest-turkey-color.png" alt="" class="exact-dest-img exact-dest-color" aria-hidden="true" />
          <span class="exact-dest-label">TURKEY</span>
        </div>
        <div class="exact-dest-card exact-dest-cyprus" onclick="window.router && window.router.navigate('services', { country: 'cyprus' })" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.router&&window.router.navigate('services', { country: 'cyprus' })}" role="button" tabindex="0" title="Cyprus Investments">
          <img src="/assets/destinations/dest-cyprus-gray.png" alt="Cyprus Real Estate Investments" class="exact-dest-img exact-dest-gray" />
          <img src="/assets/destinations/dest-cyprus-color.png" alt="" class="exact-dest-img exact-dest-color" aria-hidden="true" />
          <span class="exact-dest-label">CYPRUS</span>
        </div>
      </div>
    </section>
  `;
}

window.slidePartners = function (direction) {
  const mover = document.getElementById('exact-partners-mover');
  const viewport = document.getElementById('exact-partners-viewport');
  if (!mover || !viewport) return;
  const step = viewport.clientWidth / 5;
  window._partnerShift = (window._partnerShift || 0) - direction * step;
  mover.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
  mover.style.transform = `translate3d(${window._partnerShift}px, 0, 0)`;
};

function renderOurPartnersSlider() {
  const partners = [
    { name: 'Binghatti Developers', logo: '/assets/image_61-2003_2396.png', key: 'binghatti' },
    { name: 'Bugatti Residences by Binghatti', logo: '/assets/image_62-2003_2397.png', key: 'bugatti' },
    { name: 'DAG Holding', logo: '/assets/image_63-2003_2398.png', key: 'dag' },
    { name: 'Property Direct', logo: '/assets/logo_1-2003_2399.png', key: 'property-direct' },
    { name: 'Fournado Hills Villas', logo: '/assets/Asset_1_1-2003_2400.png', key: 'fournado' }
  ];

  // Repeat partners 4 times in each group (20 logos in each group, 40 total)
  const halfSet = [...partners, ...partners, ...partners, ...partners];

  const renderPartnerItem = (p) => `
    <div class="exact-partner-item exact-partner-${p.key}" title="${p.name}">
      <img src="${p.logo}" alt="${p.name}" class="exact-partner-logo exact-logo-${p.key}" loading="eager" decoding="async" />
    </div>
  `;

  return `
    <section class="exact-partners-slider-section" aria-label="Our Partners Slider">
      <div class="exact-partners-backdrop" aria-hidden="true"></div>
      <div class="exact-partners-viewport" id="exact-partners-viewport">
        <div class="exact-partners-mover" id="exact-partners-mover">
          <div class="exact-partners-track" id="exact-partners-track">
            <div class="exact-partners-group">
              ${halfSet.map(renderPartnerItem).join('')}
            </div>
            <div class="exact-partners-group" aria-hidden="true">
              ${halfSet.map(renderPartnerItem).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function initPartnersSlider(container) {
  setTimeout(() => {
    const viewport = container.querySelector('#exact-partners-viewport');
    const mover = container.querySelector('#exact-partners-mover');
    const track = container.querySelector('#exact-partners-track');
    if (!viewport || !mover || !track) return;

    window._partnerShift = 0;
    let isDragging = false;
    let startX = 0;
    let startShift = 0;

    // Arrow controls: smoothly advance by 1 partner item width
    window.slidePartners = function (direction) {
      const step = viewport.clientWidth / 5;
      window._partnerShift -= direction * step;
      mover.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      mover.style.transform = `translate3d(${window._partnerShift}px, 0, 0)`;
    };

    // Touch support: pause on touch
    viewport.addEventListener('touchstart', () => {
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      track.style.animationPlayState = 'running';
    }, { passive: true });

    // Drag-to-scroll support
    viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      viewport.classList.add('dragging');
      track.style.animationPlayState = 'paused';
      mover.style.transition = 'none';
      startX = e.pageX;
      startShift = window._partnerShift || 0;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        viewport.classList.remove('dragging');
        track.style.animationPlayState = 'running';
        mover.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      }
    });

    viewport.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      window._partnerShift = startShift + dx;
      mover.style.transform = `translate3d(${window._partnerShift}px, 0, 0)`;
    });
  }, 50);
}

function renderGetInTouchForm(page) {
  const topClass = `exact-get-in-touch-${page}`;
  return `
    <section class="exact-get-in-touch-section ${topClass}" id="get-in-touch-section" aria-label="Get In Touch">
      <form class="exact-contact-form" onsubmit="window.handleExactContactSubmit(event, this)">
        <h3 class="exact-contact-form-title">GET IN TOUCH</h3>
        
        <div class="exact-form-fields-wrapper">
          <div class="exact-form-row exact-form-row-split">
            <div class="exact-form-field">
              <input type="text" name="firstName" class="exact-form-input" placeholder="First Name*" required aria-label="First Name" />
            </div>
            <div class="exact-form-field">
              <input type="text" name="lastName" class="exact-form-input" placeholder="Last Name*" required aria-label="Last Name" />
            </div>
          </div>
          
          <div class="exact-form-row">
            <div class="exact-form-field">
              <input type="email" name="email" class="exact-form-input" placeholder="Email Address*" required aria-label="Email Address" />
            </div>
          </div>
          
          <div class="exact-form-row">
            <div class="exact-form-field">
              <input type="tel" name="phone" class="exact-form-input" placeholder="Phone Number" aria-label="Phone Number" />
            </div>
          </div>
          
          <div class="exact-form-row">
            <div class="exact-form-field">
              <textarea name="message" class="exact-form-textarea" placeholder="Type your message here..." required aria-label="Message"></textarea>
            </div>
          </div>
          
          <div class="exact-form-row exact-form-row-checkbox">
            <label class="exact-form-checkbox-label">
              <input type="checkbox" name="privacyPolicy" class="exact-form-checkbox" required />
              <span class="exact-form-checkbox-text">By ticking this box I agree that I have read the <a href="#contact" class="exact-form-privacy-link">privacy policy</a>.*</span>
            </label>
          </div>
          
          <div class="exact-form-row exact-form-row-submit">
            <button type="submit" class="exact-form-submit-btn" aria-label="Submit Contact Form">
              <span>Submit</span>
              ${circleIconSvg}
            </button>
          </div>
        </div>

        <div class="exact-form-success" style="display:none;" aria-live="polite">
          <div class="exact-form-success-icon">✓</div>
          <h4 class="exact-form-success-title">Message Received!</h4>
          <p class="exact-form-success-desc">Thank you, <span class="exact-form-success-name"></span>! Our advisory team has received your message and will contact you shortly.</p>
          <button type="button" class="exact-form-reset-btn" onclick="window.resetExactContactForm(this.closest('form'))">
            Send Another Message
          </button>
        </div>
      </form>
    </section>
  `;
}

window.handleExactContactSubmit = function (event, form) {
  if (event) event.preventDefault();
  if (!form) return;

  const firstName = form.firstName?.value?.trim() || '';
  const lastName = form.lastName?.value?.trim() || '';
  const email = form.email?.value?.trim() || '';
  const message = form.message?.value?.trim() || '';
  const privacy = form.privacyPolicy?.checked;

  if (!firstName || !lastName || !email || !message || !privacy) {
    alert('Please fill out all required fields and accept the privacy policy.');
    return;
  }

  const wrapper = form.querySelector('.exact-form-fields-wrapper');
  const successBox = form.querySelector('.exact-form-success');
  const nameSpan = form.querySelector('.exact-form-success-name');

  if (nameSpan) {
    nameSpan.textContent = firstName;
  }

  if (wrapper && successBox) {
    wrapper.style.display = 'none';
    successBox.style.display = 'flex';
  }
};

window.resetExactContactForm = function (form) {
  if (!form) return;
  form.reset();
  const wrapper = form.querySelector('.exact-form-fields-wrapper');
  const successBox = form.querySelector('.exact-form-success');
  if (wrapper && successBox) {
    wrapper.style.display = 'block';
    successBox.style.display = 'none';
  }
};

function renderContactCardsSection() {
  return `
    <section class="exact-contact-cards-section" aria-label="Contact Information">
      <div class="exact-contact-cards-grid">
        <!-- Card 1: Call Us -->
        <div class="exact-contact-info-card">
          <div class="exact-card-header">
            <h3 class="exact-card-title">CALL US</h3>
            <svg class="exact-card-icon" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <div class="exact-card-body">
            <a href="tel:+442075808490" class="exact-card-line">+44 (0)20 7580 8490</a>
            <a href="tel:+447811441111" class="exact-card-line">+44 (0)78 1144 1111</a>
          </div>
        </div>

        <!-- Card 2: Email Us -->
        <div class="exact-contact-info-card">
          <div class="exact-card-header">
            <h3 class="exact-card-title">EMAIL US</h3>
            <svg class="exact-card-icon" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div class="exact-card-body">
            <a href="mailto:info@asili.uk" class="exact-card-line">info@asili.uk</a>
            <a href="mailto:sales@asili.uk" class="exact-card-line">sales@asili.uk</a>
          </div>
        </div>

        <!-- Card 3: Visit Us -->
        <div class="exact-contact-info-card">
          <div class="exact-card-header">
            <h3 class="exact-card-title">VISIT US</h3>
            <svg class="exact-card-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="22" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div class="exact-card-body">
            <span class="exact-card-line">128 Kensington High Street</span>
            <span class="exact-card-line">London, W8 4SG, UK</span>
          </div>
        </div>

        <!-- Card 4: Office Hours -->
        <div class="exact-contact-info-card">
          <div class="exact-card-header">
            <h3 class="exact-card-title">OFFICE HOURS</h3>
            <svg class="exact-card-icon" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </div>
          <div class="exact-card-body">
            <span class="exact-card-line">Mon - Fri: 9:00 - 18:00</span>
            <span class="exact-card-line">Sat: By appointment</span>
          </div>
        </div>
      </div>
    </section>
  `;
}




