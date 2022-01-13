///////// Scripts para animaciones varias //////////////////////////////
/////////////////// Efecto hover al boton Crear Giff día///////////////
let arraySrcBtnCrearGiff=[
    "./assets/CTA-crear-gifo-hover.svg",
    "./assets/button-crear-gifo.svg"
]

const btnGifo=document.getElementById("btnCrearGifo");
let c=0;

const showImgBtnCrearGiff=()=>{
    btnGifo.src=arraySrcBtnCrearGiff[c];
    c=(c<arraySrcBtnCrearGiff.length-1) ? c+1:0;
}

btnGifo.addEventListener("mouseover", showImgBtnCrearGiff);
btnGifo.addEventListener("mouseout", showImgBtnCrearGiff);

///////////////// Efecto hover al boton Crear Giff noche///////////////
let arraySrcBtnCrearGiffNoche=[
    "./assets/CTA-crear-gifo-hover-modo-noc.svg",
    "./assets/CTA-crear-gifo-modo-noc.svg"
]

const btnGifoNoche=document.getElementById("btnCrearGifoNoche");
let f=0;

const showImgBtnCrearGiffNoche=()=>{
    btnGifoNoche.src=arraySrcBtnCrearGiffNoche[f];
    f=(f<arraySrcBtnCrearGiffNoche.length-1) ? f+1:0;
}

btnGifoNoche.addEventListener("mouseover", showImgBtnCrearGiffNoche);
btnGifoNoche.addEventListener("mouseout", showImgBtnCrearGiffNoche);

/////////////////////////// Efecto hover al boton ver mas Giff///////////////
let arraySrcBtnVerMas=[
    "./assets/CTA-ver-mas-hover.svg",
    "./assets/CTA-ver-mas.svg"
]

const btnVerMasGifos=document.getElementById("btnVerMasGif");
let b=0;

const showImgBtnVerMas=()=>{
    btnVerMasGifos.src=arraySrcBtnVerMas[b];
    b=(b<arraySrcBtnVerMas.length-1) ? b+1:0;
}

btnVerMasGifos.addEventListener("mouseover", showImgBtnVerMas);
btnVerMasGifos.addEventListener("mouseout", showImgBtnVerMas);

///////////////////////////Efecto Hover al footer ///////////////////////////
let arraySrcFacebook=[
    "./assets/icon_facebook_hover.svg",
    "./assets/icon_facebook.svg"
]

let arraySrcTwiter=[
    "./assets/icon-twitter-hover.svg",
    "./assets/icon-twitter.svg"
]

let arraySrcInstagram=[
    "./assets/icon_instagram-hover.svg",
    "./assets/icon_instagram.svg"
]

const facebook =  document.getElementById("facebook");
let twiter     =    document.getElementById("twiter");
let instagram  = document.getElementById("instagram");
let a=0;

const showImgFacebook=()=>{
    facebook.src=arraySrcFacebook[a];
    a=(a<arraySrcFacebook.length-1) ? a+1:0;
}

const showImgTwiter=()=>{
    twiter.src=arraySrcTwiter[a];
    a=(a<arraySrcTwiter.length-1) ? a+1:0;
}

const showImgInstagram=()=>{
    instagram.src=arraySrcInstagram[a];
    a=(a<arraySrcInstagram.length-1) ? a+1:0;
}

facebook.addEventListener("mouseover", showImgFacebook);
facebook.addEventListener("mouseout", showImgFacebook);

twiter.addEventListener("mouseover", showImgTwiter);
twiter.addEventListener("mouseout", showImgTwiter);

instagram.addEventListener("mouseover", showImgInstagram);
instagram.addEventListener("mouseout", showImgInstagram);

////////////// Script para Menú Hamburguesa     ///////////////////
const navToggle      =       document.querySelector(".nav-toggle");
const navMenu        =         document.querySelector(".nav-menu");
const navToggleClose = document.querySelector(".nav-toggle-close");          

navToggle.addEventListener("click", ()=>{
    navMenu.classList.toggle("nav-menu_vissible");
    navToggle.style.display="none";
    navToggleClose.style.display="block";
})
navToggleClose.addEventListener("click", ()=>{
    navMenu.classList.toggle("nav-menu_vissible");
    navToggle.style.display="block";
    navToggleClose.style.display="none";
})
////////////////////////////////////////////////////////////////////