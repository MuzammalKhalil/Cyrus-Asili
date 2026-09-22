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
  const interactiveButtonsHtml = renderInteractiveButtons(page, params);

  container.innerHTML = `
    <div class="exact-page-stage">
      <img class="exact-page-image" src="${src}" alt="ASILI Holding ${page} page design" />
      ${bannerVideoHtml}
      ${searchBarHtml}
      ${reachSectionHtml}
      ${destinationsSectionHtml}
      ${partnersSliderHtml}
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
        <span class="exact-search-diamond">⋄</span>
      </a>

      <!-- Home: Property Search (Why Choose section - Black) -> links to #listings -->
      <a href="#listings" data-route="listings" class="exact-interactive-btn exact-btn-black exact-home-btn-why-search" title="Search Properties">
        <span>Property Search</span>
        <span class="exact-search-diamond">⋄</span>
      </a>

      <!-- Home: Book A Consultation (Why Choose section - Transparent) -> links to #contact / modal -->
      <a href="#contact" data-route="contact" class="exact-interactive-btn exact-btn-transparent exact-home-btn-why-consult" onclick="if(window.router){window.router.navigate('contact');}" title="Book A Consultation">
        <span>Book A Consultation</span>
        <span class="exact-search-diamond">⋄</span>
      </a>

      <!-- Home: Property Search (Deals section - Black) -> links to #listings -->
      <a href="#listings" data-route="listings" class="exact-interactive-btn exact-btn-black exact-home-btn-deals-search" title="Explore Deals & Listings">
        <span>Property Search</span>
        <span class="exact-search-diamond">⋄</span>
      </a>

      <!-- Home: Submit (News & Blog section - Black) -> links to #news -->
      <a href="#news" data-route="news" class="exact-interactive-btn exact-btn-black exact-home-btn-news-submit" title="The Asili Journal - News & Blogs">
        <span>Submit</span>
        <span class="exact-search-diamond">⋄</span>
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
        <span class="exact-search-diamond">⋄</span>
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
        <span class="exact-search-diamond">⋄</span>
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
        <span class="exact-search-diamond">⋄</span>
      </a>

      <!-- Services: Book A Consultation -> links to #contact -->
      <a href="#contact" data-route="contact" class="exact-interactive-btn exact-btn-black exact-services-btn-consult" onclick="if(window.router){window.router.navigate('contact');}" title="Book A Consultation">
        <span>Book A Consultation</span>
        <span class="exact-search-diamond">⋄</span>
      </a>
    `;
  }

  if (page === 'contact') {
    return `
      <!-- Contact: Book A Consultation -> links to #contact -->
      <a href="#contact" data-route="contact" class="exact-interactive-btn exact-btn-black exact-services-btn-consult" onclick="if(window.router){window.router.navigate('contact');}" title="Book A Consultation">
        <span>Book A Consultation</span>
        <span class="exact-search-diamond">⋄</span>
      </a>
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
            <span class="exact-search-diamond">⋄</span>
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
        <div class="exact-reach-card exact-reach-card-1" onclick="window.router && window.router.navigate('services')" role="button" tabindex="0" title="Global Expertise">
          <img src="/assets/reach/reach-card-1.png" alt="Global Expertise - Decades of experience in international real estate and investment." class="exact-reach-img exact-reach-sketch" />
          <img src="/assets/reach/reach-card-1-color.png" alt="" class="exact-reach-img exact-reach-color" aria-hidden="true" />
        </div>
        <div class="exact-reach-card exact-reach-card-2" onclick="window.router && window.router.navigate('about')" role="button" tabindex="0" title="Proven Track Record">
          <img src="/assets/reach/reach-card-2.png" alt="Proven Track Record - Over $18M in property sales across Turkey and the UAE." class="exact-reach-img exact-reach-sketch" />
          <img src="/assets/reach/reach-card-2-color.png" alt="" class="exact-reach-img exact-reach-color" aria-hidden="true" />
        </div>
        <div class="exact-reach-card exact-reach-card-3" onclick="window.router && window.router.navigate('listings')" role="button" tabindex="0" title="Diverse Portfolio">
          <img src="/assets/reach/reach-card-3-sketch.png" alt="Diverse Portfolio - From luxury residences to social housing and commercial properties." class="exact-reach-img exact-reach-sketch" />
          <img src="/assets/reach/reach-card-3.png" alt="" class="exact-reach-img exact-reach-color" aria-hidden="true" />
        </div>
        <div class="exact-reach-card exact-reach-card-4" onclick="window.router && window.router.navigate('services')" role="button" tabindex="0" title="Comprehensive Services">
          <img src="/assets/reach/reach-card-4.png" alt="Comprehensive Services - Off-plan investments construction, refurbishment, and more." class="exact-reach-img exact-reach-sketch" />
          <img src="/assets/reach/reach-card-4-color.png" alt="" class="exact-reach-img exact-reach-color" aria-hidden="true" />
        </div>
        <div class="exact-reach-card exact-reach-card-5" onclick="window.router && window.router.navigate('services')" role="button" tabindex="0" title="Golden Visa Opportunities">
          <img src="/assets/reach/reach-card-5.png" alt="Golden Visa Opportunities - Properties suitable for residency programs in Europe." class="exact-reach-img exact-reach-sketch" />
          <img src="/assets/reach/reach-card-5-color.png" alt="" class="exact-reach-img exact-reach-color" aria-hidden="true" />
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


