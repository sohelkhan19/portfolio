/**
 * SOHEL KHAN - LUXURY DEVELOPER PORTFOLIO ENGINE
 * Features: GSAP ScrollTrigger, Custom Magnetic Cursor, 3D Card Tilt,
 * Spotlight Reflection, Interactive In-Card Tabs, and Theme Switching.
 * 100% Zero-build Vanilla JavaScript (Runs standalone on GitHub Pages).
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle System
  initThemeToggle();

  // 2. Custom Neon Mouse Follower & Spotlight
  initCursorAndSpotlight();

  // 3. Dynamic Typewriter Engine
  initTypewriter();

  // 4. GSAP & ScrollTrigger Animation Engine
  initGsapAnimations();

  // 5. In-Card Micro-Tabs
  initProjectTabsAndFilters();

  // 6. Navigation & Mobile Drawer (Fixed!)
  initNavigation();

  // 7. Interactive Audio Engine (Web Audio API Synth)
  initAudioEffects();

  // 8. Project Instant Search & Dynamic Counter
  initProjectSearch();

  // 9. Interactive Architecture Sandbox & Live Simulator
  initPlayground();

  // 10. Clipboard Copy Helper
  initCopyButtons();

  // 11. Contact Form Async Submission
  initContactForm();

  // 12. Scroll to Top
  initScrollTop();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE SYSTEM
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('sohel_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  html.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      html.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('sohel_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = theme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

/* --------------------------------------------------------------------------
   2. CUSTOM MOUSE CURSOR, MAGNETIC FOLLOWER & SPOTLIGHT
   -------------------------------------------------------------------------- */
function initCursorAndSpotlight() {
  // Mobile / touch devices do not have fine cursor pointers; exit to save resources and avoid touch-tilt jitter
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isFirstMove = true;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (isFirstMove) {
      ringX = mouseX;
      ringY = mouseY;
      isFirstMove = false;
      dot.style.opacity = '1';
      ring.style.opacity = '0.6';
    }

    // Always preserve translate(-50%, -50%) so dot is dead center at mouse coordinates
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Smooth lerp for outer ring with exact center matching
  function renderCursor() {
    if (!isFirstMove) {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      // Always preserve translate(-50%, -50%) so ring center matches dot center
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hide cursor cleanly when mouse leaves the browser window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (!isFirstMove) {
      dot.style.opacity = '1';
      ring.style.opacity = '0.6';
    }
  });

  // Hover triggers for magnetic cursor
  const interactiveTargets = document.querySelectorAll(
    'a, button, .spotlight-card, .cluster-skill-pill, .filter-btn, .micro-tab-btn, .tech-tag-badge, .scenario-pill, .quick-chip'
  );

  interactiveTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    target.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Dynamic radial spotlight illumination on cards (Zero-vibration, pure GPU stability)
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for radial gradient spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
}

/* --------------------------------------------------------------------------
   3. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const phrases = [
    "Laravel & PHP Architect",
    "WordPress & WooCommerce Specialist",
    "Custom Plugin & Theme Developer",
    "Scalable RESTful API Engineer"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  function typeLoop() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      delay = 40;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      delay = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      delay = 2200; // Pause at end of phrase
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400; // Pause before new phrase
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
}

/* --------------------------------------------------------------------------
   4. GSAP & SCROLLTRIGGER ANIMATIONS
   -------------------------------------------------------------------------- */
function initGsapAnimations() {
  // Verify GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded via CDN.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Prevent mobile browser URL bar expand/collapse from causing jumpy ScrollTrigger recalculations
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
  });

  // Hero Section Staggered Entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.status-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
    .from('.hero-avatar-wrap', { opacity: 0, scale: 0.8, duration: 0.8 }, '-=0.4')
    .from('.hero-title', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
    .from('.hero-role-wrapper', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-stats-row .hero-stat-pill', { opacity: 0, y: 15, stagger: 0.1, duration: 0.5 }, '-=0.2');

  // ScrollReveal for Section Headers
  gsap.utils.toArray('.section-header-center').forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Staggered reveal for Skill Cluster cards
  gsap.from('.skills-clusters-grid .cluster-card', {
    scrollTrigger: {
      trigger: '.skills-clusters-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    clearProps: 'transform',
  });

  // Staggered reveal for Project cards
  gsap.from('.projects-cards-grid .project-card-interactive', {
    scrollTrigger: {
      trigger: '.projects-cards-grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 50,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power2.out',
    clearProps: 'transform',
  });

  // Timeline entries slide-in
  gsap.utils.toArray('.timeline-entry').forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      x: -30,
      duration: 0.7,
      ease: 'power2.out',
    });
  });
}

/* --------------------------------------------------------------------------
   5. IN-CARD MICRO-TABS
   -------------------------------------------------------------------------- */
function initProjectTabsAndFilters() {
  document.querySelectorAll('.project-card-interactive').forEach((card) => {
    const tabBtns = card.querySelectorAll('.micro-tab-btn');
    const tabPanes = card.querySelectorAll('.card-tab-pane');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Toggle active button
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle corresponding pane
        tabPanes.forEach((pane) => {
          if (pane.getAttribute('data-pane') === targetTab) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });

        if (window.portfolioAudio) window.portfolioAudio.playTick();
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. NAVIGATION & MOBILE DRAWER (ROCK-SOLID OPEN & CLOSE)
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.querySelector('.navbar-custom');
  const hamburger = document.getElementById('mobileHamburger');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('closeDrawerBtn');

  // Navbar elevation on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    if (hamburger) hamburger.classList.add('active');
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    if (window.portfolioAudio) window.portfolioAudio.playTick();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
    if (window.portfolioAudio) window.portfolioAudio.playTick();
  }

  // Mobile drawer touch drag tracking (prevents closing while scrolling nav items)
  let touchStartY = 0;
  let touchStartX = 0;
  let isScrollingNav = false;

  if (drawer) {
    drawer.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        isScrollingNav = false;
      }
    }, { passive: true });

    drawer.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        if (deltaY > 8 || deltaX > 8) {
          isScrollingNav = true;
        }
      }
    }, { passive: true });
  }

  // Hamburger toggle on click
  if (hamburger && drawer) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  // Close button click
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Close drawer ONLY on clicking genuine links (never while scrolling nav items)
  if (drawer) {
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (isScrollingNav) {
          e.preventDefault();
          return;
        }
        closeDrawer();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE AUDIO ENGINE (PURE WEB AUDIO API SYNTH)
   -------------------------------------------------------------------------- */
function initAudioEffects() {
  let audioCtx = null;
  let soundEnabled = localStorage.getItem('sohel_sound') !== 'false';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const audioApi = {
    isEnabled: () => soundEnabled,
    toggle: () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('sohel_sound', soundEnabled ? 'true' : 'false');
      updateSoundButtons();
      if (soundEnabled) {
        audioApi.playTick();
      }
    },
    playTick: () => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.035);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch (err) {}
    },
    playSweep: () => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      } catch (err) {}
    },
    playSuccess: () => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        [523.25, 659.25].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = ctx.currentTime + i * 0.09;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.05, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.16);
        });
      } catch (err) {}
    }
  };

  window.portfolioAudio = audioApi;

  function updateSoundButtons() {
    const navBtn = document.getElementById('soundToggleBtn');
    const mobBtn = document.getElementById('mobileSoundToggleBtn');

    if (navBtn) {
      navBtn.innerHTML = soundEnabled
        ? '<i class="fas fa-volume-up text-cyan"></i>'
        : '<i class="fas fa-volume-xmark text-muted"></i>';
      navBtn.title = soundEnabled ? 'Audio FX: ON (Click to Mute)' : 'Audio FX: Muted (Click to Unmute)';
    }

    if (mobBtn) {
      mobBtn.innerHTML = soundEnabled
        ? '<i class="fas fa-volume-up me-1 text-cyan"></i> <span class="sound-status-text">Audio: ON</span>'
        : '<i class="fas fa-volume-xmark me-1 text-muted"></i> <span class="sound-status-text">Audio: OFF</span>';
      if (soundEnabled) {
        mobBtn.classList.add('active');
      } else {
        mobBtn.classList.remove('active');
      }
    }
  }

  updateSoundButtons();

  const navBtn = document.getElementById('soundToggleBtn');
  if (navBtn) {
    navBtn.addEventListener('click', () => {
      audioApi.toggle();
    });
  }

  const mobBtn = document.getElementById('mobileSoundToggleBtn');
  if (mobBtn) {
    mobBtn.addEventListener('click', () => {
      audioApi.toggle();
    });
  }

  // Pre-unlock audio on user touch/click
  const unlockAudio = () => {
    getAudioContext();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { once: true });
  window.addEventListener('touchstart', unlockAudio, { once: true });
}

/* --------------------------------------------------------------------------
   8. PROJECT INSTANT SEARCH & DYNAMIC FILTER ENGINE
   -------------------------------------------------------------------------- */
function initProjectSearch() {
  const searchInput = document.getElementById('projectSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const countEl = document.getElementById('projectCount');
  const noResultsEl = document.getElementById('projectNoResults');
  const noResultsQuery = document.getElementById('noResultsQuery');
  const resetBtn = document.getElementById('resetProjectsFilterBtn');
  const quickChips = document.querySelectorAll('.quick-chip');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-interactive');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterProjects() {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category') || '';
      const textContent = (card.innerText || card.textContent).toLowerCase();

      const matchesCat = activeCategory === 'all' || category.includes(activeCategory);
      const matchesSearch = query === '' || textContent.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 15);
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 220);
      }
    });

    if (countEl) {
      countEl.textContent = visibleCount;
    }

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
    }

    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.style.display = 'block';
        if (noResultsQuery) noResultsQuery.textContent = query || activeCategory;
      } else {
        noResultsEl.style.display = 'none';
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterProjects();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      if (window.portfolioAudio) window.portfolioAudio.playTick();
      filterProjects();
      if (searchInput) searchInput.focus();
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const keyword = chip.getAttribute('data-keyword');
      if (searchInput) {
        searchInput.value = keyword;
        searchQuery = keyword;
      }
      if (window.portfolioAudio) window.portfolioAudio.playTick();
      filterProjects();
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      if (window.portfolioAudio) window.portfolioAudio.playTick();
      filterProjects();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';
      filterBtns.forEach((b) => b.classList.remove('active'));
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
      if (window.portfolioAudio) window.portfolioAudio.playTick();
      filterProjects();
    });
  }
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE ARCHITECTURE SANDBOX & LIVE SIMULATOR
   -------------------------------------------------------------------------- */
function initPlayground() {
  const scenarioPills = document.querySelectorAll('.scenario-pill');
  const codeDisplay = document.getElementById('playgroundCodeDisplay');
  const filenameEl = document.getElementById('playgroundFilename');
  const runSimBtn = document.getElementById('runSimulationBtn');
  const resetSimBtn = document.getElementById('resetSimulationBtn');
  const copyBtn = document.getElementById('playgroundCopyBtn');
  const terminalScreen = document.getElementById('terminalScreen');
  const terminalBadge = document.getElementById('terminalStatusBadge');

  const telemLatency = document.getElementById('telemLatency');
  const telemLatencySub = document.getElementById('telemLatencySub');
  const telemMemory = document.getElementById('telemMemory');
  const telemMemorySub = document.getElementById('telemMemorySub');
  const telemSecurity = document.getElementById('telemSecurity');
  const telemSecuritySub = document.getElementById('telemSecuritySub');
  const telemCache = document.getElementById('telemCache');
  const telemCacheSub = document.getElementById('telemCacheSub');

  if (!scenarioPills.length || !codeDisplay) return;

  const scenarios = {
    woo: {
      file: 'app/Hooks/WooTierPricingHook.php',
      code: `<?php
declare(strict_types=1);

namespace Sohel\\Architecture\\WooCommerce;

class DynamicTierPricingHook {
    public function register(): void {
        add_action('woocommerce_cart_calculate_fees', [$this, 'applyTierDiscount'], 20, 1);
    }

    public function applyTierDiscount(\\WC_Cart $cart): void {
        if (is_admin() && !defined('DOING_AJAX')) return;

        $user = wp_get_current_user();
        $isVip = in_array('b2b_wholesale', (array)$user->roles, true);
        $cartSubtotal = (float)$cart->get_subtotal();

        // 15% VIP wholesale or 10% volume threshold discount
        if ($isVip && $cartSubtotal >= 500.0) {
            $discount = -1 * ($cartSubtotal * 0.15);
            $cart->add_fee(__('B2B VIP 15% Tier Discount', 'sohel-woo'), $discount, true);
        } elseif ($cartSubtotal >= 250.0) {
            $discount = -1 * ($cartSubtotal * 0.10);
            $cart->add_fee(__('Volume 10% Tier Discount', 'sohel-woo'), $discount, true);
        }
    }
}`,
      logs: [
        { time: '00.00ms', type: 'term-dim', text: '[REQUEST] POST /cart/calculate-fees HTTP/1.1 (cart_subtotal: $620.00)' },
        { time: '01.42ms', type: 'term-cyan', text: '[AUTH] Verified current user session: ID #418 (Role: b2b_wholesale)' },
        { time: '03.10ms', type: 'term-green', text: '[CACHE] Redis transient lookup for discount rules -> HIT (0.12ms)' },
        { time: '04.85ms', type: 'term-cyan', text: '[HOOK] Triggering \'woocommerce_cart_calculate_fees\' priority 20' },
        { time: '06.20ms', type: 'term-warn', text: '[CALC] Applied VIP 15% wholesale deduction (-$93.00) to subtotal' },
        { time: '07.45ms', type: 'term-dim', text: '[INTEGRITY] Cart hash integrity verified against race conditions' },
        { time: '09.18ms', type: 'term-success', text: '[RESPONSE] 200 OK | Cart fees calculated & cached. Latency: 9.2ms | Memory: 1.62MB' }
      ],
      metrics: {
        latency: '9.2 ms', latencySub: 'Sub-second targeted',
        memory: '1.62 MB', memorySub: 'Zero-bloat footprint',
        security: '100%', securitySub: 'Validated & sanitized',
        cache: '99.8%', cacheSub: 'Redis object cache'
      }
    },
    wp: {
      file: 'app/Controllers/SecureRestEndpointController.php',
      code: `<?php
declare(strict_types=1);

namespace Sohel\\Architecture\\Plugin;

class SecureRestEndpointController {
    public function registerRoutes(): void {
        register_rest_route('sohel-api/v1', '/secure-sync', [
            'methods'             => \\WP_REST_Server::CREATABLE,
            'callback'            => [$this, 'handleSyncRequest'],
            'permission_callback' => [$this, 'verifyPermissions'],
        ]);
    }

    public function verifyPermissions(\\WP_REST_Request $request): bool {
        $nonce = $request->get_header('X-WP-Nonce');
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return false;
        }
        return current_user_can('edit_posts');
    }

    public function handleSyncRequest(\\WP_REST_Request $request): \\WP_REST_Response {
        $payload = sanitize_text_field((string)$request->get_param('sync_key'));
        return new \\WP_REST_Response([
            'status'    => 'success',
            'timestamp' => time(),
            'synced'    => true
        ], 200);
    }
}`,
      logs: [
        { time: '00.00ms', type: 'term-dim', text: '[REQUEST] POST /wp-json/sohel-api/v1/secure-sync HTTP/1.1' },
        { time: '01.12ms', type: 'term-cyan', text: '[SECURITY] Extracting X-WP-Nonce header and checking HMAC signature...' },
        { time: '02.40ms', type: 'term-green', text: '[AUTH] wp_verify_nonce() -> PASS (Valid within 12h user session window)' },
        { time: '03.95ms', type: 'term-cyan', text: '[RBAC] current_user_can(\'edit_posts\') -> AUTHORIZED (Role: Editor)' },
        { time: '05.10ms', type: 'term-warn', text: '[SANITIZATION] Request body sanitized via sanitize_text_field()' },
        { time: '07.30ms', type: 'term-dim', text: '[DISPATCH] Payload written to relational schema; transaction committed' },
        { time: '08.80ms', type: 'term-success', text: '[RESPONSE] 200 OK | WP REST Response formatted in 8.8ms | Memory: 1.45MB' }
      ],
      metrics: {
        latency: '8.8 ms', latencySub: 'Direct REST endpoint',
        memory: '1.45 MB', memorySub: 'Ultralight footprint',
        security: '100%', securitySub: 'Cryptographic nonce verified',
        cache: 'N/A', cacheSub: 'Dynamic API route'
      }
    },
    laravel: {
      file: 'app/Http/Controllers/Api/ScalableProjectController.php',
      code: `<?php
declare(strict_types=1);

namespace App\\Http\\Controllers\\Api;

use App\\Jobs\\ProcessEnterpriseReportJob;
use App\\Http\\Resources\\ProjectResource;
use Illuminate\\Support\\Facades\\Cache;
use Illuminate\\Http\\JsonResponse;

class ScalableProjectController {
    public function index(): JsonResponse {
        $orgId = auth()->user()->org_id;

        // Redis multi-layer caching with 1-hour expiration
        $projects = Cache::tags(['projects', "org_{$orgId}"])
            ->remember("projects_page_1_org_{$orgId}", 3600, function () use ($orgId) {
                return \\App\\Models\\Project::with(['category', 'auditLogs'])
                    ->where('org_id', $orgId)
                    ->latest()
                    ->paginate(15);
            });

        // Dispatch background telemetry export job
        ProcessEnterpriseReportJob::dispatch($orgId)->onQueue('reports');

        return response()->json([
            'status' => 'success',
            'data'   => ProjectResource::collection($projects)
        ]);
    }
}`,
      logs: [
        { time: '00.00ms', type: 'term-dim', text: '[REQUEST] GET /api/v1/projects HTTP/1.1 (Auth: Bearer Sanctum Token)' },
        { time: '01.20ms', type: 'term-cyan', text: '[MIDDLEWARE] Sanctum auth verified: User #92, Org #14' },
        { time: '02.85ms', type: 'term-green', text: '[CACHE] Redis Tags [\'projects\', \'org_14\'] -> HIT (0.34ms latency)' },
        { time: '04.10ms', type: 'term-cyan', text: '[QUEUE] Dispatched ProcessEnterpriseReportJob -> Redis \'reports\' [Worker PID: 2841]' },
        { time: '05.70ms', type: 'term-dim', text: '[TRANSFORM] Serializing model collection into ProjectResource JSON' },
        { time: '07.25ms', type: 'term-warn', text: '[SECURITY] ETag generated & Cache-Control headers appended' },
        { time: '08.40ms', type: 'term-success', text: '[RESPONSE] 200 OK | API Response dispatched in 8.4ms | Memory: 2.10MB' }
      ],
      metrics: {
        latency: '8.4 ms', latencySub: 'High-throughput target',
        memory: '2.10 MB', memorySub: 'Optimized resource allocation',
        security: '100%', securitySub: 'Sanctum scoped token',
        cache: '100%', cacheSub: 'Redis tag cache'
      }
    },
    mysql: {
      file: 'app/Repositories/OptimizedOrderRepository.php',
      code: `<?php
declare(strict_types=1);

namespace App\\Repositories;

use App\\Models\\Order;
use Illuminate\\Database\\Eloquent\\Collection;

class OptimizedOrderRepository {
    /**
     * Resolves the infamous N+1 problem:
     * Instead of 1 query for orders + 100 queries for customers & items,
     * execute exactly 3 indexed queries with IN (...) clauses.
     */
    public function getLatestProcessedOrders(int $limit = 50): Collection {
        return Order::query()
            ->select(['id', 'customer_id', 'status', 'total_amount', 'created_at'])
            ->with([
                'customer:id,name,email,company',
                'items:id,order_id,product_id,quantity,unit_price'
            ])
            ->where('status', 'completed')
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }
}`,
      logs: [
        { time: '00.00ms', type: 'term-dim', text: '[OPTIMIZER] Benchmarking queries for getLatestProcessedOrders(50)...' },
        { time: '01.05ms', type: 'term-warn', text: '[BENCHMARK] Standard N+1 approach: 101 queries executed (Total time: 142.6ms)' },
        { time: '02.50ms', type: 'term-cyan', text: '[REFACTOR] Applying Eloquent Eager Loading with indexed select columns...' },
        { time: '03.90ms', type: 'term-green', text: '[QUERY 1] SELECT id, customer_id... FROM orders WHERE status=\'completed\' (0.38ms)' },
        { time: '04.80ms', type: 'term-green', text: '[QUERY 2] SELECT id, name... FROM customers WHERE id IN (...) [INDEX HIT] (0.24ms)' },
        { time: '05.60ms', type: 'term-green', text: '[QUERY 3] SELECT id, order_id... FROM items WHERE order_id IN (...) [INDEX HIT] (0.31ms)' },
        { time: '06.90ms', type: 'term-success', text: '[RESULT] Total DB time reduced from 142.6ms -> 0.93ms (99.3% faster!) | Memory: 1.95MB' }
      ],
      metrics: {
        latency: '0.93 ms', latencySub: '99.3% faster execution',
        memory: '1.95 MB', memorySub: 'Lightweight hydrate',
        security: '100%', securitySub: 'PDO prepared statements',
        cache: 'Buffer Pool', cacheSub: 'InnoDB memory cache'
      }
    }
  };

  let activeScenario = 'woo';
  let isSimulating = false;

  function loadScenario(key) {
    const sc = scenarios[key];
    if (!sc) return;
    activeScenario = key;

    if (filenameEl) {
      filenameEl.innerHTML = `<i class="fab fa-php text-primary me-2"></i><span>${sc.file}</span>`;
    }

    if (codeDisplay) {
      codeDisplay.textContent = sc.code;
    }

    if (telemLatency) telemLatency.textContent = sc.metrics.latency;
    if (telemLatencySub) telemLatencySub.textContent = sc.metrics.latencySub;
    if (telemMemory) telemMemory.textContent = sc.metrics.memory;
    if (telemMemorySub) telemMemorySub.textContent = sc.metrics.memorySub;
    if (telemSecurity) telemSecurity.textContent = sc.metrics.security;
    if (telemSecuritySub) telemSecuritySub.textContent = sc.metrics.securitySub;
    if (telemCache) telemCache.textContent = sc.metrics.cache;
    if (telemCacheSub) telemCacheSub.textContent = sc.metrics.cacheSub;

    resetTerminal();
  }

  function resetTerminal() {
    if (!terminalScreen) return;
    terminalScreen.innerHTML = `
      <div class="term-line term-dim"># Sohel Khan Architecture Runtime Terminal v2.4</div>
      <div class="term-line term-dim"># Active module: ${scenarios[activeScenario].file}</div>
      <div class="term-line term-prompt"><span class="term-green">root@edge-node:~$</span> <span class="term-typing">ready --click "Execute Simulation"</span></div>
    `;
    if (terminalBadge) {
      terminalBadge.textContent = 'IDLE';
      terminalBadge.classList.remove('running');
    }
    isSimulating = false;
  }

  scenarioPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      if (isSimulating) return;
      scenarioPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const scKey = pill.getAttribute('data-scenario');
      if (window.portfolioAudio) window.portfolioAudio.playTick();
      loadScenario(scKey);
    });
  });

  // Run Simulation
  if (runSimBtn) {
    runSimBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      if (window.portfolioAudio) window.portfolioAudio.playSweep();

      if (terminalBadge) {
        terminalBadge.textContent = 'EXECUTING...';
        terminalBadge.classList.add('running');
      }

      if (terminalScreen) {
        terminalScreen.innerHTML = `
          <div class="term-line term-dim"># Initializing runtime execution environment [PHP 8.2.14 JIT]...</div>
          <div class="term-line term-cyan">root@edge-node:~$ exec simulation --target="${scenarios[activeScenario].file}"</div>
        `;
      }

      const logs = scenarios[activeScenario].logs;
      logs.forEach((logItem, index) => {
        setTimeout(() => {
          if (!terminalScreen) return;
          const lineEl = document.createElement('div');
          lineEl.className = `term-line ${logItem.type}`;
          lineEl.textContent = `[${logItem.time}] ${logItem.text}`;
          terminalScreen.appendChild(lineEl);
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
          if (window.portfolioAudio) window.portfolioAudio.playTick();

          if (index === logs.length - 1) {
            isSimulating = false;
            if (terminalBadge) {
              terminalBadge.textContent = 'SUCCESS (200 OK)';
              terminalBadge.classList.remove('running');
            }
            if (window.portfolioAudio) window.portfolioAudio.playSuccess();
          }
        }, (index + 1) * 280);
      });
    });
  }

  // Reset Simulation
  if (resetSimBtn) {
    resetSimBtn.addEventListener('click', () => {
      if (window.portfolioAudio) window.portfolioAudio.playTick();
      resetTerminal();
    });
  }

  // Copy code in playground
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = codeDisplay.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check text-success"></i>';
        if (window.portfolioAudio) window.portfolioAudio.playSuccess();
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      });
    });
  }

  // Load initial preset
  loadScenario('woo');
}

/* --------------------------------------------------------------------------
   7. CLIPBOARD COPY BUTTON
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  document.querySelectorAll('.btn-copy-code').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const codeBlock = document.getElementById(targetId);

      if (codeBlock) {
        const text = codeBlock.innerText || codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check text-success me-1"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2000);
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM ASYNC SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('contactFormStatus');

  if (!form || !statusEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.innerHTML = '<span class="text-info"><i class="fas fa-spinner fa-spin me-1"></i> Transmitting message...</span>';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          statusEl.innerHTML = '<span class="text-success"><i class="fas fa-circle-check me-1"></i> Message delivered successfully to Sohel Khan! 🚀</span>';
          form.reset();
        } else {
          return res.json().then((data) => {
            statusEl.innerHTML = `<span class="text-danger"><i class="fas fa-triangle-exclamation me-1"></i> ${data.error || 'Oops, transmission failed.'}</span>`;
          });
        }
      })
      .catch(() => {
        statusEl.innerHTML = '<span class="text-danger"><i class="fas fa-triangle-exclamation me-1"></i> Could not send. Please email me directly at pathansohel2330@gmail.com</span>';
      });
  });
}

/* --------------------------------------------------------------------------
   9. SCROLL TO TOP
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}