// Coordenadas aproximadas das áreas da UniAnchieta
const areasUniAnchieta = {
    "Bloco A": { lat: -23.202500, lng: -46.890700 },
    "Bloco B": { lat: -23.202700, lng: -46.891000 },
    "Biblioteca": { lat: -23.203000, lng: -46.890800 },
    "Estacionamento": { lat: -23.203500, lng: -46.891500 }
};

let userLat, userLng;
let map, directionsService, directionsRenderer;

// Obtém a localização do usuário
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerText = "Geolocalização não suportada.";
    }
}

function showPosition(position) {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;

    let areaMaisProxima = "Fora da UniAnchieta";
    let menorDistancia = Infinity;

    for (const [nome, coords] of Object.entries(areasUniAnchieta)) {
        const distancia = calcularDistancia(userLat, userLng, coords.lat, coords.lng);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            areaMaisProxima = nome;
        }
    }

    document.getElementById("location").innerText = `Você está em: ${areaMaisProxima}`;
    initMap(userLat, userLng);
}

function showError(error) {
    let message;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Permissão negada. Ative a localização.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Localização indisponível.";
            break;
        case error.TIMEOUT:
            message = "Tempo de solicitação esgotado.";
            break;
        default:
            message = "Erro desconhecido.";
    }
    document.getElementById("location").innerText = message;
}

// Função para calcular distância entre dois pontos geográficos (Haversine)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Inicializa o mapa e os serviços de rotas
function initMap(lat = -23.2025, lng = -46.8907) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 17
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    new google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Sua Localização"
    });

    // Marcar áreas da UniAnchieta
    for (const [nome, coords] of Object.entries(areasUniAnchieta)) {
        new google.maps.Marker({
            position: coords,
            map,
            title: nome,
            icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
    }
}

// Busca o destino digitado e traça uma rota
function buscarDestino() {
    const destinoNome = document.getElementById("destino").value;
    const destinoCoords = areasUniAnchieta[destinoNome];

    if (!destinoCoords) {
        document.getElementById("destinoMsg").innerText = "Destino não encontrado. Tente: Biblioteca, Bloco A, Bloco B, Estacionamento.";
        return;
    }

    if (!userLat || !userLng) {
        document.getElementById("destinoMsg").innerText = "Localização não detectada. Clique em 'Detectar Localização' primeiro.";
        return;
    }

    document.getElementById("destinoMsg").innerText = "";

    const request = {
        origin: { lat: userLat, lng: userLng },
        destination: destinoCoords,
        travelMode: 'WALKING'
    };

    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            document.getElementById("destinoMsg").innerText = "Erro ao calcular rota.";
        }
    });
}
