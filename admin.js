<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administração - UniAnchieta</title>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>
    <script src="admin.js" defer></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="flex flex-col items-center bg-gray-100 h-screen p-6">
    <h1 class="text-2xl font-bold mb-4">Painel de Administração</h1>

    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
        <label class="block font-semibold">Prédio:</label>
        <input type="text" id="predio" class="border w-full p-2 mb-3" placeholder="Ex: Prédio A">

        <label class="block font-semibold">Andar:</label>
        <input type="text" id="andar" class="border w-full p-2 mb-3" placeholder="Ex: 1º Andar">

        <label class="block font-semibold">Sala:</label>
        <input type="text" id="sala" class="border w-full p-2 mb-3" placeholder="Ex: 101">

        <label class="block font-semibold">Curso:</label>
        <input type="text" id="curso" class="border w-full p-2 mb-3" placeholder="Ex: Engenharia Civil">

        <label class="block font-semibold">Disciplina:</label>
        <input type="text" id="disciplina" class="border w-full p-2 mb-3" placeholder="Ex: Cálculo I">

        <label class="block font-semibold">Docente:</label>
        <input type="text" id="docente" class="border w-full p-2 mb-3" placeholder="Ex: Prof. João Silva">

        <label class="block font-semibold">Horário:</label>
        <input type="text" id="horario" class="border w-full p-2 mb-3" placeholder="Ex: 08:00 - 10:00">

        <button onclick="adicionarRegistro()" class="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-700">
            Adicionar
        </button>
    </div>

    <h2 class="text-xl font-bold mt-6">Dados Cadastrados</h2>
    <ul id="listaRegistros" class="mt-3 w-full max-w-md bg-white p-4 shadow-md rounded"></ul>

    <button onclick="window.location.href='index.html'" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Voltar ao Mapa
    </button>
</body>
</html>
