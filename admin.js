import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// 🔥 Configuração do Firebase (SUBSTITUA COM SEUS DADOS)
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

// 🔥 Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Carregar registros ao iniciar
document.addEventListener("DOMContentLoaded", carregarRegistros);

function adicionarRegistro() {
    const predio = document.getElementById("predio").value;
    const andar = document.getElementById("andar").value;
    const sala = document.getElementById("sala").value;
    const curso = document.getElementById("curso").value;
    const disciplina = document.getElementById("disciplina").value;
    const docente = document.getElementById("docente").value;
    const horario = document.getElementById("horario").value;

    if (!predio || !andar || !sala || !curso || !disciplina || !docente || !horario) {
        alert("Preencha todos os campos!");
        return;
    }

    db.collection("salas").add({
        predio, andar, sala, curso, disciplina, docente, horario
    }).then(() => {
        carregarRegistros();
    }).catch((error) => {
        console.error("Erro ao adicionar documento: ", error);
    });
}

function carregarRegistros() {
    const lista = document.getElementById("listaRegistros");
    lista.innerHTML = "";

    db.collection("salas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const li = document.createElement("li");
            li.classList = "border-b py-2 flex justify-between items-center";
            li.innerHTML = `
                <div>
                    <strong>${item.predio} - ${item.sala}</strong><br>
                    Curso: ${item.curso} | Disciplina: ${item.disciplina}<br>
                    Docente: ${item.docente} | Horário: ${item.horario}
                </div>
                <button onclick="removerRegistro('${doc.id}')" class="text-red-500 text-sm ml-2">Excluir</button>
            `;
            lista.appendChild(li);
        });
    }).catch((error) => {
        console.error("Erro ao carregar documentos: ", error);
    });
}

function removerRegistro(id) {
    db.collection("salas").doc(id).delete().then(() => {
        carregarRegistros();
    }).catch((error) => {
        console.error("Erro ao excluir documento: ", error);
    });
}
