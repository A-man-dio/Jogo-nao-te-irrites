function confirmarSelecao() {
    const selectElement = document.getElementById('numeroJogadores');
    const selectedValue = selectElement.value;

    if (selectedValue === "") {
        alert("Por favor, selecione o número de jogadores.");
        return false; // Impede a navegação
    } else {
        // Armazene o valor selecionado ou execute outras ações necessárias
        console.log("Número de jogadores selecionado: " + selectedValue);
        localStorage.setItem('numeroJogadores', selectedValue);
        return true; // Permite a navegação
    }
}

document.getElementById("btnConfirmar").addEventListener('click', function (event) {
    event.preventDefault();
    if (confirmarSelecao()) {
        window.location.href = "paginaInicial.html";
    }
});
