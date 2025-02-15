// Carregar os registros salvos ao abrir a página
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

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    
    registros.push({ predio, andar, sala, curso, disciplina, docente, horario });
    
    localStorage.setItem("registros", JSON.stringify(registros));

    carregarRegistros();  // Atualiza a lista na tela
}

function carregarRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    const lista = document.getElementById("listaRegistros");
    
    lista.innerHTML = "";
    registros.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList = "border-b py-2";
        li.innerHTML = `
            <strong>${item.predio} - ${item.sala}</strong><br>
            Curso: ${item.curso} | Disciplina: ${item.disciplina}<br>
            Docente: ${item.docente} | Horário: ${item.horario}
            <button onclick="removerRegistro(${index})" class="text-red-500 text-sm ml-2">Excluir</button>
        `;
        lista.appendChild(li);
    });
}

function removerRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    
    registros.splice(index, 1);
    
    localStorage.setItem("registros", JSON.stringify(registros));
    
    carregarRegistros();
}
