/* =============================================
   GUELMIM ESCAPES — SHARED SCRIPT v3
   Listing CRUD · Matching · Notifications
   Shared utilities used across all pages.
   ============================================= */

// ============================================
// CONSTANTS
// ============================================
const COMMISSION_RATE = 0.15;

// Default Unsplash placeholder images (cycling fallback)
const DEFAULT_LISTING_IMAGES = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
  'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=600&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'
];

// ============================================
// SEED DATA — 12 demo listings (Approved)
// These populate the platform on first load.
// ============================================
const SEED_LISTINGS = [
  {
    id: 'hl-001', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Aït Brahim', hostFullName: 'Fatima Aït Brahim',
    phone: '+212528870001', whatsapp: '+212661001001', email: 'aitbrahim@guelmim.com',
    cultureType: 'Amazigh', cityArea: 'Centre-ville',
    pricePerNight: 45, maxGuests: 4,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français'],
    tags: ['Food', 'Culture', 'Handicrafts', 'Music'],
    amenities: ['Meals Included', 'Private Room'],
    houseRules: 'Respect des horaires de repas. Silence après 22h.',
    description: 'Une famille Amazigh chaleureuse au cœur de Guelmim. Madame Aït Brahim prépare les meilleurs tagines de la région et vous initiera aux traditions berbères et à l\'artisanat local.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'],
    rating: 4.9, reviews: 47, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-002', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Lehbab', hostFullName: 'Mohamed Lehbab',
    phone: '+212528870002', whatsapp: '+212661002002', email: 'lehbab@guelmim.com',
    cultureType: 'Sahrawi', cityArea: 'Route du désert',
    pricePerNight: 60, maxGuests: 6,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Hassaniya', 'Français'],
    tags: ['Desert', 'Music', 'Culture', 'Food'],
    amenities: ['Meals Included', 'Guide Support', 'Transport Pickup'],
    houseRules: 'Pas de bruit après 23h. Respecter les traditions locales.',
    description: 'Famille Sahrawie authentique à l\'entrée du désert. Soirées autour du feu, musique traditionnelle et thé à la menthe.',
    images: ['https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80'],
    rating: 4.8, reviews: 63, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-003', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Zouine', hostFullName: 'Khadija Zouine',
    phone: '+212528870003', whatsapp: '+212661003003', email: 'zouine@guelmim.com',
    cultureType: 'Mixed', cityArea: 'Quartier du souk',
    pricePerNight: 35, maxGuests: 3,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français', 'Anglais'],
    tags: ['Souk', 'Food', 'Handicrafts', 'Culture'],
    amenities: ['Meals Included', 'Wi-Fi'],
    houseRules: 'Accueil chaleureux. Famille mixte, ouverture d\'esprit bienvenue.',
    description: 'Famille mixte Amazigh-Sahrawie, idéalement située près du souk hebdomadaire.',
    images: ['https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80'],
    rating: 4.7, reviews: 38, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-004', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Ould Saleck', hostFullName: 'Brahim Ould Saleck',
    phone: '+212528870004', whatsapp: '+212661004004', email: 'ouldsaleck@guelmim.com',
    cultureType: 'Sahrawi', cityArea: 'Périphérie',
    pricePerNight: 55, maxGuests: 8,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Hassaniya', 'Français'],
    tags: ['Desert', 'Music', 'Food', 'Culture'],
    amenities: ['Meals Included', 'Guide Support', 'Private Room'],
    houseRules: 'Grande famille chaleureuse. Espace extérieur disponible.',
    description: 'Grande famille Sahrawie qui accueille les voyageurs avec une générosité légendaire.',
    images: ['https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=600&q=80'],
    rating: 4.9, reviews: 81, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-005', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Bensalem', hostFullName: 'Ahmed Bensalem',
    phone: '+212528870005', whatsapp: '+212661005005', email: 'bensalem@guelmim.com',
    cultureType: 'Amazigh', cityArea: 'Centre-ville',
    pricePerNight: 40, maxGuests: 4,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français'],
    tags: ['Culture', 'Food', 'Music', 'Handicrafts'],
    amenities: ['Meals Included', 'Wi-Fi'],
    houseRules: 'Ambiance studieuse et culturelle.',
    description: 'Famille Amazigh cultivée et accueillante, passionnée par la transmission de leur héritage.',
    images: ['https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=600&q=80'],
    rating: 4.6, reviews: 29, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-006', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Tizniti', hostFullName: 'Zahra Tizniti',
    phone: '+212528870006', whatsapp: '+212661006006', email: 'tizniti@guelmim.com',
    cultureType: 'Amazigh', cityArea: 'Quartier du souk',
    pricePerNight: 30, maxGuests: 2,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français'],
    tags: ['Souk', 'Handicrafts', 'Culture', 'Food'],
    amenities: ['Private Room', 'Meals Included'],
    houseRules: 'Idéal pour les couples. Atelier de tissage sur demande.',
    description: 'Petite famille Amazigh idéale pour les couples souhaitant une expérience authentique et intimiste.',
    images: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80'],
    rating: 4.5, reviews: 22, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-007', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille El Ghali', hostFullName: 'Hassan El Ghali',
    phone: '+212528870007', whatsapp: '+212661007007', email: 'elghali@guelmim.com',
    cultureType: 'Sahrawi', cityArea: 'Route du désert',
    pricePerNight: 70, maxGuests: 10,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Hassaniya', 'Français', 'Anglais'],
    tags: ['Desert', 'Culture', 'Food', 'Music'],
    amenities: ['Meals Included', 'Guide Support', 'Transport Pickup', 'Private Room'],
    houseRules: 'Famille emblématique. Respect des traditions du désert.',
    description: 'La famille El Ghali, figure emblématique de l\'hospitalité Sahrawie, vous reçoit près des premières dunes.',
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'],
    rating: 5.0, reviews: 102, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-008', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Aït Youssef', hostFullName: 'Naima Aït Youssef',
    phone: '+212528870008', whatsapp: '+212661008008', email: 'aityoussef@guelmim.com',
    cultureType: 'Mixed', cityArea: 'Centre-ville',
    pricePerNight: 50, maxGuests: 5,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Hassaniya', 'Français', 'Anglais'],
    tags: ['Food', 'Music', 'Culture', 'Handicrafts', 'Souk'],
    amenities: ['Wi-Fi', 'Meals Included', 'Private Room'],
    houseRules: 'Famille bilingue et ouverte. Idéal pour tout profil de voyageur.',
    description: 'Famille métissée Amazigh-Sahrawie au carrefour des deux cultures.',
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80'],
    rating: 4.8, reviews: 55, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-009', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Mrabih', hostFullName: 'Omar Mrabih',
    phone: '+212528870009', whatsapp: '+212661009009', email: 'mrabih@guelmim.com',
    cultureType: 'Sahrawi', cityArea: 'Périphérie',
    pricePerNight: 45, maxGuests: 6,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Hassaniya', 'Français'],
    tags: ['Desert', 'Souk', 'Music', 'Culture'],
    amenities: ['Guide Support', 'Meals Included'],
    houseRules: 'Famille dynamique et festive. Sorties possibles.',
    description: 'Famille Sahrawie dynamique en périphérie de Guelmim.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'],
    rating: 4.7, reviews: 41, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-010', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Boukhriss', hostFullName: 'Lahcen Boukhriss',
    phone: '+212528870010', whatsapp: '+212661010010', email: 'boukhriss@guelmim.com',
    cultureType: 'Amazigh', cityArea: 'Centre-ville',
    pricePerNight: 55, maxGuests: 4,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français', 'Anglais'],
    tags: ['Culture', 'Food', 'Handicrafts', 'Music'],
    amenities: ['Wi-Fi', 'Meals Included', 'Private Room'],
    houseRules: 'Maison-musée vivante. Respect des objets artisanaux.',
    description: 'Famille Amazigh raffinée reconnue pour leur cuisine et leur collection artisanale.',
    images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80'],
    rating: 4.8, reviews: 33, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-011', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Lahmadi', hostFullName: 'Rachida Lahmadi',
    phone: '+212528870011', whatsapp: '+212661011011', email: 'lahmadi@guelmim.com',
    cultureType: 'Mixed', cityArea: 'Quartier du souk',
    pricePerNight: 38, maxGuests: 3,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français'],
    tags: ['Souk', 'Food', 'Music', 'Culture'],
    amenities: ['Meals Included'],
    houseRules: 'Musique en soirée. Instruments à disposition.',
    description: 'Famille métissée du quartier du souk. Initiation musicale possible.',
    images: ['https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80'],
    rating: 4.6, reviews: 27, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'hl-012', ownerUserId: 'demo-host@guelmim.com',
    familyName: 'Famille Tafraout', hostFullName: 'Aicha Tafraout',
    phone: '+212528870012', whatsapp: '+212661012012', email: 'tafraout@guelmim.com',
    cultureType: 'Amazigh', cityArea: 'Périphérie',
    pricePerNight: 42, maxGuests: 5,
    availableFrom: '2026-01-01', availableTo: '2026-12-31',
    languages: ['Arabe', 'Tamazight', 'Français'],
    tags: ['Desert', 'Culture', 'Handicrafts', 'Food'],
    amenities: ['Private Room', 'Meals Included', 'Guide Support'],
    houseRules: 'Vue sur les plaines. Atelier bijouterie berbère.',
    description: 'Famille Amazigh en bordure de Guelmim. Vue dégagée et atelier de bijouterie.',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'],
    rating: 4.7, reviews: 36, status: 'Approved',
    createdAt: '2026-01-01T00:00:00.000Z'
  }
];

// ============================================
// LISTING CRUD — localStorage: 'ge_listings'
// ============================================

/** Get all listings (all statuses) */
function getListings() {
  return JSON.parse(localStorage.getItem('ge_listings') || '[]');
}

/** Persist listings array */
function saveListings(listings) {
  localStorage.setItem('ge_listings', JSON.stringify(listings));
}

/** Get only Approved listings (used for tourist matching) */
function getApprovedListings() {
  return getListings().filter(l => l.status === 'Approved');
}

/** Get a single listing by id */
function getListingById(id) {
  return getListings().find(l => l.id === id) || null;
}

/** Get the listing owned by a given userId */
function getHostListing(userId) {
  return getListings().find(l => l.ownerUserId === userId) || null;
}

/**
 * Seed 12 demo Approved listings if localStorage is empty.
 * Called once on every page load — harmless after first run.
 */
function seedListings() {
  if (getListings().length === 0) {
    saveListings(SEED_LISTINGS);
  }
}

// ============================================
// NOTIFICATIONS — localStorage: 'ge_notifications'
// Used to alert hosts about new booking requests.
// ============================================

function getNotifications() {
  return JSON.parse(localStorage.getItem('ge_notifications') || '[]');
}

function saveNotifications(notes) {
  localStorage.setItem('ge_notifications', JSON.stringify(notes));
}

/** Add a notification for a host user */
function addHostNotification(hostUserId, bookingId, message) {
  const notes = getNotifications();
  notes.push({
    id:          'notif-' + Date.now(),
    hostUserId,
    bookingId,
    message,
    read:        false,
    createdAt:   new Date().toISOString()
  });
  saveNotifications(notes);
}

/** Count unread notifications for a host */
function getUnreadCount(hostUserId) {
  return getNotifications().filter(n => n.hostUserId === hostUserId && !n.read).length;
}

/** Mark all notifications for a host as read */
function markAllRead(hostUserId) {
  const notes = getNotifications().map(n =>
    n.hostUserId === hostUserId ? { ...n, read: true } : n
  );
  saveNotifications(notes);
}

// ============================================
// MATCHING ALGORITHM
// Uses APPROVED listings from localStorage.
// Filters + scores + sorts.
// ============================================
function matchListings(prefs) {
  const arrival   = new Date(prefs.arrivalDate);
  const departure = new Date(prefs.departureDate);
  const approved  = getApprovedListings();

  const results = approved
    .map(listing => {
      // ---- Hard Filters ----

      // 1. Guest capacity
      if (listing.maxGuests < parseInt(prefs.numPeople)) return null;

      // 2. Availability covers requested dates
      if (new Date(listing.availableFrom) > arrival)   return null;
      if (new Date(listing.availableTo)   < departure)  return null;

      // 3. Culture preference
      if (prefs.familyType !== 'no-preference') {
        if (listing.cultureType.toLowerCase() !== prefs.familyType.toLowerCase()) return null;
      }

      // 4. Price cap: no more than 35% over budget
      if (listing.pricePerNight > prefs.budgetPerNight * 1.35) return null;

      // ---- Scoring ----
      let score = 0;
      const matchedInterests = [];

      // Interest / tag overlap (+12 per match)
      (prefs.interests || []).forEach(interest => {
        if ((listing.tags || []).includes(interest)) {
          score += 12;
          matchedInterests.push(interest);
        }
      });

      // Price score
      if (listing.pricePerNight <= prefs.budgetPerNight)         score += 20;
      else if (listing.pricePerNight <= prefs.budgetPerNight * 1.15) score += 10;
      else                                                        score += 4;

      // Rating bonus
      score += (listing.rating || 4.5) * 5;

      // Culture match bonus
      if (listing.cultureType.toLowerCase() === prefs.familyType.toLowerCase()) score += 8;

      // Amenities bonus (+2 per amenity — encourages complete listings)
      score += (listing.amenities || []).length * 2;

      // Build "why this match?" reasons
      const reasons = [];
      if (matchedInterests.length > 0)
        reasons.push('Intérêts : ' + matchedInterests.join(', '));
      if (listing.pricePerNight <= prefs.budgetPerNight)
        reasons.push('Dans votre budget');
      if (listing.cultureType.toLowerCase() === prefs.familyType.toLowerCase())
        reasons.push('Culture correspondante');
      if ((listing.rating || 0) >= 4.8)
        reasons.push('Très bien noté (' + listing.rating + '/5)');

      return { ...listing, score, matchedInterests, reasons };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);

  return results;
}

// ============================================
// SHARED UTILITY FUNCTIONS
// ============================================

/** Show a toast notification */
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className   = 'toast show ' + type;
  setTimeout(() => { toast.className = 'toast'; }, 3500);
}

/** Get current logged-in user from localStorage */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('ge_current_user') || 'null');
}

/** Logout and redirect home */
function logout() {
  localStorage.removeItem('ge_current_user');
  window.location.href = 'index.html';
}

/** Get all bookings */
function getBookings() {
  return JSON.parse(localStorage.getItem('ge_bookings') || '[]');
}

/** Persist bookings */
function saveBookings(bookings) {
  localStorage.setItem('ge_bookings', JSON.stringify(bookings));
}

/** Get all users */
function getUsers() {
  return JSON.parse(localStorage.getItem('ge_users') || '[]');
}

/** Generate booking reference */
function generateRef() {
  return 'GE-' + Math.random().toString(36).substring(2, 7).toUpperCase();
}

/** Generate listing ID */
function generateListingId() {
  return 'hl-' + Date.now().toString(36).toUpperCase();
}

/** Format date to locale string */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

/** Render HTML star rating */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html   = '';
  for (let i = 0; i < full; i++)                html += '<i class="fas fa-star"></i>';
  if (half)                                      html += '<i class="fas fa-star-half-alt"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="far fa-star"></i>';
  return html;
}

/** Role-based route guard — redirects if role doesn't match */
function requireRole(...allowedRoles) {
  const user = getCurrentUser();
  if (!user || !allowedRoles.includes(user.role)) {
    window.location.href = 'auth.html';
    return false;
  }
  return true;
}

// ============================================
// NAVBAR INITIALIZATION (index.html)
// ============================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  const user         = getCurrentUser();
  const navAuth      = document.getElementById('navAuth');
  const navUser      = document.getElementById('navUser');
  const userGreeting = document.getElementById('userGreeting');

  if (user && navAuth && navUser) {
    navAuth.classList.add('hidden');
    navUser.classList.remove('hidden');
    if (userGreeting) userGreeting.textContent = 'Bonjour, ' + user.name.split(' ')[0];
  }
})();

// ============================================
// FADE-IN OBSERVER
// ============================================
(function initFadeIn() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
})();

// ============================================
// SEED DEMO DATA ON LOAD
// ============================================
seedListings();

// Expose globals
window.logout       = logout;
window.showToast    = showToast;
window.requireRole  = requireRole;
