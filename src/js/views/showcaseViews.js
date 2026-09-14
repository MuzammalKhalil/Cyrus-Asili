import { properties } from '../data.js';

const stories = [
  { category: 'Market intelligence', title: 'Dubai’s prime market continues to set a global pace', date: 'Investment Brief · 06 September 2026', image: '/assets/image_39-2003_1026.png' },
  { category: 'Residency', title: 'A considered guide to European residency through property', date: 'Advisory Note · 28 August 2026', image: '/assets/image_55-2003_1166.png' },
  { category: 'United Kingdom', title: 'Why London remains a cornerstone of a global portfolio', date: 'Market Brief · 14 August 2026', image: '/assets/Rectangle_4353-2003_230.png' }
];

function renderHero(label, text, image) {
  return `<section class="showcase-hero" style="--showcase-image: url('${image}')"><div class="container"><span>${label}</span><h1>${text}</h1></div></section>`;
}

export function renderGalleryView() {
  const container = document.createElement('div');
  container.className = 'showcase-page';
  container.innerHTML = `${renderHero('Selected Residences', 'A considered collection of exceptional homes and investment opportunities across our global markets.', properties[1].image)}<section class="showcase-section"><div class="container"><div class="showcase-heading"><span>ASILI COLLECTION</span><h1>Explore Our Global Portfolio</h1><p>Each opportunity is selected for its location, quality and enduring investment potential.</p></div><div class="gallery-grid">${properties.map(property => `<article class="gallery-card" tabindex="0" role="link" onclick="window.router.navigate('property', { id: '${property.id}' })" onkeydown="if(event.key==='Enter') window.router.navigate('property', { id: '${property.id}' })"><img src="${property.image}" alt="${property.title}" /><div class="gallery-card-overlay"><span>${property.country.toUpperCase()}</span><h2>${property.title}</h2><p>${property.location}</p><strong>${property.price}</strong></div></article>`).join('')}</div></div></section>`;
  return container;
}

export function renderNewsView() {
  const container = document.createElement('div');
  container.className = 'showcase-page';
  container.innerHTML = `${renderHero('Journal', 'Insights for global investors, curated by ASILI Holding.', stories[0].image)}<section class="showcase-section"><div class="container"><div class="showcase-heading"><span>THE ASILI JOURNAL</span><h1>News & Insights</h1><p>Market intelligence and practical guidance for international property decisions.</p></div><div class="journal-grid">${stories.map((story, index) => `<article class="journal-card ${index === 0 ? 'featured' : ''}"><img src="${story.image}" alt="" /><div><span>${story.category}</span><p class="journal-date">${story.date}</p><h2>${story.title}</h2><a href="#" onclick="event.preventDefault(); window.openBookingModal()">Read insight <b>→</b></a></div></article>`).join('')}</div></div></section>`;
  return container;
}

export function renderPropertyView(params = {}) {
  const property = properties.find(item => item.id === params.id) || properties[0];
  const related = properties.filter(item => item.country === property.country && item.id !== property.id).slice(0, 3);
  const container = document.createElement('div');
  container.className = 'showcase-page property-page';
  container.innerHTML = `<section class="property-detail-hero"><div class="property-detail-image"><img src="${property.image}" alt="${property.title}" /></div><div class="property-detail-copy"><button class="back-link" onclick="window.router.navigate('listings')">← All properties</button><span>${property.badge} · ${property.country.toUpperCase()}</span><h1>${property.title}</h1><p class="property-place">${property.location}</p><p class="property-price-detail">${property.price}</p><div class="property-specs"><div><b>${property.bedrooms}</b><small>Bedrooms</small></div><div><b>${property.bathrooms}</b><small>Bathrooms</small></div><div><b>${property.area}</b><small>Internal area</small></div></div><button class="inquire-button" onclick="window.openBookingModal()">Enquire about this property <b>→</b></button></div></section><section class="property-detail-body"><div><span>THE RESIDENCE</span><h2>Designed for a refined way of living.</h2><p>${property.description}</p></div><aside><span>INVESTMENT HIGHLIGHTS</span><ul><li>${property.type} residence</li>${property.goldenVisa ? '<li>Golden Visa eligible</li>' : ''}${property.offPlan ? '<li>Off-plan opportunity</li>' : ''}${property.newBuild ? '<li>New-build assurance</li>' : ''}<li>Private ASILI advisory</li></ul></aside></section>${related.length ? `<section class="showcase-section related-properties"><div class="container"><div class="showcase-heading compact"><span>MORE IN ${property.country.toUpperCase()}</span><h2>Related opportunities</h2></div><div class="gallery-grid">${related.map(item => `<article class="gallery-card" onclick="window.router.navigate('property', { id: '${item.id}' })"><img src="${item.image}" alt="${item.title}" /><div class="gallery-card-overlay"><h2>${item.title}</h2><strong>${item.price}</strong></div></article>`).join('')}</div></div></section>` : ''}`;
  return container;
}
