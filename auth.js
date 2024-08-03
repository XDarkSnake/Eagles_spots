/* auth.css */

body {
    font-family: Arial, sans-serif;
}

.container {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 300px;
    background: white;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
}

.show-container {
    transform: translateX(0%);
}

.form-container {
    display: none;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

form input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

form button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: blue;
    color: white;
    cursor: pointer;
}

.toggle-container {
    position: relative;
}

.hidden {
    display: none;
}
