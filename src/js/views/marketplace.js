import { properties, destinations } from '../data.js';
export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const values = value => String(value || '').split(',').filter(Boolean);
const typeMatches = (p, type) => type.toLowerCase() === 'off-plan' ? p.offPlan : type === 'Trophy' ? p.badge === 'Trophy' : p.type === type;
const bedroomMatches = (p, value) => value === 'Studio' ? p.bedrooms === 0 : value.includes('+') ? p.bedrooms >= parseInt(value) : p.bedrooms === parseInt(value);
const highlightMatches = (p, value) => value === 'featured' ? p.badge === 'Trophy' : Boolean(p[value]);

export function filterProperties(params = {}) {
  const countries = values(params.country);
  const types = values(params.type), bedrooms = values(params.bedrooms), highlights = values(params.highlight);
  const location = (params.location || '').trim().toLowerCase();
  const locationCountry = destinations.find(d => [d.name,d.code,d.id].some(v => v.toLowerCase() === location))?.id;
  const postcode = (params.postcode || '').replace(/\s/g,'').toLowerCase();
  const found = properties.filter(p => (!countries.length || countries.includes(p.country)) &&
    (!location || (locationCountry ? p.country === locationCountry : p.location.toLowerCase().includes(location))) &&
    (!types.length || types.some(type => typeMatches(p,type))) &&
    (!bedrooms.length || bedrooms.some(value => bedroomMatches(p,value))) &&
    (!highlights.length || highlights.every(value => highlightMatches(p,value))) &&
    (!params.reference || p.id.toLowerCase().includes(params.reference.trim().toLowerCase())) &&
    (!postcode || (p.postcode || '').replace(/\s/g,'').toLowerCase().includes(postcode)) &&
    (!params.min || p.priceNum >= Number(params.min)) && (!params.max || p.priceNum <= Number(params.max)));
  if (params.sort === 'asc' || params.sort === 'desc') found.sort((a,b) => a.currency.localeCompare(b.currency) || (params.sort === 'asc' ? a.priceNum-b.priceNum : b.priceNum-a.priceNum));
  return found;
}

export function mountMarketplace(container, initial = {}) {
  const panel = container.querySelector('.listing-layout');
  if (!panel) return;
  let state = {...initial};
  if (state.bedrooms) state.bedrooms = values(state.bedrooms).map(v => v.replace(/ Bedrooms?/, '')).join(',');
  const count = predicate => properties.filter(predicate).length;
  const checks = (name, entries) => entries.map(([value,label,total]) => `<label class="listing-check"><input type="checkbox" name="${name}" value="${value}" ${values(state[name]).includes(value)?'checked':''}><span>${label}</span>${total === undefined ? '' : `<span class="listing-count">${total}</span>`}</label>`).join('');
  panel.innerHTML = `<form id="listing-filters" class="listing-filters" aria-label="Property filters">
    <fieldset><legend>Destination</legend>${checks('country', [...destinations].sort((a,b) => ['uk','uae','greece','turkey','cyprus'].indexOf(a.id)-['uk','uae','greece','turkey','cyprus'].indexOf(b.id)).map(d => [d.id,d.name,count(p=>p.country===d.id)]))}</fieldset>
    <fieldset><legend>Price Range</legend><div class="listing-range"><input name="min" type="number" min="0" aria-label="Minimum price" placeholder="Min" value="${escape(state.min)}"><input name="max" type="number" min="0" aria-label="Maximum price" placeholder="Max" value="${escape(state.max)}"></div></fieldset>
    <fieldset><legend>Property Type</legend>${checks('type', ['Apartment','Villa','Off-plan','Commercial','Trophy'].map(t => [t,t==='Trophy'?'Trophy &amp; Ultra-Luxury':t,count(p=>typeMatches(p,t))]))}</fieldset>
    <fieldset><legend>Bedroom</legend>${checks('bedrooms',[...new Set(['1','2','3','4','5+',...values(state.bedrooms)])].map(n=>[n,n]))}</fieldset>
    <fieldset><legend>Highlights</legend><div class="listing-tags">${checks('highlight',[['featured','Featured'],['goldenVisa','Golden Visa Eligible'],['offPlan','Off-Plan'],['newBuild','New Build']])}</div></fieldset>
    <button class="listing-reset" type="reset">Clear filters</button>
    <div class="listing-callout"><h3>Can't find the right fit?</h3><p>Tell us what you're looking for and we'll shortlist matching properties for you.</p><button class="listing-dark-button" type="button" data-consult>Book A Consultation <span aria-hidden="true">&#9702;</span></button></div>
  </form><div class="listing-results"><div class="listing-toolbar"><strong>Featured</strong><label><span class="listing-sr-only">Sort by</span><select name="sort" aria-label="Sort by"><option value="">Sort by</option><option value="asc">Price: Low to High</option><option value="desc">Price: High to Low</option></select></label><div class="listing-view-buttons"><button type="button" data-view="grid" aria-label="Grid view">&#9638;</button><button type="button" data-view="list" aria-label="List view">&#9776;</button></div></div><p class="listing-result-count" role="status"></p><div class="listing-cards"></div><nav class="listing-pagination" aria-label="Pagination"></nav></div>`;
  const form = panel.querySelector('form');
  const search = container.querySelector('.listing-search-form');
  // Normalize the home search's human-readable bedroom values for the checkboxes.
  if (state.bedrooms && !state.bedrooms.includes(',')) {
    const matched = [...form.querySelectorAll('[name="bedrooms"]')].find(el=>el.value===state.bedrooms.replace(/ Bedrooms?/,''));
    if (matched) matched.checked = true;
  }
  const updateUrl = () => {
    if (window.router) { window.router.currentParams = {...state}; window.router.updateUrl('listings',state); }
  };
  const render = () => {
    const found = filterProperties(state);
    const totalPages = Math.max(1,Math.ceil(found.length/6));
    const page = Math.min(totalPages,Math.max(1,parseInt(state.page)||1));
    state.page = page === 1 ? '' : String(page);
    const list = state.view === 'list';
    panel.querySelector('.listing-cards').classList.toggle('is-list',list);
    panel.querySelector('[name="sort"]').value = state.sort || '';
    panel.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view === (list?'list':'grid'))));
    panel.querySelector('.listing-result-count').textContent = `${found.length} properties found${state.sort ? ' ? Prices grouped by currency' : ''}`;
    panel.querySelector('.listing-cards').innerHTML = found.slice((page-1)*6,page*6).map(p=>`<article class="listing-card"><a href="#property?id=${p.id}" data-route="property" data-id="${p.id}"><div class="listing-image"><img src="/assets/listings/${p.id}.jpg" alt="${p.title}" loading="lazy"><span class="listing-badge">${p.badge}</span></div><div class="listing-card-copy"><h3>${p.title}</h3><p class="listing-location">${p.location}</p><div class="listing-meta"><span>${p.area}</span><span>${p.bedrooms} beds</span><span>${p.bathrooms} Bath</span></div><p class="listing-price">${p.price}</p></div></a></article>`).join('') || '<div class="listing-empty"><h3>No matching properties</h3><p>Try a different location or clear your filters.</p><button type="button" class="listing-reset" data-clear>Clear filters</button></div>';
    panel.querySelector('.listing-pagination').innerHTML = `<button type="button" data-page="${page-1}" aria-label="Previous page" ${page===1?'disabled':''}>&#8249;</button>${Array.from({length:totalPages},(_,i)=>`<button type="button" data-page="${i+1}" ${i+1===page?'aria-current="page"':''}>${i+1}</button>`).join('')}<button type="button" data-page="${page+1}" aria-label="Next page" ${page===totalPages?'disabled':''}>&#8250;</button>`;
  };
  const commit = (next) => { state={...state,...next}; render(); updateUrl(); };
  const applyFilters = () => {
    const data = new FormData(form);
    const max = form.elements.max;
    max.setCustomValidity(data.get('min') && data.get('max') && Number(data.get('max')) < Number(data.get('min')) ? 'Maximum price must be at least the minimum price.' : '');
    if (!form.reportValidity()) return;
    const next = Object.fromEntries(['country','type','bedrooms','highlight'].map(key=>[key,data.getAll(key).join(',')]));
    // Destination controls replace the search location instead of combining conflicting countries.
    if (next.country !== (state.country || '')) { next.location=''; search.elements.location.value=''; }
    commit({...next,min:data.get('min'),max:data.get('max'),page:''});
  };
  const clear = () => {
    form.querySelectorAll('input').forEach(input=>{input.checked=false; if(input.type==='number') input.value=''; input.setCustomValidity('');});
    search.reset(); search.querySelectorAll('input').forEach(input=>input.value=''); search.querySelectorAll('select').forEach(select=>select.value='');
    state={view:state.view || ''}; render();updateUrl();
  };
  form.addEventListener('change',applyFilters);
  form.addEventListener('input',()=>form.elements.max.setCustomValidity(''));
  form.addEventListener('submit',event=>{event.preventDefault();applyFilters();});
  form.addEventListener('reset',event=>{event.preventDefault();clear();});
  panel.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.hasAttribute('data-consult')) window.openBookingModal();
    if(button.hasAttribute('data-clear'))clear();
    if(button.dataset.view)commit({view:button.dataset.view});
    if(button.dataset.page && !button.disabled){commit({page:button.dataset.page});panel.querySelector('.listing-toolbar').scrollIntoView({block:'start',behavior:'smooth'});}
  });
  panel.querySelector('[name="sort"]').addEventListener('change',event=>commit({sort:event.target.value,page:''}));
  search.addEventListener('submit',event=>{
    event.preventDefault();const data=Object.fromEntries(new FormData(search));
    // Search fields replace their matching sidebar selections.
    form.querySelectorAll('[name="country"],[name="type"],[name="bedrooms"]').forEach(el=>el.checked=values(data[el.name]).some(v => v.toLowerCase() === el.value.toLowerCase()));
    commit({...data,country:'',page:''});panel.querySelector('.listing-toolbar').scrollIntoView({block:'start',behavior:'smooth'});
  });
  const advanced = container.querySelector('.listing-advanced');
  advanced.addEventListener('click',()=>{
    const open = !panel.classList.contains('filters-open');panel.classList.toggle('filters-open',open);advanced.setAttribute('aria-expanded',String(open));
    if(open){form.scrollIntoView({block:'start',behavior:'smooth'});form.querySelector('input').focus({preventScroll:true});}
  });
  render();
}
