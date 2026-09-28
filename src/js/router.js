export class Router {
  constructor(routes, defaultRoute = 'home') {
    this.routes = routes;
    this.currentRoute = defaultRoute;
    this.currentParams = {};
  }

  navigate(route, params = {}) {
    if (!this.routes[route]) {
      console.warn(`Route ${route} not found, defaulting to home`);
      route = 'home';
    }
    
    this.currentRoute = route;
    this.currentParams = params;
    this.updateUrl(route, params);
    document.body.classList.toggle('exact-design-mode', ['home', 'about', 'listings', 'contact', 'services'].includes(route));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update nav links state
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render route view
    const mainContainer = document.getElementById('main-content');
    if (mainContainer) {
      mainContainer.firstElementChild?.disposeTestimonials?.();
      mainContainer.innerHTML = '';
      const viewElement = this.routes[route](params);
      mainContainer.appendChild(viewElement);
    }
  }

  updateUrl(route, params) {
    const search = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== '' && value != null));
    const query = search.size ? `?${search}` : '';
    const url = `#${route}${query}`;

    if (window.location.hash !== url) {
      window.history.pushState(null, '', url);
    }
  }
}
