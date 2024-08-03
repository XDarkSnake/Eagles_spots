// script.js

document.addEventListener("DOMContentLoaded", function() {
    var mymap = L.map('mapid').setView([0, 0], 13); // Position initiale à [0, 0]
    var spotsLayer = L.layerGroup().addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var userMarker;
    var userIcon = L.divIcon({
        className: 'user-icon',
        html: '<div style="background-color: blue; width: 10px; height: 10px; border-radius: 50%;"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    var spotIcon = L.icon({
        iconUrl: 'marqeur_jaune.png', // Assurez-vous que le chemin est correct
        iconSize: [25, 25],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
    });

    function onLocationFound(e) {
        if (userMarker) {
            mymap.removeLayer(userMarker);
        }
        userMarker = L.marker(e.latlng, { icon: userIcon }).addTo(mymap);
        mymap.setView(e.latlng, 16);
    }

    function onLocationError(e) {
        alert('Erreur de géolocalisation: ' + e.message);
    }

    function locateUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                onLocationFound({ latlng: L.latLng(lat, lng) });
            }, onLocationError, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    }

    // Essayer de localiser l'utilisateur dès le chargement de la page
    locateUser();

    document.getElementById('locate-button').onclick = function() {
        locateUser();
    };

    mymap.on('click', function(e) {
        var form = document.getElementById('popup-form');
        var overlay = document.getElementById('overlay');
        var formBounds = form.getBoundingClientRect();
        var mapBounds = document.getElementById('mapid').getBoundingClientRect();

        form.style.left = (e.originalEvent.clientX - formBounds.width / 2) + 'px';
        form.style.top = (e.originalEvent.clientY - formBounds.height / 2) + 'px';

        form.style.display = 'block';
        overlay.style.display = 'block';

        document.getElementById('spot-form').onsubmit = function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const note = document.getElementById('note').value;
            const photo = document.getElementById('photo').files[0];
            const token = localStorage.getItem('token');

            const formData = new FormData();
            formData.append('nom', name);
            formData.append('lat', e.latlng.lat);
            formData.append('lng', e.latlng.lng);
            formData.append('note', note);
            formData.append('photo', photo);

            fetch('http://localhost:3000/points', {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Vous devez être connecté pour ajouter des points') {
                    alert('Vous devez être connecté pour ajouter des points');
                } else {
                    var marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: spotIcon }).addTo(spotsLayer);
                    marker.bindPopup(`<b>${name}</b><br>${note}<br><img src="${data.photo}" style="width: 100px;">`);
                    form.style.display = 'none';
                    overlay.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
        };

        document.querySelector('#popup-form .cancel').onclick = function() {
            form.style.display = 'none';
            overlay.style.display = 'none';
        };
    });

    document.getElementById('overlay').onclick = function() {
        document.getElementById('popup-form').style.display = 'none';
        this.style.display = 'none';
    };

    // Chargement des points existants
    fetch('http://localhost:3000/points')
        .then(response => response.json())
        .then(data => {
            data.forEach(point => {
                var marker = L.marker([point.lat, point.lng], { icon: spotIcon }).addTo(spotsLayer);
                marker.bindPopup(`<b>${point.nom}</b><br>${point.note}<br><img src="${point.photo}" style="width: 100px;">`);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});
