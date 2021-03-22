
// "#staticBackdrop"

let carrito = [];

function MostrarCarrito() {
  let carritoStorage = localStorage.getItem("carrito");
  carrito = [];
  if (carritoStorage != null) {
    carrito = JSON.parse(carritoStorage);
    console.log(carrito);
  }
  actulizarCarritoHTML(carrito);
}
MostrarCarrito();


//Mostrar modal
const $mostrarModal = document.getElementById("mostrarModal");
$mostrarModal.addEventListener("click", mostrarModal )

//eliminar producto && agregar producto
const $listaProducto = document.getElementById("lista-productos");
$listaProducto.addEventListener("click", capturarClick);



//comrpra 
let btnComprar = document.getElementById("btn-comprar");
btnComprar.addEventListener("click", comprar);

//vaciar carrito
let btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
btnVaciarCarrito.addEventListener("click", vaciarCarrito);

function actulizarCarritoHTML(carrito) {
  const $btnPrecioTotal = document.getElementById("precio-total");
  const $listaProducto = document.getElementById("lista-productos");
  let precioTotal = 0;
  let listaProducto = "";
  for (let i = 0; i < carrito.length; i++) {
    //lista producto
    listaProducto += `
    <div class="item-card">
      <div class="d-flex justify-content">
        <div class="item-card-info">        
          <div>  ${carrito[i].nombre} </div>   
          <div>precio: $${carrito[i].precio} </div>
          <div>cantidad: x${carrito[i].cantidad}</div>
        </div> 
        <div>  
          <a href="#"><img class="imagenes-carrito" src=${carrito[i].imagen} alt=""></a> 
        </div> 
      </div>
      <div class="item-card-botones">
        <button type="button" class="btn btn-danger eliminar" id="${carrito[i].nombre}">
          eliminar Producto
        </button>   
        <button type="button" class="btn btn-success agregar" id="${carrito[i].nombre}">
          agregar Producto
        </button> 
      </div>    
    </div>
    `;

    //precio total
    precioTotal += carrito[i].precio * carrito[i].cantidad;
  }
  $btnPrecioTotal.innerHTML = precioTotal;

  if (listaProducto == "") {
    $listaProducto.innerHTML = "No hay productos";
  } else {
    $listaProducto.innerHTML = listaProducto;
  }
}




function eliminarProducto(producto) {
  let nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (producto["id"] !== carrito[i]["nombre"]) {
      nuevoCarrito.push(carrito[i]);
    } else{
      carrito[i]["cantidad"]-=1
      if(carrito[i]["cantidad"]>0){
        nuevoCarrito.push(carrito[i])
      }

    }
  }
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  actulizarCarritoHTML(carrito);
  
}

function agregarProducto(producto){

  for (let i = 0; i < carrito.length; i++){
    if (producto["id"] == carrito[i]["nombre"]) {
    carrito[i]["cantidad"]+=1 
    } 

  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actulizarCarritoHTML(carrito);
}

function capturarClick(evento) {
  let elemento = evento.target;
  if (elemento.classList.contains("eliminar")) {
    console.log("eliminarProducto");
    eliminarProducto(elemento);
  }else if(elemento.classList.contains("agregar")){
    console.log("agregarPorducto");
    agregarProducto(elemento);
  }

}
//para agregar un producto es similar a eliminar producto, tendriamos que usar la funcion capturar click, con otro if con otra class en el boton

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actulizarCarritoHTML(carrito);
}

//billetera
let billetera = 0;
let botonAgregar = document.getElementById("btn-agregarDinero");

botonAgregar.addEventListener("click", agregarDinero);






function agregarDinero() {
  let cantidadAgregar = 1000;

  billetera += cantidadAgregar;
  mostrarDineroBilletera();
}

function mostrarDineroBilletera() {
  let billeteraActual = document.getElementById("mostrar-dinero");
  billeteraActual.innerHTML = billetera;
}

function calcularPrecioTotal() {
  let precioTotal = 0;
  for (let i = 0; i < carrito.length; i++) {
    precioTotal += carrito[i]["precio"] * carrito[i]["cantidad"];
    console.log(precioTotal);
  }
  return precioTotal;
}
calcularPrecioTotal();

function comprar() {
  let mensajeUsuario = document.getElementById("mensaje-usuario");
  mensajeUsuario.classList.remove("alert-success", "alert-danger")
  let precioTotal = calcularPrecioTotal();
  if (billetera >= precioTotal) {
    billetera -= precioTotal;

    mensajeUsuario.classList.add("alert-success")
    mensajeUsuario.innerHTML = "Compra realizada";
    mostrarDineroBilletera();
    vaciarCarrito();

    setTimeout(() => {
      $("#staticBackdrop").modal("hide");
    }, 1000);
  } else {
    //https://www.w3schools.com/bootstrap4/bootstrap_alerts.asp
    mensajeUsuario.classList.add("alert-danger")
    mensajeUsuario.innerHTML =
      "El saldo de su billetera es insuficiente, agrege el dinero faltante";
  }
}



function mostrarCuentaProductos() {
  let cuentaProductos = " ";

  for (let i = 0; i < carrito.length; i++) {
    cuentaProductos += `
<div>
$${carrito[i].nombre} x ${carrito[i].cantidad} = ${
      carrito[i].precio * carrito[i].cantidad
    }

</div>

`;
  }
  cuentaProductos += "Precio total = $" + calcularPrecioTotal();

  let mostrarCuenta = document.getElementById("cuenta-productos");
  mostrarCuenta.innerHTML = cuentaProductos;
}


for(let i = 0; i<carrito.length;i++){
  console.log(carrito[i]["nombre"] + "=" + carrito[i]["cantidad"])
}


function mostrarModal(){
  mostrarCuentaProductos()

  $("#staticBackdrop").modal("show");

  

}