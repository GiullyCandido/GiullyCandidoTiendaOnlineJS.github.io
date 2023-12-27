'use strict';

/*
  Candido Machado Giully
 */

let productos = [
    {
        id: 1,
        nombre: 'Iphone 15 Pro',
        descripcion: 'El iPhone 15 Pro es el primer iPhone diseñado con titanio de calidad aeroespacial, la misma aleación que se usa en las naves espaciales enviadas a Marte. Chip A17 Pro. La bestia del gaming.',
        precio: 2000000,
        imagen: 'IMG/iphone-15.jpg',
        categoría: 'Smartphone',
    },
    {
        id: 2,
        nombre: 'Samsung Galaxy Z Flip5',
        descripcion: 'Samsung Galaxy Z Flip 5: Una combinación perfecta en la vida y en tu bolsillo. Una Flex Window que puedes personalizar. Una cámara que captura selfies desde ángulos difíciles. Más, una batería resistente.',
        precio: 724999,
        imagen: 'IMG/samsung.jpg',
        categoría: 'Smartphone',
    },
    {
        id: 3,
        nombre: 'Samsung Galaxy Tab S9 Ultra',
        descripcion: 'El Samsung Galaxy Tab S9 Ultra se mueve bajo el SoC Snapdragon 8 Gen 2 acompañado de hasta 16 GB de memoria RAM en combinación con memoria interna de 1 TB ampliable vía tarjetas microSD. Únele los 120 Hz de la pantalla y todo fluye sin tirones ni sensación de no ir desahogado a nivel de potencia bruta',
        precio: 1209999,
        imagen: 'IMG/tab.jpg',
        categoría: 'Tablet',
    },
    {
        id: 4,
        nombre: 'iPad Pro',
        descripcion: 'El iPad Pro tiene un rendimiento extraordinario, pantallas increíblemente avanzadas, conexión inalámbrica ultrarrápida, nuevas y poderosas funcionalidades con iPadOS 16 y un toque de magia para el Apple Pencil. El iPad en su máxima expresión.',
        precio: 3209000,
        imagen: 'IMG/Ipad.jpg',
        categoría: 'Tablet',
    },
    {
        id: 5,
        nombre: 'AirPods Pro 2.ª generación',
        descripcion: 'AirPods Pro 2.ª generación: Hasta 2 veces más Cancelación Activa de Ruido. El modo Ambiente te permite escuchar el mundo que te rodea. El nuevo Audio Adaptativo personaliza el control de ruido según tu entorno. El Audio Espacial lleva la experiencia del sonido inmersivo a un nivel mucho más personal. Y con una sola carga puedes disfrutar 6 horas de batería.',
        precio: 270000,
        imagen: 'IMG/AirPods-Pro.jpg',
        categoría: 'Auriculares',
    },
    {
        id: 6,
        nombre: 'JBL Live Pro 2 TWS',
        descripcion: 'JBL Live Pro 2 TWS: Sonido emblemático JBL. No hay nada mejor que disfrutar de música y llamadas nítidas gracias a los drivers dinámicos de 11 mm con el sonido emblemático de JBL.',
        precio: 119999,
        imagen: 'IMG/jbl.jpg',
        categoría: 'Auriculares',
    },
];

//Creo un array para almacenar los productos que fueran agregados al carrito 
let productosAgregadosAlCarrito = [];

//Declaro un funcion para borrar el contenido del array cuando sea llamada 
function borrarContenidoDelCarrito() {
    productosAgregadosAlCarrito = []; // Le asigno un nuevo array vacío al arreglo original
}

//contador numero de itens en el carrito
let contador = 0;

//array conteo productos repetidos en el carrito
let conteoProductos = {};

//Estabelezco el contenedor donde se va a mostrar los productos
let contenedorProductos = document.getElementById('lista-productos');

// Establecer el contenedor donde se van a mostrar los productos filtrados
let productosContainer = document.getElementById('lista-productos');

//Declaro la funcion para calcular el precio total
function precioTotal() {
    let sumaPrecios = 0;

    // Iterar los productos en "productosAgregadosAlCarrito"
    for (const producto of productosAgregadosAlCarrito) {
        // Obtener la cantidad del producto desde "conteoProductos"
        const cantidad = conteoProductos[producto.id]; 

        // Multiplicar el precio por la cantidad y sumar al total
        sumaPrecios += producto.precio * cantidad;
    }

    return sumaPrecios;
}

function logicaAgregarAlCarrito(){
    //sumo en el contador
    contador ++;
    let minicarrito = document.getElementById("minicarrito");
    let primerHijoMinicarrito = minicarrito.firstElementChild;
    primerHijoMinicarrito.querySelector("span").textContent = `${contador}`;
    //Precio del carrito
    //almaceno el valor obtenido en la funcion en la variable
    let sumaPrecios = precioTotal();
    let segundoHijoMinicarrito = minicarrito.children[1];
    segundoHijoMinicarrito.querySelector("span").textContent = `${sumaPrecios}`;
}

//Creo los elementos en el DOM de forma dinamica con un ForEach
productos.forEach(iterarProd => {
   
    let productoDiv = document.createElement('div');
    //agrego una clase html
    productoDiv.classList.add("producto", "mb-3", "pb-2", "row", "w-50", "border", "px-5",);

    let tituloIt = document.createElement("h1");
    tituloIt.textContent = iterarProd.nombre;
    tituloIt.classList.add("font-weight-bold", "fs-2" );

    let imagenIt = document.createElement("img");
    imagenIt.src = iterarProd.imagen;
    imagenIt.alt = iterarProd.nombre;
    imagenIt.classList.add("img-fluid", "w-100");

    // Agrega evento click para mostrar la imagen ampliada
    imagenIt.addEventListener('click', function() {
        mostrarImagenAmpliada(iterarProd);
    });

    // Crear contenedor modal para la descripcion de cada producto
    let contenidoModalDescripcion = document.createElement('div');
    contenidoModalDescripcion.textContent = iterarProd.descripcion;
    //button modal Descripción
    let descripcionIt = document.createElement("button");
    descripcionIt.textContent = "Descripción";
    // Establecer los atributos de Bootstrap
    descripcionIt.setAttribute('type', 'button');
    descripcionIt.setAttribute('class', 'btn btn-primary');
    descripcionIt.setAttribute('data-bs-toggle', 'modal');
    descripcionIt.setAttribute('data-bs-target', '#staticBackdrop');
    //estilo
    descripcionIt.classList.add("w-50", "fs-5");

    // Asociar el contenido modal con el producto específico
    descripcionIt.addEventListener('click', function() {
        mostrarDescripcionModal(contenidoModalDescripcion);
    });

    let precioIt = document.createElement("p");
    precioIt.textContent = "$" + iterarProd.precio;

    let categoriaIt = document.createElement("p");
    categoriaIt.textContent = "Categoría: " + iterarProd.categoría;
    categoriaIt.classList.add("fs-5");

    //Crear button a cada elemento:
    let agregarAlCarritoBtn = document.createElement("button");
    agregarAlCarritoBtn.textContent = "Agregar al Carrito"
    agregarAlCarritoBtn.classList.add("w-50", "fs-5", "mx-auto", "p-3");
    //agregar funcionalidades del button:
    agregarAlCarritoBtn.addEventListener("click", function() {
        //llamo la funcion "agregarProductoAlCarrito" para agregar productos al array cuando se apriete el boton
        agregarProductoAlCarrito(iterarProd);
        //LLamo la funcion logicaAgregarAlCarrito
        logicaAgregarAlCarrito();
        
    });     

    //Agregar elementos al contenedor productoDiv:
    contenedorProductos.appendChild(productoDiv);
    productoDiv.appendChild(tituloIt);
    productoDiv.appendChild(imagenIt);
    productoDiv.appendChild(descripcionIt);
    productoDiv.appendChild(precioIt);
    productoDiv.appendChild(categoriaIt);
    productoDiv.append(agregarAlCarritoBtn);
});

// Función para mostrar la descripción modal del producto específico
function mostrarDescripcionModal(contenidoModal) {
    // Configurar el contenido modal con el texto específico
    let modalBody = document.getElementById('bodyModal');
    modalBody.textContent = contenidoModal.textContent;
}

function mostrarImagenAmpliada(iterarProd) {
    // creo un DIV
    let contenedorGaleria = document.createElement("div");

    contenedorGaleria.style.width = "40%";
    contenedorGaleria.style.zIndex = "10000";
    contenedorGaleria.style.borderRadius = "10%";
    contenedorGaleria.style.width = '50%';
    contenedorGaleria.style.top = '8%';
    contenedorGaleria.style.left = '25%';
    contenedorGaleria.style.padding = '2%';
    contenedorGaleria.style.position = "fixed"; 
    contenedorGaleria.style.maxHeight = '100%';
    contenedorGaleria.style.backgroundColor = "white";

    document.body.appendChild(contenedorGaleria);

    // Boton Cerrar carrito
    let buttonC = document.createElement("button");
    buttonC.type = "button";
    buttonC.textContent = "Cerrar";
    buttonC.style.marginLeft = "90%";
    buttonC.classList.add("btn", "btn-secondary");
    buttonC.addEventListener("click", function() {
        contenedorGaleria.remove(); // Cierra el formulario al hacer clic en el botón de cerrar
    });

    // Detección de la tecla "Enter" para cerrar el mensaje de error (solo funciona cuando haces click en el contenedor)
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            contenedorGaleria.remove(); // Cierra el formulario al presionar la tecla "Enter"
        }
    });

    // Utiliza otra variable para la imagen dentro de la galería
    let imagenAmpliada = document.createElement("img");
    imagenAmpliada.src = iterarProd.imagen;
    imagenAmpliada.style.marginLeft = "17%";

    contenedorGaleria.appendChild(buttonC);
    contenedorGaleria.appendChild(imagenAmpliada);
}

//funcion para almacenar los prodcutos agregados al carrito en un array
function agregarProductoAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = productosAgregadosAlCarrito.find(p => p.id === producto.id);

    if (!productoExistente) {
        // Si el producto no está en el carrito, agrégalo
        productosAgregadosAlCarrito.push(producto);

        // Inicializar el contador para este producto
        conteoProductos[producto.id] = 1;
    } else {
        // Si ya ha aparecido antes, incrementar el contador
        conteoProductos[producto.id]++;
    }
}

// Función para eliminar un producto del DOM (carrito):
//Parametro: variable local dentro del ámbito de la función. 
// productoEliminado en este caso es un parametro de la funcion. 
function eliminarProductoDelCarrito(productoEliminado) {
    // Encontrar el índice del producto en el array del carrito
    // Que hace el indexOf: encuentra el index del elemento eliminado en el array (productosAgregadosAlCarrito).
    //Si el indexOf devuelve "-1" significa que el producto no se encuentra en el array.
    const index = productosAgregadosAlCarrito.indexOf(productoEliminado);

    // Si el producto está en el carrito, eliminarlo del array
    //meotodo Splice: eliminar un elemento del array en la posición especificada por el índice (index)
    if (index !== -1) {
        productosAgregadosAlCarrito.splice(index, 1);
    }
}

// Función para actualizar el precio y el contador después de eliminar un producto del carrito
function logicaEliminarDelCarrito() {
    // Restar al contador
    contador--;

    // Actualizar el contador en el Minicarrito
    let primerHijoMinicarrito = minicarrito.firstElementChild;
    primerHijoMinicarrito.querySelector("span").textContent = `${contador}`;

    //Actualizar el precio en el Minicarrito
    let sumaPrecios = precioTotal();
    let segundoHijoMinicarrito = minicarrito.children[1];
    segundoHijoMinicarrito.querySelector("span").textContent = `${sumaPrecios}`;             
}

// Crear el botón "Ver carrito"
let btnCarrito = document.createElement("button");
btnCarrito.textContent = "Ver carrito";
btnCarrito.id = "btnVerCarrito"
btnCarrito.style.padding = "1%";
btnCarrito.style.fontSize = "1.3em";

// Añadir el botón al final del div minicarrito
let minicarrito = document.getElementById("minicarrito");
minicarrito.appendChild(btnCarrito);

// Agrega evento al botón "Ver carrito"
btnCarrito = document.getElementById("btnVerCarrito");
btnCarrito.addEventListener("click", function () {
    mostrarContenidoAgregCarrito();
    console.log(productosAgregadosAlCarrito);
    console.log(conteoProductos);
});

// Función para mostrar el contenido modal del carrito
function mostrarContenidoAgregCarrito() {
   // creo un DIV
   let contenedorCarrito = document.createElement("div");

   contenedorCarrito.style.width = "40%";
   contenedorCarrito.style.zIndex = "100000";
   contenedorCarrito.style.borderRadius = "10%";
   contenedorCarrito.style.width = '50%';
   contenedorCarrito.style.top = '0%';
   contenedorCarrito.style.backgroundColor = "#C5C5C5 ";
   contenedorCarrito.style.left = '25%';
   contenedorCarrito.style.padding = '2%';
   contenedorCarrito.style.position = "fixed";
   contenedorCarrito.style.overflowY = 'auto'; 
   contenedorCarrito.style.maxHeight = '100%';

   document.body.appendChild(contenedorCarrito);

    // Boton Cerrar carrito
    let buttonC = document.createElement("button");
    buttonC.type = "button";
    buttonC.textContent = "Cerrar";
    buttonC.style.marginLeft = "90%";
    buttonC.classList.add("btn", "btn-secondary");
    buttonC.addEventListener("click", function() {
        contenedorCarrito.remove(); // Cierra el formulario al hacer clic en el botón de cerrar
    });

    contenedorCarrito.appendChild(buttonC);

    // Contador de Productos
    let cantidadProd = document.createElement("p");
    cantidadProd.textContent = `Cantidad de productos: ${contador}`;
    cantidadProd.style.fontWeight = "500";
    contenedorCarrito.appendChild(cantidadProd);

    //Linea divisioria
    //Creo una linea para separar cada producto
    let hrLinea = document.createElement("hr");
    contenedorCarrito.appendChild(hrLinea);

    // Creo elementos en el DOM para cada producto en el array productosAgregadosAlCarrito
    productosAgregadosAlCarrito.forEach(producto => {

        // Div para cada producto
        let productoEnCarrito = document.createElement("div");

        // Información del producto al div
        let nombreProducto = document.createElement("p");
        nombreProducto.appendChild(document.createTextNode(`Nombre: ${producto.nombre}`));

        //cantidad de veces en el carrito
        let vecesEnCarrito = document.createElement("p");
        vecesEnCarrito.appendChild(document.createTextNode(`Cantidad: ${conteoProductos[producto.id]}`));

        let imgProducto = document.createElement("img");
        imgProducto.src = producto.imagen;

        let categoriaProducto = document.createElement("p");
        categoriaProducto.appendChild(document.createTextNode(`Categoría: ${producto.categoría}`));

        let precioProducto = document.createElement("p");
        precioProducto.appendChild(document.createTextNode(`Precio: $${producto.precio}`));

        let buttonMas = document.createElement("button");
        buttonMas.textContent = "+";

        buttonMas.addEventListener("click", function() {
            // Llamo la función agregarProductoAlCarrito para agregar el producto al carrito
            agregarProductoAlCarrito(producto);
            
            // Llamo la función logicaAgregarAlCarrito para actualizar el contador
            logicaAgregarAlCarrito();

            //cierro el carrito
            contenedorCarrito.remove();
            // Llamo la función mostrarContenidoAgregCarrito para recargar el carrito
            mostrarContenidoAgregCarrito();
        });

        let buttonMenos = document.createElement("button");
        buttonMenos.textContent = " - "

        buttonMenos.addEventListener("click", function() {
            // Obtener la cantidad del producto desde "conteoProductos"
            const cantidadEnCarrito = conteoProductos[producto.id];
        
            // Restar uno a la cantidad del productos repetidos en el carrito
            if (cantidadEnCarrito >= 2) {
                //resto en el contador
                conteoProductos[producto.id]--;
            }
        
            // Si la cantidad es 1, eliminar el producto del carrito
            if (cantidadEnCarrito === 1) {
                //resto en el contador de productos repetidos
                conteoProductos[producto.id]--;
                eliminarProductoDelCarrito(producto);
            }

            // Llamar a la función logicaEliminarDelCarrito para actualizar el contador y recargar el carrito
            logicaEliminarDelCarrito(producto);
            // Actualizar el contenido del carrito
            contenedorCarrito.remove();
            mostrarContenidoAgregCarrito();

            console.log(conteoProductos);
            
        });
        
        //Creo una linea para separar cada producto
        let hrElement = document.createElement("hr");

        // Agrego los elementos al productoEnCarrito
        contenedorCarrito.appendChild(nombreProducto);
        contenedorCarrito.appendChild(vecesEnCarrito);
        contenedorCarrito.appendChild(imgProducto);
        contenedorCarrito.appendChild(categoriaProducto);
        contenedorCarrito.appendChild(precioProducto);
        contenedorCarrito.appendChild(buttonMas);
        contenedorCarrito.appendChild(buttonMenos);
        contenedorCarrito.appendChild(hrElement);

        // Agrego el productoEnCarrito al cuerpo del modal
        contenedorCarrito.appendChild(productoEnCarrito);
    });

    let totalPrecioParrafo = document.createElement("p");
    totalPrecioParrafo.textContent = `Precio Total: $${precioTotal()}`;
    totalPrecioParrafo.style.fontWeight = "500";
    contenedorCarrito.appendChild(totalPrecioParrafo);

    let vaciarCarrito = document.createElement("button");
    vaciarCarrito.textContent = "Vaciar Carrito";
    vaciarCarrito.classList.add("font-weight-bold", "fs-5", "p-3" );
    vaciarCarrito.addEventListener("click", function(){
        //cierro y abro el carrito
        contenedorCarrito.remove();
        borrarContenidoDelCarrito();

        logicaAgregarAlCarrito();
        //vaciar contador del modal
        contador = 0;
        mostrarContenidoAgregCarrito();
        //Vaciar contador del Minicarrito (pantalla principal)
        let primerHijoMinicarrito = minicarrito.firstElementChild;
        primerHijoMinicarrito.querySelector("span").textContent = `${contador}`;
    })

    contenedorCarrito.appendChild(vaciarCarrito);

    let buttonComprar = document.createElement('button');
    buttonComprar.textContent = "COMPRAR"
    buttonComprar.classList.add("font-weight-bold", "fs-5", "p-3", "m-2" );
    buttonComprar.setAttribute("id", "btnComprar")

    // Agregar evento al botón "Comprar"
    buttonComprar.addEventListener("click", function () {
        // Llamar la función para generar el formulario de compra
        contenedorCarrito.remove();
        generarFormularioCompra();
    });

    contenedorCarrito.appendChild(buttonComprar);
}

//Genero el formulario checkout para la compra 
function generarFormularioCompra() {
    let contenedor = document.createElement('div');
    contenedor.classList = "container";
    //Agrego estilo con CSS
    contenedor.style.position = 'fixed';
    contenedor.style.width = '50%';
    contenedor.style.top = '5%';
    contenedor.style.backgroundColor = "#C5C5C5 ";
    contenedor.style.left = '25%';
    contenedor.style.zIndex = '1000000000';
    contenedor.style.padding = '2%';
    contenedor.style.borderRadius = '10%';
     
    var tituloForm = document.createElement("h2");
    tituloForm.textContent = "Completa los datos:"

    // Crear el formulario
    var formulario = document.createElement("form");
    formulario.classList.add("row", "mx-auto");

    // Boton Cerrar Formulario
    var buttonCerrar = document.createElement("button");
    buttonCerrar.type = "button";
    buttonCerrar.textContent = "Cerrar";
    buttonCerrar.style.marginLeft = "90%";
    buttonCerrar.classList.add("btn", "btn-secondary");
    buttonCerrar.addEventListener("click", function() {
        contenedor.remove(); // Cierra el formulario al hacer clic en el botón de cerrar
    });

    // Nombre
    var labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre:";
    labelNombre.classList = "col-6";
    var inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.name = "nombre";
    inputNombre.required = true;
    inputNombre.classList.add("col-6", "w-25");

    // Telefono
    var labelTelefono = document.createElement("label");
    labelTelefono.textContent = "Teléfono:";
    labelTelefono.classList = "col-6";
    var inputTelefono = document.createElement("input");
    inputTelefono.classList.add("col-6", "w-25");
    inputTelefono.type = "tel";
    inputTelefono.id = "telefono";
    inputTelefono.name = "telefono";
    inputTelefono.required = true;

    // Email
    var labelEmail = document.createElement("label");
    labelEmail.textContent = "Email:";
    labelEmail.classList = "col-6";
    var inputEmail = document.createElement("input");
    inputEmail.classList.add("col-6", "w-25");
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.name = "email";
    inputEmail.required = true;

    // Dirección
    var labelDireccion = document.createElement("label");
    labelDireccion.textContent = "Dirección:";
    labelDireccion.classList = "col-6";
    var textareaDireccion = document.createElement("textarea");
    textareaDireccion.classList.add("col-6", "w-25");
    textareaDireccion.id = "direccion";
    textareaDireccion.name = "direccion";
    textareaDireccion.required = true;

    // Fecha de Entrega
    var labelFechaEntrega = document.createElement("label");
    labelFechaEntrega.textContent = "Fecha de Entrega:";
    labelFechaEntrega.classList = "col-6";
    var inputFechaEntrega = document.createElement("input");
    inputFechaEntrega.classList.add("col-6", "w-25");
    inputFechaEntrega.type = "date";
    inputFechaEntrega.id = "fechaEntrega";
    inputFechaEntrega.name = "fechaEntrega";
    inputFechaEntrega.required = true;

    // Metodo de Pago
    var labelMetodoPago = document.createElement("label");
    labelMetodoPago.textContent = "Método de Pago:";
    labelMetodoPago.classList = "col-6";
    var selectMetodoPago = document.createElement("select");
    selectMetodoPago.classList.add("col-6", "w-25");
    selectMetodoPago.id = "metodoPago";
    selectMetodoPago.name = "metodoPago";
    selectMetodoPago.required = true;

    var optionEfectivo = document.createElement("option");
    optionEfectivo.value = "efectivo";
    optionEfectivo.textContent = "Efectivo";

    var optionTransferencia = document.createElement("option");
    optionTransferencia.value = "transferencia";
    optionTransferencia.textContent = "Transferencia Bancaria";

    selectMetodoPago.appendChild(optionEfectivo);
    selectMetodoPago.appendChild(optionTransferencia);

    function validarFormulario() {
        // Array para almacenar los campos con error
        let camposConError = [];
    
        // Validar nombre
        if (inputNombre.value === "") {
            camposConError.push(inputNombre);
        }
    
        // Validar teléfono
        if (inputTelefono.value === "") {
            camposConError.push(inputTelefono);
        }
    
        // Validar email
        if (inputEmail.value === "") {
            camposConError.push(inputEmail);
        }
    
        // Validar dirección
        if (textareaDireccion.value === "") {
            camposConError.push(textareaDireccion);
        }
    
        // Validar fecha de entrega
        if (inputFechaEntrega.value === "") {
            camposConError.push(inputFechaEntrega);
        }

        // Validar método de pago
        if (selectMetodoPago.value === "") {
            camposConError.push(selectMetodoPago);
        }
    
        // Cambiar el color de los bordes de los campos con error a rojo
        camposConError.forEach(function (campo) {
            campo.style.border = "2px solid red";
        });
    
        // Si hay campos con error, detener el envío del formulario
        if (camposConError.length > 0) {
            return false;
        }
    
        return true;
    }

    // Botón de Enviar
    var buttonEnviar = document.createElement("button");
    buttonEnviar.type = "submit";
    buttonEnviar.textContent = "Comprar";
    buttonEnviar.style.margin = "4%";
    buttonEnviar.style.fontSize = "1.5em";
    buttonEnviar.style.width = "30%";
    buttonEnviar.classList = "mx-auto";
    buttonEnviar.addEventListener("click", function(event){
    // Validar el formulario antes de enviar
    if (!validarFormulario()) {
        // Detener el envío del formulario si hay errores
        event.preventDefault();

        //Crear un mensaje de error 
        let contenedorError = document.createElement('div');
        //Agrego estilo con CSS
        contenedorError.style.position = 'fixed';
        contenedorError.style.width = '20%';
        contenedorError.style.top = '6%';
        contenedorError.style.backgroundColor = "rgb(255, 84, 84)";
        contenedorError.style.left = '40%';
        contenedorError.style.zIndex = '100000000000';
        contenedorError.style.padding = '2%';
        contenedorError.style.borderRadius = '10%';

        document.body.appendChild(contenedorError);

        // Boton Cerrar Mensaje de Error
        var buttonCerrar = document.createElement("button");
        buttonCerrar.type = "button";
        buttonCerrar.textContent = "Cerrar";
        buttonCerrar.style.marginLeft = "70%";
        buttonCerrar.classList.add("btn", "btn-secondary");
        buttonCerrar.addEventListener("click", function() {
        contenedorError.remove(); 
            
        });

        contenedorError.appendChild(buttonCerrar);

        let mensaje = document.createElement("p");
        mensaje.textContent = "Por favor completa los campos requeridos."

        contenedorError.appendChild(mensaje);

    }
    else{
        // Enviar el formulario
        formulario.submit();
        
        // Guardo los valores ingresados en el formulario 
        let nombre = inputNombre.value;
        let telefono = inputTelefono.value;
        let email = inputEmail.value;
        let direccion = textareaDireccion.value;
        let fechaEntrega = inputFechaEntrega.value;
        let metodoPago = selectMetodoPago.value;

        // Obtener los datos anteriores del localStorage (si existen) con el metodo (getItem)
        // función JSON.parse se utiliza para convertir la cadena JSON almacenada en localStorage a un objeto JavaScript
        var datosCompraAnteriores = JSON.parse(localStorage.getItem("datosCompraAnteriores")) || [];

        // Almacenar los datos actuales en un Objeto
        var datosCompra = {
            nombre: nombre,
            telefono: telefono,
            email: email,
            direccion: direccion,
            fechaEntrega: fechaEntrega,
            metodoPago: metodoPago,
        };
        //Agrego los nuevos datos al array (datosComprasAnteriores)
        datosCompraAnteriores.push(datosCompra);

        // Almacenar el array actualizado en el localStorage con el metodo setItem.
        //La función JSON.stringify se utiliza para convertir el array a una cadena JSON antes de almacenarlo en localStorage.
        localStorage.setItem("datosCompraAnteriores", JSON.stringify(datosCompraAnteriores));
    }

    });

    document.body.appendChild(contenedor);

    contenedor.appendChild(buttonCerrar);
    contenedor.appendChild(tituloForm);
    contenedor.appendChild(formulario);
    formulario.appendChild(labelNombre);
    formulario.appendChild(inputNombre);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(labelTelefono);
    formulario.appendChild(inputTelefono);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(labelEmail);
    formulario.appendChild(inputEmail);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(labelDireccion);
    formulario.appendChild(textareaDireccion);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(labelFechaEntrega);
    formulario.appendChild(inputFechaEntrega);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(labelMetodoPago);
    formulario.appendChild(selectMetodoPago);
    formulario.appendChild(document.createElement("br"));
    formulario.appendChild(buttonEnviar);   
}


// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    // Mostrar el banner al filtrar productos
    mostrarBanner();
    // Filtrar productos por categoría
    let productosFiltrados = productos.filter(producto => producto.categoría === categoria);

    // Limpiar el contenedor de productos
    productosContainer.innerHTML = '';

    // Mostrar productos filtrados
    productosFiltrados.forEach(iterarProd => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add("producto", "row", "w-50", "border", "px-5");

        let tituloIt = document.createElement("h1");
        tituloIt.textContent = iterarProd.nombre;
        tituloIt.classList.add("font-weight-bold");

        let imagenIt = document.createElement("img");
        imagenIt.src = iterarProd.imagen;
        imagenIt.alt = iterarProd.nombre;
        imagenIt.classList.add("img-fluid", "w-100");
        imagenIt.addEventListener('click', function() {
            mostrarImagenAmpliada(iterarProd);
        });

        let contenidoModalDescripcion = document.createElement('div');
        contenidoModalDescripcion.textContent = iterarProd.descripcion;

        let descripcionIt = document.createElement("button");
        descripcionIt.textContent = "Descripción";
        descripcionIt.setAttribute('type', 'button');
        descripcionIt.setAttribute('class', 'btn btn-primary');
        descripcionIt.setAttribute('data-bs-toggle', 'modal');
        descripcionIt.setAttribute('data-bs-target', '#staticBackdrop');
        descripcionIt.classList.add("w-50", "fs-5");

        descripcionIt.addEventListener('click', function () {
            mostrarDescripcionModal(contenidoModalDescripcion);
        });

        let precioIt = document.createElement("p");
        precioIt.textContent = "$" + iterarProd.precio;

        let categoriaIt = document.createElement("p");
        categoriaIt.textContent = "Categoria: " + iterarProd.categoría;
        categoriaIt.classList.add("fs-5");

        let agregarAlCarritoBtn = document.createElement("button");
        agregarAlCarritoBtn.textContent = "Agregar al carrito"
        agregarAlCarritoBtn.classList.add("w-50", "fs-5", "mx-auto", "p-3");
        agregarAlCarritoBtn.addEventListener("click", function () {
            agregarProductoAlCarrito(iterarProd);
            logicaAgregarAlCarrito();
        });

        productoDiv.appendChild(tituloIt);
        productoDiv.appendChild(imagenIt);
        productoDiv.appendChild(descripcionIt);
        productoDiv.appendChild(precioIt);
        productoDiv.appendChild(categoriaIt);
        productoDiv.append(agregarAlCarritoBtn);
        productosContainer.appendChild(productoDiv);
    });
}

// Manejar clic en los enlaces de categoría
document.getElementById('smartphone').addEventListener('click', function () {
    filtrarProductos('Smartphone');
});

document.getElementById('tablet').addEventListener('click', function () {
    filtrarProductos('Tablet');
});

document.getElementById('auriculares').addEventListener('click', function () {
    filtrarProductos('Auriculares');
});

function mostrarBanner() {
    // Crear el contenedor del banner
    let banner = document.createElement('div');
    banner.id = 'banner';
    banner.style.display = 'none';
    banner.style.position = 'fixed';
    banner.style.width = '50%';
    banner.style.top = '15%';
    banner.style.backgroundColor = "#C5C5C5 ";
    banner.style.left = '25%';
    banner.style.zIndex = '1000';
    banner.style.padding = '2%';
    banner.style.borderRadius = '10%';

    //Crear el titulo
    let tituloBanner = document.createElement('h2');
    tituloBanner.textContent = "¡Compra ya tu iPhone 15 pro!"

    // Crear la img del banner
    let imagen = document.createElement('img');
    imagen.src = 'IMG/iphone-15-publicidad.webp';
    imagen.alt = 'Banner';
    imagen.style.width = '80%';
    imagen.style.display = 'block';
    imagen.style.margin = 'auto';

    // Crear el botón
    let agregarAlCarritoBannerBtn = document.createElement("button");
    agregarAlCarritoBannerBtn.textContent = "Agregar al Carrito";
    agregarAlCarritoBannerBtn.classList.add("w-30", "fs-5", "mx-auto", "p-3",);
    agregarAlCarritoBannerBtn.style.display = 'block';
    agregarAlCarritoBannerBtn.style.margin = 'auto';

    // Agregar funcionalidad al botón del banner
    agregarAlCarritoBannerBtn.addEventListener("click", function() {
        // Obtener el producto con id 1 a partir de la funcion FIND que busca el primer elemento que cumpla con una condiccion en esecifica 
        const productoBanner = productos.find(producto => producto.id === 1);

        // Llamar la función agregarProductoAlCarrito para agregar el producto al carrito
        agregarProductoAlCarrito(productoBanner);

        // Llamar la función logicaAgregarAlCarrito para actualizar el contador y recargar el carrito
        logicaAgregarAlCarrito();
    });

    // Agregar el banner al cuerpo del documento
    document.body.appendChild(banner);

    // Agregar los elementos generados con DOM al contenedor del banner
    banner.appendChild(tituloBanner)
    banner.appendChild(imagen);
    banner.appendChild(agregarAlCarritoBannerBtn);

    // Asignar una rotación aleatoria al banner
    //Función Math.random(): devuelve un número decimal aleatorio dentro  del rango [0, 1);
    banner.style.transform = 'rotate(' + (Math.random() * 300 ) + 'deg)';
  
    // Mostrar el banner
    banner.style.display = 'block';
  
    // Ocultar el banner después de 10 segundos
    setTimeout(function () {
      // Eliminar el banner del DOM despues de 10 segundos
      document.body.removeChild(banner);
    }, 10000);
  }