// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tourButtons = document.querySelectorAll('.tour-btn');
const modal = document.getElementById('tour-modal');
const closeModal = document.querySelector('.close');
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const bookingForm = document.getElementById('booking-form');
const eventButtons = document.querySelectorAll('.event-btn');
const themeButtons = document.querySelectorAll('.theme-btn');

// Monastery Popup Elements
const rumtekCard = document.getElementById('rumtek-card');
const rumtekModal = document.getElementById('rumtek-modal');
const rumtekClose = document.querySelector('.monastery-close');

const pemayangtseCard = document.getElementById('pemayangtse-card');
const pemayangtseModal = document.getElementById('pemayangtse-modal');
const pemayangtseClose = document.querySelector('#pemayangtse-modal .monastery-close');

const tashidingCard = document.getElementById('tashiding-card');
const tashidingModal = document.getElementById('tashiding-modal');
const tashidingClose = document.querySelector('#tashiding-modal .monastery-close');

// Sign In Modal Elements
const signinModal = document.getElementById('signin-modal');
const signupModal = document.getElementById('signup-modal');
const signinClose = document.querySelector('.signin-close');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

// SNT Modal Elements
const sntModal = document.getElementById('snt-modal');
const sntClose = document.querySelector('.snt-close');

// Cab Modal Elements
const cabModal = document.getElementById('cab-modal');
const cabClose = document.querySelector('.cab-close');

// Air Modal Elements
const airModal = document.getElementById('air-modal');
const airClose = document.querySelector('.air-close');

// Global Variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// 360Â° panorama sources
// Use full iframe embeds or direct src iframes (keep as strings)
const panoramaSources = {
	rumtek: {
		default: `<iframe src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4noWi1qh5jxMZzabXbBqL2vsQd_A9N0RgJNoe0MMeKfOiROlmMXx1Rf5euDbotpEoRkW26k-MqvyzCdtjkRcGBlE0Ae-j81bUnjANKnKFj8izyOsExZoM1oYZ0sdJPvz5A6d7VA6eQ=s1360-w1360-h1020-rw" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
		hotspots: {
			'golden-stupa': `<iframe src="https://panoraven.com/en/embed/Fz2Jql4EEN" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'prayer-hall': `<iframe src="https://panoraven.com/en/embed/Fz2Jql4EEN" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'meditation-area': `<iframe src="https://panoraven.com/en/embed/p4oPiL3aWE" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`
		}
	},
	pemayangtse: {
		default: `<iframe src="https://panoraven.com/en/embed/bNdyKBHVou" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
		hotspots: {
			'main-hall': `<iframe src="https://panoraven.com/en/embed/bNdyKBHVou" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'sanghthok-palace': `<iframe src="https://panoraven.com/en/embed/Bo4868yjx7" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'chortens': `<iframe src="https://panoraven.com/en/embed/VI05vPsMt5" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`
		}
	},
	tashiding: {
		default: `<iframe src="https://panoraven.com/en/embed/vwmmwmDBKZ" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
		hotspots: {
			'mani-stones': `<iframe src="https://panoraven.com/en/embed/vwmmwmDBKZ" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'chortens': `<iframe src="https://panoraven.com/en/embed/8aghUBWM9u" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`,
			'viewpoint': `<iframe src="https://panoraven.com/en/embed/MvFZBXLjm5" width="100%" height="520" frameborder="0" allowfullscreen loading="lazy"></iframe>`
		}
	}
};

function applyTheme(theme) {
	const selectedTheme = theme === 'dark' ? 'dark' : 'cream';
	document.body.classList.toggle('dark-mode', selectedTheme === 'dark');
	document.body.classList.toggle('cream-mode', selectedTheme === 'cream');
	themeButtons.forEach(button => {
		const isActive = button.dataset.theme === selectedTheme;
		button.classList.toggle('active', isActive);
		button.setAttribute('aria-pressed', String(isActive));
	});
	localStorage.setItem('monastery-theme', selectedTheme);
}

themeButtons.forEach(button => {
	button.addEventListener('click', () => applyTheme(button.dataset.theme));
});

applyTheme(localStorage.getItem('monastery-theme') || 'cream');

// Navigation Toggle
if (hamburger && navMenu) {
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		navMenu.classList.toggle('active');
	});
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
	link.addEventListener('click', () => {
		hamburger && hamburger.classList.remove('active');
		navMenu && navMenu.classList.remove('active');
	});
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		const targetId = link.getAttribute('href');
		if (targetId && targetId.startsWith('#')) {
			e.preventDefault();
			const targetSection = document.querySelector(targetId);
			if (targetSection) {
				const offsetTop = targetSection.offsetTop - 80;
				window.scrollTo({ top: offsetTop, behavior: 'smooth' });
			}
		}
	});
});

// Monastery Showcase Carousel
const monasteryCards = document.querySelectorAll('.monastery-card');
let currentMonasteryIndex = 0;
function showNextMonastery() {
	if (monasteryCards.length === 0) return;
	monasteryCards[currentMonasteryIndex].classList.remove('active');
	currentMonasteryIndex = (currentMonasteryIndex + 1) % monasteryCards.length;
	monasteryCards[currentMonasteryIndex].classList.add('active');
}
if (monasteryCards.length > 1) {
	setInterval(showNextMonastery, 4000);
}

const tourDetails = {
	rumtek: {
		title: 'Rumtek Monastery Virtual Tour',
		info: `<h4>Rumtek Monastery</h4><p>Seat of the Karmapa lineage with the Golden Stupa, prayer halls, monastery library, and meditation spaces.</p>`,
		hotspotText: {
			'golden-stupa': 'Golden Stupa viewpoint',
			'prayer-hall': 'Main prayer hall viewpoint',
			'meditation-area': 'Meditation area viewpoint'
		}
	},
	pemayangtse: {
		title: 'Pemayangtse Monastery Virtual Tour',
		info: `<h4>Pemayangtse Monastery</h4><p>Historic Nyingma monastery known for murals, Sanghthok Palace, chortens, and sacred relics.</p>`,
		hotspotText: {
			'main-hall': 'Main hall viewpoint',
			'sanghthok-palace': 'Sanghthok Palace viewpoint',
			'chortens': 'Chortens viewpoint'
		}
	},
	tashiding: {
		title: 'Tashiding Monastery Virtual Tour',
		info: `<h4>Tashiding Monastery</h4><p>Revered hilltop monastery with sacred chortens, mani stones, prayer wheels, and Himalayan views.</p>`,
		hotspotText: {
			'mani-stones': 'Mani stones viewpoint',
			'chortens': 'Sacred chortens viewpoint',
			'viewpoint': 'Mountain viewpoint'
		}
	}
};

// Virtual Tour Modal
tourButtons.forEach(button => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		openTourModal(button.getAttribute('data-tour'));
	});
});

function openTourModal(tourType) {
	if (!modal) return;
	const details = tourDetails[tourType] || {};
	const sources = panoramaSources[tourType];
	const tourTitle = document.getElementById('tour-title');
	const tourInfoPanel = document.getElementById('tour-info-panel');

	if (tourTitle) tourTitle.textContent = details.title || 'Virtual Tour';
	if (tourInfoPanel) {
		tourInfoPanel.classList.remove('collapsed');
		tourInfoPanel.innerHTML = details.info || '<p>Click hotspots to explore more.</p>';
	}

	renderPanorama(tourType, sources?.default || '', details);
	modal.style.display = 'block';
	modal.setAttribute('aria-hidden', 'false');
	document.body.style.overflow = 'hidden';
}

function renderPanorama(tourType, embed, details) {
	const panoramaView = document.getElementById('panorama-view');
	if (!panoramaView) return;
	const hotspots = panoramaSources[tourType]?.hotspots || {};
	const positions = [
		'style="top: 26%; left: 22%;"',
		'style="top: 58%; right: 22%;"',
		'style="bottom: 24%; left: 48%;"'
	];
	const hotspotHtml = Object.keys(hotspots).map((key, index) => {
		const label = details.hotspotText?.[key] || key.replace(/-/g, ' ');
		return `
			<button class="hotspot" type="button" data-key="${key}" ${positions[index % positions.length]} aria-label="${label}" title="${label}">
				<span class="hotspot-marker"></span>
			</button>
		`;
	}).join('');

	panoramaView.innerHTML = `
		${embed || '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i><p>Tour source unavailable.</p></div>'}
		<div class="tour-controls-overlay">
			${hotspotHtml}
			<div class="tour-instructions">
				<p>Use the panorama controls to look around. Select a dot to switch viewpoints.</p>
			</div>
		</div>
	`;

	panoramaView.querySelectorAll('.hotspot').forEach(hotspot => {
		hotspot.addEventListener('click', () => {
			const key = hotspot.getAttribute('data-key');
			const nextEmbed = panoramaSources[tourType]?.hotspots?.[key];
			if (nextEmbed) {
				renderPanorama(tourType, nextEmbed, details);
				updateTourInfo(tourType, key);
			}
		});
	});
}

function updateTourInfo(tourType, key) {
	const tourInfoPanel = document.getElementById('tour-info-panel');
	if (!tourInfoPanel) return;
	const details = tourDetails[tourType] || {};
	const label = details.hotspotText?.[key] || key.replace(/-/g, ' ');
	tourInfoPanel.innerHTML = `
		${details.info || ''}
		<div class="active-viewpoint">
			<strong>Current viewpoint</strong>
			<span>${label}</span>
		</div>
	`;
}

function closeTourModal() {
	if (!modal) return;
	modal.style.display = 'none';
	modal.setAttribute('aria-hidden', 'true');
	document.body.style.overflow = 'auto';
}

if (closeModal && modal) {
	closeModal.addEventListener('click', closeTourModal);
}
window.addEventListener('click', (e) => {
	if (e.target === modal) closeTourModal();
});
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modal?.style.display === 'block') closeTourModal();
});

const fullscreenBtn = document.getElementById('fullscreen');
if (fullscreenBtn) {
	fullscreenBtn.addEventListener('click', () => {
		const panoramaView = document.getElementById('panorama-view');
		if (panoramaView && panoramaView.requestFullscreen) panoramaView.requestFullscreen();
	});
}

const infoToggleBtn = document.getElementById('info-toggle');
if (infoToggleBtn) {
	infoToggleBtn.addEventListener('click', () => {
		const tourInfoPanel = document.getElementById('tour-info-panel');
		if (!tourInfoPanel) return;
		tourInfoPanel.classList.toggle('collapsed');
		infoToggleBtn.classList.toggle('active', !tourInfoPanel.classList.contains('collapsed'));
	});
}
// Calendar
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const events = {
	2024: {
		1: { 15: 'Losar Festival', 22: 'Buddha Purnima' },
		2: { 8: 'Saga Dawa', 15: 'Monastery Tour' },
		3: { 10: 'Prayer Ceremony', 25: 'Cultural Event' },
		4: { 5: 'Meditation Retreat', 18: 'Heritage Walk' },
		5: { 12: 'Festival Celebration', 28: 'Monk Ceremony' },
		6: { 8: 'Spiritual Gathering', 20: 'Monastery Visit' },
		7: { 15: 'Rain Retreat', 30: 'Cultural Program' },
		8: { 10: 'Monk Ordination', 22: 'Festival Event' },
		9: { 5: 'Prayer Session', 18: 'Heritage Tour' },
		10: { 12: 'Meditation Workshop', 25: 'Cultural Festival' },
		11: { 8: 'Monastery Ceremony', 20: 'Spiritual Retreat' },
		12: { 15: 'Year-end Celebration', 28: 'NEW YEAR  Preparation' }
	}
};
function generateCalendar() {
	if (!currentMonthElement || !calendarGrid) return;
	const firstDay = new Date(currentYear, currentMonth, 1);
	const lastDay = new Date(currentYear, currentMonth + 1, 0);
	const daysInMonth = lastDay.getDate();
	const startingDay = firstDay.getDay();
	currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
	calendarGrid.innerHTML = '';
	['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
		const el = document.createElement('div');
		el.className = 'calendar-day-header';
		el.textContent = day;
		calendarGrid.appendChild(el);
	});
	for (let i = 0; i < startingDay; i++) {
		const empty = document.createElement('div');
		empty.className = 'calendar-day other-month';
		calendarGrid.appendChild(empty);
	}
	for (let day = 1; day <= daysInMonth; day++) {
		const dayElement = document.createElement('div');
		dayElement.className = 'calendar-day';
		dayElement.textContent = day;
		const today = new Date();
		if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) dayElement.classList.add('today');
		if (events[currentYear] && events[currentYear][currentMonth + 1] && events[currentYear][currentMonth + 1][day]) {
			dayElement.classList.add('has-event');
			dayElement.title = events[currentYear][currentMonth + 1][day];
		}
		dayElement.addEventListener('click', () => {
			if (events[currentYear] && events[currentYear][currentMonth + 1] && events[currentYear][currentMonth + 1][day]) {
				showEventDetails(events[currentYear][currentMonth + 1][day], day, currentMonth + 1, currentYear);
			}
		});
		calendarGrid.appendChild(dayElement);
	}
}
function showEventDetails(eventName, day, month, year) {
	alert(`Event: ${eventName}\nDate: ${day}/${month}/${year}\n\nClick "Set Reminder" on the event card below to get notified about this event.`);
}
if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } generateCalendar(); });
if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } generateCalendar(); });
generateCalendar();

// Itinerary Tabs
tabButtons.forEach(button => {
	button.addEventListener('click', () => {
		const tabId = button.getAttribute('data-tab');
		tabButtons.forEach(btn => btn.classList.remove('active'));
		tabContents.forEach(content => content.classList.remove('active'));
		button.classList.add('active');
		const tabEl = document.getElementById(tabId);
		if (tabEl) tabEl.classList.add('active');
	});
});

// Gallery Filter
filterButtons.forEach(button => {
	button.addEventListener('click', () => {
		const filter = button.getAttribute('data-filter');
		filterButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
		galleryItems.forEach(item => {
			const category = item.getAttribute('data-category');
			item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
		});
	});
});

// Booking Form
if (bookingForm) {
	bookingForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const bookingData = {
			type: (document.getElementById('booking-type')).value || '',
			monastery: (document.getElementById('monastery')).value || '',
			date: (document.getElementById('visit-date')).value || '',
			groupSize: (document.getElementById('group-size')).value || '',
			requests: (document.getElementById('special-requests')).value || '',
			email: (document.getElementById('contact-info')).value || ''
		};
		showBookingConfirmation(bookingData);
		bookingForm.reset();
	});
}
function showBookingConfirmation(data) {
	const confirmationMessage = `
		<div class="booking-confirmation">
			<h3>Booking Confirmation</h3>
			<p>Thank you for your booking request!</p>
			<div class="booking-details">
				<p><strong>Experience:</strong> ${data.type}</p>
				<p><strong>Monastery:</strong> ${data.monastery}</p>
				<p><strong>Date:</strong> ${data.date}</p>
				<p><strong>Group Size:</strong> ${data.groupSize}</p>
				<p><strong>Email:</strong> ${data.email}</p>
			</div>
			<p>We will contact you within 24 hours to confirm your booking and provide payment details.</p>
			<div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
				<button id="close-booking-confirmation" class="btn btn-primary">Close</button>
			</div>
		</div>
	`;
	const confirmationDiv = document.createElement('div');
	confirmationDiv.innerHTML = confirmationMessage;
	confirmationDiv.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); z-index: 3000; max-width: 500px; width: 90%;`;
	document.body.appendChild(confirmationDiv);
	const closeBtn = document.getElementById('close-booking-confirmation');
	if (closeBtn) closeBtn.addEventListener('click', () => { confirmationDiv.remove(); });
}

// Event Reminder Buttons
eventButtons.forEach(button => {
	button.addEventListener('click', () => {
		const eventCard = button.closest('.event-card');
		if (!eventCard) return;
		const eventName = eventCard.querySelector('h4')?.textContent || 'Event';
		const eventDate = eventCard.querySelector('.day')?.textContent || '';
		const eventMonth = eventCard.querySelector('.month')?.textContent || '';
		button.textContent = 'Reminder Set!';
		button.style.background = 'var(--gradient-primary)';
		setTimeout(() => { button.textContent = 'Set Reminder'; button.style.background = 'var(--gradient-gold)'; }, 2000);
		alert(`Reminder set for ${eventName} on ${eventDate} ${eventMonth}!`);
	});
});

// Scroll Animations
function handleScrollAnimations() {
	const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
	elements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top;
		const elementVisible = 150;
		if (elementTop < window.innerHeight - elementVisible) element.classList.add('visible');
	});
}
window.addEventListener('scroll', handleScrollAnimations);
document.addEventListener('DOMContentLoaded', () => { handleScrollAnimations(); });

// Navbar scroll effect
window.addEventListener('scroll', () => {
	const navbar = document.querySelector('.navbar');
	if (!navbar) return;
	if (window.scrollY > 100) {
		navbar.style.background = 'var(--nav-bg-scrolled)';
		navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
	} else {
		navbar.style.background = 'var(--nav-bg)';
		navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
	}
});

// Inject helper styles for generated elements.
(function injectHelperStyles() {
	const style = document.createElement('style');
	style.textContent = `
		@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }
		.booking-confirmation { text-align: center; }
		.booking-details { background: var(--light-gold); padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: left; }
		.calendar-day-header { padding: 1rem; text-align: center; font-weight: bold; background: var(--primary-red); color: #fff; }
	`;
	document.head.appendChild(style);
})();

// Monastery Popup Functions
function openRumtekModal() {
    if (rumtekModal) {
        rumtekModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeRumtekModal() {
    if (rumtekModal) {
        rumtekModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openPemayangtseModal() {
    if (pemayangtseModal) {
        pemayangtseModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closePemayangtseModal() {
    if (pemayangtseModal) {
        pemayangtseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openTashidingModal() {
    if (tashidingModal) {
        tashidingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeTashidingModal() {
    if (tashidingModal) {
        tashidingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function scrollToBooking() {
    // Close any open modal first
    closeRumtekModal();
    closePemayangtseModal();
    closeTashidingModal();
    
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        const offsetTop = bookingSection.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

// Event Listeners for Rumtek Modal
if (rumtekCard) {
    rumtekCard.addEventListener('click', (e) => {
        e.preventDefault();
        openRumtekModal();
    });
}

if (rumtekClose) {
    rumtekClose.addEventListener('click', closeRumtekModal);
}

// Event Listeners for Pemayangtse Modal
if (pemayangtseCard) {
    pemayangtseCard.addEventListener('click', (e) => {
        e.preventDefault();
        openPemayangtseModal();
    });
}

if (pemayangtseClose) {
    pemayangtseClose.addEventListener('click', closePemayangtseModal);
}

// Event Listeners for Tashiding Modal
if (tashidingCard) {
    tashidingCard.addEventListener('click', (e) => {
        e.preventDefault();
        openTashidingModal();
    });
}

if (tashidingClose) {
    tashidingClose.addEventListener('click', closeTashidingModal);
}

// Close modals when clicking outside
if (rumtekModal) {
    rumtekModal.addEventListener('click', (e) => {
        if (e.target === rumtekModal) {
            closeRumtekModal();
        }
    });
}

if (pemayangtseModal) {
    pemayangtseModal.addEventListener('click', (e) => {
        if (e.target === pemayangtseModal) {
            closePemayangtseModal();
        }
    });
}

if (tashidingModal) {
    tashidingModal.addEventListener('click', (e) => {
        if (e.target === tashidingModal) {
            closeTashidingModal();
        }
    });
}


// Sign In Modal Functions
function openSignInModal() {
    if (signinModal) {
        signinModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeSignInModal() {
    if (signinModal) {
        signinModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (signupModal) {
        signupModal.style.display = 'none';
    }
}

function switchToSignUp() {
    if (signinModal && signupModal) {
        signinModal.style.display = 'none';
        signupModal.style.display = 'block';
    }
}

function switchToSignIn() {
    if (signinModal && signupModal) {
        signupModal.style.display = 'none';
        signinModal.style.display = 'block';
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('#password + .toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

function toggleSignUpPassword() {
    const passwordInput = document.getElementById('signup-password');
    const toggleBtn = document.querySelector('#signup-password + .toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Form Validation and Submission
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--primary-red)';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.style.borderColor = 'var(--primary-red)';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '#e0e0e0';
}

function validateSignInForm() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;
    
    clearError(email);
    clearError(password);
    
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateSignUpForm() {
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('signup-email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('confirm-password');
    const country = document.getElementById('country');
    const terms = document.getElementById('terms');
    let isValid = true;
    
    // Clear all errors
    [firstname, lastname, email, phone, password, confirmPassword, country].forEach(clearError);
    
    // Validate first name
    if (!firstname.value.trim()) {
        showError(firstname, 'First name is required');
        isValid = false;
    }
    
    // Validate last name
    if (!lastname.value.trim()) {
        showError(lastname, 'Last name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.value.replace(/\s/g, ''))) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 8 characters with uppercase, lowercase, and number');
        isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    // Validate country
    if (!country.value) {
        showError(country, 'Please select your country');
        isValid = false;
    }
    
    // Validate terms
    if (!terms.checked) {
        alert('Please accept the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    return isValid;
}

// Event Listeners for Sign In Modal
if (signinClose) {
    signinClose.addEventListener('click', closeSignInModal);
}

if (signinModal) {
    signinModal.addEventListener('click', (e) => {
        if (e.target === signinModal) {
            closeSignInModal();
        }
    });
}

if (signupModal) {
    signupModal.addEventListener('click', (e) => {
        if (e.target === signupModal) {
            closeSignInModal();
        }
    });
}

// Form submission handlers
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateSignInForm()) {
            // Simulate sign in process
            const submitBtn = signinForm.querySelector('.signin-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Sign in successful! Welcome to Monastery360.');
                closeSignInModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                signinForm.reset();
            }, 2000);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateSignUpForm()) {
            // Simulate sign up process
            const submitBtn = signupForm.querySelector('.signin-submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Account created successfully! Welcome to Monastery360.');
                closeSignInModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                signupForm.reset();
            }, 2000);
        }
    });
}

// Social sign in buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.google-btn')) {
        alert('Google sign in would be implemented here');
    }
    if (e.target.closest('.facebook-btn')) {
        alert('Facebook sign in would be implemented here');
    }
});


// SNT Modal Functions
function openSNTModal() {
    if (sntModal) {
        sntModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeSNTModal() {
    if (sntModal) {
        sntModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function bookSNT(route) {
    // Redirect to redBus SNT booking page
    window.open('https://www.redbus.in/online-booking/sikkim-nationalised-transport-snt', '_blank');
}

// Cab Modal Functions
function openCabModal() {
    if (cabModal) {
        cabModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCabModal() {
    if (cabModal) {
        cabModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function bookCab(route) {
    // Redirect to MakeMyTrip cab booking page
    window.open('https://www.makemytrip.com/car-rental/cab-services-in-sikkim.html', '_blank');
}

// Air Modal Functions
function openAirModal() {
    if (airModal) {
        airModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeAirModal() {
    if (airModal) {
        airModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function bookAir(route) {
    // Redirect to Expedia flight booking page
    window.open('https://www.expedia.co.in/Destinations-In-Sikkim.d6049946.Flight-Destinations', '_blank');
}

// Event Listeners for SNT Modal
if (sntClose) {
    sntClose.addEventListener('click', closeSNTModal);
}

if (sntModal) {
    sntModal.addEventListener('click', (e) => {
        if (e.target === sntModal) {
            closeSNTModal();
        }
    });
}

// Event Listeners for Cab Modal
if (cabClose) {
    cabClose.addEventListener('click', closeCabModal);
}

if (cabModal) {
    cabModal.addEventListener('click', (e) => {
        if (e.target === cabModal) {
            closeCabModal();
        }
    });
}

// Event Listeners for Air Modal
if (airClose) {
    airClose.addEventListener('click', closeAirModal);
}

if (airModal) {
    airModal.addEventListener('click', (e) => {
        if (e.target === airModal) {
            closeAirModal();
        }
    });
}


// Cultural Calendar Tab Functionality
function initCulturalCalendar() {
    const tabButtons = document.querySelectorAll('.calendar-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Event reminder functionality
function setEventReminder(eventName, eventDate) {
    // Simulate setting a reminder
    const reminder = {
        event: eventName,
        date: eventDate,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage (in a real app, this would be sent to a server)
    let reminders = JSON.parse(localStorage.getItem('eventReminders') || '[]');
    reminders.push(reminder);
    localStorage.setItem('eventReminders', JSON.stringify(reminders));
    
    // Show confirmation
    alert(`Reminder set for ${eventName} on ${eventDate}!`);
}

// Learn more functionality
function learnMoreAboutEvent(eventName) {
    const eventInfo = {
        'Losar Festival': 'Losar is the Tibetan New Year, celebrated for 15 days with traditional dances, prayers, and cultural performances across all monasteries.',
        'Buddha Purnima': 'Also known as Vesak, this festival celebrates the birth, enlightenment, and death of Lord Buddha with special prayers and offerings.',
        'Saga Dawa': 'The sacred month of Buddha\'s life events, marked by special ceremonies and increased spiritual activities.',
        'Guru Purnima': 'A day dedicated to honoring spiritual teachers and gurus with special prayers and teachings.',
        'Drukpa Tsechu': 'A masked dance festival celebrating the victory of good over evil with elaborate performances.',
        'Ganden Ngamcho': 'A winter festival with butter lamp offerings and prayers for peace and prosperity.'
    };
    
    const info = eventInfo[eventName] || 'More information about this event will be available soon.';
    alert(`${eventName}\n\n${info}`);
}

// Car Rental Modal Functions
function openCarRentalModal() {
    const carRentalModal = document.getElementById('car-rental-modal');
    if (carRentalModal) {
        carRentalModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCarRentalModal() {
    const carRentalModal = document.getElementById('car-rental-modal');
    if (carRentalModal) {
        carRentalModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function bookCarRental(packageType) {
    // Redirect to Sikkim taxi website
    window.open('https://www.sikkim.taxi/', '_blank');
}

// Add event listeners for calendar functionality
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize cultural calendar tabs
    initCulturalCalendar();
    
    // Add event listeners for event buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('event-btn')) {
            const eventCard = e.target.closest('.event-card');
            const eventName = eventCard.querySelector('h4').textContent;
            const eventDate = eventCard.querySelector('.day').textContent + ' ' + 
                            eventCard.querySelector('.month').textContent + ' ' + 
                            eventCard.querySelector('.year').textContent;
            
            if (e.target.classList.contains('primary')) {
                setEventReminder(eventName, eventDate);
            } else if (e.target.classList.contains('secondary')) {
                learnMoreAboutEvent(eventName);
            }
        }
    });
    
    // Add event listeners for car rental modal
    const carRentalModal = document.getElementById('car-rental-modal');
    const carRentalClose = document.querySelector('.car-rental-close');
    
    if (carRentalClose) {
        carRentalClose.addEventListener('click', closeCarRentalModal);
    }
    
    if (carRentalModal) {
        carRentalModal.addEventListener('click', (e) => {
            if (e.target === carRentalModal) {
                closeCarRentalModal();
            }
        });
    }
});
