/* ============================================
   main.js — GSAP ScrollTrigger animations
   Matching le-lab.io scroll behavior exactly
   ============================================ */

(function() {
  'use strict';

  // --- Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function(time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // --- Navbar scroll effect ---
  ScrollTrigger.create({
    start: 'top -60px',
    onUpdate: function(self) {
      var navbar = document.querySelector('.main-navbar');
      if (!navbar) return;
      navbar.classList.toggle('scrolled', self.progress > 0);
    }
  });

  // --- Hero parallax glows ---
  gsap.to('.hero-glow.glow-1', {
    y: -60,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  gsap.to('.hero-glow.glow-2', {
    y: 50,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  // --- Scroll indicator fade ---
  ScrollTrigger.create({
    trigger: '.hero-section',
    start: 'top top',
    end: 'center center',
    scrub: 1,
    onUpdate: function(self) {
      var indicator = document.querySelector('.scroll-indicator');
      if (indicator) indicator.style.opacity = 1 - self.progress;
    }
  });

  // --- Hero content stagger ---
  var heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-content',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  heroTl.from('.hero-content h1', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, 0);
  heroTl.from('.hero-content .hero-subtitle', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.2);

  // --- Service rows stagger reveal ---
  gsap.utils.toArray('.service-row').forEach(function(row, i) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(row.querySelector('.service-image'), {
      x: row.classList.contains('reverse') ? 60 : -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0);

    tl.from(row.querySelector('.service-number'), {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 0.1);

    tl.from(row.querySelector('h3'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, 0.2);

    tl.from(row.querySelector('p'), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, 0.3);

    tl.from(row.querySelector('.service-btn'), {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out'
    }, 0.4);
  });

  // --- Video section reveal ---
  gsap.from('.video-section h2', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.video-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  gsap.from('.video-container', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.video-container',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  // --- Partner items stagger ---
  gsap.from('.partner-item', {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    stagger: 0.04,
    scrollTrigger: {
      trigger: '.partners-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  });

  // --- Contact CTA reveal ---
  gsap.from('.contact-cta-section', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-cta-section',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  });

  // Footer reveal
  gsap.from('footer', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 95%',
      toggleActions: 'play none none reverse',
    }
  });

  // --- Mobile hamburger toggle ---
  var navbarToggle = document.querySelector('.navbar-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navbarToggle && navLinks) {
    navbarToggle.addEventListener('click', function() {
      var isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navbarToggle.classList.toggle('active');
    });
  }

  // Force scroll to top and refresh
  window.addEventListener('load', function() {
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  });

})();
