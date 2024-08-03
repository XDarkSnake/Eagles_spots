// auth.js

document.addEventListener("DOMContentLoaded", function() {
    const userButton = document.getElementById('user-button');
    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleLogin = document.getElementById('login');
    const toggleRegister = document.getElementById('register');

    userButton.onclick = function() {
        authContainer.classList.toggle('show-container');
    };

    toggleLogin.onclick = function() {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    };

    toggleRegister.onclick = function() {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    };

    registerForm.onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            registerForm.reset();
            toggleLogin.click(); // Show login form after registration
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    };

    loginForm.onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                authContainer.classList.remove('show-container');
                loginForm.reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    };
});
