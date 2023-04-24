// Inicialización de variables
const textos = document.querySelectorAll("input"); //Crea un array que contiene todos los input del DOM, por orden de aparición en el HTML.
//RegExp: Lista de errores que puede aparecer en la ejecución del formulario (Array de errores)
const allRegExp = {
  soloTexto: {
    error: new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/),
    msg: "El valor ingresado no debe tener ningún dígito (0-9)",
  }, //Objeto regExp que revisa si hay numeros dentro de una cadena de caracteres y devuelve verdadero o falso
  password: {
    error: new RegExp(/^[^áéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ]{6,12}$/),
    msg: "El valor ingresado no puede llevar letras acentuadas y comprender entre 6 y 12 caracteres",
  }, //Objeto regExp que revisa si hay acentuados dentro de una cadena de caracteres y devuelve verdadero o falso, ademas comprrueba que la contraseña ocupe de 6 a 12
  codigoValido: {
    error: new RegExp(/^38[\d]{3}$/),
    msg: "El código postal ingresado no pertenece a Tenerife",
  }, //Objeto regExp que verifica si el número empieza por 38 y consta de 5 dígitos
  soloNumero: {
    error: new RegExp(/^[\d]+$/),
    msg: "El valor ingresado debe ser numérico"
  },//Objeto regExp que verifica si el valor es numerico
  gmail: {
    error: new RegExp(/[^\s]+@(?:gmail\.com)/),
    msg: "El correo ingresado debe ser de Google"
  },//Objeto regExp que verifica que el valor escrito tenga el formato de un correo gmail.com
  telefono: {
    error: new RegExp(/^[\d]{3}-[\d]{2}-[\d]{2}-[\d]{2}$/),
    msg: "El valor ingresado no corresponde a un número de teléfono español"
  },//Objeto regExp que verifica que los datos correspondan a un telefono español
  destructivo:{
    error: new RegExp(/^[^,\*\+\?\^\$\{\}\(\)|[\]\\<>]*$/),
    msg: "No puede ingresar caracteres prohibidos, (,*+?^${}()|[ ]\<>)"
  } //Objeto regExp que revisa que los elementos no lleven caracteres especiales

};

//pendiente ^

/**
 * Funcion que se encarga de filtrar los textos y verificar que no haya números contenidos
 *
 * @param {object} elemento = Recibe el índice del array de "textos[]" al que corresponde el input a tratar.
 */
function validarTexto(elemento, reg) {
  let texto = textos[elemento].value;
  //console.log(texto);  
  let prueba = reg.error.test(texto);// comprueba si prueba es verdadero y en dado caso envia una alerta y borra el campo de texto ingresado
  if (prueba == false) {
    window.alert(reg.msg);
    textos[elemento].value = "";
  }
  else console.log("sos legal pibe/a, I respect you");  //Si el valor es válido, envía un mensaje a la consola
}
/**
 * Funcion que entrega el funcionamiento al boton "submit", verifica todos los "inputs" descartandos que haya caracteres destructivos llamando a la funcion @validarTexto()
 */
function validar() {
  for(elem in textos){
    validarTexto(elem, allRegExp.destructivo);
  }
}
/** 
 * Funcion que ocurre cada vez que en el campo @tel recibe el ingreso de un caracter
 * 
 * Ingresa un guion cada ciertos espacios, dando forma al número "3-2-2-2"
*/

function ingresarTel(){
  let tel = textos[14].value;
  if(tel.length==3||tel.length==6||tel.length==9){
    tel+="-";
  }
  textos[14].value = tel;
}

function calcularEdad() {
  let birth = textos[5].value; // Recibe el valor del input
  let now = new Date(); // crea un objeto con el día de hoy de tipo date()
  let today = [now.getFullYear(), now.getMonth() + 1, now.getDate()]; // con el objeto "now" creado, crea un arreglo "today" que almacena en orden "año-mes-día"
  birth = birth.split("-"); //Cuando recibe el valor de birth, lo convierte en un array para guardar los datos 

  for (let i in birth) { //Recibe el array Birth y convierte los números en formato string a enteros, luego resta a Today el valor de birth para dejar la difenecia entre ambos  
    birth[i] = parseInt(birth[i]);
    today[i] = today[i] - birth[i];
  }

  for (let i = today.length - 1; i > 0; i--) { // Recorre el array de atrás hacia adelante, (de días a años), y verifica si en la resta anterior hay números negativos, si es así, la posición siguiente resta 1
    if (today[i] < 0) {
      today[i - 1]--;
    }
  }

  if (today[0] < 18) {
    textos[5].value = ""; 
    window.alert("El usuario debe ser mayor de edad"); //si el usuario es mayor de 18 no pasa nada, si es menor de 18 salta una alerta y borrara el campo escrito
    //true;
  }
  else {
    console.log("ya tienes los huevos bien peludos"); // Si es mayor de edad, se reproducira este mensaje en la consola
  }

}
/**
 * Funcion que determina si la calificacion se encuentra entre "0-10"
 * @param {number} elemento posición del input con respecto al Array "textos"
 */
function validarCalif(elemento) {
  let _calif = parseInt(textos[elemento].value);
  if (_calif >= 0 && _calif <= 10) {
    console.log("Gracias esclavo, haces bien poniendo eso...  BAKA! (>////<)"); //Si es verdadero manda un mensaje a la consola indicando que el valor es valido
  }
  else{
    window.alert("el valor escrito no esta entre los valores determinados"); //Si es falso envia un mensaje de error y limpia el campo
    textos[elemento].value = "";
  }
}

