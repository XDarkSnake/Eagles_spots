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
        iconUrl: 'marqeur_jaune.png', // Assurez-vous que l'URL est correcte
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

    document.getElementById('locate-button').onclick = function() {
        locateUser();
    };

    mymap.on('click', function(e) {
        var form = document.getElementById('popup-form');
        var overlay = document.getElementById('overlay');
        form.style.display = 'block';
        overlay.style.display = 'block';

        var tempMarker = L.marker(e.latlng, { icon: spotIcon }).addTo(spotsLayer);

        document.querySelector('.banner').onclick = function() {
            document.getElementById('photo').click();
        };

        document.getElementById('spot-form').onsubmit = function(event) {
            event.preventDefault();
            var name = document.getElementById('name').value;
            var note = document.getElementById('note').value;
            var photo = document.getElementById('photo').files[0];

            var formData = new FormData();
            formData.append('nom', name);
            formData.append('lat', e.latlng.lat);
            formData.append('lng', e.latlng.lng);
            formData.append('note', note);
            if (photo) {
                formData.append('photo', photo);
            }

            fetch('/points', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                tempMarker.bindPopup('<b>' + data.nom + '</b><br>' + data.note).openPopup();
            })
            .catch(error => {
                console.error('Erreur:', error);
            });

            form.style.display = 'none';
            overlay.style.display = 'none';
            document.getElementById('spot-form').reset();
        };

        document.querySelector('.cancel').onclick = function() {
            form.style.display = 'none';
            overlay.style.display = 'none';
            document.getElementById('spot-form').reset();
            spotsLayer.removeLayer(tempMarker);
        };

        overlay.onclick = function() {
            form.style.display = 'none';
            overlay.style.display = 'none';
            document.getElementById('spot-form').reset();
            spotsLayer.removeLayer(tempMarker);
        };
    });

    fetch('/points')
        .then(response => response.json())
        .then(data => {
            data.forEach(point => {
                var marker = L.marker([point.lat, point.lng], { icon: spotIcon }).addTo(spotsLayer);
                var popupContent = '<b>' + point.nom + '</b><br>' + point.note;
                if (point.photo) {
                    popupContent += '<br><img src="' + point.photo + '" alt="Photo" style="width: 100px; height: auto;">';
                }
                marker.bindPopup(popupContent);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});
