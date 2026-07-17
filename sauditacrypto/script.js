// ===== SAUDITACRYPTO — Main Script =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== MOBILE MENU TOGGLE =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== CHART TAB SWITCHING =====
  const chartTabs = document.querySelectorAll('.chart-tab');
  chartTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Animate chart line on tab switch
      const chartLine = document.getElementById('chartLine');
      if (chartLine) {
        chartLine.style.opacity = '0';
        chartLine.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          chartLine.style.opacity = '1';
        }, 150);
      }
    });
  });

  // ===== COUNTER ANIMATION FOR STATS =====
  const animateValue = (element, start, end, duration, prefix = '', suffix = '') => {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);
      element.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  // Observe stat values for counter animation
  const statValues = document.querySelectorAll('.stat-value');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.animated) {
          el.dataset.animated = 'true';
          // Simple pulse effect
          el.style.transition = 'transform 0.5s ease';
          el.style.transform = 'scale(1.02)';
          setTimeout(() => { el.style.transform = 'scale(1)'; }, 500);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => statObserver.observe(el));

  // ===== PARALLAX EFFECT ON HERO VISUAL =====
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // ===== FLOATING COIN ENHANCED ANIMATION =====
  const floatingCoins = document.querySelectorAll('.floating-coin');
  floatingCoins.forEach((coin, index) => {
    const delay = index * 0.7;
    coin.style.animationDelay = `${delay}s`;
  });

  // ===== BUTTON RIPPLE EFFECT =====
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0,0,0,0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#FFFFFF';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => navObserver.observe(section));

  // ===== CHART LINE DRAWING ANIMATION =====
  const chartLine = document.getElementById('chartLine');
  if (chartLine) {
    const length = chartLine.getTotalLength();
    chartLine.style.strokeDasharray = length;
    chartLine.style.strokeDashoffset = length;

    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chartLine.style.transition = 'stroke-dashoffset 2s ease-in-out';
          chartLine.style.strokeDashoffset = '0';
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const mainChart = document.getElementById('mainChart');
    if (mainChart) {
      chartObserver.observe(mainChart);
    }
  }
});
