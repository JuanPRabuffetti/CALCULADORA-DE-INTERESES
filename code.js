function agregarCheque() {
    let chequesContainer = document.getElementById('chequesContainer');
    let nuevoCheque = document.createElement('div');
    nuevoCheque.classList.add('cheque');
    nuevoCheque.innerHTML = `
        <label>Monto del cheque:</label>
        <input type="number" class="montoCheque" placeholder="Monto">
        <label>Fecha del préstamo:</label>
        <input type="date" class="fechaPrestamo">
        <label>Fecha de vencimiento:</label>
        <input type="date" class="fechaVencimiento">
    `;
    chequesContainer.appendChild(nuevoCheque);
}

function calcularIntereses() {
    let tasaInteres = parseFloat(document.getElementById('tasaInteresGlobal').value);
    if (isNaN(tasaInteres) || tasaInteres <= 0) {
        alert("Por favor, ingrese una tasa de interés válida.");
        return;
    }

    let cheques = document.getElementsByClassName('cheque');
    let totalInteres = 0;

    for (let cheque of cheques) {
        let montoCheque = parseFloat(cheque.querySelector('.montoCheque').value);
        let fechaPrestamo = cheque.querySelector('.fechaPrestamo').value;
        let fechaVencimiento = cheque.querySelector('.fechaVencimiento').value;

        if (isNaN(montoCheque) || !fechaPrestamo || !fechaVencimiento) {
            alert("Por favor, ingrese valores válidos en todos los campos de los cheques.");
            return;
        }

        let fechaInicio = new Date(fechaPrestamo);
        let fechaFin = new Date(fechaVencimiento);
        let diferenciaEnMilisegundos = fechaFin - fechaInicio;
        let dias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

        dias = dias < 15 ? 15 : dias;
        let interes = (montoCheque * (tasaInteres / 100)) / 30 * dias;

        totalInteres += interes;
    }

    document.getElementById('resultado').innerText = "El interés total calculado es: $" + totalInteres.toFixed(2);
}