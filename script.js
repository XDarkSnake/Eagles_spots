document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const loginBtn = document.getElementById('login-btn');
    const loginContainer = document.getElementById('login-container');
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const login = document.getElementById('login');

    // Afficher la bannière lorsque l'utilisateur survole le haut de la page
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 50) {
            header.style.top = '0'; // Afficher la bannière
        } else {
            header.style.top = '-60px'; // Masquer la bannière
        }
    });

    // Afficher/masquer le formulaire de connexion
    loginBtn.addEventListener('click', () => {
        loginContainer.style.display = 'block';
        setTimeout(() => loginContainer.style.transform = 'translateX(0)', 10); // Animation en douceur
    });

    loginContainer.addEventListener('click', (e) => {
        if (e.target === loginContainer) {
            loginContainer.style.transform = 'translateX(100%)';
            setTimeout(() => loginContainer.style.display = 'none', 500); // Délai pour l'animation
        }
    });

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    login.addEventListener('click', () => {
        container.classList.remove('active');
    });
});
