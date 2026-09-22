/**
 * ISATU Dumangas Campus Mini Hotel Reservation System (MHRS)
 * Role-Based Access Control (RBAC) Engine & Multi-Portal State Manager
 * Roles: Guest (Level 1), Receptionist (Level 2), Admin (Level 3)
 */

// =============================================================================
// DEFAULT SEED DATA & CONSTANTS
// =============================================================================

const DEFAULT_ROOMS = [
  {
    id: 'rm-101',
    name: 'Standard Room (Twin Bed)',
    category: 'standard',
    pricePerNight: 1500,
    capacity: '2 Guests',
    size: '24 sqm',
    image: 'images/standard_room.png',
    status: 'Available', // Available, Occupied, Turnover, Maintenance
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'En-suite Bathroom', 'Work Desk', 'Hot Shower'],
    description: 'Comfortable and clean twin-bed room designed for university guests, visitors, and campus delegates.'
  },
  {
    id: 'rm-102',
    name: 'Standard Room (Queen Bed)',
    category: 'standard',
    pricePerNight: 1600,
    capacity: '2 Guests',
    size: '26 sqm',
    image: 'images/standard_room.png',
    status: 'Available',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Smart TV', 'Hot Shower', 'Mini Refrigerator'],
    description: 'Spacious queen-bed standard room featuring modern academic hospitalities amenities.'
  },
  {
    id: 'rm-201',
    name: 'Deluxe Executive Suite',
    category: 'deluxe',
    pricePerNight: 2800,
    capacity: '3 Guests',
    size: '38 sqm',
    image: 'images/deluxe_suite.png',
    status: 'Occupied',
    amenities: ['King Size Bed', 'Seating Lounge', 'Smart TV', 'Mini Bar', 'Campus View Balcony', 'High-Speed Wi-Fi'],
    description: 'Premium suite equipped for visiting professors, VIP delegates, guest speakers, and executive board members.'
  },
  {
    id: 'rm-202',
    name: 'VIP Presidential Suite',
    category: 'deluxe',
    pricePerNight: 3500,
    capacity: '4 Guests',
    size: '48 sqm',
    image: 'images/deluxe_suite.png',
    status: 'Turnover',
    amenities: ['Master Suite', 'Private Lounge', 'Workstation', 'Bathtub', 'Complimentary Breakfast', 'High-Speed Wi-Fi'],
    description: 'Top-tier accommodation featuring luxurious furnishings and full executive privileges.'
  },
  {
    id: 'rm-301',
    name: 'Delegate Dormitory Suite (Quad)',
    category: 'dorm',
    pricePerNight: 2400,
    capacity: '4 Guests',
    size: '42 sqm',
    image: 'images/standard_room.png',
    status: 'Available',
    amenities: ['4 Single Beds', 'Individual Lockers', 'Air Conditioning', 'Study Desks', 'Wi-Fi'],
    description: 'Budget-friendly group accommodation tailored for student competition teams, seminar groups, and campus events.'
  },
  {
    id: 'rm-401',
    name: 'Campus Function & Seminar Hall',
    category: 'function',
    pricePerNight: 5000,
    capacity: '60 Guests',
    size: '120 sqm',
    image: 'images/hero.png',
    status: 'Available',
    amenities: ['Audio-Visual System', 'Projector & Screen', 'Podium & Microphones', 'Flexible Seating', 'Air Conditioning'],
    description: 'Fully-equipped hall ideal for university workshops, department seminars, banquets, and official gatherings.'
  }
];

const DEFAULT_RESERVATIONS = [
  {
    refCode: 'ISATU-MH-2026-9812',
    guestName: 'Prof. Maria Santos',
    email: 'm.santos@isatu.edu.ph',
    phone: '0917-123-4567',
    affiliation: 'faculty',
    affiliationLabel: 'ISATU Faculty / Staff',
    roomId: 'rm-201',
    roomName: 'Deluxe Executive Suite',
    checkIn: '2026-08-25',
    checkOut: '2026-08-27',
    guestsCount: 2,
    totalNights: 2,
    baseRatePerNight: 2800,
    discountPercent: 20,
    totalAmount: 4480,
    paymentTerm: 'full',
    amountPaid: 4480,
    balance: 0,
    paymentMethod: 'gcash',
    gcashRef: '9024-8831-2391',
    paymentStatus: 'Paid (Verified)',
    status: 'Checked-in',
    createdAt: '2026-08-20'
  },
  {
    refCode: 'ISATU-MH-2026-4410',
    guestName: 'John Michael Dela Cruz',
    email: 'j.delacruz@gmail.com',
    phone: '0928-888-9911',
    affiliation: 'external',
    affiliationLabel: 'External Visitor / Guest',
    roomId: 'rm-101',
    roomName: 'Standard Room (Twin Bed)',
    checkIn: '2026-08-28',
    checkOut: '2026-08-30',
    guestsCount: 2,
    totalNights: 2,
    baseRatePerNight: 1500,
    discountPercent: 0,
    totalAmount: 3000,
    paymentTerm: 'downpayment',
    amountPaid: 1500,
    balance: 1500,
    paymentMethod: 'gcash',
    gcashRef: '9182-7734-1102',
    paymentStatus: 'Pending Verification',
    status: 'Pending',
    createdAt: '2026-08-21'
  },
  {
    refCode: 'ISATU-MH-2026-1025',
    guestName: 'Althea Nicole Gomez',
    email: 'a.gomez@students.isatu.edu.ph',
    phone: '0939-555-1234',
    affiliation: 'student',
    affiliationLabel: 'ISATU Student',
    roomId: 'rm-301',
    roomName: 'Delegate Dormitory Suite (Quad)',
    checkIn: '2026-08-26',
    checkOut: '2026-08-29',
    guestsCount: 4,
    totalNights: 3,
    baseRatePerNight: 2400,
    discountPercent: 20,
    totalAmount: 5760,
    paymentTerm: 'downpayment',
    amountPaid: 2880,
    balance: 2880,
    paymentMethod: 'gcash',
    gcashRef: '8821-5543-9901',
    paymentStatus: 'Downpayment (50%) - Pending Verification',
    status: 'Confirmed',
    createdAt: '2026-08-22'
  }
];

const DEFAULT_STAFF = [
  {
    id: 'stf-001',
    name: 'Dr. Roberto Mendoza',
    email: 'r.mendoza@isatu.edu.ph',
    role: 'Admin',
    shift: 'General Oversight (8AM - 5PM)',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 'stf-002',
    name: 'Maria Joy Ramos',
    email: 'mj.ramos@isatu.edu.ph',
    role: 'Receptionist',
    shift: 'Morning Shift (6AM - 2PM)',
    status: 'Active',
    lastActive: '5 mins ago'
  },
  {
    id: 'stf-003',
    name: 'Kevin Patrick Tan',
    email: 'k.tan@isatu.edu.ph',
    role: 'Receptionist',
    shift: 'Afternoon Shift (2PM - 10PM)',
    status: 'Active',
    lastActive: 'Yesterday'
  },
  {
    id: 'stf-004',
    name: 'Elena Soriano',
    email: 'e.soriano@isatu.edu.ph',
    role: 'Night Auditor',
    shift: 'Graveyard Shift (10PM - 6AM)',
    status: 'Active',
    lastActive: '2 days ago'
  }
];

const DEFAULT_DISCOUNTS = {
  faculty: 20,
  student: 20,
  alumni: 10,
  partner: 10
};

const DEFAULT_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-08-25 08:00 AM',
    user: 'Maria Joy Ramos (Front Desk)',
    action: 'Desk Shift Initialized (Morning Shift 6AM - 2PM)',
    type: 'shift'
  },
  {
    id: 'log-2',
    timestamp: '2026-08-25 08:45 AM',
    user: 'Maria Joy Ramos (Front Desk)',
    action: 'Processed Check-in for Prof. Maria Santos (Ref: ISATU-MH-2026-9812). Room rm-201 marked Occupied.',
    type: 'checkin'
  },
  {
    id: 'log-3',
    timestamp: '2026-08-25 09:30 AM',
    user: 'Dr. Roberto Mendoza (Admin)',
    action: 'Audited Institutional Rate Matrix: Faculty discount set to 20%, Student set to 20%.',
    type: 'admin'
  }
];

// =============================================================================
// GLOBAL APPLICATION STATE
// =============================================================================
let currentRole = 'guest';
try {
  const savedRole = localStorage.getItem('isatu_mhrs_role');
  if (savedRole && (savedRole === 'guest' || savedRole === 'receptionist' || savedRole === 'admin')) {
    currentRole = savedRole;
  }
} catch (e) {
  currentRole = 'guest';
}

let currentStep = 1;
let activeFilter = 'all';
let recActiveFilter = 'all';

// =============================================================================
// SAFE STORAGE & NORMALIZATION
// =============================================================================

function normalizeReservation(r) {
  if (!r) return null;
  const status = r.status || 'Confirmed';
  const payMethod = r.paymentMethod || 'cash';
  const payStatus = r.paymentStatus || (status === 'Confirmed' || status === 'Checked-in' ? 'Paid' : 'Pending');
  const totalAmount = Number(r.totalAmount) || 0;

  // Derive paymentTerm, amountPaid, balance with backward-compatible defaults
  let paymentTerm = r.paymentTerm || 'full';
  let amountPaid = r.amountPaid != null ? Number(r.amountPaid) : totalAmount;
  let balance = r.balance != null ? Number(r.balance) : 0;

  // For legacy records without these fields, infer from status
  if (r.amountPaid == null && r.balance == null) {
    if (payStatus.includes('Paid') || payStatus.includes('Verified')) {
      amountPaid = totalAmount;
      balance = 0;
    } else if (payStatus.includes('Pay on Arrival')) {
      amountPaid = 0;
      balance = totalAmount;
      paymentTerm = 'full';
    } else {
      // Pending verification — assume full deposit submitted
      amountPaid = totalAmount;
      balance = 0;
    }
  }

  return {
    refCode: r.refCode || 'ISATU-MH-2026-0000',
    guestName: r.guestName || 'Guest User',
    email: r.email || '',
    phone: r.phone || '',
    affiliation: r.affiliation || 'external',
    affiliationLabel: r.affiliationLabel || 'Guest',
    roomId: r.roomId || 'rm-101',
    roomName: r.roomName || 'Standard Room',
    checkIn: r.checkIn || '',
    checkOut: r.checkOut || '',
    guestsCount: Number(r.guestsCount) || 1,
    totalNights: Number(r.totalNights) || 1,
    baseRatePerNight: Number(r.baseRatePerNight) || 1500,
    discountPercent: Number(r.discountPercent) || 0,
    totalAmount: totalAmount,
    paymentTerm: paymentTerm,
    amountPaid: amountPaid,
    balance: balance,
    paymentMethod: payMethod,
    gcashRef: r.gcashRef || '-',
    paymentStatus: payStatus,
    status: status,
    createdAt: r.createdAt || ''
  };
}

function normalizeRoom(r) {
  if (!r) return null;
  return {
    id: r.id || 'rm-101',
    name: r.name || 'Standard Room',
    category: r.category || 'standard',
    pricePerNight: Number(r.pricePerNight) || 1500,
    capacity: r.capacity || '2 Guests',
    size: r.size || '24 sqm',
    image: r.image || 'images/standard_room.png',
    status: r.status || 'Available',
    amenities: Array.isArray(r.amenities) ? r.amenities : ['Air Conditioning', 'Free Wi-Fi', 'Hot Shower'],
    description: r.description || ''
  };
}

function initStorage() {
  try {
    // Data version migration: refresh seed data when schema changes
    const DATA_VERSION = '3.0';
    const storedVersion = localStorage.getItem('isatu_mhrs_data_version');
    if (storedVersion !== DATA_VERSION) {
      // Clear old seed data so new defaults with paymentTerm/amountPaid/balance are loaded
      localStorage.removeItem('isatu_mhrs_reservations');
      localStorage.setItem('isatu_mhrs_data_version', DATA_VERSION);
    }

    if (!localStorage.getItem('isatu_mhrs_rooms')) {
      localStorage.setItem('isatu_mhrs_rooms', JSON.stringify(DEFAULT_ROOMS));
    }
    if (!localStorage.getItem('isatu_mhrs_reservations')) {
      localStorage.setItem('isatu_mhrs_reservations', JSON.stringify(DEFAULT_RESERVATIONS));
    }
    if (!localStorage.getItem('isatu_mhrs_staff')) {
      localStorage.setItem('isatu_mhrs_staff', JSON.stringify(DEFAULT_STAFF));
    }
    if (!localStorage.getItem('isatu_mhrs_discounts')) {
      localStorage.setItem('isatu_mhrs_discounts', JSON.stringify(DEFAULT_DISCOUNTS));
    }
    if (!localStorage.getItem('isatu_mhrs_audit')) {
      localStorage.setItem('isatu_mhrs_audit', JSON.stringify(DEFAULT_AUDIT_LOGS));
    }
  } catch (e) {
    console.warn('LocalStorage error in initStorage:', e);
  }
}

function safeCreateIcons() {
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (e) {
    console.warn('Lucide icons warning:', e);
  }
}

function getRooms() {
  try {
    const raw = JSON.parse(localStorage.getItem('isatu_mhrs_rooms') || '[]');
    if (!raw || raw.length === 0) return DEFAULT_ROOMS;
    return raw.map(normalizeRoom).filter(Boolean);
  } catch (e) {
    return DEFAULT_ROOMS;
  }
}

function saveRooms(rooms) {
  try {
    localStorage.setItem('isatu_mhrs_rooms', JSON.stringify(rooms));
  } catch (e) {}
}

function getReservations() {
  try {
    const raw = JSON.parse(localStorage.getItem('isatu_mhrs_reservations') || '[]');
    if (!raw || raw.length === 0) return DEFAULT_RESERVATIONS;
    return raw.map(normalizeReservation).filter(Boolean);
  } catch (e) {
    return DEFAULT_RESERVATIONS;
  }
}

function saveReservation(newRes) {
  const list = getReservations();
  list.unshift(normalizeReservation(newRes));
  saveReservationsList(list);
}

function saveReservationsList(list) {
  try {
    localStorage.setItem('isatu_mhrs_reservations', JSON.stringify(list));
  } catch (e) {}
}

function getStaffList() {
  try {
    const raw = JSON.parse(localStorage.getItem('isatu_mhrs_staff') || '[]');
    if (!raw || raw.length === 0) return DEFAULT_STAFF;
    return raw;
  } catch (e) {
    return DEFAULT_STAFF;
  }
}

function saveStaffList(staff) {
  try {
    localStorage.setItem('isatu_mhrs_staff', JSON.stringify(staff));
  } catch (e) {}
}

function getDiscounts() {
  try {
    const raw = JSON.parse(localStorage.getItem('isatu_mhrs_discounts') || '{}');
    return Object.assign({}, DEFAULT_DISCOUNTS, raw);
  } catch (e) {
    return DEFAULT_DISCOUNTS;
  }
}

function saveDiscounts(discounts) {
  try {
    localStorage.setItem('isatu_mhrs_discounts', JSON.stringify(discounts));
  } catch (e) {}
}

function getAuditLogs() {
  try {
    const raw = JSON.parse(localStorage.getItem('isatu_mhrs_audit') || '[]');
    if (!raw || raw.length === 0) return DEFAULT_AUDIT_LOGS;
    return raw;
  } catch (e) {
    return DEFAULT_AUDIT_LOGS;
  }
}

function addAuditLog(action, user = null) {
  try {
    const logs = getAuditLogs();
    const activeUser = user || (currentRole === 'admin' ? 'Dr. Roberto Mendoza (Admin)' : currentRole === 'receptionist' ? 'Maria Joy Ramos (Front Desk)' : 'Guest Client');
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    logs.unshift({
      id: 'log-' + Date.now(),
      timestamp: timeStr,
      user: activeUser,
      action: action,
      type: currentRole
    });
    localStorage.setItem('isatu_mhrs_audit', JSON.stringify(logs));
    if (currentRole === 'admin') renderAdminAuditLogs();
  } catch (e) {}
}

// =============================================================================
// ROLE SWITCHER & RBAC CONTROLLER (HIGH RELIABILITY)
// =============================================================================

function switchRole(role) {
  if (!role || (role !== 'guest' && role !== 'receptionist' && role !== 'admin')) {
    role = 'guest';
  }

  currentRole = role;
  try {
    localStorage.setItem('isatu_mhrs_role', role);
  } catch (e) {}

  // 1. Immediately toggle views with style.display & classList
  initRoleUI();

  // 2. Render role-specific data with safe try/catch blocks
  if (role === 'guest') {
    try { renderRooms(); } catch (e) { console.warn(e); }
    showToast('Switched to Guest Portal View', 'info');
  } else if (role === 'receptionist') {
    try { refreshFrontDeskData(); } catch (e) { console.warn(e); }
    showToast('Switched to Receptionist Front Desk Portal', 'info');
  } else if (role === 'admin') {
    try { refreshAdminData(); } catch (e) { console.warn(e); }
    showToast('Switched to Admin Executive Portal', 'info');
  }

  try { updateReceptionistBadge(); } catch (e) {}
  try { safeCreateIcons(); } catch (e) {}
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
}

// Expose globally
window.switchRole = switchRole;
window._switchRoleApp = switchRole;

function initRoleUI() {
  const guestView = document.getElementById('userPortalView');
  const recView = document.getElementById('receptionistPortalView');
  const adminView = document.getElementById('adminPortalView');

  // Explicitly control display style AND hidden class
  if (guestView) {
    if (currentRole === 'guest') {
      guestView.classList.remove('hidden');
      guestView.style.display = 'block';
    } else {
      guestView.classList.add('hidden');
      guestView.style.display = 'none';
    }
  }

  if (recView) {
    if (currentRole === 'receptionist') {
      recView.classList.remove('hidden');
      recView.style.display = 'block';
    } else {
      recView.classList.add('hidden');
      recView.style.display = 'none';
    }
  }

  if (adminView) {
    if (currentRole === 'admin') {
      adminView.classList.remove('hidden');
      adminView.style.display = 'block';
    } else {
      adminView.classList.add('hidden');
      adminView.style.display = 'none';
    }
  }

  // Update Role Switcher Button Styles
  const roles = ['guest', 'receptionist', 'admin'];
  roles.forEach(r => {
    const btn = document.getElementById(`roleBtn-${r}`);
    if (btn) {
      if (r === currentRole) {
        btn.className = 'role-pill active px-3.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 bg-isatu-gold text-isatu-blue shadow-md cursor-pointer transition-all';
      } else {
        btn.className = 'role-pill px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 bg-transparent cursor-pointer transition-all';
      }
    }
  });

  // Role context badge
  const contextBadge = document.getElementById('roleContextBadge');
  if (contextBadge) {
    if (currentRole === 'guest') {
      contextBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span class="font-medium text-[11px]">Level 1: Public Guest Booking & Self-Service Pass</span>`;
    } else if (currentRole === 'receptionist') {
      contextBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span><span class="font-medium text-[11px]">Level 2: Duty Front Desk Operations, Check-ins & Payment Audit</span>`;
    } else if (currentRole === 'admin') {
      contextBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-isatu-gold"></span><span class="font-medium text-[11px]">Level 3: Executive Oversight, Rates CRUD, Staff & Audit Logs</span>`;
    }
  }

  // Header Navigation & Actions
  const navLinks = document.getElementById('headerNavLinks');
  const headerActions = document.getElementById('headerActions');

  if (currentRole === 'guest') {
    if (navLinks) {
      navLinks.innerHTML = `
        <a href="#rooms" class="hover:text-isatu-blue transition-colors">Accommodations</a>
        <a href="#discounts" class="hover:text-isatu-blue transition-colors">Institutional Rates</a>
        <a href="#facilities" class="hover:text-isatu-blue transition-colors">Campus Facilities</a>
        <a href="#location" class="hover:text-isatu-blue transition-colors">Location & Contact</a>
      `;
    }
    if (headerActions) {
      headerActions.innerHTML = `
        <button onclick="openTrackerModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-2 border border-slate-300 cursor-pointer">
          <i data-lucide="search" class="w-4 h-4 text-isatu-blue"></i>
          <span class="hidden sm:inline">Track Booking</span>
        </button>
        <button onclick="openReservationModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-isatu-gold text-isatu-blue hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-md cursor-pointer">
          <i data-lucide="calendar" class="w-4 h-4"></i>
          <span>Book a Room</span>
        </button>
      `;
    }
  } else if (currentRole === 'receptionist') {
    if (navLinks) {
      navLinks.innerHTML = `
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
          Front Desk Live Operations
        </span>
      `;
    }
    if (headerActions) {
      headerActions.innerHTML = `
        <button onclick="openWalkInModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-isatu-blue text-white hover:bg-blue-900 transition-all flex items-center gap-1.5 shadow cursor-pointer">
          <i data-lucide="user-plus" class="w-4 h-4"></i>
          <span>Walk-in Check-In</span>
        </button>
        <button onclick="refreshFrontDeskData()" class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1 border border-slate-300 cursor-pointer">
          <i data-lucide="refresh-cw" class="w-4 h-4"></i>
          <span class="hidden sm:inline">Sync Desk</span>
        </button>
      `;
    }
  } else if (currentRole === 'admin') {
    if (navLinks) {
      navLinks.innerHTML = `
        <span class="text-xs font-extrabold uppercase tracking-wider text-isatu-blue bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
          Supervisory Executive Suite
        </span>
      `;
    }
    if (headerActions) {
      headerActions.innerHTML = `
        <button onclick="openAdminRoomModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-isatu-blue text-white hover:bg-blue-900 transition-all flex items-center gap-1.5 shadow cursor-pointer">
          <i data-lucide="plus" class="w-4 h-4"></i>
          <span>Add Room</span>
        </button>
        <button onclick="openAdminStaffModal()" class="px-4 py-2 rounded-xl text-xs font-bold bg-isatu-gold text-isatu-blue hover:bg-yellow-400 transition-all flex items-center gap-1.5 shadow cursor-pointer">
          <i data-lucide="user-plus" class="w-4 h-4"></i>
          <span>Add Staff</span>
        </button>
      `;
    }
  }
}

function updateReceptionistBadge() {
  const badge = document.getElementById('receptionistBadgeCount');
  if (!badge) return;
  const list = getReservations();
  const pendingCount = list.filter(r => (r.paymentStatus && r.paymentStatus.includes('Pending')) || r.status === 'Pending').length;
  badge.innerText = pendingCount;
  badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
}

// =============================================================================
// GUEST PORTAL: ROOM CATALOG & RESERVATION WIZARD
// =============================================================================

function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  ['resCheckIn', 'resCheckOut', 'heroCheckIn', 'heroCheckOut', 'wCheckIn', 'wCheckOut'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.min = today;
  });
}

function renderRooms(filterCategory = 'all') {
  const container = document.getElementById('roomsGrid');
  if (!container) return;

  const rooms = getRooms();
  const filtered = filterCategory === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === filterCategory);

  container.innerHTML = filtered.map(room => {
    const isAvailable = room.status === 'Available';
    let statusClass = 'bg-emerald-500 text-white';
    if (room.status === 'Occupied') statusClass = 'bg-blue-600 text-white';
    if (room.status === 'Turnover') statusClass = 'bg-amber-500 text-white';
    if (room.status === 'Maintenance') statusClass = 'bg-slate-500 text-white';

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 hover-lift shadow-sm flex flex-col justify-between">
        <div>
          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img src="${room.image || 'images/standard_room.png'}" alt="${room.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            <div class="absolute top-3 right-3">
              <span class="${statusClass} text-xs font-semibold px-3 py-1 rounded-full shadow">
                ${room.status === 'Turnover' ? 'In Turnover' : room.status}
              </span>
            </div>
            <div class="absolute bottom-3 left-3">
              <span class="bg-isatu-blue/90 backdrop-blur text-gold font-bold text-xs px-2.5 py-1 rounded-lg text-white border border-yellow-400/30">
                ${room.capacity} • ${room.size || '24 sqm'}
              </span>
            </div>
          </div>

          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-xl text-slate-900 group-hover:text-isatu-blue">${room.name}</h3>
            </div>
            <p class="text-slate-600 text-sm mb-4 line-clamp-2">${room.description || 'Comfortable campus hotel accommodation with modern amenities.'}</p>
            
            <div class="mb-4">
              <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Room Amenities</div>
              <div class="flex flex-wrap gap-1.5">
                ${(room.amenities || []).map(a => `
                  <span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-200">
                    ${a}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span class="text-xs text-slate-400 block font-medium">Standard Rate</span>
            <span class="text-2xl font-extrabold text-isatu-blue">₱${room.pricePerNight.toLocaleString()}</span>
            <span class="text-xs text-slate-500 font-medium">/ night</span>
          </div>

          <button 
            onclick="openReservationModal('${room.id}')"
            class="${isAvailable ? 'bg-isatu-blue text-white hover:bg-blue-900 shadow-md cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'} px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5"
            ${!isAvailable ? 'disabled' : ''}
          >
            <span>${isAvailable ? 'Reserve Now' : room.status}</span>
            ${isAvailable ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>' : ''}
          </button>
        </div>
      </div>
    `;
  }).join('');
  safeCreateIcons();
}

function filterRooms(category, btnElement) {
  activeFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-isatu-blue', 'text-white', 'shadow-md');
    btn.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
  });
  if (btnElement) {
    btnElement.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
    btnElement.classList.add('bg-isatu-blue', 'text-white', 'shadow-md');
  }
  renderRooms(category);
}

function openReservationModal(roomId = null) {
  currentStep = 1;
  updateStepUI();
  populateRoomSelect();

  if (roomId) {
    const select = document.getElementById('resRoomSelect');
    if (select) select.value = roomId;
  }

  const heroIn = document.getElementById('heroCheckIn')?.value;
  const heroOut = document.getElementById('heroCheckOut')?.value;
  const heroCategory = document.getElementById('heroAffiliation')?.value;

  if (heroIn) document.getElementById('resCheckIn').value = heroIn;
  if (heroOut) document.getElementById('resCheckOut').value = heroOut;
  if (heroCategory) {
    document.getElementById('resAffiliation').value = heroCategory;
    onAffiliationChange();
  }

  calculatePricing();

  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.style.display = 'flex';
  }
  safeCreateIcons();
}

function closeReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
  }
}

function populateRoomSelect() {
  const select = document.getElementById('resRoomSelect');
  if (!select) return;

  const rooms = getRooms();
  select.innerHTML = '<option value="">-- Select a Room or Hall --</option>' + 
    rooms.map(r => `
      <option value="${r.id}" ${r.status !== 'Available' ? 'disabled' : ''}>
        ${r.name} - ₱${r.pricePerNight.toLocaleString()}/night ${r.status !== 'Available' ? '(' + r.status + ')' : ''}
      </option>
    `).join('');
}

function toggleGcashInput(show) {
  const el = document.getElementById('gcashInputContainer');
  if (el) el.style.display = show ? 'block' : 'none';
}

function nextStep() {
  if (!validateStep(currentStep)) return;
  if (currentStep < 4) {
    currentStep++;
    updateStepUI();
    if (currentStep === 3) calculatePricing();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
}

function updateStepUI() {
  for (let i = 1; i <= 4; i++) {
    const badge = document.getElementById(`stepBadge-${i}`);
    const line = document.getElementById(`stepLine-${i}`);
    const container = document.getElementById(`wizardStep-${i}`);

    if (container) {
      if (i === currentStep) {
        container.classList.remove('hidden');
        container.style.display = 'block';
      } else {
        container.classList.add('hidden');
        container.style.display = 'none';
      }
    }

    if (badge) {
      if (i < currentStep) {
        badge.className = 'w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow';
        badge.innerHTML = '✓';
      } else if (i === currentStep) {
        badge.className = 'w-8 h-8 rounded-full bg-isatu-gold text-isatu-blue flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-yellow-400/20';
        badge.innerText = i;
      } else {
        badge.className = 'w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs';
        badge.innerText = i;
      }
    }

    if (line) {
      line.className = i < currentStep ? 'h-1 bg-emerald-500 flex-1 rounded' : 'h-1 bg-slate-200 flex-1 rounded';
    }
  }

  const prevBtn = document.getElementById('wizardPrevBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const submitBtn = document.getElementById('wizardSubmitBtn');

  if (prevBtn) prevBtn.style.display = currentStep === 1 || currentStep === 4 ? 'none' : 'block';
  if (nextBtn) nextBtn.style.display = currentStep >= 3 ? 'none' : 'block';
  if (submitBtn) submitBtn.style.display = currentStep === 3 ? 'block' : 'none';
  safeCreateIcons();
}

function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById('resGuestName').value.trim();
    const email = document.getElementById('resEmail').value.trim();
    const phone = document.getElementById('resPhone').value.trim();

    if (!name || !email || !phone) {
      showToast('Please fill in all guest contact details.', 'error');
      return false;
    }
  }

  if (step === 2) {
    const room = document.getElementById('resRoomSelect').value;
    const checkIn = document.getElementById('resCheckIn').value;
    const checkOut = document.getElementById('resCheckOut').value;

    if (!room || !checkIn || !checkOut) {
      showToast('Please select an accommodation and stay dates.', 'error');
      return false;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      showToast('Check-out date must be after check-in date.', 'error');
      return false;
    }
  }
  return true;
}

function onAffiliationChange() {
  const aff = document.getElementById('resAffiliation').value;
  const badge = document.getElementById('discountBadge');
  const discounts = getDiscounts();
  
  if (aff === 'faculty') {
    badge.innerText = `${discounts.faculty}% ISAT U Faculty Discount Applied!`;
    badge.className = 'mt-2 text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-md inline-block border border-amber-300';
  } else if (aff === 'student') {
    badge.innerText = `${discounts.student}% ISAT U Student Discount Applied!`;
    badge.className = 'mt-2 text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-md inline-block border border-amber-300';
  } else if (aff === 'alumni') {
    badge.innerText = `${discounts.alumni}% ISAT U Alumni Special Discount Applied!`;
    badge.className = 'mt-2 text-xs font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-md inline-block border border-blue-300';
  } else {
    badge.innerText = 'Standard Institutional Rate';
    badge.className = 'mt-2 text-xs font-medium text-slate-500 inline-block';
  }
  calculatePricing();
}

function onRoomSelectChange() {
  calculatePricing();
}

function calculatePricing() {
  const roomId = document.getElementById('resRoomSelect')?.value;
  const checkIn = document.getElementById('resCheckIn')?.value;
  const checkOut = document.getElementById('resCheckOut')?.value;
  const aff = document.getElementById('resAffiliation')?.value;

  const rooms = getRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room || !checkIn || !checkOut) return;

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = d2 - d1;
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const discounts = getDiscounts();
  let discountPercent = 0;
  if (aff === 'faculty') discountPercent = discounts.faculty || 20;
  else if (aff === 'student') discountPercent = discounts.student || 20;
  else if (aff === 'alumni') discountPercent = discounts.alumni || 10;

  const baseTotal = room.pricePerNight * nights;
  const discountAmount = (baseTotal * discountPercent) / 100;
  const finalTotal = baseTotal - discountAmount;

  // Determine payment term selection
  const paymentTermEl = document.querySelector('input[name="paymentTerm"]:checked');
  const paymentTerm = paymentTermEl ? paymentTermEl.value : 'full';
  const depositRate = paymentTerm === 'downpayment' ? 0.5 : 1.0;
  const amountDueNow = Math.round(finalTotal * depositRate);
  const balanceDue = finalTotal - amountDueNow;

  if (document.getElementById('summaryRoomName')) document.getElementById('summaryRoomName').innerText = room.name;
  if (document.getElementById('summaryNights')) document.getElementById('summaryNights').innerText = `${nights} night(s)`;
  if (document.getElementById('summaryRate')) document.getElementById('summaryRate').innerText = `₱${room.pricePerNight.toLocaleString()}`;
  if (document.getElementById('summaryDiscount')) document.getElementById('summaryDiscount').innerText = discountPercent > 0 ? `-${discountPercent}% (-₱${discountAmount.toLocaleString()})` : '₱0';
  if (document.getElementById('summaryGrandTotal')) document.getElementById('summaryGrandTotal').innerText = `₱${finalTotal.toLocaleString()}`;

  // Update deposit/balance breakdown
  if (document.getElementById('summaryAmountDueNow')) {
    document.getElementById('summaryAmountDueNow').innerText = `₱${amountDueNow.toLocaleString()}`;
  }
  if (document.getElementById('summaryBalanceDue')) {
    document.getElementById('summaryBalanceDue').innerText = `₱${balanceDue.toLocaleString()}`;
  }
  if (document.getElementById('summaryPaymentTermLabel')) {
    document.getElementById('summaryPaymentTermLabel').innerText = paymentTerm === 'downpayment' ? 'Downpayment (50%)' : 'Full Payment (100%)';
  }

  // Update the deposit amount shown on the downpayment card
  if (document.getElementById('dpCardAmount')) {
    document.getElementById('dpCardAmount').innerText = `₱${Math.round(finalTotal * 0.5).toLocaleString()}`;
  }
  if (document.getElementById('fpCardAmount')) {
    document.getElementById('fpCardAmount').innerText = `₱${finalTotal.toLocaleString()}`;
  }
}

function submitReservation() {
  const name = document.getElementById('resGuestName').value.trim();
  const email = document.getElementById('resEmail').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const affiliation = document.getElementById('resAffiliation').value;
  const roomId = document.getElementById('resRoomSelect').value;
  const checkIn = document.getElementById('resCheckIn').value;
  const checkOut = document.getElementById('resCheckOut').value;
  const guestsCount = document.getElementById('resGuestsCount').value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'gcash';
  const paymentTerm = document.querySelector('input[name="paymentTerm"]:checked')?.value || 'full';
  const gcashRef = document.getElementById('resGcashRef')?.value.trim() || '';

  // Enforce reference number for online bookings
  if (!gcashRef) {
    showToast('Please enter your GCash or Landbank transaction reference number to proceed.', 'error');
    return;
  }

  const rooms = getRooms();
  const room = rooms.find(r => r.id === roomId);

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

  const discounts = getDiscounts();
  let discountPercent = 0;
  if (affiliation === 'faculty') discountPercent = discounts.faculty || 20;
  else if (affiliation === 'student') discountPercent = discounts.student || 20;
  else if (affiliation === 'alumni') discountPercent = discounts.alumni || 10;

  const baseTotal = room.pricePerNight * nights;
  const discountAmount = (baseTotal * discountPercent) / 100;
  const finalTotal = baseTotal - discountAmount;

  // Calculate deposit and balance based on payment term
  const depositRate = paymentTerm === 'downpayment' ? 0.5 : 1.0;
  const amountPaid = Math.round(finalTotal * depositRate);
  const balance = finalTotal - amountPaid;

  const refCode = `ISATU-MH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const affiliationLabels = {
    student: 'ISATU Student',
    faculty: 'ISATU Faculty / Staff',
    alumni: 'ISATU Alumni',
    external: 'External Visitor / Guest'
  };

  const termLabel = paymentTerm === 'downpayment' ? 'Downpayment (50%)' : 'Full Payment (100%)';
  const newReservation = {
    refCode,
    guestName: name,
    email,
    phone,
    affiliation,
    affiliationLabel: affiliationLabels[affiliation] || affiliation,
    roomId,
    roomName: room.name,
    checkIn,
    checkOut,
    guestsCount: Number(guestsCount) || 1,
    totalNights: nights,
    baseRatePerNight: room.pricePerNight,
    discountPercent,
    totalAmount: finalTotal,
    paymentTerm,
    amountPaid,
    balance,
    paymentMethod,
    gcashRef: gcashRef,
    paymentStatus: `${termLabel} - Pending Verification`,
    status: 'Pending',
    createdAt: new Date().toISOString().split('T')[0]
  };

  saveReservation(newReservation);
  addAuditLog(`Guest ${name} created reservation ${refCode} for ${room.name} (${termLabel}, Deposited ₱${amountPaid.toLocaleString()})`, `Guest Web Portal`);
  updateReceptionistBadge();

  currentStep = 4;
  updateStepUI();
  renderConfirmationVoucher(newReservation);
  showToast('Booking submitted! Please download or print your stay pass.', 'success');
}

function renderConfirmationVoucher(res) {
  const container = document.getElementById('confirmationVoucherContainer');
  if (!container) return;

  container.innerHTML = `
    <div id="printableVoucher" class="bg-gradient-to-br from-slate-900 to-isatu-blue text-white rounded-2xl p-6 shadow-2xl border border-yellow-400/40 relative overflow-hidden">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-yellow-400/30 gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-isatu-gold text-isatu-blue font-extrabold flex items-center justify-center text-xl shadow">
            MH
          </div>
          <div>
            <h3 class="font-extrabold text-lg text-isatu-gold">ISAT U Dumangas Campus</h3>
            <p class="text-xs text-slate-300">Official Mini Hotel Registration Voucher</p>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-medium text-slate-400 block">Reference Code</span>
          <span class="font-mono text-xl font-bold text-isatu-gold tracking-wider">${res.refCode}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-sm">
        <div class="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
          <span class="text-xs text-slate-300 block font-medium mb-1">Guest Profile</span>
          <p class="font-bold text-white">${res.guestName}</p>
          <p class="text-xs text-slate-300">${res.email} • ${res.phone}</p>
          <span class="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded bg-yellow-400/20 text-isatu-gold border border-yellow-400/30">
            ${res.affiliationLabel}
          </span>
        </div>

        <div class="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
          <span class="text-xs text-slate-300 block font-medium mb-1">Reserved Accommodation</span>
          <p class="font-bold text-white">${res.roomName}</p>
          <p class="text-xs text-slate-300">${res.guestsCount} Guest(s) • ${res.totalNights} Night(s)</p>
          <span class="inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded ${res.status === 'Confirmed' || res.status === 'Checked-in' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-amber-500/30 text-amber-300'}">
            Status: ${res.status}
          </span>
        </div>

        <div class="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
          <span class="text-xs text-slate-300 block font-medium mb-1">Check-In Date</span>
          <p class="font-bold text-emerald-400">${res.checkIn}</p>
          <p class="text-xs text-slate-300">Front Desk Check-in: 2:00 PM</p>
        </div>

        <div class="bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
          <span class="text-xs text-slate-300 block font-medium mb-1">Check-Out Date</span>
          <p class="font-bold text-amber-400">${res.checkOut}</p>
          <p class="text-xs text-slate-300">Front Desk Check-out: 12:00 PM</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-start pt-4 border-t border-yellow-400/30 gap-3">
        <div class="space-y-1.5">
          <span class="text-xs text-slate-300 block">Total Folio Amount</span>
          <span class="text-2xl font-extrabold text-isatu-gold">₱${res.totalAmount.toLocaleString()}</span>
          <div class="flex flex-col gap-1 mt-1">
            <span class="text-xs font-bold ${(res.amountPaid || 0) > 0 ? 'text-emerald-300' : 'text-amber-300'}">
              ${res.paymentTerm === 'downpayment' ? '50% Downpayment' : 'Full Payment'} Deposited: ₱${(res.amountPaid || 0).toLocaleString()}
            </span>
            ${(res.balance || 0) > 0 ? `
              <span class="text-xs font-bold text-amber-300">Balance Due at Front Desk: ₱${res.balance.toLocaleString()}</span>
            ` : `
              <span class="text-xs font-bold text-emerald-300">✓ Zero Balance — Express Check-in Ready</span>
            `}
            <span class="text-[10px] text-slate-400">Ref: ${res.gcashRef || '-'} • ${res.paymentMethod ? res.paymentMethod.toUpperCase() : 'N/A'} • ${res.paymentStatus}</span>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button onclick="window.print()" class="px-4 py-2 bg-isatu-gold text-isatu-blue rounded-xl font-bold text-xs hover:bg-yellow-400 transition-all flex items-center gap-1.5 shadow cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Print Pass
          </button>
          <button onclick="closeReservationModal()" class="px-4 py-2 bg-white/20 text-white rounded-xl font-bold text-xs hover:bg-white/30 transition-all cursor-pointer">
            Done
          </button>
        </div>
      </div>
    </div>
  `;
}

// Guest Lookup Tracker
function openTrackerModal() {
  const modal = document.getElementById('trackerModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.style.display = 'flex';
  }
}

function closeTrackerModal() {
  const modal = document.getElementById('trackerModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
  }
}

function searchReservation() {
  const query = document.getElementById('trackerSearchQuery').value.trim();
  const resultsContainer = document.getElementById('trackerResults');

  if (!query) {
    showToast('Please enter a Reference Code or Email.', 'error');
    return;
  }

  const reservations = getReservations();
  const found = reservations.filter(r => 
    r.refCode.toLowerCase() === query.toLowerCase() || 
    r.email.toLowerCase() === query.toLowerCase()
  );

  if (found.length === 0) {
    resultsContainer.innerHTML = `
      <div class="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200">
        <p class="font-bold text-slate-700">No Reservations Found</p>
        <p class="text-xs text-slate-500 mt-1">Please verify your booking reference code (e.g. ISATU-MH-2026-9812).</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = found.map(res => `
    <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
      <div class="flex justify-between items-start border-b border-slate-100 pb-3">
        <div>
          <span class="text-xs font-mono font-bold text-isatu-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            ${res.refCode}
          </span>
          <h4 class="font-bold text-slate-900 mt-2">${res.guestName}</h4>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${res.status === 'Confirmed' || res.status === 'Checked-in' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
          ${res.status}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2 text-xs">
        <div><span class="text-slate-400 block">Room:</span><span class="font-semibold text-slate-700">${res.roomName}</span></div>
        <div><span class="text-slate-400 block">Category:</span><span class="font-semibold text-slate-700">${res.affiliationLabel}</span></div>
        <div><span class="text-slate-400 block">Check-In:</span><span class="font-semibold text-slate-700">${res.checkIn}</span></div>
        <div><span class="text-slate-400 block">Check-Out:</span><span class="font-semibold text-slate-700">${res.checkOut}</span></div>
      </div>

      <div class="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
        <div class="flex justify-between items-center">
          <span class="text-slate-500">Total Folio:</span>
          <strong class="text-isatu-blue text-sm">₱${res.totalAmount.toLocaleString()}</strong>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-slate-500">${res.paymentTerm === 'downpayment' ? '50% Downpayment' : 'Full Payment'} Deposited:</span>
          <strong class="text-emerald-600">₱${(res.amountPaid || 0).toLocaleString()}</strong>
        </div>
        ${(res.balance || 0) > 0 ? `
        <div class="flex justify-between items-center">
          <span class="text-slate-500">Balance Due at Check-In:</span>
          <strong class="text-amber-600">₱${res.balance.toLocaleString()}</strong>
        </div>
        ` : ''}
        <div class="flex justify-between items-center">
          <span class="text-slate-500">Status:</span>
          <span class="text-xs font-bold ${res.paymentStatus && res.paymentStatus.includes('Verified') ? 'text-emerald-600' : 'text-amber-600'}">${res.paymentStatus}</span>
        </div>
        <div class="flex justify-end mt-2">
          <button onclick="printVoucherFromSearch('${res.refCode}')" class="text-isatu-blue font-bold hover:underline flex items-center gap-1 cursor-pointer">
            <span>View Voucher</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function printVoucherFromSearch(refCode) {
  const reservations = getReservations();
  const res = reservations.find(r => r.refCode === refCode);
  if (res) {
    closeTrackerModal();
    openReservationModal();
    currentStep = 4;
    updateStepUI();
    renderConfirmationVoucher(res);
  }
}

// =============================================================================
// RECEPTIONIST PORTAL: FRONT DESK & HOUSEKEEPING OPERATIONS
// =============================================================================

function refreshFrontDeskData() {
  try { renderReceptionistRoomBoard(); } catch (e) { console.warn(e); }
  try { renderReceptionistTable(); } catch (e) { console.warn(e); }
  try { updateReceptionistStats(); } catch (e) { console.warn(e); }
  try { updateReceptionistBadge(); } catch (e) { console.warn(e); }
  safeCreateIcons();
}

function updateReceptionistStats() {
  const reservations = getReservations();
  const today = new Date().toISOString().split('T')[0];

  const arrivals = reservations.filter(r => r.checkIn === today || (r.status === 'Confirmed' && !r.status.includes('Checked-in'))).length;
  const inHouse = reservations.filter(r => r.status === 'Checked-in').length;
  const departures = reservations.filter(r => r.checkOut === today && r.status === 'Checked-in').length;
  const pendingPayments = reservations.filter(r => (r.paymentStatus && r.paymentStatus.includes('Pending')) || r.status === 'Pending').length;

  if (document.getElementById('recStatArrivals')) document.getElementById('recStatArrivals').innerText = arrivals;
  if (document.getElementById('recStatInHouse')) document.getElementById('recStatInHouse').innerText = inHouse;
  if (document.getElementById('recStatDepartures')) document.getElementById('recStatDepartures').innerText = departures;
  if (document.getElementById('recStatPendingPayments')) document.getElementById('recStatPendingPayments').innerText = pendingPayments;
}

function renderReceptionistRoomBoard() {
  const container = document.getElementById('receptionistRoomBoard');
  if (!container) return;

  const rooms = getRooms();
  const reservations = getReservations();

  container.innerHTML = rooms.map(room => {
    let statusBadge = 'room-status-clean';
    let statusLabel = 'Clean / Ready';
    if (room.status === 'Occupied') {
      statusBadge = 'room-status-occupied';
      statusLabel = 'Occupied';
    } else if (room.status === 'Turnover') {
      statusBadge = 'room-status-turnover';
      statusLabel = 'Needs Turnover';
    } else if (room.status === 'Maintenance') {
      statusBadge = 'room-status-maintenance';
      statusLabel = 'Maintenance';
    }

    const currentBooking = reservations.find(r => r.roomId === room.id && r.status === 'Checked-in');
    const guestSnippet = currentBooking ? `<div class="text-[10px] text-blue-900 font-bold truncate mt-1">👤 ${currentBooking.guestName}</div>` : '';

    return `
      <div class="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div class="flex justify-between items-start mb-2">
            <span class="font-mono text-xs font-extrabold text-isatu-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              ${room.id.toUpperCase()}
            </span>
            <span class="w-2.5 h-2.5 rounded-full ${room.status === 'Available' ? 'bg-emerald-500' : room.status === 'Occupied' ? 'bg-blue-500' : room.status === 'Turnover' ? 'bg-amber-500' : 'bg-slate-500'}"></span>
          </div>

          <h4 class="font-bold text-xs text-slate-800 line-clamp-1">${room.name}</h4>
          <p class="text-[11px] text-slate-400 mb-2">${room.capacity} • ₱${room.pricePerNight.toLocaleString()}</p>
          
          <div class="inline-block px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${statusBadge} mb-2">
            ${statusLabel}
          </div>
          ${guestSnippet}
        </div>

        <div class="pt-3 border-t border-slate-100 mt-2">
          <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Update Status:</label>
          <select 
            onchange="updateRoomHousekeeping('${room.id}', this.value)"
            class="w-full text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-isatu-blue cursor-pointer"
          >
            <option value="Available" ${room.status === 'Available' ? 'selected' : ''}>● Clean / Ready</option>
            <option value="Occupied" ${room.status === 'Occupied' ? 'selected' : ''}>● Occupied</option>
            <option value="Turnover" ${room.status === 'Turnover' ? 'selected' : ''}>● Needs Turnover</option>
            <option value="Maintenance" ${room.status === 'Maintenance' ? 'selected' : ''}>● Maintenance</option>
          </select>
        </div>
      </div>
    `;
  }).join('');
}

function updateRoomHousekeeping(roomId, newStatus) {
  const rooms = getRooms();
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    room.status = newStatus;
    saveRooms(rooms);
    addAuditLog(`Housekeeping status for ${room.name} (${room.id}) changed to: ${newStatus}`);
    renderReceptionistRoomBoard();
    renderRooms();
    showToast(`Room ${room.id.toUpperCase()} marked as ${newStatus}`, 'success');
  }
}

function setReceptionistFilter(filter, btn) {
  recActiveFilter = filter;
  document.querySelectorAll('.rec-tab-btn').forEach(b => {
    b.classList.remove('bg-white', 'text-isatu-blue', 'font-bold', 'shadow-sm');
    b.classList.add('text-slate-600');
  });
  if (btn) {
    btn.classList.add('bg-white', 'text-isatu-blue', 'font-bold', 'shadow-sm');
    btn.classList.remove('text-slate-600');
  }
  renderReceptionistTable();
}

function filterReceptionistTable() {
  renderReceptionistTable();
}

function renderReceptionistTable() {
  const container = document.getElementById('receptionistTableBody');
  if (!container) return;

  const searchQuery = document.getElementById('recTableSearch')?.value.toLowerCase().trim() || '';
  let reservations = getReservations();

  // Filter by Tab
  if (recActiveFilter === 'pending') {
    reservations = reservations.filter(r => r.status === 'Pending' || (r.paymentStatus && r.paymentStatus.includes('Pending')));
  } else if (recActiveFilter === 'confirmed') {
    reservations = reservations.filter(r => r.status === 'Confirmed');
  } else if (recActiveFilter === 'checked-in') {
    reservations = reservations.filter(r => r.status === 'Checked-in');
  } else if (recActiveFilter === 'checked-out') {
    reservations = reservations.filter(r => r.status === 'Checked-out');
  }

  // Filter by Search Query
  if (searchQuery) {
    reservations = reservations.filter(r => 
      (r.refCode && r.refCode.toLowerCase().includes(searchQuery)) ||
      (r.guestName && r.guestName.toLowerCase().includes(searchQuery)) ||
      (r.roomName && r.roomName.toLowerCase().includes(searchQuery)) ||
      (r.phone && r.phone.includes(searchQuery))
    );
  }

  if (reservations.length === 0) {
    container.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-400">No matching reservations found.</td></tr>`;
    return;
  }

  container.innerHTML = reservations.map(res => {
    let statusClass = 'bg-slate-100 text-slate-700';
    if (res.status === 'Confirmed') statusClass = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    if (res.status === 'Checked-in') statusClass = 'bg-blue-100 text-blue-800 border border-blue-200';
    if (res.status === 'Checked-out') statusClass = 'bg-purple-100 text-purple-800 border border-purple-200';
    if (res.status === 'Pending') statusClass = 'bg-amber-100 text-amber-800 border border-amber-200';

    const canVerify = (res.paymentMethod === 'gcash' || res.paymentMethod === 'landbank') && res.paymentStatus && res.paymentStatus.includes('Pending');
    const canCheckIn = res.status === 'Confirmed';
    const canCheckOut = res.status === 'Checked-in';

    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50/90 transition-colors text-xs">
        <td class="px-4 py-3 font-mono font-extrabold text-isatu-blue">
          ${res.refCode}
        </td>
        <td class="px-4 py-3">
          <div class="font-bold text-slate-900">${res.guestName}</div>
          <div class="text-[11px] text-slate-400">${res.phone} • ${res.email}</div>
        </td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            ${res.affiliationLabel}
          </span>
          ${res.discountPercent > 0 ? `<span class="block text-[10px] text-emerald-600 font-bold mt-0.5">-${res.discountPercent}% Campus Disc</span>` : ''}
        </td>
        <td class="px-4 py-3 font-medium text-slate-700">
          <div>${res.roomName}</div>
          <span class="text-[10px] text-slate-400">${res.guestsCount} guest(s)</span>
        </td>
        <td class="px-4 py-3">
          <div class="font-semibold text-slate-800">${res.checkIn}</div>
          <div class="text-[11px] text-slate-400">to ${res.checkOut} (${res.totalNights}n)</div>
        </td>
        <td class="px-4 py-3">
          <div class="font-extrabold text-slate-900">₱${res.totalAmount.toLocaleString()}</div>
          <span class="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 ${res.paymentTerm === 'downpayment' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
            ${res.paymentTerm === 'downpayment' ? '50% DP' : '100% FULL'}
          </span>
          <div class="text-[10px] text-emerald-600 font-semibold mt-0.5">Paid: ₱${(res.amountPaid || 0).toLocaleString()}</div>
          ${(res.balance || 0) > 0 ? `<div class="text-[10px] text-amber-600 font-semibold">Bal: ₱${res.balance.toLocaleString()}</div>` : ''}
          <span class="text-[10px] font-semibold ${res.paymentStatus && res.paymentStatus.includes('Verified') ? 'text-emerald-600' : 'text-amber-600'}">
            ${res.paymentMethod.toUpperCase()}: ${res.paymentStatus || 'Pending'}
          </span>
        </td>
        <td class="px-4 py-3">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${statusClass}">
            ${res.status}
          </span>
        </td>
        <td class="px-4 py-3 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${canVerify ? `
              <button onclick="openPaymentModal('${res.refCode}')" title="Inspect GCash Receipt" class="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-[11px] shadow-sm flex items-center gap-1 cursor-pointer">
                <i data-lucide="check-square" class="w-3.5 h-3.5"></i>
                <span>Verify</span>
              </button>
            ` : ''}

            ${canCheckIn ? `
              <button onclick="processCheckIn('${res.refCode}')" title="Process Check-in" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-sm flex items-center gap-1 cursor-pointer">
                <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                <span>Check-In</span>
              </button>
            ` : ''}

            ${canCheckOut ? `
              <button onclick="processCheckOut('${res.refCode}')" title="Process Check-out" class="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-[11px] shadow-sm flex items-center gap-1 cursor-pointer">
                <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                <span>Check-Out</span>
              </button>
            ` : ''}

            <button onclick="printVoucherFromSearch('${res.refCode}')" title="Print Folio / Pass" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
  safeCreateIcons();
}

function processCheckIn(refCode) {
  const reservations = getReservations();
  const res = reservations.find(r => r.refCode === refCode);
  if (!res) return;

  res.status = 'Checked-in';

  // Settle remaining balance at check-in
  if ((res.balance || 0) > 0) {
    const balanceSettled = res.balance;
    res.amountPaid = res.totalAmount;
    res.balance = 0;
    res.paymentStatus = 'Fully Paid (Balance Settled at Check-In)';
    addAuditLog(`Balance of ₱${balanceSettled.toLocaleString()} settled at check-in for ${res.guestName} (${refCode}).`);
  } else {
    res.paymentStatus = 'Fully Paid (Verified)';
  }

  saveReservationsList(reservations);

  const rooms = getRooms();
  const room = rooms.find(r => r.id === res.roomId);
  if (room) {
    room.status = 'Occupied';
    saveRooms(rooms);
  }

  addAuditLog(`Checked-in guest ${res.guestName} into ${res.roomName} (${refCode}). Issued room key card.`);
  refreshFrontDeskData();
  renderRooms();
  showToast(`Guest ${res.guestName} successfully checked in!`, 'success');
}

function processCheckOut(refCode) {
  const reservations = getReservations();
  const res = reservations.find(r => r.refCode === refCode);
  if (!res) return;

  res.status = 'Checked-out';
  saveReservationsList(reservations);

  const rooms = getRooms();
  const room = rooms.find(r => r.id === res.roomId);
  if (room) {
    room.status = 'Turnover';
    saveRooms(rooms);
  }

  addAuditLog(`Checked-out guest ${res.guestName} from ${res.roomName} (${refCode}). Room queued for housekeeping turnover.`);
  refreshFrontDeskData();
  renderRooms();
  showToast(`Guest ${res.guestName} checked out. Room set to Needs Turnover.`, 'info');
}

// Payment Verification Modal Logic
function openPaymentModal(refCode) {
  const reservations = getReservations();
  const res = reservations.find(r => r.refCode === refCode);
  if (!res) return;

  const modal = document.getElementById('paymentModal');
  const body = document.getElementById('paymentModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-2 text-xs">
      <div class="flex justify-between">
        <span class="text-slate-500">Booking Reference:</span>
        <span class="font-mono font-bold text-isatu-blue">${res.refCode}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-500">Guest Name:</span>
        <span class="font-bold text-slate-800">${res.guestName}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-500">Reserved Unit:</span>
        <span class="font-bold text-slate-800">${res.roomName}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-500">Stay Dates:</span>
        <span class="font-bold text-slate-800">${res.checkIn} to ${res.checkOut} (${res.totalNights} nights)</span>
      </div>
      <div class="flex justify-between border-t border-blue-200 pt-2 text-sm">
        <span class="font-bold text-slate-700">Total Folio:</span>
        <span class="font-extrabold text-isatu-blue">₱${res.totalAmount.toLocaleString()}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-slate-500">Payment Term:</span>
        <span class="font-bold px-2 py-0.5 rounded text-[10px] ${res.paymentTerm === 'downpayment' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
          ${res.paymentTerm === 'downpayment' ? '50% Downpayment' : '100% Full Payment'}
        </span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-500">Amount Deposited:</span>
        <span class="font-bold text-emerald-700">₱${(res.amountPaid || 0).toLocaleString()}</span>
      </div>
      ${(res.balance || 0) > 0 ? `
      <div class="flex justify-between">
        <span class="text-slate-500">Remaining Balance:</span>
        <span class="font-bold text-amber-700">₱${res.balance.toLocaleString()}</span>
      </div>
      ` : ''}
    </div>

    <div class="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-700">Submitted ${res.paymentMethod === 'landbank' ? 'Landbank' : 'GCash'} Reference No.:</span>
        <span class="font-mono text-xs font-extrabold text-blue-700 bg-white px-2.5 py-1 rounded border border-blue-200">
          ${res.gcashRef || 'NOT PROVIDED'}
        </span>
      </div>

      <div class="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 text-xs flex items-center gap-2">
        <i data-lucide="shield-check" class="w-5 h-5 text-emerald-600 flex-shrink-0"></i>
        <span>Front desk instruction: Cross-check the reference number against the official campus hotel merchant ${res.paymentMethod === 'landbank' ? 'Landbank' : 'GCash'} statement. Verify the deposited amount matches ₱${(res.amountPaid || 0).toLocaleString()}.</span>
      </div>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <button onclick="flagPaymentRejected('${res.refCode}')" class="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-xl font-bold text-xs cursor-pointer">
        Flag / Reject Payment
      </button>
      <button onclick="confirmPaymentApproved('${res.refCode}')" class="px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer">
        <i data-lucide="check" class="w-4 h-4"></i>
        <span>Approve & Confirm Stay</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.style.display = 'flex';
  safeCreateIcons();
}

function closePaymentModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
  }
}

function confirmPaymentApproved(refCode) {
  const reservations = getReservations();
  const res = reservations.find(r => r.refCode === refCode);
  if (res) {
    if (res.paymentTerm === 'downpayment' && (res.balance || 0) > 0) {
      res.paymentStatus = `Downpayment Verified (Bal: ₱${res.balance.toLocaleString()})`;
    } else {
      res.paymentStatus = 'Fully Paid (Verified by Front Desk)';
      res.balance = 0;
      res.amountPaid = res.totalAmount;
    }
    res.status = 'Confirmed';
    saveReservationsList(reservations);
    addAuditLog(`Payment verified & approved for ${refCode} (Deposited: ₱${(res.amountPaid || 0).toLocaleString()}, Balance: ₱${(res.balance || 0).toLocaleString()})`);
    closePaymentModal();
    refreshFrontDeskData();
    showToast(`Payment for ${refCode} successfully approved!`, 'success');
  }
}

function flagPaymentRejected(refCode) {
  const reservations = getReservations();
  const res = reservations.find(r => r.refCode === refCode);
  if (res) {
    res.paymentStatus = 'Rejected / Unverified';
    res.status = 'Payment Flagged';
    saveReservationsList(reservations);
    addAuditLog(`Payment rejected/flagged for ${refCode} by Front Desk`);
    closePaymentModal();
    refreshFrontDeskData();
    showToast(`Payment for ${refCode} flagged as unverified.`, 'error');
  }
}

// Front Desk Walk-In Modal Logic
function openWalkInModal() {
  const modal = document.getElementById('walkInModal');
  const select = document.getElementById('wRoomSelect');
  if (!modal || !select) return;

  const rooms = getRooms();
  select.innerHTML = '<option value="">-- Choose Available Room Unit --</option>' +
    rooms.map(r => `
      <option value="${r.id}" ${r.status !== 'Available' ? 'disabled' : ''}>
        ${r.name} - ₱${r.pricePerNight.toLocaleString()}/night ${r.status !== 'Available' ? '(' + r.status + ')' : ''}
      </option>
    `).join('');

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  document.getElementById('wCheckIn').value = today;
  document.getElementById('wCheckOut').value = tomorrow;

  calcWalkInPrice();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.style.display = 'flex';
  safeCreateIcons();
}

function closeWalkInModal() {
  const modal = document.getElementById('walkInModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
  }
}

function calcWalkInPrice() {
  const roomId = document.getElementById('wRoomSelect')?.value;
  const checkIn = document.getElementById('wCheckIn')?.value;
  const checkOut = document.getElementById('wCheckOut')?.value;
  const aff = document.getElementById('wAffiliation')?.value;

  const room = getRooms().find(r => r.id === roomId);
  if (!room || !checkIn || !checkOut) return;

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

  const discounts = getDiscounts();
  let discountPercent = 0;
  if (aff === 'faculty') discountPercent = discounts.faculty || 20;
  else if (aff === 'student') discountPercent = discounts.student || 20;
  else if (aff === 'alumni') discountPercent = discounts.alumni || 10;

  const baseTotal = room.pricePerNight * nights;
  const discountAmount = (baseTotal * discountPercent) / 100;
  const finalTotal = baseTotal - discountAmount;

  if (document.getElementById('wPriceCalcDetails')) {
    document.getElementById('wPriceCalcDetails').innerText = `${nights} Night(s) • ${discountPercent > 0 ? discountPercent + '% Disc Applied' : 'Regular Rate'}`;
  }
  if (document.getElementById('wGrandTotal')) {
    document.getElementById('wGrandTotal').innerText = `₱${finalTotal.toLocaleString()}`;
  }
}

function handleWalkInSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('wGuestName').value.trim();
  const phone = document.getElementById('wPhone').value.trim();
  const email = document.getElementById('wEmail').value.trim() || 'walkin.guest@isatu.edu.ph';
  const aff = document.getElementById('wAffiliation').value;
  const roomId = document.getElementById('wRoomSelect').value;
  const checkIn = document.getElementById('wCheckIn').value;
  const checkOut = document.getElementById('wCheckOut').value;
  const immediateCheckIn = document.getElementById('wImmediateCheckIn').checked;
  const wPaymentTerm = document.getElementById('wPaymentTerm')?.value || 'full';
  const wPaymentMethod = document.getElementById('wPaymentMethod')?.value || 'cash';
  const wGcashRef = document.getElementById('wGcashRef')?.value.trim() || '-';

  const room = getRooms().find(r => r.id === roomId);
  if (!room) {
    showToast('Please choose an available room unit.', 'error');
    return;
  }

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

  const discounts = getDiscounts();
  let discountPercent = 0;
  if (aff === 'faculty') discountPercent = discounts.faculty || 20;
  else if (aff === 'student') discountPercent = discounts.student || 20;
  else if (aff === 'alumni') discountPercent = discounts.alumni || 10;

  const baseTotal = room.pricePerNight * nights;
  const discountAmount = (baseTotal * discountPercent) / 100;
  const finalTotal = baseTotal - discountAmount;
  const refCode = `ISATU-MH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Calculate deposit and balance
  const depositRate = wPaymentTerm === 'downpayment' ? 0.5 : 1.0;
  const amountPaid = Math.round(finalTotal * depositRate);
  const balance = finalTotal - amountPaid;

  const affiliationLabels = {
    student: 'ISATU Student',
    faculty: 'ISATU Faculty / Staff',
    alumni: 'ISATU Alumni',
    external: 'Walk-in Visitor'
  };

  const termLabel = wPaymentTerm === 'downpayment' ? 'Downpayment (50%)' : 'Full Payment';
  const newRes = {
    refCode,
    guestName: name,
    email,
    phone,
    affiliation: aff,
    affiliationLabel: affiliationLabels[aff] || aff,
    roomId,
    roomName: room.name,
    checkIn,
    checkOut,
    guestsCount: 1,
    totalNights: nights,
    baseRatePerNight: room.pricePerNight,
    discountPercent,
    totalAmount: finalTotal,
    paymentTerm: wPaymentTerm,
    amountPaid: immediateCheckIn ? finalTotal : amountPaid,
    balance: immediateCheckIn ? 0 : balance,
    paymentMethod: wPaymentMethod,
    gcashRef: wPaymentMethod === 'gcash' ? wGcashRef : '-',
    paymentStatus: immediateCheckIn ? 'Fully Paid at Front Desk' : `${termLabel} - Collected at Desk`,
    status: immediateCheckIn ? 'Checked-in' : 'Confirmed',
    createdAt: new Date().toISOString().split('T')[0]
  };

  saveReservation(newRes);

  if (immediateCheckIn) {
    const rooms = getRooms();
    const r = rooms.find(item => item.id === roomId);
    if (r) {
      r.status = 'Occupied';
      saveRooms(rooms);
    }
  }

  addAuditLog(`Walk-in guest registered: ${name} in ${room.name} (${refCode}). ${termLabel}, Collected ₱${newRes.amountPaid.toLocaleString()}. Status: ${newRes.status}`);
  closeWalkInModal();
  refreshFrontDeskData();
  renderRooms();
  showToast(`Walk-in guest registered successfully! Ref: ${refCode}`, 'success');
}

// =============================================================================
// ADMIN PORTAL: EXECUTIVE OVERSIGHT, CRUD & GOVERNANCE
// =============================================================================

function refreshAdminData() {
  try { updateAdminStats(); } catch (e) { console.warn(e); }
  try { renderAdminAnalytics(); } catch (e) { console.warn(e); }
  try { renderAdminInventoryTable(); } catch (e) { console.warn(e); }
  try { renderAdminStaffTable(); } catch (e) { console.warn(e); }
  try { loadDiscountSettings(); } catch (e) { console.warn(e); }
  try { renderAdminAuditLogs(); } catch (e) { console.warn(e); }
  safeCreateIcons();
}

function updateAdminStats() {
  const reservations = getReservations();
  const rooms = getRooms();
  const staff = getStaffList();

  const totalRev = reservations.reduce((acc, cur) => acc + (cur.totalAmount || 0), 0);
  const collectedRev = reservations.reduce((acc, cur) => acc + (cur.amountPaid || 0), 0);
  const pendingReceivables = reservations.reduce((acc, cur) => acc + (cur.balance || 0), 0);
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;

  if (document.getElementById('adminStatRevenue')) document.getElementById('adminStatRevenue').innerText = `₱${collectedRev.toLocaleString()}`;
  if (document.getElementById('adminStatReceivables')) document.getElementById('adminStatReceivables').innerText = `₱${pendingReceivables.toLocaleString()}`;
  if (document.getElementById('adminStatOccupancy')) document.getElementById('adminStatOccupancy').innerText = `${occupancyRate}%`;
  if (document.getElementById('adminStatRoomsCount')) document.getElementById('adminStatRoomsCount').innerText = rooms.length;
  if (document.getElementById('adminStatStaffCount')) document.getElementById('adminStatStaffCount').innerText = staff.length;
}

function switchAdminTab(tabName, btn) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => {
    b.classList.remove('active', 'border-isatu-blue', 'text-isatu-blue', 'font-bold');
    b.classList.add('text-slate-500', 'border-transparent');
  });
  if (btn) {
    btn.classList.add('active', 'border-isatu-blue', 'text-isatu-blue', 'font-bold');
    btn.classList.remove('text-slate-500', 'border-transparent');
  }

  const tabs = ['analytics', 'inventory', 'staff', 'discounts', 'audit'];
  tabs.forEach(t => {
    const el = document.getElementById(`adminTabContent-${t}`);
    if (el) {
      if (t === tabName) {
        el.classList.remove('hidden');
        el.style.display = 'block';
      } else {
        el.classList.add('hidden');
        el.style.display = 'none';
      }
    }
  });

  if (tabName === 'analytics') renderAdminAnalytics();
  if (tabName === 'inventory') renderAdminInventoryTable();
  if (tabName === 'staff') renderAdminStaffTable();
  if (tabName === 'discounts') loadDiscountSettings();
  if (tabName === 'audit') renderAdminAuditLogs();
  safeCreateIcons();
}

function renderAdminAnalytics() {
  const reservations = getReservations();
  const affContainer = document.getElementById('analyticsAffiliationList');
  const payContainer = document.getElementById('analyticsPaymentChannels');
  if (!affContainer || !payContainer) return;

  const affMap = { faculty: 0, student: 0, alumni: 0, external: 0 };
  reservations.forEach(r => {
    const key = r.affiliation || 'external';
    affMap[key] = (affMap[key] || 0) + (r.totalAmount || 0);
  });
  const grandTotal = Object.values(affMap).reduce((a, b) => a + b, 0) || 1;

  affContainer.innerHTML = `
    <div class="space-y-3">
      <div>
        <div class="flex justify-between font-bold mb-1">
          <span>ISAT U Faculty & Staff</span>
          <span class="text-isatu-blue">₱${affMap.faculty.toLocaleString()} (${Math.round((affMap.faculty / grandTotal) * 100)}%)</span>
        </div>
        <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-isatu-blue rounded-full" style="width: ${(affMap.faculty / grandTotal) * 100}%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between font-bold mb-1">
          <span>ISAT U Students</span>
          <span class="text-emerald-600">₱${affMap.student.toLocaleString()} (${Math.round((affMap.student / grandTotal) * 100)}%)</span>
        </div>
        <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full" style="width: ${(affMap.student / grandTotal) * 100}%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between font-bold mb-1">
          <span>ISAT U Alumni</span>
          <span class="text-amber-600">₱${affMap.alumni.toLocaleString()} (${Math.round((affMap.alumni / grandTotal) * 100)}%)</span>
        </div>
        <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-amber-500 rounded-full" style="width: ${(affMap.alumni / grandTotal) * 100}%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between font-bold mb-1">
          <span>External Visitors / Delegates</span>
          <span class="text-purple-600">₱${affMap.external.toLocaleString()} (${Math.round((affMap.external / grandTotal) * 100)}%)</span>
        </div>
        <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div class="h-full bg-purple-500 rounded-full" style="width: ${(affMap.external / grandTotal) * 100}%"></div>
        </div>
      </div>
    </div>
  `;

  const gcashCount = reservations.filter(r => r.paymentMethod === 'gcash').length;
  const landbankCount = reservations.filter(r => r.paymentMethod === 'landbank').length;
  const cashCount = reservations.filter(r => r.paymentMethod === 'cash').length;
  const totalCount = reservations.length || 1;

  payContainer.innerHTML = `
    <div class="space-y-4">
      <div class="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 text-isatu-blue flex items-center justify-center font-bold">
            <i data-lucide="smartphone" class="w-5 h-5"></i>
          </div>
          <div>
            <span class="font-bold text-slate-800 block">GCash Online E-Wallet</span>
            <span class="text-[11px] text-slate-400">${gcashCount} bookings recorded</span>
          </div>
        </div>
        <span class="font-extrabold text-sm text-isatu-blue">${Math.round((gcashCount / totalCount) * 100)}%</span>
      </div>

      <div class="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <i data-lucide="landmark" class="w-5 h-5"></i>
          </div>
          <div>
            <span class="font-bold text-slate-800 block">Landbank Institutional Transfer</span>
            <span class="text-[11px] text-slate-400">${landbankCount} bookings recorded</span>
          </div>
        </div>
        <span class="font-extrabold text-sm text-amber-700">${Math.round((landbankCount / totalCount) * 100)}%</span>
      </div>

      <div class="p-4 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <i data-lucide="banknote" class="w-5 h-5"></i>
          </div>
          <div>
            <span class="font-bold text-slate-800 block">Cash at Front Desk</span>
            <span class="text-[11px] text-slate-400">${cashCount} on-site settlements</span>
          </div>
        </div>
        <span class="font-extrabold text-sm text-emerald-600">${Math.round((cashCount / totalCount) * 100)}%</span>
      </div>
    </div>
  `;
  safeCreateIcons();
}

// Room Inventory CRUD
function renderAdminInventoryTable() {
  const container = document.getElementById('adminInventoryTableBody');
  if (!container) return;

  const rooms = getRooms();
  container.innerHTML = rooms.map(r => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors text-xs">
      <td class="px-4 py-3">
        <span class="font-mono font-bold text-isatu-blue">${r.id.toUpperCase()}</span>
        <div class="font-bold text-slate-900">${r.name}</div>
      </td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
          ${r.category}
        </span>
      </td>
      <td class="px-4 py-3 text-slate-600">${r.capacity} • ${r.size || '25 sqm'}</td>
      <td class="px-4 py-3 font-extrabold text-slate-900">₱${r.pricePerNight.toLocaleString()}</td>
      <td class="px-4 py-3">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${r.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : r.status === 'Occupied' ? 'bg-blue-100 text-blue-800' : r.status === 'Turnover' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}">
          ${r.status}
        </span>
      </td>
      <td class="px-4 py-3 text-right">
        <div class="flex items-center justify-end gap-1.5">
          <button onclick="toggleRoomMaintenance('${r.id}')" title="Toggle Maintenance" class="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-[11px] font-bold cursor-pointer">
            ${r.status === 'Maintenance' ? 'Reopen' : 'Maint.'}
          </button>
          <button onclick="deleteRoom('${r.id}')" title="Archive / Delete" class="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
  safeCreateIcons();
}

function openAdminRoomModal() {
  const modal = document.getElementById('adminRoomModal');
  if (modal) {
    document.getElementById('adminRoomForm').reset();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.style.display = 'flex';
    safeCreateIcons();
  }
}

function closeAdminRoomModal() {
  const modal = document.getElementById('adminRoomModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
  }
}

function handleSaveRoom(e) {
  e.preventDefault();
  const id = document.getElementById('mRoomId').value.trim().toLowerCase();
  const name = document.getElementById('mRoomName').value.trim();
  const category = document.getElementById('mRoomCategory').value;
  const price = parseFloat(document.getElementById('mRoomPrice').value) || 1500;
  const capacity = document.getElementById('mRoomCapacity').value.trim();
  const size = document.getElementById('mRoomSize').value.trim();
  const amenitiesStr = document.getElementById('mRoomAmenities').value.trim();
  const description = document.getElementById('mRoomDescription').value.trim();
  const status = document.getElementById('mRoomStatus').value;

  const amenities = amenitiesStr ? amenitiesStr.split(',').map(s => s.trim()) : ['Air Conditioning', 'Free Wi-Fi', 'Hot Shower'];

  const rooms = getRooms();
  const existingIdx = rooms.findIndex(r => r.id === id);

  const roomObj = {
    id,
    name,
    category,
    pricePerNight: price,
    capacity,
    size: size || '28 sqm',
    image: category === 'deluxe' ? 'images/deluxe_suite.png' : 'images/standard_room.png',
    status,
    amenities,
    description: description || `${name} for campus visitors and guests.`
  };

  if (existingIdx >= 0) {
    rooms[existingIdx] = roomObj;
  } else {
    rooms.push(roomObj);
  }

  saveRooms(rooms);
  addAuditLog(`Admin configured room inventory unit: ${name} (${id.toUpperCase()}) at ₱${price}/night`);
  closeAdminRoomModal();
  refreshAdminData();
  renderRooms();
  showToast(`Accommodation ${name} saved successfully!`, 'success');
}

function toggleRoomMaintenance(roomId) {
  const rooms = getRooms();
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    room.status = room.status === 'Maintenance' ? 'Available' : 'Maintenance';
    saveRooms(rooms);
    addAuditLog(`Admin toggled maintenance on ${room.name} (${room.id}) to: ${room.status}`);
    renderAdminInventoryTable();
    renderRooms();
    showToast(`Room ${room.id.toUpperCase()} set to ${room.status}`, 'info');
  }
}

function deleteRoom(roomId) {
  if (!confirm(`Are you sure you want to remove accommodation ${roomId.toUpperCase()} from the directory?`)) return;
  let rooms = getRooms();
  rooms = rooms.filter(r => r.id !== roomId);
  saveRooms(rooms);
  addAuditLog(`Admin archived room unit ${roomId.toUpperCase()}`);
  renderAdminInventoryTable();
  renderRooms();
  showToast(`Room removed from inventory.`, 'info');
}

// Staff & User Management CRUD
function renderAdminStaffTable() {
  const container = document.getElementById('adminStaffTableBody');
  if (!container) return;

  const staff = getStaffList();
  container.innerHTML = staff.map(s => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors text-xs">
      <td class="px-4 py-3">
        <div class="font-bold text-slate-900">${s.name}</div>
        <span class="font-mono text-[10px] text-slate-400">${s.id}</span>
      </td>
      <td class="px-4 py-3 font-medium text-slate-600">${s.email}</td>
      <td class="px-4 py-3">
        <span class="px-2.5 py-0.5 rounded-full font-bold text-[10px] ${s.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-isatu-blue'}">
          ${s.role}
        </span>
      </td>
      <td class="px-4 py-3 text-slate-500">${s.shift}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
          ${s.status}
        </span>
      </td>
      <td class="px-4 py-3 text-right">
        <button onclick="toggleStaffStatus('${s.id}')" class="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 font-bold text-[11px] text-slate-700 cursor-pointer">
          ${s.status === 'Active' ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  `).join('');
}

function openAdminStaffModal() {
  const modal = document.getElementById('adminStaffModal');
  if (modal) {
    document.getElementById('adminStaffForm').reset();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.style.display = 'flex';
    safeCreateIcons();
  }
}

function closeAdminStaffModal() {
  const modal = document.getElementById('adminStaffModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
  }
}

function handleSaveStaff(e) {
  e.preventDefault();
  const name = document.getElementById('mStaffName').value.trim();
  const email = document.getElementById('mStaffEmail').value.trim();
  const role = document.getElementById('mStaffRole').value;
  const shift = document.getElementById('mStaffShift').value;

  const staffList = getStaffList();
  const newStaff = {
    id: `stf-00${staffList.length + 1}`,
    name,
    email,
    role,
    shift,
    status: 'Active',
    lastActive: 'New Account'
  };

  staffList.push(newStaff);
  saveStaffList(staffList);
  addAuditLog(`Admin provisioned new staff account: ${name} (${role})`);
  closeAdminStaffModal();
  renderAdminStaffTable();
  updateAdminStats();
  showToast(`Staff account for ${name} created!`, 'success');
}

function toggleStaffStatus(staffId) {
  const staffList = getStaffList();
  const s = staffList.find(item => item.id === staffId);
  if (s) {
    s.status = s.status === 'Active' ? 'Inactive' : 'Active';
    saveStaffList(staffList);
    addAuditLog(`Admin updated status for staff ${s.name} to: ${s.status}`);
    renderAdminStaffTable();
    showToast(`Staff member ${s.name} is now ${s.status}`, 'info');
  }
}

// Discount Matrix Controls
function loadDiscountSettings() {
  const discounts = getDiscounts();
  if (document.getElementById('cfgDiscountFaculty')) document.getElementById('cfgDiscountFaculty').value = discounts.faculty || 20;
  if (document.getElementById('cfgDiscountStudent')) document.getElementById('cfgDiscountStudent').value = discounts.student || 20;
  if (document.getElementById('cfgDiscountAlumni')) document.getElementById('cfgDiscountAlumni').value = discounts.alumni || 10;
  if (document.getElementById('cfgDiscountPartner')) document.getElementById('cfgDiscountPartner').value = discounts.partner || 10;
}

function saveDiscountSettings() {
  const faculty = parseFloat(document.getElementById('cfgDiscountFaculty').value) || 0;
  const student = parseFloat(document.getElementById('cfgDiscountStudent').value) || 0;
  const alumni = parseFloat(document.getElementById('cfgDiscountAlumni').value) || 0;
  const partner = parseFloat(document.getElementById('cfgDiscountPartner').value) || 0;

  const discounts = { faculty, student, alumni, partner };
  saveDiscounts(discounts);
  addAuditLog(`Admin updated Institutional Discount Policy (Faculty: ${faculty}%, Student: ${student}%, Alumni: ${alumni}%)`);
  showToast('Institutional discount policy updated successfully!', 'success');
}

// Audit Trail Viewer
function renderAdminAuditLogs() {
  const container = document.getElementById('adminAuditLogContainer');
  if (!container) return;

  const logs = getAuditLogs();
  if (logs.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-slate-400 font-sans">No audit events recorded.</div>`;
    return;
  }

  container.innerHTML = logs.map(log => `
    <div class="p-3.5 hover:bg-slate-50 flex items-start gap-3 transition-colors">
      <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px] mt-0.5 flex-shrink-0">
        ●
      </div>
      <div class="flex-1">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span class="font-bold text-slate-800">${log.user}</span>
          <span class="text-[10px] text-slate-400 font-sans">${log.timestamp}</span>
        </div>
        <p class="text-slate-600 mt-0.5 font-sans">${log.action}</p>
      </div>
    </div>
  `).join('');
}

function clearAuditLogs() {
  if (!confirm('Are you sure you want to clear old audit logs?')) return;
  localStorage.setItem('isatu_mhrs_audit', JSON.stringify([]));
  renderAdminAuditLogs();
  showToast('Audit trail logs cleared.', 'info');
}

// =============================================================================
// GLOBAL TOAST NOTIFICATIONS
// =============================================================================
function showToast(message, type = 'info') {
  try {
    const toast = document.createElement('div');
    const bgClass = type === 'error' ? 'bg-rose-600' : type === 'success' ? 'bg-emerald-600' : 'bg-isatu-blue';
    
    toast.className = `${bgClass} text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 fixed bottom-5 right-5 z-50 transform transition-all duration-300 translate-y-10 opacity-0`;
    toast.innerHTML = `
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 50);

    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  } catch (e) {}
}

function setupEventListeners() {
  const checkIn = document.getElementById('resCheckIn');
  const checkOut = document.getElementById('resCheckOut');

  if (checkIn) checkIn.addEventListener('change', calculatePricing);
  if (checkOut) checkOut.addEventListener('change', calculatePricing);
}

// =============================================================================
// APP BOOTSTRAPPER (Executes whether DOMContentLoaded has fired or not)
// =============================================================================
function initializeApp() {
  initStorage();
  initRoleUI();
  try { renderRooms(); } catch (e) {}
  try { setMinDates(); } catch (e) {}
  try { setupEventListeners(); } catch (e) {}

  if (currentRole === 'receptionist') {
    try { refreshFrontDeskData(); } catch (e) {}
  } else if (currentRole === 'admin') {
    try { refreshAdminData(); } catch (e) {}
  }

  try { updateReceptionistBadge(); } catch (e) {}
  try { safeCreateIcons(); } catch (e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM already loaded
  initializeApp();
}
