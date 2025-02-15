const dadosUniAnchieta = {
    "Prédio A": {
        lat: -23.202500, lng: -46.890700, andares: {
            "Térreo": { salas: {
                "101": { tipo: "Sala de Aula", cursos: {
                    "Engenharia Civil": { coordenador: "Prof. João Silva", disciplinas: {
                        "Cálculo I": { docente: "Prof. Maria Santos", horario: "08:00 - 10:00", dias: ["Segunda", "Quarta"] }
                    }}
                }}
            }}
        }
    },
    "Prédio B": { lat: -23.202700, lng: -46.891000, andares: {} }
};

let userLat, userLng;
let map, directionsService, directionsRenderer;

// Inicializa o mapa
function initMap(lat = -23.2025, lng = -46.8907) {
    map = new google.maps.Map(document.getElementById("map"), { center: { lat, lng }, zoom: 17 });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

// Busca um destino digitado pelo usuário
function buscarDestino() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();
    let resultado = null;
    let predioDestino = null;

    for (const [predio, info] of Object.entries(dadosUniAnchieta)) {
        for (const [andar, salas] of Object.entries(info.andares || {})) {
            for (const [sala, dadosSala] of Object.entries(salas.salas || {})) {
                if (sala === termo || dadosSala.tipo.toLowerCase().includes(termo)) {
                    resultado = { predio, andar, sala, ...dadosSala };
                    predioDestino = info;
                }
                for (const [curso, dadosCurso] of Object.entries(dadosSala.cursos || {})) {
                    for (const [disciplina, dadosDisc] of Object.entries(dadosCurso.disciplinas || {})) {
                        if (disciplina.toLowerCase().includes(termo) || dadosDisc.docente.toLowerCase().includes(termo)) {
                            resultado = { predio, andar, sala, curso, disciplina, ...dadosDisc };
                            predioDestino = info;
                        }
                    }
                }
            }
        }
    }

    if (resultado) {
        document.getElementById("infoRota").innerText = `Indo para ${resultado.predio}, ${resultado.andar}, Sala ${resultado.sala}`;
        document.getElementById("infoAula").innerText = resultado.disciplina ? 
            `Aula: ${resultado.disciplina} com ${resultado.docente} às ${resultado.horario}` : "";
        
        traçarRota(predioDestino.lat, predioDestino.lng);
    } else {
        document.getElementById("destinoMsg").innerText = "Nenhum resultado encontrado.";
    }
}

// Traça a rota até o prédio correto
function traçarRota(destLat, destLng) {
    if (!userLat || !userLng) {
        document.getElementById("destinoMsg").innerText = "Localização não detectada.";
        return;
    }
    
    const request = { origin: { lat: userLat, lng: userLng }, destination: { lat: destLat, lng: destLng }, travelMode: 'WALKING' };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') directionsRenderer.setDirections(result);
    });
}

// Abre a página de administração
function abrirAdmin() {
    window.location.href = "admin.html";
}
