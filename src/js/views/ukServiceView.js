import { properties } from '../data.js';
import { renderEnquiryFooterHtml, bindEnquiryFooter } from '../components/enquiryFooter.js';
import { mountTestimonialSlider } from '../components/testimonialSlider.js';
import '../../css/pages/uk-service.css';

const markets = [
  ['London','&pound;650,000','4.1%','Steady'],
  ['Manchester','&pound;290,000','6.3%','Strong'],
  ['Birmingham','&pound;265,000','5.8%','Strong'],
  ['Leeds','&pound;240,000','6.0%','Strong'],
  ['Liverpool','&pound;195,000','7.1%','High Growth']
];

export function renderUKServiceView() {
  const container = document.createElement('div');
  container.className = 'listings-page uk-service-page';
  container.innerHTML = `<section class="listing-hero"><video autoplay muted loop playsinline poster="/assets/listings/hero.png"><source src="/assets/0714.mp4" type="video/mp4"></video><div class="listing-hero-copy"><h1>Invest In UK Real Estate</h1><p>From central London new-builds to high-yield regional buy-to-lets - ASILI Holding gives international investors direct, vetted access to the UK property market.</p></div></section>
    <section class="uk-stats" aria-label="UK market overview"><div class="listing-shell">${[['54+','Active UK Listings'],['?10M+','UK Property Sold Since 2018'],['5.2%','Avg. Rental Yield'],['27yrs','Combined UK Market Experience']].map(([value,label])=>`<div class="uk-stat"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div></section>
    <section class="uk-market"><div class="listing-shell"><p class="uk-eyebrow">Market Snapshot</p><h2 class="uk-title">Where We're Seeing The Strongest Returns</h2><p class="uk-copy">Indicative figures based on current ASILI Holding listings and market research. Speak to our team for a live, property-specific breakdown.</p><div class="uk-table-wrap" role="region" aria-label="UK market snapshot" tabindex="0"><table><thead><tr><th scope="col">City</th><th scope="col">Avg. Entry Price</th><th scope="col">Avg. Rental Yield</th><th scope="col">5-Yr Growth Outlook</th></tr></thead><tbody>${markets.map(row=>`<tr>${row.map((v,i)=>i===0?`<th scope="row">${v}</th>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>
    <section class="uk-story"><div class="listing-shell uk-split"><img src="/assets/services/story-uk.jpg" alt="London city architecture" loading="lazy"><div><h2 class="uk-title">A Market Built On<br>Stability</h2><p class="uk-copy">Explore UK property opportunities across London and key regional cities. Our team helps international buyers compare locations, understand the purchase process and choose properties that fit their plans.</p><p class="uk-copy">From your first enquiry through to completion, speak with ASILI Holding for guidance tailored to your investment goals.</p></div></div></section>
    <section class="uk-properties listing-shell"><p class="uk-eyebrow">Market Snapshot</p><h2 class="uk-title">UK Properties We're Currently Representing</h2><div class="listing-cards">${properties.filter(p=>p.country==='uk').map(p=>`<article class="listing-card"><a href="#property?id=${p.id}" data-route="property" data-id="${p.id}"><div class="listing-image"><img src="/assets/listings/${p.id}.jpg" alt="${p.title}" loading="lazy"><span class="listing-badge">${p.badge}</span></div><div class="listing-card-copy"><h3>${p.title}</h3><p class="listing-location">${p.location}</p><div class="listing-meta"><span>${p.area}</span><span>${p.bedrooms} beds</span><span>${p.bathrooms} Bath</span></div><p class="listing-price">${p.price}</p></div></a></article>`).join('')}</div><a class="listing-dark-button" href="#listings?country=uk" data-route="listings" data-country="uk">View All UK Listings <span aria-hidden="true">&#9702;</span></a></section>
    <section class="uk-guidance"><div class="listing-shell uk-split"><div><p class="uk-eyebrow">Legal, Tax &amp; Residency</p><h2 class="uk-title">Guidance Built<br>For Overseas Buyers</h2><p class="uk-copy">Tell us what you're looking for and our team will help you shortlist suitable UK properties. Discuss your budget, preferred location and purchase timeline in a private consultation.</p><button type="button" class="listing-dark-button" data-uk-consult>Book A Consultation <span aria-hidden="true">&#9702;</span></button></div><img src="/assets/services/legal-uk.jpg" alt="Residential street in London" loading="lazy"></div></section>
    <div class="uk-testimonials"><p class="uk-eyebrow">Testimonials</p><div class="compact-testimonials"></div></div>
    <section class="uk-news"><img src="/assets/services/news.png" alt="Contemporary property architecture" loading="lazy"><div><h2 class="uk-title">News &amp; Blog</h2><p>Stay updated with the latest real estate trends, investment tips, and market analysis.</p><a class="listing-dark-button" href="#news" data-route="news">Read News &amp; Blogs <span aria-hidden="true">&#9702;</span></a></div></section>
    ${renderEnquiryFooterHtml()}`;
  container.querySelector('[data-uk-consult]').addEventListener('click',()=>window.openBookingModal());
  bindEnquiryFooter(container);
  mountTestimonialSlider(container,'uk');
  return container;
}
