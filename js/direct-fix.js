/**
 * direct-fix.js - Solusi langsung untuk memperbaiki section yang hilang
 * Tempatkan script ini SEBELUM semua script lain di bagian bawah body
 */

// Jalankan begitu DOM tersedia
document.addEventListener('DOMContentLoaded', function() {
    console.log("direct-fix.js is running - emergency section creation");
    
    // Tambahkan CSS penting
    addEmergencyCSS();
    
    // Periksa apakah section sudah ada, jika tidak, buat dan tambahkan langsung
    createMissingSections();
    
    // Tambahkan fallback untuk includeHTML
    window.setTimeout(checkIncludeHTMLCompletion, 1000);
});

/**
 * Tambahkan CSS darurat untuk memaksa section terlihat
 */
function addEmergencyCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Fix untuk section yang tidak terlihat */
        #schedule, #registration, #schedule-container, #registration-container {
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
    `;
    document.head.appendChild(style);
}

/**
 * Buat section yang hilang secara langsung di DOM
 */
function createMissingSections() {
    // Cek apakah section schedule dan registration sudah ada
    const scheduleExists = document.getElementById('schedule') !== null;
    const registrationExists = document.getElementById('registration') !== null;
    
    // Container untuk section baru
    let scheduleContainer, registrationContainer;
    
    // Tentukan titik penyisipan (setelah benefits section)
    const insertPoint = document.getElementById('benefit') || 
                       document.querySelector('footer') || 
                       document.body.lastElementChild;
    
    console.log("Checking for missing sections");
    console.log("Schedule exists: " + scheduleExists);
    console.log("Registration exists: " + registrationExists);
    
    // Buat container untuk schedule jika belum ada
    if (!scheduleExists) {
        console.log("Creating schedule container");
        scheduleContainer = document.createElement('div');
        scheduleContainer.id = 'schedule-container';
        
        if (insertPoint && insertPoint.parentNode) {
            insertPoint.parentNode.insertBefore(scheduleContainer, insertPoint.nextSibling);
            console.log("Schedule container inserted into DOM");
        } else {
            document.body.appendChild(scheduleContainer);
            console.log("Schedule container appended to body");
        }
        
        // Load schedule content
        loadSectionContent('schedule.html', scheduleContainer, true);
    }
    
    // Buat container untuk registration jika belum ada
    if (!registrationExists) {
        console.log("Creating registration container");
        registrationContainer = document.createElement('div');
        registrationContainer.id = 'registration-container';
        
        const scheduleElement = document.getElementById('schedule-container') || insertPoint;
        
        if (scheduleElement && scheduleElement.parentNode) {
            scheduleElement.parentNode.insertBefore(registrationContainer, scheduleElement.nextSibling);
            console.log("Registration container inserted into DOM");
        } else {
            document.body.appendChild(registrationContainer);
            console.log("Registration container appended to body");
        }
        
        // Load registration content
        loadSectionContent('registration.html', registrationContainer, true);
    }
}

/**
 * Load konten section langsung ke container
 */
function loadSectionContent(sectionFile, container, createSection) {
    console.log(`Attempting to load ${sectionFile} directly`);
    
    // Coba beberapa kemungkinan path file
    const paths = [
        sectionFile,
        `sections/${sectionFile}`,
        `${window.location.pathname}${sectionFile}`,
        `${window.location.pathname}/sections/${sectionFile}`
    ];
    
    // Mencoba semua path secara berurutan
    tryNextPath(paths, 0, container, createSection);
}

/**
 * Coba path berikutnya untuk load content
 */
function tryNextPath(paths, index, container, createSection) {
    if (index >= paths.length) {
        console.error(`Failed to load content from all possible paths: ${paths.join(', ')}`);
        
        // Jika semua gagal, buat section kosong sebagai fallback
        if (createSection) {
            createEmptySection(container);
        }
        return;
    }
    
    const path = paths[index];
    console.log(`Trying path (${index+1}/${paths.length}): ${path}`);
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            console.log(`Successfully loaded: ${path}`);
            container.innerHTML = html;
            
            // Inisialisasi countdown, animations, dll
            initializeLoadedContent();
        })
        .catch(error => {
            console.log(`Failed to load from ${path}: ${error.message}`);
            
            // Coba path berikutnya
            tryNextPath(paths, index + 1, container, createSection);
        });
}

/**
 * Inisialisasi konten yang baru dimuat
 */
function initializeLoadedContent() {
    // Inisialisasi countdown timer
    initializeCountdown();
    
    // Tandai semua elemen dengan animate-show agar terlihat
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate-show');
    });
    
    // Setup FAQ toggles
    setupFAQToggles();
}

/**
 * Inisialisasi countdown timer
 */
function initializeCountdown() {
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
    
    // Update countdown sekarang dan set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Setup toggle untuk FAQ
 */
function setupFAQToggles() {
    document.querySelectorAll('[onclick*="toggleFaq"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
}

/**
 * Buat empty section sebagai fallback terakhir
 */
function createEmptySection(container) {
    // Tentukan tipe section
    const isSchedule = container.id.includes('schedule');
    const id = isSchedule ? 'schedule' : 'registration';
    const title = isSchedule ? 'Jadwal Workshop' : 'Pendaftaran';
    const bgColor = isSchedule ? 'bg-gray-50' : 'bg-blue-50';
    
    // Buat section kosong dengan ID yang benar
    container.innerHTML = `
        <section id="${id}" class="py-16 ${bgColor}">
            <div class="container mx-auto px-4">
                <div class="text-center mb-10">
                    <h2 class="text-3xl lg:text-4xl font-bold mb-4 section-title">
                        ${title}
                    </h2>
                    <div class="w-20 h-1 bg-google-red mx-auto mb-6"></div>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Terjadi kesalahan saat memuat konten. Silakan refresh halaman atau hubungi administrator.
                    </p>
                </div>
                <div class="text-center">
                    <a href="javascript:location.reload()" class="inline-block px-8 py-4 bg-google-blue text-white font-bold rounded-full transition duration-300 shadow-lg">
                        Refresh Halaman
                    </a>
                </div>
            </div>
        </section>
    `;
}

/**
 * Periksa jika include-html selesai, dan jika masih ada masalah, coba perbaiki
 */
function checkIncludeHTMLCompletion() {
    // Periksa apakah masih ada element dengan atribut include-html
    const remainingIncludes = document.querySelectorAll('[include-html]');
    
    if (remainingIncludes.length > 0) {
        console.log(`Found ${remainingIncludes.length} unprocessed include-html elements after timeout`);
        
        // Coba kembali untuk element yang gagal
        remainingIncludes.forEach(element => {
            const file = element.getAttribute('include-html');
            if (file) {
                console.log(`Retrying include-html for: ${file}`);
                element.removeAttribute('include-html');
                
                // Coba load file langsung
                const paths = [file, `sections/${file}`];
                tryNextPath(paths, 0, element, false);
            }
        });
    }
    
    // Periksa apakah section schedule dan registration ada
    const scheduleSection = document.getElementById('schedule');
    const registrationSection = document.getElementById('registration');
    
    if (!scheduleSection || !registrationSection) {
        console.log("Still missing critical sections after include-html completion");
        createMissingSections();
    }
}