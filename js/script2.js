
// http://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email
//https://codepen.io/avilamarco/pen/LYZExWx

// servidores
// https://github.com/public-apis/public-apis
//googleadsent
// https://picsum.photos/
// https://flexboxfroggy.com/#es
// https://repl.it/join/umcejfjp-avilamarco


                    // Formulario


//expresiones para validar los inputs
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos ={
    usuario: false,
    nombre: false,
    contraseña:false,
    correo: false,
    telefono:false
}

//tomo todo el formulario
const formulario = document.getElementById("formulario")
// accedo a el id formulario y dentro tomo todos los inputs
const inputs = document.querySelectorAll("#formulario input")


const validarFormulario= (e)=>{
switch(e.target.name){
    case "usuario":
       validarCampo(expresiones.usuario ,e.target, "usuario")
    break;
    case "nombre":
     validarCampo(expresiones.nombre ,e.target, "nombre")
    break;
    case "contraseña":
   validarCampo(expresiones.password ,e.target, "contraseña")
   validarConstraseña2()
     break;
     case "contraseña2":
    validarConstraseña2()
     break;
     case "correo":
        validarCampo(expresiones.correo ,e.target, "correo")
    break;
    case "telefono":
        validarCampo(expresiones.telefono ,e.target, "telefono")
    break;

}
}


const validarCampo= (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto")
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto")
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle")
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle")
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo")
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto")
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto")
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle")
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle")
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo")
        campos[campo] = false;
    }
}


const validarConstraseña2 = () => {
    const inputContraseña1 = document.getElementById("contraseña")
    const inputContraseña2 = document.getElementById("contraseña2");

    if(inputContraseña1.value !== inputContraseña2.value){
        document.getElementById("grupo__contraseña2").classList.add("formulario__grupo-incorrecto")
        document.getElementById("grupo__contraseña2").classList.remove("formulario__grupo-correcto")
        document.querySelector("#grupo__contraseña2 i").classList.add("fa-times-circle")
        document.querySelector("#grupo__contraseña2 i").classList.remove("fa-check-circle")
        document.querySelector("#grupo__contraseña2 .formulario__input-error").classList.add("formulario__input-error-activo")
       campos["contraseña"] = false;
    }else{
        document.getElementById("grupo__contraseña2").classList.remove("formulario__grupo-incorrecto")
        document.getElementById("grupo__contraseña2").classList.add("formulario__grupo-correcto")
        document.querySelector("#grupo__contraseña2 i").classList.remove("fa-times-circle")
        document.querySelector("#grupo__contraseña2 i").classList.add("fa-check-circle")
        document.querySelector("#grupo__contraseña2 .formulario__input-error").classList.remove("formulario__input-error-activo")
        campos["contraseña"] = true;
    }
}

//recorremos los inputs y por cada tecla levantada"keyup" o cada click fuera de un input "blur", nos activa validar formulario
inputs.forEach((input)=>{
  input.addEventListener("keyup", validarFormulario )
  input.addEventListener("blur", validarFormulario)
});

//inavilitamos el boton de enviar
formulario.addEventListener("submit",(e)=>{
e.preventDefault();

const terminos = document.getElementById("terminos")
if(campos.usuario && campos.nombre && campos.contraseña && campos.correo &&campos.telefono && terminos.checked){
formulario.reset();


document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo")
setTimeout(() => {
    
document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo")
},5000);

document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
     icono.classList.remove("formulario__grupo-correcto")
   })
 }else {
     document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo")
 }

})




function obtenerDatosFormulario(){
    console.log("obtener datos formulario")
}

function registroUsuario(){
console.log("registrousuario")
}


function datosUsuarios(){

}

function usuarioActual(){

}
 

function iniciarSesion(){

}







