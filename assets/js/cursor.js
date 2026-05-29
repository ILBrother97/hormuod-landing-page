/* ============================================
   cursor.js — Custom cursor follower
   Matching le-lab.io cursor behavior
   ============================================ */

(function() {
  'use strict';

  // Lightning bolt SVG
  const boltSvg = '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" fill="#052090"/></svg>';

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.innerHTML = boltSvg;
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .btn-primary-custom, .btn-outline-custom, .service-card, .partner-item, .navbar-cta';
  document.addEventListener('mouseover', function(e) {
    const target = e.target.closest(hoverTargets);
    if (target) {
      ring.classList.add('hovering');
      dot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    }
  });

  document.addEventListener('mouseout', function(e) {
    const target = e.target.closest(hoverTargets);
    if (target) {
      ring.classList.remove('hovering');
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', function() {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function() {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();
