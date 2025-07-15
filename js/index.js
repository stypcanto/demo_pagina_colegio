document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initAnimations();
    initForms();
    initLoginButton();
    initBackButton();
});

// 1. Menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    if (menuToggle && mobileMenu && overlay) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        const menuLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
        menuLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            });
        });
    }
}

// 2. Animaciones (features)
function initAnimations() {
    const features = document.querySelectorAll('.feature');
    if (features.length > 0) {
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
    }
}

// 3. Formularios (login, registro, recuperación)
function initForms() {
    // Formulario Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            let isValid = true;
            const username = document.getElementById('username');
            const password = document.getElementById('password');

            if (username.value.trim() === '') {
                document.getElementById('userError').style.display = 'block';
                username.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (password.value.trim() === '') {
                document.getElementById('passError').style.display = 'block';
                password.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (!isValid) e.preventDefault();
        });
    }

    // Formulario Registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            let isValid = true;

            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const username = document.getElementById('username');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const userType = document.getElementById('userType');

            if (fullname.value.trim() === '') {
                document.getElementById('nameError').style.display = 'block';
                fullname.style.borderColor = '#e74c3c';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').style.display = 'block';
                email.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (username.value.trim() === '') {
                document.getElementById('userError').style.display = 'block';
                username.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (password.value.length < 8) {
                document.getElementById('passError').textContent = 'La contraseña debe tener al menos 8 caracteres';
                document.getElementById('passError').style.display = 'block';
                password.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (password.value !== confirmPassword.value) {
                document.getElementById('confirmError').style.display = 'block';
                confirmPassword.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (userType.value === '') {
                document.getElementById('typeError').style.display = 'block';
                userType.style.borderColor = '#e74c3c';
                isValid = false;
            }

            if (!isValid) e.preventDefault();
        });

        const passwordInput = document.getElementById('password');
        const passStrength = document.getElementById('passStrength');
        if (passwordInput && passStrength) {
            passwordInput.addEventListener('input', function () {
                const password = this.value;
                let strength = 0;

                if (password.length >= 8) strength++;
                if (password.length >= 12) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;

                if (strength <= 2) {
                    passStrength.textContent = 'Débil';
                    passStrength.className = 'password-strength strength-weak';
                } else if (strength <= 4) {
                    passStrength.textContent = 'Moderada';
                    passStrength.className = 'password-strength strength-medium';
                } else {
                    passStrength.textContent = 'Fuerte';
                    passStrength.className = 'password-strength strength-strong';
                }
            });
        }
    }

    // Formulario Recuperación
    const recoveryForm = document.getElementById('recoveryForm');
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const successMessage = document.getElementById('successMessage');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                emailError.style.display = 'block';
                email.style.borderColor = '#e74c3c';
                successMessage.style.display = 'none';
            } else {
                emailError.style.display = 'none';
                email.style.borderColor = '#ddd';
                successMessage.style.display = 'block';
                email.value = '';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}

// 4. Botón de login (redirección)
function initLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const isGitHubPages = window.location.host.includes('github.io');
            const basePath = isGitHubPages ? '/' + window.location.pathname.split('/')[1] : '';
            window.location.href = basePath + '/demo_pagina_colegio/Login.html';
        });
    }
}

// 5. Botón volver atrás (en páginas con .back-button)
function initBackButton() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {

            window.location.href = 'index.html';

        });
    }
}

