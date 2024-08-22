let listaCheques = [];

function agregarCheque() {
    // Obtener los valores del formulario
    let montoCheque = parseFloat(document.getElementById('montoCheque').value);
    let fechaPrestamo = document.getElementById('fechaPrestamo').value;
    let fechaVencimiento = document.getElementById('fechaVencimiento').value;

    // Validar que los valores estén correctos
    if (isNaN(montoCheque) || !fechaPrestamo || !fechaVencimiento) {
        alert("Por favor, ingrese valores válidos en todos los campos del cheque.");
        return;
    }

    // Guardar el cheque en la lista
    listaCheques.push({
        monto: montoCheque,
        fechaPrestamo: fechaPrestamo,
        fechaVencimiento: fechaVencimiento
    });

    // Limpiar el formulario
    document.getElementById('montoCheque').value = '';
    document.getElementById('fechaPrestamo').value = '';
    document.getElementById('fechaVencimiento').value = '';

    // Actualizar la lista visual de cheques ingresados
    actualizarChequesIngresados();
}

function actualizarChequesIngresados() {
    let chequesContainer = document.getElementById('chequesIngresados');
    chequesContainer.innerHTML = '';

    listaCheques.forEach((cheque, index) => {
        let chequeDiv = document.createElement('div');
        chequeDiv.classList.add('cheque');
        chequeDiv.innerHTML = `
            <p>Cheque ${index + 1}:</p>
            <p>Monto: $${cheque.monto}</p>
            <p>Fecha del préstamo: ${cheque.fechaPrestamo}</p>
            <p>Fecha de vencimiento: ${cheque.fechaVencimiento}</p>
        `;
        chequesContainer.appendChild(chequeDiv);
    });
}

function calcularIntereses() {
    let tasaInteres = parseFloat(document.getElementById('tasaInteresGlobal').value);
    if (isNaN(tasaInteres) || tasaInteres <= 0) {
        alert("Por favor, ingrese una tasa de interés válida.");
        return;
    }

    let totalInteres = 0;

    listaCheques.forEach(cheque => {
        let fechaInicio = new Date(cheque.fechaPrestamo);
        let fechaFin = new Date(cheque.fechaVencimiento);
        let diferenciaEnMilisegundos = fechaFin - fechaInicio;
        let dias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

        dias = dias < 15 ? 15 : dias;
        let interes = (cheque.monto * (tasaInteres / 100)) / 30 * dias;

        totalInteres += interes;
    });

    document.getElementById('resultado').innerText = "El interés total calculado es: $" + totalInteres.toFixed(2);
}

function generarPDF() {
    if (listaCheques.length === 0) {
        alert("No hay cheques para generar el PDF.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Lista de Cheques", 10, 10);

    let y = 20;
    listaCheques.forEach((cheque, index) => {
        doc.setFontSize(12);
        doc.text(`Cheque ${index + 1}:`, 10, y);
        doc.text(`Monto: $${cheque.monto}`, 10, y + 10);
        doc.text(`Fecha de Préstamo: ${cheque.fechaPrestamo}`, 10, y + 20);
        doc.text(`Fecha de Vencimiento: ${cheque.fechaVencimiento}`, 10, y + 30);
        y += 40;
    });

    doc.save("lista_cheques.pdf");
}
