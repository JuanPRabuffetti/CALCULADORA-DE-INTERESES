function calcularInteres() {
    // Obtener valores del usuario
    let montoCheque = parseFloat(prompt("Ingrese el monto del cheque:"));
    let tasaInteres = parseFloat(prompt("Ingrese la tasa de interés (en porcentaje):"));
    let fechaPrestamo = prompt("Ingrese la fecha del préstamo (YYYY-MM-DD):");
    let fechaVencimiento = prompt("Ingrese la fecha de vencimiento (YYYY-MM-DD):");

    // Validar que los valores sean correctos
    if (isNaN(montoCheque) || isNaN(tasaInteres) || !fechaPrestamo || !fechaVencimiento) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    // Convertir las fechas a objetos Date
    let fechaInicio = new Date(fechaPrestamo);
    let fechaFin = new Date(fechaVencimiento);

    // Calcular la diferencia en días
    let diferenciaEnMilisegundos = fechaFin - fechaInicio;
    let dias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días

    // Aplicar la regla de interés mínimo de 15 días
    dias = dias < 15 ? 15 : dias;

    // Calcular el interés
    let interes = (montoCheque * (tasaInteres / 100)) / 30 * dias;

    // Mostrar el resultado
    alert("El interés calculado es: $" + interes.toFixed(2));
}