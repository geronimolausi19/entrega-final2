//Creamos el contructor de un objeto, con todas las caracteristicas de las remeras
class Producto {
  constructor(nombre, precio, imagen, stock) {
    this.nombre = nombre;
    
    this.precio = precio;
    this.imagen = imagen;
    this.stock = stock;
    this.cantidad = 1
  }
}
//array donde se van a crear la base de datos
let baseDeDatos = [];
//array donde se van a pushiar los elementos , que seleccioenmos para comprar
let carrito = [];
//boton de vaciar
// const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito")

//Le da vida al boton
// btnVaciarCarrito.addEventListener("click", vaciarCarrito)


//Caracteristicas de cada remera
let producto1 = new Producto(
  "Astros nacionales",
  3000,
  "http://d26lpennugtm8s.cloudfront.net/stores/064/882/products/1-remera_certified_estampados_mockup_charly-mas-spinetta1-f91a6d232b8864bc2d16032233908692-640-0.jpg",
  3
);

let producto2 = new Producto(
  "Almendra",
  2900,
  "https://http2.mlstatic.com/D_NQ_NP_630522-MLA32412185495_102019-W.jpg",
  3
);
let producto3 = new Producto (
  "Charly el cocodrilo",
  5000,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGn6W8upcmhGQt6AOue21qewyA-Hs-8BrvsA&usqp=CAU",
  3
);
let producto4 = new Producto(
  "Radio Head",
  2500,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6QML_tyv2c-L5pdcvZfLXYFQPU3QQ1m71eg&usqp=CAU",
  3
);
let producto5 = new Producto(
  "Pappos Blues",
  1900,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThshmQfKmNcCJPna83CyhxLjWO-VToySXNTA&usqp=CAU",
  3
);
let producto6 = new Producto(
  "Invisible",
  2000,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5FIS5ZMCzPC4LobowEMsK-R4LmtIpUFLDA&usqp=CAU",
  3
);

//Metemos las remeras a la base dde datos
baseDeDatos.push(producto1);
baseDeDatos.push(producto2);
baseDeDatos.push(producto3);
baseDeDatos.push(producto4);
baseDeDatos.push(producto5);
baseDeDatos.push(producto6);

//obtener datos de mercado-libre
function obtenerDatosMercadoLibre(){
  //JQUERY
$.get(
  "https://api.mercadolibre.com/sites/MLA/search?category=MLA1182",
  function (data) {
   let productos = data.results
   for(let i = 0; i<3;i++){
     
     let item = productos[i]
     let producto= new Producto(
      item.title,
      item.price,
      item.thumbnail,
      item.available_quantity
     )
baseDeDatos.push(producto)
   }
   productosHTML()
    console.log(productos);
    
  }
);
}
obtenerDatosMercadoLibre()

function productosHTML(){
  //Creamos la variable acumuladora
let aux = ``;
//Recorremos la base de datos
for (let i = 0; i < baseDeDatos.length; i++) {
  //Si el stock es mayor a 0      
  if (baseDeDatos[i].stock > 0)
  //estructura de la card
    aux += `

 <div  class="col-lg-4 col-md-6 mb-4 ">
      <div class="card h-100 cards ">
      <a href="#"><img class= "card-img-top imagenes " src=${baseDeDatos[i].imagen} alt=""></a>
         <div  class="card-body">
          <h4 class="card-title ">
           <a href="#">${baseDeDatos[i].nombre}</a> 
          </h4>
          <h5>${baseDeDatos[i].precio}</h5>
          
          <button  onclick="agregarAlCarrito(baseDeDatos[
            ${i}])">Agregar al carrito</button>
         </div>
       <div class="card-footer colorblack">
           <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        </div>
       </div>
    </div>  
   

  
 `; 
}
//inserta aux en el id productos
document.getElementById("productos").innerHTML = aux;

}



// Json

// let carritoStorage = localStorage.getItem("carrito")
// if (carritoStorage !=null) {
//   console.log("entro a la validacion")

//   let valoresDelCarrito = JSON.parse(carritoStorage);
//   carrito = valoresDelCarrito;
//   actulizarCarritoHTML()
// }

function agregarAlCarrito(producto) {
  let productoCarrito = null
  //buscamos si el carrito existe

  for (let i = 0; i < carrito.length; i++) {
  if(carrito[i].nombre == producto.nombre){
    productoCarrito = carrito [i]
  }
  }
  if(carrito.length== 0 || productoCarrito == null){
    carrito.push(producto)
  }else if( productoCarrito !=null){
    productoCarrito.cantidad++
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  // actulizarCarritoHTML()
}







  














