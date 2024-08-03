document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.getElementById('sign-up-form');
    const signInForm = document.getElementById('sign-in-form');

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('sign-up-name').value;
        const email = document.getElementById('sign-up-email').value;
        const password = document.getElementById('sign-up-password').value;

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert('Inscription réussie !');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('sign-in-email').value;
        const password = document.getElementById('sign-in-password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            alert('Connexion réussie !');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });

    const registerButton = document.getElementById('register');
    const loginButton = document.getElementById('login');
    const container = document.getElementById('container');

    registerButton.addEventListener('click', () => {
        container.classList.add("sign-up-mode");
    });

    loginButton.addEventListener('click', () => {
        container.classList.remove("sign-up-mode");
    });
});
