import { companyInfo } from '../data.js';

export function renderEnquiryFooterHtml() {
  return `<footer class="listing-footer"><div class="listing-footer-grid"><div><img src="/assets/ASILI_Holding_Long_Logo_WHT_Hollow_1-2003_1620.png" alt="ASILI Holding" width="200"><p>Buy, Build, Invest &ndash; Turning Bricks to Gold&trade;.<br>International real estate investment opportunities across the UK, UAE, Greece, Turkey and Cyprus.</p></div><div><h2>Quick Links</h2><nav>${[['home','Home'],['about','About Us'],['listings','Property Marketplace'],['services','Services'],['gallery','Gallery'],['news','News & Blogs'],['contact','Contact'],['privacy','Privacy Policy'],['terms','Terms & Conditions']].map(([route,label])=>`<a href="#${route}" data-route="${route}">${label}</a>`).join('')}</nav><h2>Contact Us</h2><a href="tel:+442075808490">${companyInfo.phones[0]}</a><a href="tel:+447811441111">${companyInfo.phones[1]}</a><a href="mailto:${companyInfo.email}">${companyInfo.email}</a></div><form class="listing-enquiry" aria-label="Get in touch"><h2>Get in Touch</h2><div><input name="firstName" aria-label="First name" placeholder="First Name*" required><input name="lastName" aria-label="Last name" placeholder="Last Name*" required></div><input name="email" type="email" aria-label="Email address" placeholder="Email Address*" required><input name="phone" type="tel" aria-label="Phone number" placeholder="Phone Number"><textarea name="message" aria-label="Message" placeholder="Type your message here..."></textarea><label><input type="checkbox" name="consent" value="yes" required><span>By ticking this box I agree that I have read the <a href="#privacy" data-route="privacy">privacy policy</a>.</span></label><button type="submit">Submit &#9702;</button></form></div><p class="listing-copyright">Copyright &copy; 2026. Asili Holding Ltd. All rights reserved.</p></footer>`;
}

export function bindEnquiryFooter(container) {
  container.querySelector('.listing-enquiry').addEventListener('submit', event=>{
    event.preventDefault();if(!event.currentTarget.reportValidity())return;window.openBookingModal();window.handleBookingSubmit(event.currentTarget);
  });
}
