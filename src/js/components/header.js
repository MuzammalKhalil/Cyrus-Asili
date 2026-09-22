/**
 * ASILI Holding Ltd. - Site Navigation Header Component
 * Modular component for universal page header across all views
 */

export function renderHeader(mountSelector = '#header-root') {
  const mountEl = typeof mountSelector === 'string' 
    ? document.querySelector(mountSelector) 
    : mountSelector;

  if (!mountEl) {
    console.error(`Header mount container "${mountSelector}" not found.`);
    return;
  }

  const headerHtml = `
    <header class="site-header" id="main-site-header">
      <div class="header-container">
        <!-- Brand Logo -->
        <a href="#" data-route="home" class="logo-brand">
          <img id="site-logo" src="/assets/ASILI_Holding_Long_Logo_WHT_Hollow_1-2003_1620.png" alt="ASILI Holding Ltd." class="logo-img" />
        </a>

        <!-- Main Navigation Menu -->
        <nav class="site-nav">
          <ul class="nav-menu">
            <li><a href="#" data-route="about" class="nav-link">About</a></li>

            <!-- Listings Dropdown -->
            <li class="dropdown">
              <a href="#" data-route="listings" class="nav-link dropdown-trigger">
                Listings <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-item"><a href="#" data-route="listings">All Listings</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="uk">United Kingdom</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="uae">UAE</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="greece">Greece</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="cyprus">Cyprus</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="turkey">Turkey</a></li>
              </ul>
            </li>

            <!-- Services Dropdown -->
            <li class="dropdown">
              <a href="#" data-route="services" class="nav-link dropdown-trigger">
                Services <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-item"><a href="#" data-route="services" data-country="uk">Invest in the UK</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="uae">Invest in the UAE</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="greece">Invest in Greece</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="cyprus">Invest in Cyprus</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="turkey">Invest in Turkey</a></li>
              </ul>
            </li>

            <li><a href="#" data-route="contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Header Actions: Search & Consultation CTA -->
        <div class="header-actions">
          <!-- Search Button -->
          <a href="#listings" data-route="listings" class="header-search-btn" title="Search Properties">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </a>

          <!-- Book Consultation CTA Button -->
          <a href="#contact" data-route="contact" class="btn-figma-consultation" onclick="if(window.router){window.router.navigate('contact');}">
            <span>Book A Consultation</span>
            <svg class="btn-circle-svg" width="9" height="9" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1.3"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  `;

  mountEl.innerHTML = headerHtml;

  mountEl.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains('is-open');

      document.querySelectorAll('.dropdown').forEach(item => {
        item.classList.remove('is-open');
      });

      if (!isOpen) {
        dropdown.classList.add('is-open');
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('is-open');
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-open');
      }
    });
  });
}

export function updateActiveHeaderRoute(currentRoute = 'home') {
  document.querySelectorAll('.site-header .nav-link').forEach(link => {
    const route = link.getAttribute('data-route');
    if (route === currentRoute) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
