import copy from '../views/compactCopy.json';
import '../../css/components/testimonial-slider.css';

const clients = [
  { name: 'Hillary Watson', role: 'Accountant', quote: copy.testimonial1 },
  { name: 'Sara Azarmnia', role: 'Art Curator', quote: copy.testimonial2 },
  { name: 'James Levante', role: 'CEO', quote: copy.testimonial3 }
];
const escape = text => text.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

export function mountTestimonialSlider(container, page) {
  const existing = container.querySelector('.compact-testimonials');
  if (!existing) return;
  const section = document.createElement('section');
  section.className = `testimonial-slider testimonial-slider-${page}`;
  section.setAttribute('aria-label', 'Client testimonials');
  section.setAttribute('aria-roledescription', 'carousel');
  section.innerHTML = `<h2>What Our Clients Say About Us</h2>
    <div class="testimonial-carousel">
      <button type="button" class="testimonial-prev" aria-label="Previous testimonial">&#8249;</button>
      <div class="testimonial-viewport" tabindex="0" aria-label="Testimonials. Use left and right arrow keys."><div class="testimonial-track"></div></div>
      <button type="button" class="testimonial-next" aria-label="Next testimonial">&#8250;</button>
    </div>
    <div class="testimonial-dots" aria-label="Choose a testimonial">${clients.map((c,i) => `<button type="button" data-slide="${i}" aria-label="Show ${c.name}'s testimonial"></button>`).join('')}<button type="button" class="testimonial-autoplay" aria-label="Pause automatic testimonials" aria-pressed="false">&#10074;&#10074;</button></div>
    <p class="testimonial-status" aria-live="polite" aria-atomic="true"></p>`;
  existing.replaceWith(section);
  const viewport = section.querySelector('.testimonial-viewport');
  const track = section.querySelector('.testimonial-track');
  const small = matchMedia('(max-width: 700px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, animation = null, start = null;
  let timer = null, paused = false, hovered = false, disposed = false;
  const autoplay = section.querySelector('.testimonial-autoplay');
  const schedule = () => {
    clearTimeout(timer);
    if (disposed || paused || reduced.matches || document.hidden) return;
    timer = setTimeout(() => {
      if (section.isConnected && !hovered && !section.contains(document.activeElement) && !start && !animation) {
        go(1, undefined, true);
      }
      schedule();
    }, 5000);
  };
  autoplay.addEventListener('click', () => {
    paused = !paused;
    autoplay.setAttribute('aria-pressed', String(paused));
    autoplay.setAttribute('aria-label', paused ? 'Resume automatic testimonials' : 'Pause automatic testimonials');
    autoplay.innerHTML = paused ? '&#9654;' : '&#10074;&#10074;';
    schedule();
  });
  section.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') hovered = true; });
  section.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  section.addEventListener('focusout', schedule);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  const visible = () => small.matches ? 1 : 3;
  const render = () => {
    // One extra card at each end allows a seamless move in either direction.
    track.innerHTML = Array.from({length:visible()+2}, (_,slot) => {
      const index = (current+slot-1+clients.length)%clients.length;
      const client = clients[index];
      return `<blockquote class="testimonial-card" ${slot===0 || slot===visible()+1 ? 'aria-hidden="true"' : 'role="group" aria-roledescription="slide" aria-label="'+(index+1)+' of 3"'}><div><span class="testimonial-quote-mark" aria-hidden="true">&#8221;</span><span class="testimonial-stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>${escape(client.quote.trim())}</p><cite>${client.name}</cite><small>${client.role}</small></div></blockquote>`;
    }).join('');
    track.style.transform = `translateX(-${100/visible()}%)`;
    section.querySelectorAll('[data-slide]').forEach(dot => dot.setAttribute('aria-pressed',String(Number(dot.dataset.slide)===current)));
  };
  const go = (direction, target = (current+direction+clients.length)%clients.length, automatic = false) => {
    if (animation || target===current) return;
    if (!automatic) schedule();
    const finish = () => {
      animation?.cancel(); animation = null;
      current = target; render();
      if (!automatic) section.querySelector('.testimonial-status').textContent = `${clients[current].name}, testimonial ${current+1} of ${clients.length}`;
    };
    if (reduced.matches) return finish();
    animation = track.animate([{transform:`translateX(-${100/visible()}%)`},{transform:`translateX(${-(1+direction)*100/visible()}%)`}],{duration:360,easing:'ease-in-out',fill:'forwards'});
    animation.onfinish = finish;
  };
  section.querySelector('.testimonial-prev').addEventListener('click',()=>go(-1));
  section.querySelector('.testimonial-next').addEventListener('click',()=>go(1));
  section.querySelectorAll('[data-slide]').forEach(dot => dot.addEventListener('click',()=> {
    const target = Number(dot.dataset.slide);
    go(target===(current+1)%clients.length ? 1 : -1,target);
  }));
  viewport.addEventListener('keydown', event => {
    if (event.key==='ArrowLeft' || event.key==='ArrowRight') { event.preventDefault(); go(event.key==='ArrowRight'?1:-1); }
  });
  viewport.addEventListener('pointerdown', event => { start={x:event.clientX,y:event.clientY}; viewport.setPointerCapture(event.pointerId); });
  viewport.addEventListener('pointerup', event => {
    if (!start) return;
    const dx=event.clientX-start.x, dy=event.clientY-start.y;
    if (Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)) go(dx<0?1:-1);
    start=null;
  });
  viewport.addEventListener('pointercancel',()=>{start=null;});
  const resize = () => { animation?.cancel(); animation=null; render(); };
  small.addEventListener('change',resize);
  container.disposeTestimonials = () => {
    disposed = true;
    clearTimeout(timer);
    animation?.cancel();
    small.removeEventListener('change', resize);
    reduced.removeEventListener('change', schedule);
    document.removeEventListener('visibilitychange', schedule);
  };
  render();
  schedule();
}
