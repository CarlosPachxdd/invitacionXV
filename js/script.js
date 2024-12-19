// Iniciar el carrusel usando Slick
document.addEventListener('DOMContentLoaded', function () {
    var myCarousel = new bootstrap.Carousel('#carouselExample', {
      interval: 3000, // Cambia cada 3 segundos
      pause: 'hover' // Se pausa al pasar el ratón
    });
  });

document.getElementById('confirmForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const asistira = document.getElementById('asistira').value;
    const nombre = document.getElementById('nombre').value.trim();
    const invitados = parseInt(document.getElementById('invitados').value);

    if (nombre === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    if (isNaN(invitados) || invitados < 0 || invitados > 4) {
        alert('El número de acompañantes debe estar entre 0 y 4.');
        return;
    }

    // Guardar la información (esto requiere un backend)
    // Por ejemplo, podrías enviar una solicitud POST a tu servidor
    // Aquí simularemos el guardado en una lista local

    // Obtener la lista actual de invitados desde el almacenamiento local
    let listaInvitados = JSON.parse(localStorage.getItem('listaInvitados')) || [];

    // Agregar el nuevo invitado a la lista
    listaInvitados.push({
        asistira,
        nombre,
        invitados
    });

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem('listaInvitados', JSON.stringify(listaInvitados));

    alert('¡Gracias por confirmar tu asistencia!');

    // Generar PDF de la lista de invitados
    generarPDF(listaInvitados);

    // Resetear el formulario
    document.getElementById('confirmForm').reset();
});

function generarPDF(listaInvitados) {
    // Verificar que jsPDF esté disponible
    if (typeof window.jspdf === 'undefined') {
        alert('No se pudo generar el PDF.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Lista de Invitados', 10, 10);

    doc.setFontSize(12);
    let y = 20;
    listaInvitados.forEach((inv, index) => {
        doc.text(`${index + 1}. ${inv.nombre} - Acompañantes: ${inv.invitados} - Asistirá: ${inv.asistira}`, 10, y);
        y += 10;
        if (y > 280) { // Crear nueva página si se supera el espacio
            doc.addPage();
            y = 10;
        }
    });

    // Descargar el PDF (en lugar de enviarlo por correo)
    doc.save('lista_invitados.pdf');

    // **Nota:** Para enviar el PDF por correo, necesitas un backend que reciba la información y realice el envío.
}


  const fechaObjetivo = new Date("Jan 1, 2025 00:00:00").getTime();  // Ajusta la fecha de tu fiesta

  const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById("diasTiempo").innerHTML = dias < 10 ? "0" + dias : dias;
    document.getElementById("horasTiempo").innerHTML = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutosTiempo").innerHTML = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundosTiempo").innerHTML = segundos < 10 ? "0" + segundos : segundos;

    if (diferencia < 0) {
      clearInterval(intervalo);
      document.getElementById("tiempo").innerHTML = "¡Es hora de la fiesta!";
    }
  }, 1000);

