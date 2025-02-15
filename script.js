// Coordenadas aproximadas das áreas da UniAnchieta
const areasUniAnchieta = [
    { nome: "Bloco A", lat: -23.202500, lng: -46.890700 },
    { nome: "Bloco B", lat: -23.202700, lng: -46.891000 },
    { nome: "Biblioteca", lat: -23.203000, lng: -46.890800 },
    { nome: "Estacionamento", lat: -23.203500, lng: -46.891500 }
];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerText = "Geolocalização não suportada pelo seu navegador.";
    }
}

function showPosition(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    let areaMaisProxima = "Fora da UniAnchieta";
    let menorDistancia = Infinity;

    areasUniAnchieta.forEach(area => {
        const distancia = calcularDistancia(userLat, userLng, area.lat, area.lng);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            areaMaisProxima = area.nome;
        }
    });

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

// Inicializa o mapa do Google Maps
function initMap(lat = -23.2025, lng = -46.8907) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 17
    });

    new google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Sua Localização"
    });

    // Marcar áreas da UniAnchieta
    areasUniAnchieta.forEach(area => {
        new google.maps.Marker({
            position: { lat: area.lat, lng: area.lng },
            map,
            title: area.nome,
            icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
    });
}
