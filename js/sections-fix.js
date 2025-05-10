/**
 * sections-fix.js - Perbaikan sederhana untuk path "sections/"
 * Tempatkan script ini SEBELUM include-html.js
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("sections-fix.js is running - fixing section paths");

    // 1. Perbaiki CSS terlebih dahulu (untuk memastikan section terlihat)
    addEmergencyCSS();
    
    // 2. Perbaiki path pada elemen include-html
    fixIncludeHTMLPaths();
    
    // 3. Tambahkan fallback jika include-html gagal
    setTimeout(checkSectionsLoaded, 2000);
});

/**
 * Menambahkan CSS darurat untuk memaksa section terlihat
 */
function addEmergencyCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Fix untuk section yang tidak terlihat */
        #schedule, #registration {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            overflow: visible !important;
            position: relative !important;
            z-index: 5 !important;
        }
        
        /* Fix section backgrounds */
        #schedule {
            background-color: #f9fafb !important;
            color: #1f2937 !important;
            padding: 4rem 0 !important;
        }
        
        #registration {
            background-color: #eff6ff !important;
            color: #1f2937 !important;
            padding: 4rem 0 !important;
        }
        
        /* Pastikan elemen animate-show muncul */
        .animate-on-scroll.animate-show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    console.log("Emergency CSS added");
}

/**
 * Memperbaiki path pada elemen include-html
 * Memastikan selalu menggunakan "sections/" prefix
 */
function fixIncludeHTMLPaths() {
    // Cari semua elemen dengan atribut include-html
    const includeElements = document.querySelectorAll('[include-html]');
    console.log(`Found ${includeElements.length} include-html elements`);
    
    includeElements.forEach(el => {
        const originalPath = el.getAttribute('include-html');
        
        // Jika path tidak mengandung "sections/" tambahkan prefix
        if (originalPath && !originalPath.startsWith('sections/')) {
            const newPath = `sections/${originalPath}`;
            el.setAttribute('include-html', newPath);
            console.log(`Fixed path: ${originalPath} → ${newPath}`);
        }
    });
}

/**
 * Memeriksa apakah section schedule dan registration sudah dimuat
 * Jika belum, coba muat sendiri
 */
function checkSectionsLoaded() {
    const scheduleSection = document.getElementById('schedule');
    const registrationSection = document.getElementById('registration');
    
    console.log("Checking if sections loaded:");
    console.log("- Schedule section exists:", !!scheduleSection);
    console.log("- Registration section exists:", !!registrationSection);
    
    // Jika schedule section tidak ada, coba muat
    if (!scheduleSection) {
        console.log("Schedule section not found, creating fallback");
        createFallbackSection('schedule');
    }
    
    // Jika registration section tidak ada, coba muat
    if (!registrationSection) {
        console.log("Registration section not found, creating fallback");
        createFallbackSection('registration');
    }
}

/**
 * Membuat fallback section jika tidak berhasil dimuat
 */
function createFallbackSection(sectionType) {
    // Buat section element baru
    const section = document.createElement('section');
    section.id = sectionType;
    
    // Sesuaikan style berdasarkan tipe section
    if (sectionType === 'schedule') {
        section.className = 'py-16 bg-gray-50';
    } else {
        section.className = 'py-16 bg-gradient-to-br from-blue-50 to-indigo-50';
    }
    
    // Tambahkan container loading
    section.innerHTML = `
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl lg:text-4xl font-bold mb-4">
                <span class="google-blue">${sectionType === 'schedule' ? 'Jadwal' : 'Daftar'}</span> 
                <span class="google-${sectionType === 'schedule' ? 'green' : 'blue'}">${sectionType === 'schedule' ? 'Workshop' : 'Sekarang'}</span>
            </h2>
            <div class="w-20 h-1 bg-google-red mx-auto mb-6"></div>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Memuat konten ${sectionType}...
            </p>
            <div class="w-16 h-16 border-4 border-google-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
    `;
    
    // Cari posisi untuk memasukkan section ini
    // - Schedule harus setelah section benefit
    // - Registration harus setelah section schedule
    let referenceElement;
    
    if (sectionType === 'schedule') {
        referenceElement = document.getElementById('benefit') || document.querySelector('footer');
    } else {
        referenceElement = document.getElementById('schedule') || document.querySelector('footer');
    }
    
    // Tambahkan section ke DOM
    if (referenceElement && referenceElement.parentNode) {
        referenceElement.parentNode.insertBefore(section, referenceElement.nextElementSibling);
        console.log(`Created fallback ${sectionType} section`);
        
        // Coba muat konten asli
        loadSectionContent(sectionType, section);
    } else {
        document.body.appendChild(section);
        console.log(`Appended fallback ${sectionType} section to body`);
        
        // Coba muat konten asli
        loadSectionContent(sectionType, section);
    }
}

/**
 * Muat konten section dari file
 */
function loadSectionContent(sectionType, container) {
    // Coba muat konten dari lokasi yang benar
    fetch(`sections/${sectionType}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            console.log(`Successfully loaded content for ${sectionType}`);
            
            // Inisialisasi countdown timer dan fitur interaktif lainnya
            if (typeof window.initCountdown === 'function') {
                window.initCountdown();
            } else {
                initBasicCountdown();
            }
            
            // Menerapkan animasi jika ada elemen yang perlu di-animasikan
            container.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('animate-show');
            });
        })
        .catch(error => {
            console.error(`Error loading ${sectionType} content:`, error);
            container.innerHTML = `
                <div class="container mx-auto px-4 text-center">
                    <h2 class="text-3xl lg:text-4xl font-bold mb-4">
                        <span class="google-red">Terjadi Kesalahan</span>
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Tidak dapat memuat konten ${sectionType}. Silakan refresh halaman.
                    </p>
                    <button onclick="location.reload()" class="px-8 py-4 bg-google-blue text-white font-bold rounded-full transition duration-300 shadow-lg">
                        Refresh Halaman
                    </button>
                </div>
            `;
        });
}

/**
 * Inisialisasi countdown dasar jika fungsi asli tidak tersedia
 */
function initBasicCountdown() {
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
    
    // Update countdown dan set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
}