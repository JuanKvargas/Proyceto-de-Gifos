////////////////////////////////////////////////////////////////////////////////////////////////////
///// Variables para el request a la API
let urlTrendingSearchTermsApi    =  "https://api.giphy.com/v1/trending/searches";
let urlSearchSugestions          =      "https://api.giphy.com/v1/tags/related/";
let urlSearchTerms               =        "https://api.giphy.com/v1/gifs/search";
let miApiKey                     =            "xvmqWbMiJxUysGNV2VzLVSGzt6sFhgrO";

///// Variables necesarias
let contenedorResultadosBusqueda = document.getElementById("contenedorBusqueda");
let topicosListos                =   document.getElementById("contenedorTrends"); 
let listaSugerencias             =     document.getElementById('searchSuggests'); 
let contSugerencias              =     document.getElementById("searchSuggests");
let btnClosSearch                =     document.getElementById("btnCloseSearch");  
let barraBusqueda                =      document.getElementById("barraBusqueda");
let btnVerMasGif                 =       document.getElementById("btnVerMasGif");
let lupaSearch                   =         document.getElementById("lupaSearch");
let imagenesTraidasDeAPI         =          document.getElementById("cont-grid"); 
let busquedaLista                =           document.getElementById("busqueda");
let lupaFija                     =           document.getElementById("lupaFija");

let numeroUno=0;
let numeroDos=12;

/////////////////////// Consumiendo la Información de la API ////////////////////
/////Trae los 5 trendings tendencia para poner en los tópics
async function buscarTrendingsTerms(){
    const response=await fetch(urlTrendingSearchTermsApi+"?api_key="+miApiKey);
    const dataGiphy=await response.json();
    let arrayTrendings=dataGiphy.data;
    arrayTrendings.splice(0,15);
    return arrayTrendings;
}
///// Trae las 4 sugerencias para que se muestren debajo de la barra de búsqueda
async function buscarSugerencias(term){
    const response=await fetch(urlSearchSugestions+term+"?api_key="+miApiKey+"&limit=4");
    const dataGiphy=await response.json();
    let arraySugerencias=dataGiphy.data;
    return arraySugerencias;
}
///// Busca los Gifs para mostrar de 12 en 12
async function buscarSearchTerms(){
    
    let urlBusqueda=urlSearchTerms+"?api_key="+miApiKey+"&limit=50"+"&q=";
    let strBusqueda=barraBusqueda.value.trim();
    urlBusqueda=urlBusqueda.concat(strBusqueda);
    const response=await fetch(urlBusqueda);
    const dataGiphy=await response.json();
    let arrayGifos=dataGiphy.data;
    
    return arrayGifos;
}

//////////////////////////// Declarando las funciones a usar ////////////////////
///// Se traen los 5 trendings topics
window.onload = trendingTopics();
function trendingTopics(){
    let arrayTrendingsListo=buscarTrendingsTerms();
    arrayTrendingsListo.then((arrayTopics)=>{
        
        for(let i=0; i<arrayTopics.length; i++){
            const topic=arrayTopics[i];
            let spanTrending=document.createElement("span");
            spanTrending.classList.add("topicoCreado");
            spanTrending.textContent=topic+",";
            topicosListos.appendChild(spanTrending);
        }
        let topico = document.getElementsByClassName("topicoCreado");
        
        for (let i = 0; i < topico.length; i++) {
            topico[i].addEventListener("click", (event)=>{
                let titulo=arrayTopics[i];
                barraBusqueda.value = titulo;
                funcionBuscaGiffos();
            })
        }
    })
    .catch(error => {
        console.log("error trending topics" + error);
    })
}
///// Ocurren todos los eventos en la barra de búsqueda
//Al presionar cualquier botón
barraBusqueda.addEventListener("keyup", ()=>{   
    inputConSugerencias();                           
})
// Se muestra las sugerencias en la barra de búsqueda
function inputConSugerencias() {
    let busqueda = barraBusqueda.value;
    //Expande la barra de búsqueda
    busquedaLista.classList.remove("busqueda"); 
    busquedaLista.classList.add("busquedaAbierta");  
    lupaFija.style.display = "none";
    btnClosSearch.style.display = "block";
    if (busqueda.length >= 1) {

        let arraySugerencias=buscarSugerencias(busqueda);
        arraySugerencias.then((array)=>{
            sugerenciasCreadas(array); 
        })
        .catch(error =>{
            console.error("Error al traer las sugerencias",error);
        })
    } else {
        
        cerrarBarraInputBusqueda();
    }
}
function sugerenciasCreadas(arraySugerencias) {
    contSugerencias.innerHTML="";

    for(let i=0; i<arraySugerencias.length; i++){
        const textoSugiere=arraySugerencias[i].name;
        let liCont=document.createElement("li");
        liCont.classList.add("sugerencia");

        let imgLupa=document.createElement("img");
        imgLupa.classList.add("lupaSugerencias");
        imgLupa.alt="lupaSugerencias";
        imgLupa.src="./assets/icon-search.svg";

        let pSugiere=document.createElement("p");
        pSugiere.classList.add("textoSugerencia");
        pSugiere.textContent=textoSugiere;

        liCont.appendChild(imgLupa);
        liCont.appendChild(pSugiere);

        contSugerencias.appendChild(liCont);
    } 
}
// Se cierrra la barra de busqueda
function cerrarBarraInputBusqueda() {
    contSugerencias.innerHTML="";
    busquedaLista.classList.add("busqueda");  
    busquedaLista.classList.remove("busquedaAbierta"); 
    lupaFija.style.display = "block";
    btnClosSearch.style.display = "none"; 
}
// Cerrar la búsqueda con la equis
btnClosSearch.addEventListener("click", (event)=>{
    contSugerencias.innerHTML="";
    cerrarInputBusqueda();
})
function cerrarInputBusqueda() {
    contSugerencias.innerHTML="";
    barraBusqueda.value = ""; 
    barraBusqueda.placeholder = "Busca GIFOS y más";
    busquedaLista.classList.add("busqueda"); 
    busquedaLista.classList.remove("busquedaAbierta"); 
    lupaFija.style.display = "block";
    btnClosSearch.style.display = "none";
}
// Evento click para buscar Gifs al clickear sobre una sugerencia
listaSugerencias.addEventListener("click", (event)=>{
    barraBusqueda.value=event.target.textContent;        
    funcionBuscaGiffos();
})

// Se hace la búsqueda cuando se da click en la lupa
lupaSearch.addEventListener("click", (event)=>{             
    funcionBuscaGiffos();
})
barraBusqueda.addEventListener("keyup", (event)=>{          
    contSugerencias.innerHTML="";
    if(event.keyCode === 13){
        funcionBuscaGiffos();
    }
})
///// Se muestran los primeros 12 Gifos 
function funcionBuscaGiffos(){
    event.preventDefault();
    let arrayGifosTraido=buscarSearchTerms()
    arrayGifosTraido.then((arreglo)=>{
        imagenesTraidasDeAPI.innerHTML = "";
        contSugerencias.innerHTML="";
        contenedorResultadosBusqueda.style.display = "block";

        let tituloBusqueda = document.getElementById("tituloDinámico");
        tituloBusqueda.innerHTML = barraBusqueda.value;

        if (arreglo == 0) {
            let divError=document.createElement("div");
            divError.classList.add("divContError");

            let imgError=document.createElement("img");
            imgError.classList.add("imgError");
            imgError.alt="Busqueda sin resultado";
            imgError.src="./assets/icon-busqueda-sin-resultado.svg";

            let tituloError=document.createElement("h3");
            tituloError.classList.add("textoError");
            tituloError.textContent="Intenta con otra búsqueda";

            divError.appendChild(imgError);
            divError.appendChild(tituloError);

            imagenesTraidasDeAPI.appendChild(divError);
            btnVerMasGif.style.display = "none";

        } else if(arreglo >= 48){
            btnVerMasGif.style.display = "none";
        } else{
            traerBusqueda(arreglo,numeroUno,numeroDos);
        }
    })
    .catch(error => {
        console.log("error busqueda" + error);
    })
    cerrarBarraInputBusqueda();
}
///// Crea la grid con los 12 Giffs en HTML
function traerBusqueda(arreglo,numero1,numero2){
    for(let i=numero1; i<numero2; i++){
        const urlImage=arreglo[i].images.downsized.url;
        const imageTitle=arreglo[i].title;
        const imageUser=arreglo[i].username;
        const nameImg=arreglo[i].slug;
        const imagenId=arreglo[i].id;

        let imgTrend=document.createElement("img");
        imgTrend.src=urlImage;
        imgTrend.classList.add("img","img-"+i);
        imgTrend.alt=imageTitle;
        imgTrend.id="img"+i;

        let btnClose=document.createElement("img");
        btnClose.src="./assets/close.svg";
        btnClose.classList.add("close");
        btnClose.id="close"+i;

        let btnCloseMobile=document.createElement("img");
        btnCloseMobile.src="./assets/close.svg";
        btnCloseMobile.classList.add("closeMobile");
        btnCloseMobile.id="closeMobile"+i;

        let divMinicont=document.createElement("div");
        divMinicont.classList.add("miniCont");
        divMinicont.id="cont"+i;
        
        let divIcons=document.createElement("div");
        divIcons.classList.add("contIcons");
        divIcons.id="icons"+i;

        let divInfo=document.createElement("div");
        divInfo.classList.add("contInfo");
        divInfo.id="info"+i;

        let imgFav=document.createElement("img");
        imgFav.src="./assets/icon-fav.svg";
        imgFav.classList.add("fav");
        imgFav.id="fav"+i;

        let botonContFav=document.createElement("div");
        botonContFav.classList.add("botonContFav");
        botonContFav.id="botonContFav"+i;
        //Evento click para marcar un Giff como favorito
        botonContFav.addEventListener("click", ()=>{
            //Activa el ícono de favorito
            let iconoFavorito=document.querySelector("#fav"+i);
            iconoFavorito.setAttribute("src", "./assets/icon-fav-active.svg");

            favoritearImagen(imagenId);
        })

        botonContFav.appendChild(imgFav);

        let imgDown=document.createElement("img");
        imgDown.src="./assets/icon-download.svg";
        imgDown.classList.add("down");
        imgDown.id="down"+i;
        //Evento click para descargar el giff seleccionado
        imgDown.addEventListener("click", async ()=>{
            let blob = await fetch(urlImage).then(img => img.blob());; 
            invokeSaveAsDialog(blob, nameImg + ".gif");
        })

        let imgMax=document.createElement("img");
        imgMax.src="./assets/icon-max-normal.svg";
        imgMax.classList.add("max");
        imgMax.id="max"+i;

        let userGifo=document.createElement("p");
        userGifo.classList.add("user");
        userGifo.textContent=imageUser;
        userGifo.id="user"+i;

        let titleGifo=document.createElement("h3");
        titleGifo.classList.add("tituloGifo");
        titleGifo.textContent=imageTitle;
        titleGifo.id="title"+i;

        divIcons.appendChild(botonContFav);
        divIcons.appendChild(imgDown);
        divIcons.appendChild(imgMax);
        divInfo.appendChild(userGifo);
        divInfo.appendChild(titleGifo);
        divMinicont.appendChild(imgTrend);
        divMinicont.appendChild(btnClose);
        divMinicont.appendChild(btnCloseMobile);
        divMinicont.appendChild(divIcons);
        divMinicont.appendChild(divInfo);
        imagenesTraidasDeAPI.appendChild(divMinicont);
        

    }
    // Pone el efecto de mostrar los ícocnos sobre la imágen 
    for(let i=numero1; i<numero2; i++){
        document.querySelector("#cont"+i).addEventListener("mouseover", ()=>{
            document.querySelector("#icons"+i).classList.toggle("showIcons");
            document.querySelector("#info"+i).style.display="block";  
        })
        document.querySelector("#cont"+i).addEventListener("mouseout", ()=>{
            document.querySelector("#icons"+i).classList.toggle("showIcons");
            document.querySelector("#info"+i).style.display="none";
       })
    }
    // Efefcto ligthbox a las imágenes
    for(let i=numero1; i<numero2; i++){
        document.querySelector("#max"+i).addEventListener("click", ()=>{
        
            document.querySelector("#cont"+i).classList.toggle("miniCont");
            document.querySelector("#cont"+i).classList.toggle("miniContMax"); //Listo

            document.querySelector("#img"+i).classList.toggle("img");
            document.querySelector("#img"+i).classList.toggle("imgMax");  //Listo

            document.querySelector("#icons"+i).classList.toggle("contIcons");
            document.querySelector("#icons"+i).classList.toggle("contIconsMax");  //Listo

            document.querySelector("#info"+i).classList.toggle("contInfo");
            document.querySelector("#info"+i).classList.toggle("contInfoMax"); //Listo

            document.querySelector("#max"+i).classList.toggle("max");
            document.querySelector("#max"+i).classList.toggle("maxMax");  //Listo

            document.querySelector("#user"+i).classList.toggle("user");
            document.querySelector("#user"+i).classList.toggle("userMax");  //Listo

            document.querySelector("#title"+i).classList.toggle("tituloGifo");
            document.querySelector("#title"+i).classList.toggle("tituloGifoMax"); //Listo

            document.querySelector("#close"+i).classList.toggle("close");
            document.querySelector("#close"+i).classList.toggle("closeMax");  //Listo

            document.querySelector("#down"+i).classList.toggle("down");
            document.querySelector("#down"+i).classList.toggle("downMax");  //Listo

            document.querySelector("#botonContFav"+i).classList.toggle("botonContFav");
            document.querySelector("#botonContFav"+i).classList.toggle("botonContFavMax");
        })
    }
    // Cierra la imágen ampliada y muestra la galeria nuevamente
    for(let i=numero1; i<numero2; i++){
        document.querySelector("#close"+i).addEventListener("click", ()=>{
            
            document.querySelector("#cont"+i).classList.toggle("miniCont");
            document.querySelector("#cont"+i).classList.toggle("miniContMax");

            document.querySelector("#img"+i).classList.toggle("img");
            document.querySelector("#img"+i).classList.toggle("imgMax");

            document.querySelector("#icons"+i).classList.toggle("contIcons");
            document.querySelector("#icons"+i).classList.toggle("contIconsMax");

            document.querySelector("#info"+i).classList.toggle("contInfo");
            document.querySelector("#info"+i).classList.toggle("contInfoMax");

            document.querySelector("#max"+i).classList.toggle("max");
            document.querySelector("#max"+i).classList.toggle("maxMax");

            document.querySelector("#user"+i).classList.toggle("user");
            document.querySelector("#user"+i).classList.toggle("userMax");

            document.querySelector("#title"+i).classList.toggle("tituloGifo");
            document.querySelector("#title"+i).classList.toggle("tituloGifoMax");

            document.querySelector("#close"+i).classList.toggle("close");
            document.querySelector("#close"+i).classList.toggle("closeMax");

            document.querySelector("#down"+i).classList.toggle("down");
            document.querySelector("#down"+i).classList.toggle("downMax");

            document.querySelector("#botonContFav"+i).classList.toggle("botonContFav");
            document.querySelector("#botonContFav"+i).classList.toggle("botonContFavMax");
        })
    }
    //Efecto lidgtbox a las imágenes en dispositivos mobiles
    for(let i=numero1; i<numero2; i++){
        document.querySelector("#cont"+i).addEventListener("click", ()=>{
            //alert("Hola")
            document.querySelector("#cont"+i).classList.toggle("miniContMaxMobile");
            //document.querySelector("#cont"+i).classList.remove("miniCont");

            document.querySelector("#img"+i).classList.toggle("imgMaxMobile");
            //document.querySelector("#img"+i).classList.remove("img");
            
            document.querySelector("#icons"+i).classList.toggle("contIconsMaxMobile");

            document.querySelector("#info"+i).classList.toggle("contInfoMaxMobile");

            document.querySelector("#max"+i).classList.toggle("maxMaxMobile");
            

            document.querySelector("#user"+i).classList.toggle("userMaxMobile");

            document.querySelector("#title"+i).classList.toggle("tituloGifoMaxMobile");

            document.querySelector("#closeMobile"+i).classList.toggle("closeMobileMax");

            document.querySelector("#down"+i).classList.toggle("downMaxMobile");

            document.querySelector("#botonContFav"+i).classList.toggle("botonContFavMaxMobile");
        })
       
    }
    
}
///// Evento click al boton ver mas para mostrar otras 12 imágenes
btnVerMasGif.addEventListener("click", (event)=>{
    verMasResultados();
})
function verMasResultados() {
    numeroUno=numeroUno+12;
    numeroDos=numeroDos+12;
    buscaGiffosVerMas();
}
function buscaGiffosVerMas(){     
    event.preventDefault();
    let arrayGifosTraido=buscarSearchTerms()
    arrayGifosTraido.then((arreglo)=>{
        
        contenedorResultadosBusqueda.style.display = "block";

        let tituloBusqueda = document.getElementById('tituloDinámico');
        tituloBusqueda.innerHTML = barraBusqueda.value;

        if (arreglo == 0) {

            let divError=document.createElement("div");
            divError.classList.add("divContError");

            let imgError=document.createElement("img");
            imgError.classList.add("imgError");
            imgError.alt="Busqueda sin resultado";
            imgError.src="./assets/icon-busqueda-sin-resultado.svg";

            let tituloError=document.createElement("h3");
            tituloError.classList.add("textoError");
            tituloError.textContent="Intenta con otra búsqueda";

            divError.appendChild(imgError);
            divError.appendChild(tituloError);

            imagenesTraidasDeAPI.appendChild(divError);
            btnVerMasGif.style.display = "none";

        } else {
            traerBusqueda(arreglo,numeroUno,numeroDos);
        }
    })
    .catch(error => {
        console.log("error busqueda de Giffs" + error);
    })

    cerrarBarraInputBusqueda();
}

//////////////////////////// Lo que ocurre al dar click en el icono favoritos //
// Se crea un arreglo de Id´s de favoritos vacío
arregloIdsDeFavoritos = [];
// Se invoca la información que haya en el local storage (haya o no)
stringIdsDeFavoritos = localStorage.getItem("idGifAgregado");
// Se crea la función para favoritear una imágen
function favoritearImagen(gifId){
    //Si el usuario no ha escogido favoritos, el localstorage esta vacio y el arreglo no tiene elementos
    if (stringIdsDeFavoritos == null){
        arregloIdsDeFavoritos = [];
    } else{
        // Si del local storage se trae contenido, éste se parsea para agregarlo al array de ID´s
        arregloIdsDeFavoritos = JSON.parse(stringIdsDeFavoritos);
    }
    // Se "empuja" el Id del gif seleccionado al arreglo de Id´s
    arregloIdsDeFavoritos.push(gifId);
    
    // se hace string y se sube el localstorage para recuperarlo en favoritos
    stringIdsDeFavoritos = JSON.stringify(arregloIdsDeFavoritos);
    localStorage.setItem("idGifAgregado", stringIdsDeFavoritos);
}
////////////////////////////////////////////////////////////////////////////////////////////////////