// Ticket types and prices
const ticketTypes = {
    'unpas': {
        price: 19999,
        title: 'Tiket Mahasiswa UNPAS',
        nimRequired: true
    },
    'umum': {
        price: 35000,
        title: 'Tiket Umum',
        nimRequired: false
    }
};

let currentTicketType = null;
let registrationData = {};

// Show payment modal
function showPaymentModal(type) {
    if (!ticketTypes[type]) return;
    
    currentTicketType = type;
    const ticketInfo = ticketTypes[type];
    
    // Set modal title
    document.getElementById('modalTitle').textContent = ticketInfo.title;
    document.getElementById('modalPrice').textContent = `Rp ${formatNumber(ticketInfo.price)}`;
    
    // Show/hide NIM field based on ticket type
    document.getElementById('nimContainer').style.display = ticketInfo.nimRequired ? 'block' : 'none';
    
    // Show modal with registration form
    document.getElementById('registrationStep').style.display = 'block';
    document.getElementById('paymentStep').style.display = 'none';
    document.getElementById('successStep').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'flex';
}

// Close payment modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Format number with thousand separator
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Validate phone number
function isValidPhone(phone) {
    return /^08[1-9][0-9]{7,10}$/.test(phone);
}

// Validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Generate QR code
function generateQRCode(amount) {
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = '';
    
    const qrData = `DANA Payment:Lisvindanu:${amount}:${registrationData.name}:${registrationData.email}`;
    
    new QRCode(qrContainer, {
        text: qrData,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Update countdown timer
function updateCountdown() {
    const targetDate = new Date('May 17, 2025 12:30:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Update countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Handle registration form submission
    document.getElementById('submitRegistrationBtn').addEventListener('click', function() {
        const name = document.getElementById('buyerName').value.trim();
        const email = document.getElementById('buyerEmail').value.trim();
        const phone = document.getElementById('buyerPhone').value.trim();
        const nim = document.getElementById('buyerNIM').value.trim();
        
        // Validate inputs
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
        
        if (ticketTypes[currentTicketType].nimRequired && !nim) {
            alert('Mohon masukkan NIM');
            return;
        }
        
        // Store registration data
        registrationData = {
            name: name,
            email: email,
            phone: phone,
            nim: nim,
            ticketType: currentTicketType,
            price: ticketTypes[currentTicketType].price,
            registrationTime: new Date().toISOString()
        };
        
        // Generate QR code for payment
        generateQRCode(registrationData.price);
        
        // Move to payment step
        document.getElementById('registrationStep').style.display = 'none';
        document.getElementById('paymentStep').style.display = 'block';
    });
    
    // Handle back button
    document.getElementById('backToFormBtn').addEventListener('click', function() {
        document.getElementById('paymentStep').style.display = 'none';
        document.getElementById('registrationStep').style.display = 'block';
    });
    
    // Handle payment confirmation
    document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
        const paymentProof = document.getElementById('paymentProof');
        
        if (!paymentProof.files || paymentProof.files.length === 0) {
            alert('Mohon upload bukti pembayaran');
            return;
        }
        
        // Move to success step
        document.getElementById('paymentStep').style.display = 'none';
        document.getElementById('successStep').style.display = 'block';
    });
    
    // Handle success close button
    document.getElementById('closeSuccessBtn').addEventListener('click', function() {
        closePaymentModal();
        
        // Reset form fields
        document.getElementById('buyerName').value = '';
        document.getElementById('buyerEmail').value = '';
        document.getElementById('buyerPhone').value = '';
        document.getElementById('buyerNIM').value = '';
        document.getElementById('paymentProof').value = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('paymentModal');
        if (event.target === modal) {
            closePaymentModal();
        }
    });
});