document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la carte
    const map = L.map('mapid').setView([45.26913308480121, 6.795794963836671], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajout de marqueurs fictifs
    fetch('/points')
        .then(response => response.json())
        .then(data => {
            data.forEach(point => {
                L.marker([point.lat, point.lng])
                    .addTo(map)
                    .bindPopup(`<b>${point.nom}</b><br>${point.note}`);
            });
        });

    // Gestion des boutons
    document.getElementById('login-button').addEventListener('click', () => {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    document.getElementById('register-button').addEventListener('click', () => {
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    document.getElementById('locate-button').addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(map).bindPopup('Vous êtes ici!');
        });
    });

    // Fonction pour masquer les formulaires
    function hideForm() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('popup-form').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    // Ajouter gestion des soumissions de formulaire et autres logiques ici
});
