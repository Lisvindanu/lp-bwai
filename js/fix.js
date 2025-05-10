/**
 * fix.js - Tambahkan file ini ke proyek Anda untuk memperbaiki masalah
 * - Memperbaiki masalah include-html
 * - Menampilkan section registration dan schedule yang hilang
 * - Meningkatkan CTA (Call to Action)
 * - Menambahkan animasi dan efek visual
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("fix.js is running");
    
    // Fix CSS conflicts yang menyebabkan beberapa section tidak terlihat
    fixCSS();
    
    // Fix proses include HTML yang tidak bekerja
    fixIncludeHTML();
    
    // Tingkatkan CTA (Call to Action) untuk menarik perhatian
    enhanceCTAs();
    
    // Perbaiki headlines dan subcopy
    enhanceHeadlines();
    
    // Tambahkan animasi
    initAnimations();
    
    // Inisialisasi fitur lainnya
    initializeOtherFeatures();
    
    console.log("fix.js has completed initialization");
/**
 * Inisialisasi fitur lainnya
 */
function initializeOtherFeatures() {
    // Inisialisasi countdown
    initCountdown();
    
    // Animasi scroll
    initScrollAnimations();
    
    // Toggle FAQ
    setupFAQToggles();
    
    // Modal functions
    setupModalFunctions();
    
    // Inisialisasi toggle menu mobile
    initMobileMenu();
    
    // Inisialisasi sticky navbar
    initStickyNavbar();
}

/**
 * Inisialisasi konten setelah dimuat
 */
function initializeLoadedContent() {
    // Re-run all initializations for the newly loaded content
    initCountdown();
    initScrollAnimations();
    setupFAQToggles();
    setupModalFunctions();
    enhanceCTAs();
    
    // Show elements that should be animated on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate-show');
    });
}

/**
 * Inisialisasi toggle menu mobile
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        // Hapus listener yang ada dengan clone dan replace
        const newMenuBtn = menuBtn.cloneNode(true);
        if (menuBtn.parentNode) {
            menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
        }
        
        newMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Tutup menu saat klik link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            // Hapus listener yang ada dengan clone dan replace
            const newLink = link.cloneNode(true);
            if (link.parentNode) {
                link.parentNode.replaceChild(newLink, link);
            }
            
            newLink.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Inisialisasi sticky navbar
 */
function initStickyNavbar() {
    const nav = document.querySelector('nav');
    if (nav) {
        function checkScroll() {
            if (window.scrollY > 50) {
                nav.classList.add('bg-white', 'shadow-md', 'sticky');
            } else {
                nav.classList.remove('shadow-md', 'sticky');
            }
        }
        
        // Check initial scroll position
        checkScroll();
        
        // Add scroll listener
        window.addEventListener('scroll', checkScroll);
    }
}

/**
 * Inisialisasi scroll to top button
 */
function initScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.remove('hidden');
            } else {
                scrollToTopButton.classList.add('hidden');
            }
        });
        
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Animasi counting untuk statistik
 */
function animateCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 1500; // Animation duration in milliseconds
        const startTimestamp = performance.now();
        
        const updateCounter = (timestamp) => {
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * target);
            
            counter.textContent = currentValue.toString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
}

// Add a window resize handler to fix any visibility issues
window.addEventListener('resize', function() {
    // Fix any sections that might have been hidden due to CSS issues
    document.querySelectorAll('#schedule, #registration').forEach(section => {
        if (section) {
            section.style.display = 'block';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        }
    });
});

// Expose functions to window so they can be called from other scripts
window.initCountdown = initCountdown;
window.setupFAQToggles = setupFAQToggles;
window.initScrollAnimations = initScrollAnimations;
window.setupModalFunctions = setupModalFunctions;
window.animateCounters = animateCounters;
});

/**
 * Memperbaiki masalah CSS yang menyebabkan section tidak terlihat
 */
function fixCSS() {
    console.log("Applying CSS fixes");
    
    const style = document.createElement('style');
    style.textContent = `
        /* Fix section yang tidak terlihat */
        #registration, #schedule {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            overflow: visible !important;
            position: relative !important;
            z-index: 5 !important;
        }
        
        /* Fix untuk section backgrounds */
        #schedule {
            background-color: #f9fafb !important;
            color: #1f2937 !important;
            padding: 4rem 0 !important;
        }
        
        #schedule h2, #schedule h3, #schedule h4 {
            color: #1f2937 !important;
        }
        
        #schedule p {
            color: #4b5563 !important;
        }
        
        #registration {
            background-color: #eff6ff !important;
            color: #1f2937 !important;
            padding: 4rem 0 !important;
        }
        
        #registration h2, #registration h3, #registration h4 {
            color: #1f2937 !important;
        }
        
        #registration p {
            color: #4b5563 !important;
        }
        
        /* Tampilkan navigation dropdown pada mobile */
        .nav-links.active {
            display: flex !important;
        }
        
        /* Tingkatkan CTA utama */
        .mega-cta {
            animation: pulse 2s infinite;
            position: relative;
            overflow: hidden;
            transform: scale(1);
            transition: all 0.3s ease;
        }
        
        .mega-cta:hover {
            transform: scale(1.05);
        }
        
        .mega-cta::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shine 1.5s infinite;
        }
        
        @keyframes shine {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }
        
        /* Badge perhatian */
        .attention-badge {
            display: inline-block;
            background: linear-gradient(45deg, #EA4335, #FBBC05);
            color: white !important;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: pulse 2s infinite;
        }
        
        /* Animasi tambahan */
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-20px);
            }
            60% {
                transform: translateY(-10px);
            }
        }
        
        .bounce-animation {
            animation: bounce 3s ease infinite;
        }
        
        /* Content elements fixes */
        .content-wrapper, .container {
            position: relative !important;
            z-index: 5 !important;
        }
        
        /* Make sure cards and timelines are visible */
        .timeline-item, .bg-white {
            position: relative;
            z-index: 2;
            background-color: white !important;
        }
        
        /* Pastikan animasi scroll berfungsi */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Fix for the countdown timer */
        .countdown-item {
            display: flex !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(style);
    
    // Buat CTA Mobile lebih menonjol
    setTimeout(() => {
        const mobileMenuItems = document.querySelectorAll('.nav-links a');
        mobileMenuItems.forEach(item => {
            if (item.textContent.includes('DAFTAR')) {
                item.classList.add('mega-cta');
                item.innerHTML = '🔥 DAFTAR SEKARANG!';
            }
        });
    }, 500);
    
    console.log("CSS fixes applied");
}

/**
 * Memperbaiki include-html yang tidak berfungsi
 */
function fixIncludeHTML() {
    console.log("Fixing include-html issues");
    
    const includes = document.querySelectorAll('[include-html]');
    
    // Jika ada element dengan attribute include-html
    if (includes.length > 0) {
        console.log(`Found ${includes.length} unprocessed include-html elements`);
        
        // Coba load section yang hilang dengan XHR
        includes.forEach(element => {
            const file = element.getAttribute('include-html');
            if (!file) return;
            
            console.log(`Manually loading: ${file}`);
            
            // Mencoba kedua kemungkinan path (dengan atau tanpa prefiks sections/)
            const paths = [file, file.includes('/') ? file : 'sections/' + file];
            loadFirstSuccessful(element, paths);
        });
    } else {
        console.log("No unprocessed include-html elements found");
        
        // Periksa apakah section tertentu hilang
        checkMissingSections();
    }
}

/**
 * Coba load dari beberapa path dan gunakan yang pertama berhasil
 */
function loadFirstSuccessful(element, paths, index = 0) {
    if (index >= paths.length) {
        console.error(`Failed to load from all paths: ${paths.join(', ')}`);
        element.innerHTML = `
            <div class="bg-red-100 text-red-600 p-4 rounded">
                <p class="font-bold">Error loading ${paths[0]}</p>
                <p>Coba: (1) Pastikan file ada, (2) Jalankan di server bukan file lokal, (3) Periksa path file</p>
            </div>
        `;
        return;
    }
    
    const path = paths[index];
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                element.innerHTML = this.responseText;
                element.removeAttribute('include-html');
                console.log(`Successfully loaded: ${path}`);
                
                // Inisialisasi konten yang baru dimuat
                initializeLoadedContent();
            } else {
                console.log(`Failed to load ${path}, trying next path...`);
                loadFirstSuccessful(element, paths, index + 1);
            }
        }
    };
    
    xhr.open('GET', path, true);
    xhr.send();
}

/**
 * Periksa apakah section tertentu hilang dan load secara langsung
 */
function checkMissingSections() {
    const criticalSections = [
        { id: 'schedule', file: 'schedule.html' },
        { id: 'registration', file: 'registration.html' }
    ];
    
    criticalSections.forEach(section => {
        if (!document.getElementById(section.id) || 
            document.getElementById(section.id).offsetHeight === 0) {
            
            console.log(`Critical section ${section.id} is missing or has zero height`);
            
            // Buat container jika belum ada
            let container = document.getElementById(`${section.id}-container`);
            if (!container) {
                container = document.createElement('div');
                container.id = `${section.id}-container`;
                
                // Cari posisi yang tepat untuk memasukkan container ini
                const referenceElement = document.getElementById('benefit') || 
                                        document.querySelector('footer') ||
                                        document.body.lastElementChild;
                
                if (referenceElement) {
                    referenceElement.parentNode.insertBefore(container, referenceElement);
                } else {
                    document.body.appendChild(container);
                }
            }
            
            // Load konten section
            loadSection(section.file, `${section.id}-container`);
        }
    });
}

/**
 * Load section langsung ke container
 */
function loadSection(sectionFile, containerId) {
    const paths = [sectionFile, `sections/${sectionFile}`];
    
    function tryNextPath(index) {
        if (index >= paths.length) {
            document.getElementById(containerId).innerHTML = `
                <section class="py-16 bg-red-50">
                    <div class="container mx-auto px-4 text-center">
                        <p class="text-red-600 font-bold">Failed to load section</p>
                        <p class="text-gray-700">Please refresh the page or contact support.</p>
                    </div>
                </section>
            `;
            return;
        }
        
        fetch(paths[index])
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                console.log(`Successfully loaded ${paths[index]} into #${containerId}`);
                initializeLoadedContent();
            })
            .catch(e => {
                console.log(`Failed to load ${paths[index]}: ${e.message}`);
                tryNextPath(index + 1);
            });
    }
    
    tryNextPath(0);
}

/**
 * Tingkatkan CTA (Call to Action)
 */
function enhanceCTAs() {
    setTimeout(() => {
        // Tingkatkan semua tombol pendaftaran
        const regButtons = document.querySelectorAll('a[href="#registration"], button[onclick*="showPaymentModal"], .pulse-animation');
        regButtons.forEach(btn => {
            if (btn.textContent.includes('DAFTAR') || btn.textContent.includes('Daftar')) {
                btn.classList.add('mega-cta');
                
                // Tambahkan emoji dan text yang menarik
                if (!btn.textContent.includes('🚀')) {
                    if (btn.tagName === 'BUTTON') {
                        btn.innerHTML = '🚀 DAFTAR SEKARANG!';
                    } else {
                        btn.innerHTML = '🚀 DAFTAR SEKARANG!';
                    }
                }
            }
        });
        
        // Tambahkan badge perhatian
        const limitedSlotBadge = document.querySelector('.animate-pulse');
        if (limitedSlotBadge) {
            limitedSlotBadge.classList.add('attention-badge');
            if (!limitedSlotBadge.textContent.includes('🔥')) {
                limitedSlotBadge.innerHTML = '🔥 SLOT TERBATAS! HANYA 50 PESERTA 🔥';
            }
        }
    }, 500);
}

/**
 * Tingkatkan headline dan subcopy
 */
function enhanceHeadlines() {
    setTimeout(() => {
        // Tingkatkan headline utama
        const mainHeadline = document.querySelector('h1');
        if (mainHeadline) {
            // Tambahkan class untuk style yang lebih menonjol
            mainHeadline.classList.add('text-5xl', 'lg:text-6xl', 'font-extrabold');
            
            // Tambahkan badge "Skill AI yang akan mengubah karir Anda!"
            if (!mainHeadline.innerHTML.includes('karir')) {
                const badgeHTML = `<div class="text-lg mt-2 font-normal text-gray-700">
                    <span class="bg-yellow-200 px-2 py-1 rounded">Skill AI yang akan mengubah karir Anda!</span>
                </div>`;
                mainHeadline.innerHTML = mainHeadline.innerHTML + badgeHTML;
            }
        }
        
        // Tingkatkan subheadline
        const subheadline = document.querySelector('.hero-section p.text-xl');
        if (subheadline) {
            if (!subheadline.innerHTML.includes('dicari industri')) {
                subheadline.innerHTML = `
                    Dapatkan <span class="font-bold underline">keahlian AI praktis</span> yang dicari industri! 
                    Workshop eksklusif hands-on dengan 
                    <span class="font-semibold">Google Cloud</span> dan 
                    <span class="font-semibold">Vertex AI</span> bersama para ahli.
                    <span class="block mt-2 text-red-600 font-bold">Hanya 50 kursi tersedia!</span>
                `;
            }
        }
        
        // Tingkatkan header section
        const sectionTitles = document.querySelectorAll('h2.section-title');
        sectionTitles.forEach(title => {
            // Tambahkan line break dan subtitle
            if (title.textContent.includes('Daftar') && !title.innerHTML.includes('Investasi')) {
                title.innerHTML = `
                    <span class="google-red">Daftar</span> 
                    <span class="google-blue">Sekarang</span>
                    <span class="block text-base font-normal mt-2 text-gray-700">Investasi untuk masa depan AI Anda!</span>
                `;
            }
        });
    }, 800);
}

/**
 * Inisialisasi animasi scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
    
    const handleScroll = () => {
        animatedElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('animate-show');
            }
        });
    };
    
    // Cek posisi awal
    handleScroll();
    
    // Tambahkan event listener scroll
    window.addEventListener('scroll', handleScroll);
}

/**
 * Inisialisasi countdown timer
 */
function initCountdown() {
    function updateCountdown() {
        const targetDate = new Date('May 17, 2025 12:30:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update semua element countdown
            document.querySelectorAll('[id="days"], [id="countdown-days"]').forEach(el => {
                if (el) el.textContent = days;
            });
            
            document.querySelectorAll('[id="hours"], [id="countdown-hours"]').forEach(el => {
                if (el) el.textContent = hours;
            });
            
            document.querySelectorAll('[id="minutes"], [id="countdown-minutes"]').forEach(el => {
                if (el) el.textContent = minutes;
            });
            
            document.querySelectorAll('[id="seconds"], [id="countdown-seconds"]').forEach(el => {
                if (el) el.textContent = seconds;
            });
        }
    }
    
    // Update segera dan setiap detik
    updateCountdown();
    
    // Hanya set interval jika belum ada
    if (!window.countdownInterval) {
        window.countdownInterval = setInterval(updateCountdown, 1000);
    }
}

/**
 * Setup FAQ toggle
 */
function setupFAQToggles() {
    // Set semua jawaban FAQ ke hidden jika belum hidden
    document.querySelectorAll('.faq-answer').forEach(answer => {
        if (window.getComputedStyle(answer).display !== 'none') {
            answer.style.display = 'none';
        }
    });
    
    // Setup toggle untuk semua FAQ
    document.querySelectorAll('[onclick*="toggleFaq"]').forEach(btn => {
        // Hapus listener yang ada dengan clone dan replace
        const newBtn = btn.cloneNode(true);
        if (btn.parentNode) {
            btn.parentNode.replaceChild(newBtn, btn);
        }
        
        newBtn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('svg');
            
            if (answer && answer.style.display === 'block') {
                answer.style.display = 'none';
                if (icon) icon.classList.remove('rotate-180');
            } else if (answer) {
                // Tutup semua FAQ lain
                document.querySelectorAll('.faq-answer').forEach(item => {
                    if (item !== answer) {
                        item.style.display = 'none';
                    }
                });
                
                document.querySelectorAll('[onclick*="toggleFaq"] svg').forEach(item => {
                    if (item !== icon && item) {
                        item.classList.remove('rotate-180');
                    }
                });
                
                answer.style.display = 'block';
                if (icon) icon.classList.add('rotate-180');
            }
        });
    });
}

/**
 * Setup fungsi modal
 */
function setupModalFunctions() {
    // Definisikan ticketTypes jika belum ada
    if (!window.ticketTypes) {
        window.ticketTypes = {
            'unpas': {
                price: 19999,
                originalPrice: 35000,
                discount: 43,
                title: 'Tiket Mahasiswa UNPAS',
                nimRequired: true
            },
            'umum': {
                price: 35000,
                originalPrice: 50000,
                discount: 30,
                title: 'Tiket Umum',
                nimRequired: false
            }
        };
    }
    
    // Fix function showPaymentModal
    window.showPaymentModal = function(type) {
        if (!window.ticketTypes || !window.ticketTypes[type]) {
            console.error(`Ticket type "${type}" not found`);
            return;
        }
        
        window.currentTicketType = type;
        const ticketInfo = window.ticketTypes[type];
        
        // Set modal title and price
        const modalTitles = document.querySelectorAll('#modalTitle');
        modalTitles.forEach(el => {
            if (el) el.textContent = ticketInfo.title;
        });
        
        const priceElements = document.querySelectorAll('#modalPrice');
        priceElements.forEach(el => {
            if (el) el.textContent = `Rp ${formatNumber(ticketInfo.price)}`;
        });
        
        // Show/hide NIM field based on ticket type
        const nimContainer = document.getElementById('nimContainer');
        if (nimContainer) nimContainer.style.display = ticketInfo.nimRequired ? 'block' : 'none';
        
        // Show modal with registration form
        const registrationStep = document.getElementById('registrationStep');
        const paymentStep = document.getElementById('paymentStep');
        const successStep = document.getElementById('successStep');
        const paymentModal = document.getElementById('paymentModal');
        
        if (registrationStep) registrationStep.style.display = 'block';
        if (paymentStep) paymentStep.style.display = 'none';
        if (successStep) successStep.style.display = 'none';
        
        if (paymentModal) {
            paymentModal.style.display = 'flex';
            paymentModal.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'bg-opacity-70', 'z-50', 'flex', 'items-center', 'justify-center');
        }
        
        // Add body class to prevent scrolling
        document.body.classList.add('overflow-hidden');
    };
    
    // Format number helper
    window.formatNumber = function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    
    // Close payment modal
    window.closePaymentModal = function() {
        const paymentModal = document.getElementById('paymentModal');
        if (paymentModal) paymentModal.style.display = 'none';
        
        // Remove body class to allow scrolling
        document.body.classList.remove('overflow-hidden');
    };
    
    // Setup close button
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        // Hapus listener yang ada dengan clone dan replace
        const newBtn = btn.cloneNode(true);
        if (btn.parentNode) {
            btn.parentNode.replaceChild(newBtn, btn);
        }
        
        newBtn.addEventListener('click', function() {
            window.closePaymentModal();
        });
    });
    
    // Setup tombol-tombol di dalam modal
    setupInternalModalEvents();
    
    // Close modal when clicking outside
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        // Hapus listener yang ada dengan clone dan replace jika bisa
        try {
            const newModal = paymentModal.cloneNode(true);
            if (paymentModal.parentNode) {
                paymentModal.parentNode.replaceChild(newModal, paymentModal);
                
                newModal.addEventListener('click', function(event) {
                    if (event.target === this) {
                        window.closePaymentModal();
                    }
                });
                
                // Re-setup tombol di dalam modal yang baru
                setupInternalModalEvents();
            }
        } catch (e) {
            console.log("Could not clone payment modal, adding click listener directly:", e);
            paymentModal.addEventListener('click', function(event) {
                if (event.target === this) {
                    window.closePaymentModal();
                }
            });
        }
    }
}

/**
 * Setup events untuk elemen di dalam modal
 */
function setupInternalModalEvents() {
    // Form pendaftaran submission
    const submitBtn = document.getElementById('submitRegistrationBtn');
    if (submitBtn) {
        // Hapus listener yang ada dengan clone dan replace
        const newBtn = submitBtn.cloneNode(true);
        if (submitBtn.parentNode) {
            submitBtn.parentNode.replaceChild(newBtn, submitBtn);
        }
        
        newBtn.addEventListener('click', function() {
            const name = document.getElementById('buyerName')?.value.trim();
            const email = document.getElementById('buyerEmail')?.value.trim();
            const phone = document.getElementById('buyerPhone')?.value.trim();
            const nim = document.getElementById('buyerNIM')?.value.trim();
            
            // Validasi dasar
            if (!name) {
                alert('Mohon masukkan nama lengkap');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert('Mohon masukkan email yang valid');
                return;
            }
            
            if (!phone || !isValidPhone(phone)) {
                alert('Mohon masukkan nomor WhatsApp yang valid (contoh: 08123456789)');
                return;
            }
            
            if (window.ticketTypes?.[window.currentTicketType]?.nimRequired && !nim) {
                alert('Mohon masukkan NIM');
                return;
            }
            
            // Store registration data
            window.registrationData = {
                name: name,
                email: email,
                phone: phone,
                nim: nim,
                ticketType: window.currentTicketType,
                price: window.ticketTypes?.[window.currentTicketType]?.price,
                registrationTime: new Date().toISOString()
            };
            
            // Generate QR code for payment
            try {
                generateQRCode(window.registrationData.price);
            } catch (e) {
                console.error('Error generating QR code:', e);
            }
            
            // Move to payment step
            const registrationStep = document.getElementById('registrationStep');
            const paymentStep = document.getElementById('paymentStep');
            
            if (registrationStep) registrationStep.style.display = 'none';
            if (paymentStep) paymentStep.style.display = 'block';
        });
    }
    
    // Back button
    const backBtn = document.getElementById('backToFormBtn');
    if (backBtn) {
        // Hapus listener yang ada dengan clone dan replace
        const newBtn = backBtn.cloneNode(true);
        if (backBtn.parentNode) {
            backBtn.parentNode.replaceChild(newBtn, backBtn);
        }
        
        newBtn.addEventListener('click', function() {
            const paymentStep = document.getElementById('paymentStep');
            const registrationStep = document.getElementById('registrationStep');
            
            if (paymentStep) paymentStep.style.display = 'none';
            if (registrationStep) registrationStep.style.display = 'block';
        });
    }
    
    // Payment confirmation
    const confirmBtn = document.getElementById('confirmPaymentBtn');
    if (confirmBtn) {
        // Hapus listener yang ada dengan clone dan replace
        const newBtn = confirmBtn.cloneNode(true);
        if (confirmBtn.parentNode) {
            confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
        }
        
        newBtn.addEventListener('click', function() {
            const paymentProof = document.getElementById('paymentProof');
            
            if (!paymentProof || !paymentProof.files || paymentProof.files.length === 0) {
                alert('Mohon upload bukti pembayaran');
                return;
            }
            
            // Move to success step
            const paymentStep = document.getElementById('paymentStep');
            const successStep = document.getElementById('successStep');
            
            if (paymentStep) paymentStep.style.display = 'none';
            if (successStep) successStep.style.display = 'block';
        });
    }
    
    // Success close button
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    if (closeSuccessBtn) {
        // Hapus listener yang ada dengan clone dan replace
        const newBtn = closeSuccessBtn.cloneNode(true);
        if (closeSuccessBtn.parentNode) {
            closeSuccessBtn.parentNode.replaceChild(newBtn, closeSuccessBtn);
        }
        
        newBtn.addEventListener('click', function() {
            window.closePaymentModal();
            
            // Reset form fields
            if (document.getElementById('buyerName')) document.getElementById('buyerName').value = '';
            if (document.getElementById('buyerEmail')) document.getElementById('buyerEmail').value = '';
            if (document.getElementById('buyerPhone')) document.getElementById('buyerPhone').value = '';
            if (document.getElementById('buyerNIM')) document.getElementById('buyerNIM').value = '';
            if (document.getElementById('paymentProof')) document.getElementById('paymentProof').value = '';
        });
    }
}

/**
 * Generate QR code
 */
function generateQRCode(amount) {
    const qrContainer = document.getElementById('qrCodeContainer');
    if (!qrContainer) return;
    
    qrContainer.innerHTML = '';
    
    const qrData = `DANA Payment:Lisvindanu:${amount}:${window.registrationData?.name || 'Peserta'}:${window.registrationData?.email || 'email@example.com'}`;
    
    try {
        new QRCode(qrContainer, {
            text: qrData,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (e) {
        console.error('Error creating QR code:', e);
        qrContainer.innerHTML = `<div class="text-center p-4 bg-gray-100 rounded">
            <p>QR Code tidak dapat dibuat.</p>
            <p class="text-sm">Silakan refresh halaman.</p>
        </div>`;
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate phone number format
 */
function isValidPhone(phone) {
    return /^08[1-9][0-9]{7,10}$/.test(phone);
}

/**
 * Tambahkan animasi
 */
function initAnimations() {
    setTimeout(() => {
        // Animasi untuk heading utama
        const mainHeading = document.querySelector('h1');
        if (mainHeading) {
            mainHeading.classList.add('animate-on-scroll');
            mainHeading.classList.add('animate-show');
        }
        
        // Animasi untuk CTA utama
        const mainCTA = document.querySelector('a[href="#registration"].mega-cta');
        if (mainCTA) {
            mainCTA.classList.add('bounce-animation');
        }
        
        // Animasi untuk elemen animasi scroll
        document.querySelectorAll('.section-title, .card, .timeline-item, .pricing-box').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.classList.add(`animate-delay-${(index % 5) + 1}00`);
            // Langsung tampilkan dengan animate-show
            el.classList.add('animate-show');
        });
    }, 1000);
}