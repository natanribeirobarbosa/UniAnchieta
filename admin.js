// Importando o Firebase corretamente pelo CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);

// Inicializa o Firestore apenas uma vez
//const db = getFirestore(app);

// Não é necessário chamar initializeFirestore aqui, já que getFirestore() já cuida disso
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: true
});

// Função para carregar registros corretamente
/*async function carregarRegistros() {
  try {
    const querySnapshot = await getDocs(collection(db, "clientes"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Erro ao carregar registros:", error);
  }
}

// Espera o DOM carregar antes de executar
document.addEventListener("DOMContentLoaded", carregarRegistros);
*/
// Função para adicionar registros
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

// Função para remover registros
function removerRegistro(id) {
    db.collection("salas").doc(id).delete().then(() => {
        carregarRegistros();
    }).catch((error) => {
        console.error("Erro ao excluir documento: ", error);
    });
}
