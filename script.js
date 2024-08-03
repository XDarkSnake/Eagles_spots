const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const header = document.getElementById('header');
const loginButton = document.getElementById('login-btn');

// Toggle between sign-in and sign-up forms
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Show header when cursor is near the top of the page
window.addEventListener('scroll', () => {
    if (window.scrollY < 50) {
        header.style.top = '0';
    } else {
        header.style.top = '-60px'; // Adjust to hide the header
    }
});

// Open the login form when the login button is clicked
loginButton.addEventListener('click', () => {
    container.classList.add("active");
});
