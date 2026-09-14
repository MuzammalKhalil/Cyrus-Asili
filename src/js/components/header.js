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
      <div class="container header-container">
        <!-- Brand Logo -->
        <a href="#" data-route="home" class="logo-brand">
          <img id="site-logo" src="/assets/ASILI_Holding_Long_Logo_WHT_with_BLK_BG_1-2003_190.png" alt="ASILI Holding Ltd." class="logo-img" />
        </a>

        <!-- Main Navigation Menu -->
        <nav>
          <ul class="nav-menu">
            <li><a href="#" data-route="about" class="nav-link">About</a></li>

            <!-- Listings Dropdown -->
            <li class="dropdown">
              <a href="#" data-route="listings" class="nav-link dropdown-trigger">
                Listings <span class="dropdown-arrow">˅</span>
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-item"><a href="#" data-route="listings">All Properties</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="uk">🇬🇧 United Kingdom</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="uae">🇦🇪 United Arab Emirates</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="greece">🇬🇷 Greece</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="cyprus">🇨🇾 Cyprus</a></li>
                <li class="dropdown-item"><a href="#" data-route="listings" data-country="turkey">🇹🇷 Turkey</a></li>
              </ul>
            </li>

            <!-- Services Dropdown -->
            <li class="dropdown">
              <a href="#" data-route="services" class="nav-link dropdown-trigger">
                Services <span class="dropdown-arrow">˅</span>
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-item"><a href="#" data-route="services" data-country="uk">🇬🇧 UK Advisory &amp; Legal</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="uae">🇦🇪 UAE Golden Visa &amp; Off-Plan</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="greece">🇬🇷 Greece Permanent Residence</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="cyprus">🇨🇾 Cyprus Beachfront Investment</a></li>
                <li class="dropdown-item"><a href="#" data-route="services" data-country="turkey">🇹🇷 Turkey Citizenship Pathway</a></li>
              </ul>
            </li>

            <li><a href="#" data-route="contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Header Actions: Search, Theme Toggle, Consultation CTA -->
        <div class="header-actions">
          <!-- Search Button -->
          <button class="header-action-btn search-btn" title="Search Properties" onclick="window.toggleQuickSearch()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <!-- Theme Toggle Button -->
          <button class="header-action-btn theme-toggle-btn" title="Toggle Theme (Light / Dark)" onclick="window.toggleTheme()">
            <span id="theme-toggle-icon">🌙</span>
          </button>

          <!-- Book Consultation CTA Button -->
          <button class="btn-figma-consultation" onclick="window.openBookingModal()">
            Book A Consultation <span class="btn-diamond">⋄</span>
          </button>
        </div>
      </div>
    </header>
  `;

  mountEl.innerHTML = headerHtml;
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
