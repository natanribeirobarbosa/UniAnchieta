// Configuração do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmsaehyPzmtmJr5Tvl0snt5wgsnnxw8Ps",
  authDomain: "unianchieta-a83bd.firebaseapp.com",
  databaseURL: "https://unianchieta-a83bd-default-rtdb.firebaseio.com",
  projectId: "unianchieta-a83bd",
  storageBucket: "unianchieta-a83bd.firebasestorage.app",
  messagingSenderId: "566413683292",
  appId: "1:566413683292:web:0b274aaf669269c7041499",
  measurementId: "G-G8DGTH92FJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let map, directionsService, directionsRenderer;

function initMap(lat = -23.2025, lng = -46.8907) {
    map = new google.maps.Map(document.getElementById("map"), { center: { lat, lng }, zoom: 17 });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

async function buscarDestino() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();
    const listaRef = collection(db, "salas");
    const q = query(listaRef, where("keywords", "array-contains", termo));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        document.getElementById("destinoMsg").innerText = "Nenhum resultado encontrado.";
        return;
    }

    let resultado;
    snapshot.forEach(doc => {
        resultado = doc.data();
    });

    document.getElementById("infoRota").innerText = `Indo para ${resultado.predio}, ${resultado.andar}, Sala ${resultado.sala}`;
    document.getElementById("infoAula").innerText = resultado.disciplina ? 
        `Aula: ${resultado.disciplina} com ${resultado.docente} às ${resultado.horario}` : "";
    
    traçarRota(resultado.lat, resultado.lng);
}

function traçarRota(destLat, destLng) {
    if (!navigator.geolocation) {
        document.getElementById("destinoMsg").innerText = "Localização não suportada pelo navegador.";
        return;
    }
    
    navigator.geolocation.getCurrentPosition(position => {
        const request = {
            origin: { lat: position.coords.latitude, lng: position.coords.longitude },
            destination: { lat: destLat, lng: destLng },
            travelMode: 'WALKING'
        };
        directionsService.route(request, (result, status) => {
            if (status === 'OK') directionsRenderer.setDirections(result);
        });
    }, () => {
        document.getElementById("destinoMsg").innerText = "Não foi possível obter sua localização.";
    });
}

function abrirAdmin() {
    window.location.href = "admin.html";
}
