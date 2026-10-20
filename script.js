/* =========================
   BOTÓN PRINCIPAL
========================= */

function mostrarMensaje() {
    document.getElementById("nosotros").scrollIntoView({ behavior: "smooth" });
}


/* =========================
   TARJETAS "VER MÁS"
========================= */

const detalles = {
    "Dante": "Hijo del demonio Sparda y de la humana Eva, Dante es el protagonista de la saga. Usa la espada Rebellion y las pistolas Ebony e Ivory, y se distingue por su humor y su amor por la pizza.",
    "Devil Trigger": "Es la forma demoníaca de Dante, Vergil y Nero. Al activarla aumentan su fuerza, su velocidad y su resistencia, y cada personaje tiene su propia apariencia.",
    "Estilo": "El sistema de estilo puntúa tus combos de D a SSS. Cuanto más variados sean tus ataques y menos daño recibas, más alto será el rango."
};

function mostrarServicio(nombre) {
    abrirModal(nombre, "Devil May Cry", detalles[nombre] || "", "");
}


/* =========================
   GALERÍA INTERACTIVA
========================= */

function ampliarImagen(img) {
    abrirModal(
        img.dataset.titulo,
        "Lanzamiento: " + img.dataset.anio,
        img.dataset.historia,
        img.src
    );
}

function abrirModal(titulo, anio, historia, imagen) {
    const modal = document.getElementById("modal");
    const imgModal = document.getElementById("modal-imagen");

    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-anio").textContent = anio;
    document.getElementById("modal-historia").textContent = historia;

    // Si no hay imagen (tarjetas), se oculta
    if (imagen) {
        imgModal.src = imagen;
        imgModal.alt = titulo;
        imgModal.style.display = "block";
    } else {
        imgModal.style.display = "none";
    }

    modal.classList.add("activo");
}

function cerrarModal(evento) {
    // Solo cierra si se hace clic en el fondo o en el botón ✕
    if (!evento || evento.target.id === "modal" || evento.target.classList.contains("modal-cerrar")) {
        document.getElementById("modal").classList.remove("activo");
    }
}

// Cerrar con la tecla Escape
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        document.getElementById("modal").classList.remove("activo");
    }
});


/* =========================
   FORMULARIO
========================= */

function enviarFormulario(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;

    alert("¡Gracias, " + nombre + "! Tu opinión sobre Devil May Cry fue recibida.");

    evento.target.reset();
}
