// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

overlay.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Mejora el cierre del menú al hacer clic en enlaces
const menuLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Cierra el menú
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Obtiene el destino del enlace
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();

            // Pequeño retraso para permitir que el menú se cierre primero
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 300);
        }
    });
});

// Para el botón de login en el menú móvil
const mobileLoginBtn = document.querySelector('.mobile-menu .btn-login');
if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        window.location.href = 'login.html';
    });
}

// Animation on scroll
document.addEventListener('DOMContentLoaded', function () {
    const features = document.querySelectorAll('.feature');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    features.forEach(feature => {
        feature.style.opacity = 0;
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'all 0.6s ease-out';
        observer.observe(feature);
    });
});

// Validación básica del formulario
document.getElementById('loginForm').addEventListener('submit', function (e) {
    let isValid = true;
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');

    // Validar usuario
    if (username.value.trim() === '') {
        userError.style.display = 'block';
        username.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        userError.style.display = 'none';
        username.style.borderColor = '#ddd';
    }

    // Validar contraseña
    if (password.value.trim() === '') {
        passError.style.display = 'block';
        password.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        passError.style.display = 'none';
        password.style.borderColor = '#ddd';
    }

    if (!isValid) {
        e.preventDefault();
    }
});


// Validación del formulario
document.getElementById('registerForm').addEventListener('submit', function (e) {
    let isValid = true;
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const userType = document.getElementById('userType');

    // Validar nombre
    if (fullname.value.trim() === '') {
        document.getElementById('nameError').style.display = 'block';
        fullname.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
        fullname.style.borderColor = '#ddd';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        email.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
        email.style.borderColor = '#ddd';
    }

    // Validar usuario
    if (username.value.trim() === '') {
        document.getElementById('userError').style.display = 'block';
        username.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        document.getElementById('userError').style.display = 'none';
        username.style.borderColor = '#ddd';
    }

    // Validar contraseña
    if (password.value.length < 8) {
        document.getElementById('passError').textContent = 'La contraseña debe tener al menos 8 caracteres';
        document.getElementById('passError').style.display = 'block';
        password.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        document.getElementById('passError').style.display = 'none';
        password.style.borderColor = '#ddd';
    }

    // Validar confirmación de contraseña
    if (password.value !== confirmPassword.value) {
        document.getElementById('confirmError').style.display = 'block';
        confirmPassword.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        document.getElementById('confirmError').style.display = 'none';
        confirmPassword.style.borderColor = '#ddd';
    }

    // Validar tipo de usuario
    if (userType.value === '') {
        document.getElementById('typeError').style.display = 'block';
        userType.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        document.getElementById('typeError').style.display = 'none';
        userType.style.borderColor = '#ddd';
    }

    if (!isValid) {
        e.preventDefault();
    }
});

// Indicador de fortaleza de contraseña
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strengthText = document.getElementById('passStrength');

    if (password.length === 0) {
        strengthText.textContent = '';
        strengthText.className = 'password-strength';
        return;
    }

    // Calcular fortaleza
    let strength = 0;

    // Longitud mínima
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Caracteres diversos
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Mostrar resultado
    if (strength <= 2) {
        strengthText.textContent = 'Débil';
        strengthText.className = 'password-strength strength-weak';
    } else if (strength <= 4) {
        strengthText.textContent = 'Moderada';
        strengthText.className = 'password-strength strength-medium';
    } else {
        strengthText.textContent = 'Fuerte';
        strengthText.className = 'password-strength strength-strong';
    }
});


// Validación del formulario
document.getElementById('recoveryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.style.display = 'block';
        email.style.borderColor = '#e74c3c';
        successMessage.style.display = 'none';
    } else {
        emailError.style.display = 'none';
        email.style.borderColor = '#ddd';

        // Simular envío exitoso (en producción esto sería una petición AJAX)
        successMessage.style.display = 'block';
        email.value = '';

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// Redirección al login desde el botón en la página de inicio
document.getElementById('loginBtn').addEventListener('click', function() {
    // Detectar si estamos en GitHub Pages
    const isGitHubPages = window.location.host.includes('github.io');
    
    // Obtener el nombre del repositorio automáticamente
    const repoName = isGitHubPages ? window.location.pathname.split('/')[1] : '';
    
    // Construir la ruta correcta
    const loginPath = repoName ? `/${repoName}/login.html` : '/login.html';
    
    window.location.href = loginPath;
});