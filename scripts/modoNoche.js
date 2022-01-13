////////// Script para el modo nocturno //////////////////////////////////////
let btnCrearGifoNoche         =  document.getElementById("btnCrearGifoNoche");
let btnCloseBurguer           =    document.getElementById("btnCloseBurguer");
let btnCloseSearchNoche       =     document.getElementById("btnCloseSearch");
let imagenCarrete             =      document.getElementById("imagenCarrete");
let imagenCamara              =       document.getElementById("imagenCamara");
let btnCrearGifo              =       document.getElementById("btnCrearGifo");
let logoDesktop               =        document.getElementById("logoDesktop");
let btnBurguer                =         document.getElementById("btnBurguer");
let logoMobile                =         document.getElementById("logoMobile");
let modoNocturnoLocalStorage  =          localStorage.getItem("modoNocturno");
let lupaFijaCambio            =           document.getElementById("lupaFija");
let btnModoNocturno           =              document.getElementById("noche");
let bodyModoNocturno          =               document.getElementById("body");
let url                       =                      window.location.pathname;

let botonVerMas               = document.getElementById("btnVerMasGif")  //Agregado

///// Evento click al boton para intercambiar entre modos
btnModoNocturno.addEventListener("click", ()=>{
    cambiarModo();
})

/// Se activa el modo nocturno
let modoNocturnoActivado = () => {
    bodyModoNocturno.classList.toggle("modoNoche");
    btnModoNocturno.innerHTML = "MODO DIURNO";
    //Cambios de los diferentes iconos y botones
    alternanciaModos();
    cambiarBtnCrear();

    ///Cambio aplica sólo en el home
    if (url === "/index.html" || url === "/master/index.html") {
        //Cambia la lupa y el boton close en la barra
        cambioLupaYClose();
    }

    //cambio para las cámaras en crear gifo
    if (url === "/creargifo.html" || url === "/master/creargifo.html") {
        //funcion cambiar imagenes camaras
        cambiarCamaras();
    }
    //Se guarda el estado en el local storage
    localStorage.setItem("modoNocturno", "activado");
}

/// Desactiva el modo nocturno
let modoNocturnoDesactivado = () => {
    bodyModoNocturno.classList.toggle("modoNoche");
    btnModoNocturno.innerHTML = "MODO NOCTURNO";

    alternanciaModos();
    cambiarBtnCrear();

    if (url === "/index.html" || url === "/master/index.html") {
    
        cambioLupaYClose();
    }

    if (url === "/creargifo.html" || url === "/master/creargifo.html") {
    
        cambiarCamaras();
    }

    localStorage.setItem("modoNocturno", null);
}

//Se carga cambios al local storage
if (modoNocturnoLocalStorage === "activado") {
    modoNocturnoActivado();
}

/// Cambia el tipo de modo
function cambiarModo() {
    modoNocturnoLocalStorage = localStorage.getItem("modoNocturno");  //Evaluar al final si se puede quitar

    if (modoNocturnoLocalStorage !== "activado") {
        modoNocturnoActivado();
    } else {
        modoNocturnoDesactivado();
    }
}

function alternanciaModos() {
    if (btnModoNocturno.innerHTML == 'MODO NOCTURNO') {

        logoDesktop.setAttribute("src", "./assets/logo-desktop.svg");
        logoMobile.setAttribute("src", "./assets/logo-mobile.svg");
        btnBurguer.setAttribute("src", "./assets/burger.svg");
        btnCloseBurguer.setAttribute("src", "./assets/close.svg");

        botonVerMas.setAttribute("src", "./assets/CTA-ver-mas.svg") //Agregado

        btnCrearGifoNoche.style.display="none";
        btnCrearGifo.style.display="block";

    } else {

        logoDesktop.setAttribute("src", "./assets/Logo-modo-noc.svg");
        logoMobile.setAttribute("src", "./assets/logo-mobile-modo-noct.svg");
        btnBurguer.setAttribute("src", "./assets/burger-modo-noct.svg"); 
        btnCloseBurguer.setAttribute("src", "./assets/close-modo-noct.svg");

        botonVerMas.setAttribute("src", "./assets/CTA-ver+-modo-noc.svg")  //Agregado

        btnCrearGifoNoche.style.display="block"
        btnCrearGifo.style.display="none"
    }
}

function cambiarBtnCrear(){
    if (window.matchMedia("(min-width: 900px)").matches){
        console.log("Funciono");
    } else {
        
        btnCrearGifoNoche.style.display="none";
        btnCrearGifo.style.display="none";  //Estaba none
    }
}

function cambioLupaYClose(){
    
    if (btnModoNocturno.innerHTML == 'MODO NOCTURNO') {

        lupaFijaCambio.setAttribute("src", "./assets/icon-search.svg");
        btnCloseSearchNoche.setAttribute("src", "./assets/close.svg")
    
    } else {

        lupaFijaCambio.setAttribute("src", "./assets/icon-search-modo-noct.svg");
        btnCloseSearchNoche.setAttribute("src", "./assets/close-modo-noct.svg");  
    }
}

function cambiarCamaras() {

    if (btnModoNocturno.innerHTML == 'MODO NOCTURNO') {
        imagenCamara.setAttribute("src", "./assets/camara.svg");
        imagenCarrete.setAttribute("src", "./assets/pelicula.svg");
    } else {
        imagenCamara.setAttribute("src", "./assets/camara-modo-noc.svg");
        imagenCarrete.setAttribute("src", "./assets/pelicula-modo-noc.svg");
    }
}
////////////////////////////////////////////////////////////////////////////////