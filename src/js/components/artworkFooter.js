import { companyInfo } from '../data.js';
export function mountArtworkFooter(container) {
  const footer = document.createElement('div');
  footer.className = 'artwork-footer-controls';
  const link = (route,label,x,y) => `<a href="#${route}" data-route="${route}" aria-label="${label}" title="${label}" style="left:${x}%;top:${y}%;width:16%;height:3.5%"></a>`;
  footer.innerHTML = `${[['home','Home'],['about','About Us'],['listings','Property Marketplace'],['services','Services'],['gallery','Gallery'],['news','News & Blogs']].map(([route,label],i) => link(route,label,33.7,34.6+i*3.52)).join('')}
    ${link('about','Partners',51.8,34.6)}${link('contact','Contact',51.8,38.12)}${link('privacy','Privacy Policy',51.8,41.64)}${link('terms','Terms & Conditions',51.8,45.16)}
    <a href="tel:+442075808490" aria-label="Call ASILI office" style="left:37%;top:67%;width:17%;height:3%"></a>
    <a href="tel:+447811441111" aria-label="Call ASILI mobile" style="left:37%;top:70%;width:17%;height:3%"></a>
    <a href="mailto:${companyInfo.email}" aria-label="Email ASILI" style="left:37%;top:74.5%;width:17%;height:4%"></a>
    <form aria-label="Get in touch" class="artwork-footer-form">
      <div><input name="firstName" aria-label="First name" placeholder="First Name*" required><input name="lastName" aria-label="Last name" placeholder="Last Name*" required></div>
      <input name="email" type="email" aria-label="Email address" placeholder="Email Address*" required>
      <input name="phone" type="tel" aria-label="Phone number" placeholder="Phone Number">
      <textarea name="message" aria-label="Message" placeholder="Type your message here..."></textarea>
      <label><input type="checkbox" name="consent" value="yes" required> I agree to the <a href="#privacy" data-route="privacy">privacy policy</a>.</label>
      <button type="submit">Submit &circ;</button>
    </form>`;
  footer.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    window.openBookingModal();
    const booking = document.getElementById('consultation-form');
    for (const [name,value] of new FormData(event.currentTarget)) if (booking.elements[name]) booking.elements[name].value = value;
    // The consultation dialog presents delivery status and the email fallback.
    window.handleBookingSubmit(event.currentTarget);
  });
  container.querySelector('.exact-page-stage').append(footer);
}
