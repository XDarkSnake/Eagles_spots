document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const map = document.getElementById('map');
    const loginBtn = document.getElementById('login-btn');
    const loginContainer = document.getElementById('login-container');
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const login = document.getElementById('login');

    // Afficher la bannière lorsque l'utilisateur survole le haut de la page
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 50) {
            header.style.display = 'block';
        } else {
            header.style.display = 'none';
        }
    });

    // Afficher/masquer le formulaire de connexion
    loginBtn.addEventListener('click', () => {
        loginContainer.style.display = 'block';
    });

    loginContainer.addEventListener('click', (e) => {
        if (e.target === loginContainer) {
            loginContainer.style.display = 'none';
        }
    });

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    login.addEventListener('click', () => {
        container.classList.remove('active');
    });
});
