# Website review

Reference: https://asiliholdinguk.web-testlink.com/

Existing main routes cover Home, About, Listings, Contact and investment services for the UK, UAE, Greece, Turkey and Cyprus. Gallery, News and property details already existed. Existing uncommitted responsive/header work was preserved.

Implemented:
- Live desktop/mobile listings with destination, type, bedrooms, price and highlight filters; six results per page; sorting within currency; empty results and reset.
- Search parameters survive reload and browser history. Property links open the selected property; invalid IDs no longer silently open another property.
- Journal detail routes replace links that incorrectly opened the booking modal. Full article copy was not supplied, so these pages explicitly indicate that the article is unavailable.
- Consultation validation, focus management, Escape dismissal, property context, configurable delivery and honest email fallback.

Delivery setup: copy `.env.example` to `.env.local` and configure `VITE_ENQUIRY_ENDPOINT` with a multipart POST endpoint. Rebuild after configuration. Without an endpoint the form offers a mailto draft to info@asili.uk and does not claim delivery. The reference uses a placeholder Formspree endpoint, which cannot be used for production enquiries.

Limitations requiring supplied content/data:
- Existing property data has no postcodes; a postcode query returns no matches until actual postcodes are supplied. Property references are existing IDs such as prop-3.
- Article body copy, approved privacy policy and terms were not supplied. No legal text or published articles were invented.
- Desktop editorial content remains flattened artwork; overlays preserve the original design. Social destinations were not supplied.
- Desktop footer links and enquiry inputs are now HTML overlays. Privacy/terms routes explicitly request the missing approved documents; their policy content still needs to be supplied.
- No live enquiry was sent during validation.

Validation: production build; Chrome browser checks for desktop filters, reload, property navigation, Back, email fallback, article routing, and mobile width on eight routes with no JavaScript errors.

## Listings reference update

Listings now renders as responsive HTML rather than an overlay on the page image, following the reference listings.html layout. Added multiselect checkbox filters, advanced/mobile filter panel, grid/list view, local search, currency-grouped price sorting and pagination. Counts use the eight existing properties, not the reference's static inventory totals or repeated demo listings. The source reference has non-functional search and static pagination. No remote inventory API was exposed; this implementation uses local data. Newest sorting is omitted until listing dates are available.

The `/listings.html` build entry and existing `#listings` route both open the same connected view. Reference property images are stored locally in `public/assets/listings/`; source: https://asiliholdinguk.web-testlink.com/assets/inner/.

## UK investment service page

The Services menu's UK destination and `/invest-uk.html` now open a responsive UK investment page based on the supplied reference. It includes the hero, market statistics, market table, UK overview, connected UK property cards, consultation action, autoplay testimonials, news link and enquiry footer. Property and consultation actions use the application's existing routes and form flow.
