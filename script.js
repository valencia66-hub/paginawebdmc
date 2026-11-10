let carrito = [];

// FORMATO DE PRECIOS COLOMBIANOS

function formatoPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

// AGREGAR PRODUCTOS AL CARRITO

function agregarAlCarrito(nombre, precio) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    actualizarCarrito();

    alert(nombre + " agregado al carrito");
}

// ACTUALIZAR CARRITO

function actualizarCarrito() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, index) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        cantidadTotal += producto.cantidad;

        // CONTENEDOR DEL PRODUCTO

        const item = document.createElement("div");
        item.className = "cart-item";

        // INFORMACIÓN

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = formatoPrecio(subtotal);

        info.appendChild(nombre);
        info.appendChild(precio);

        // BOTONES DE CANTIDAD

        const acciones = document.createElement("div");
        acciones.className = "cart-item-actions";

        const disminuir = document.createElement("button");
        disminuir.textContent = "-";

        disminuir.onclick = function () {
            cambiarCantidad(index, -1);
        };

        const cantidad = document.createElement("span");
        cantidad.textContent = producto.cantidad;

        const aumentar = document.createElement("button");
        aumentar.textContent = "+";

        aumentar.onclick = function () {
            cambiarCantidad(index, 1);
        };

        // ELIMINAR PRODUCTO

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.className = "remove-button";

        eliminar.onclick = function () {
            eliminarProducto(index);
        };

        acciones.appendChild(disminuir);
        acciones.appendChild(cantidad);
        acciones.appendChild(aumentar);
        acciones.appendChild(eliminar);

        item.appendChild(info);
        item.appendChild(acciones);

        cartItems.appendChild(item);

    });

    cartTotal.textContent = formatoPrecio(total);
    cartCount.textContent = cantidadTotal;

    document.getElementById("payment-total").textContent =
        formatoPrecio(total);

}

// CAMBIAR CANTIDAD

function cambiarCantidad(index, cambio) {

    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {

        carrito.splice(index, 1);

    }

    actualizarCarrito();

}

// ELIMINAR PRODUCTO

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}

// MOSTRAR CARRITO

function mostrarCarrito() {

    document.getElementById("cart-modal").style.display = "block";

}

// CERRAR CARRITO

function cerrarCarrito() {

    document.getElementById("cart-modal").style.display = "none";

}

// ABRIR PASARELA DE PAGO

function abrirPasarela() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío");

        return;

    }

    document.getElementById("payment-modal").style.display = "block";

    document.getElementById("payment-total").textContent =
        document.getElementById("cart-total").textContent;

}

// CERRAR PASARELA

function cerrarPasarela() {

    document.getElementById("payment-modal").style.display = "none";

}

// CONFIRMAR COMPRA SIMULADA

document.getElementById("payment-form").addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const metodo = document.getElementById("metodo").value;

    if (carrito.length === 0) {

        alert("Tu carrito está vacío");

        return;

    }

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );

    alert(
        "¡COMPRA SIMULADA EXITOSA!\n\n" +
        "Cliente: " + nombre + "\n" +
        "Correo: " + correo + "\n" +
        "Método de pago: " + metodo + "\n" +
        "Total: " + formatoPrecio(total) +
        "\n\nEste proyecto no realiza pagos reales."
    );

    // VACÍAR CARRITO

    carrito = [];

    actualizarCarrito();

    // LIMPIAR FORMULARIO

    document.getElementById("payment-form").reset();

    // CERRAR VENTANAS

    cerrarPasarela();
    cerrarCarrito();

});

// INICIALIZAR CARRITO

actualizarCarrito();
