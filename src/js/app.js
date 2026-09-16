import '../css/base.css';
import '../css/components/header.css';
import '../css/components/hero.css';
import '../css/components/property-card.css';
import '../css/components/filters.css';
import '../css/components/modal.css';
import '../css/pages/about.css';
import '../css/pages/services.css';
import '../css/pages/contact.css';
import '../css/pages/exact-design.css';
import '../css/pages/showcase.css';
import '../css/pages/inner-pages.css';

import { Router } from './router.js';
import { renderHomeView } from './views/homeView.js';
import { renderAboutView } from './views/aboutView.js';
import { renderListingsView } from './views/listingsView.js';
import { renderServicesView } from './views/servicesView.js';
import { renderContactView } from './views/contactView.js';
import { renderExactPageView } from './views/exactPageView.js';
import { renderGalleryView, renderNewsView, renderPropertyView } from './views/showcaseViews.js';
import { renderHeader, updateActiveHeaderRoute } from './components/header.js';
import { renderBookingModal, openBookingModal } from './components/bookingModal.js';
import { renderPropertyModal, openPropertyModal } from './components/propertyModal.js';

// Global modal triggers & theme handlers
window.openBookingModal = openBookingModal;
window.openPropertyModal = openPropertyModal;

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
  }

  const logo = document.getElementById('site-logo');
  if (logo) {
    if (newTheme === 'light') {
      logo.src = '/assets/ASILI_Holding_Long_Logo_WHT_with_BLK_BG_1-2003_190.png';
    } else {
      logo.src = '/assets/ASILI_Holding_Long_Logo_WHT_Hollow_1-2003_1620.png';
    }
  }
};

window.toggleQuickSearch = function() {
  if (window.router) {
    window.router.navigate('listings');
  }
};

document.addEventListener('DOMContentLoaded', () => {
// Mount Global Header Component dynamically across all pages
  renderHeader('#header-root');

  // Keep the Listings menu aligned with the Figma navigation labels and order.
  const listingsMenu = document.querySelector('.dropdown a[data-route="listings"]')?.closest('.dropdown')?.querySelector('.dropdown-menu');
  if (listingsMenu) {
    const listingLabels = {
      uk: 'United Kingdom',
      uae: 'UAE',
      greece: 'Greece',
      turkey: 'Turkey',
      cyprus: 'Cyprus'
    };
    const allListings = listingsMenu.querySelector('a:not([data-country])');
    if (allListings) allListings.textContent = 'All Listings';
    Object.entries(listingLabels).forEach(([country, label]) => {
      const link = listingsMenu.querySelector(`a[data-country="${country}"]`);
      if (link) {
        link.textContent = label;
        listingsMenu.appendChild(link.closest('li'));
      }
    });
  }

  const servicesMenu = document.querySelector('.dropdown a[data-route="services"]')?.closest('.dropdown')?.querySelector('.dropdown-menu');
  if (servicesMenu) {
    const serviceLabels = {
      uk: 'Invest in the UK',
      uae: 'Invest in the UAE',
      greece: 'Invest in Greece',
      turkey: 'Invest in Turkey',
      cyprus: 'Invest in Cyprus'
    };
    Object.entries(serviceLabels).forEach(([country, label]) => {
      const link = servicesMenu.querySelector(`a[data-country="${country}"]`);
      if (link) {
        link.textContent = label;
        servicesMenu.appendChild(link.closest('li'));
      }
    });
  }

  // Mount Modals
  renderBookingModal();
  renderPropertyModal();

  // Define Routes
  const routes = {
    home: (params) => renderHomeView(router),
    about: (params) => renderAboutView(),
    listings: (params) => renderListingsView(params),
    services: (params) => renderExactPageView('services', params),
    contact: (params) => renderContactView(),
    gallery: () => renderGalleryView(),
    news: () => renderNewsView(),
    property: (params) => renderPropertyView(params)
  };

  const router = new Router(routes, 'home');
  window.router = router;

  // Initialize the requested page. Services country screens are independently
  // addressable, e.g. #services?country=uae.
  const loadRouteFromHash = () => {
    const hash = window.location.hash.slice(1);
    const [route = 'home', query = ''] = hash.split('?');
    const searchParams = new URLSearchParams(query);
    const country = searchParams.get('country');
    const id = searchParams.get('id');
    router.navigate(route || 'home', country ? { country } : id ? { id } : {});
    updateActiveHeaderRoute(route || 'home');
  };

  loadRouteFromHash();
  window.addEventListener('hashchange', loadRouteFromHash);

  // Event listeners for Navigation links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-route]');
    if (link) {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      const country = link.getAttribute('data-country');
      router.navigate(route, country ? { country } : {});
      updateActiveHeaderRoute(route);
    }
  });
});
