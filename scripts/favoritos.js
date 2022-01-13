/////////////////////////////////////////////////////////////////////////////////////////
const elApiKey                     =                  "xvmqWbMiJxUysGNV2VzLVSGzt6sFhgrO";
///// Variables a usar
let contenedorFavoritosConImagenes = document.querySelector("#contenedorBusquedaGifFav");
let contenedorFavoritosVacio       =        document.querySelector(".gifFavoritosVacio");
let contImagenesTraidasApi         =            document.getElementById("cont-grid-fav");
const urlSearchGifById             =                     "https://api.giphy.com/v1/gifs";
let btnVerMasFav                   =             document.querySelector(".btnVerMasFav");
/////Se trae los Ids de los giff seleccionados como favoritos
let arregloIdsDeFavoritos          = [];
let stringIdsDeFavoritos           =               localStorage.getItem("idGifAgregado");

//let urlActual = window.location.pathname; //Para borrar

function traerFavoritos(){
    // Disyunción, es verdadero si se cumple una de las dos (ambas inclusive)
    if(stringIdsDeFavoritos == null || stringIdsDeFavoritos == "[]"){
        contenedorFavoritosVacio.style.display="block";
        contenedorFavoritosConImagenes.style.display="none";

    } else{
        arregloIdsDeFavoritos = JSON.parse(stringIdsDeFavoritos);
        let arregloIdsListos = arregloIdsDeFavoritos;
        return arregloIdsListos;
    } 
}

let arregloIdsRetornados=traerFavoritos();
///// Se consume la informacion de la API para traer los Giffs por medio de los ID´s traidos
async function buscarGifosPorId(){
    const response = await fetch(urlSearchGifById+"?api_key="+elApiKey+"&ids="+arregloIdsRetornados);
    const dataGiphy = await response.json();
    let arregloGifsListo = dataGiphy.data;
    return arregloGifsListo;
}
function funcionBuscarGifFav(){
    let arregloGifsListoTraido=buscarGifosPorId();
    arregloGifsListoTraido.then((arregloGifs)=>{
        crearGifHTML(arregloGifs);
    })
}
funcionBuscarGifFav()
//Crea las imágenes con las url que haya
function crearGifHTML(arregloGifos){
    for(let i=0; i<arregloGifos.length; i++){
        const urlImageFav=arregloGifos[i].images.downsized.url;
        
        const imageTitle=arregloGifos[i].title;
        const imageUser=arregloGifos[i].username;
        const nameImgFav=arregloGifos[i].slug;
        const imagenId=arregloGifos[i].id;

        let imgTrendFav=document.createElement("img");
        imgTrendFav.src=urlImageFav;
        imgTrendFav.classList.add("imgFav");
        imgTrendFav.alt=imageTitle;
        imgTrendFav.id="imgFav"+i;

        let btnCloseFav=document.createElement("img");
        btnCloseFav.src="./assets/close.svg";
        btnCloseFav.classList.add("closeFav"); 
        btnCloseFav.id="closeFav"+i;

        let btnCloseFavMobile=document.createElement("img");
        btnCloseFavMobile.src="./assets/close.svg";
        btnCloseFavMobile.classList.add("closeFavMobile");
        btnCloseFavMobile.id="closeFavMobile"+i;

        let divMinicontFav=document.createElement("div");
        divMinicontFav.classList.add("miniContFav");
        divMinicontFav.id="contFav"+i;
        

        let divIconsFav=document.createElement("div");
        divIconsFav.classList.add("contIconsFav"); 
        divIconsFav.id="iconsFav"+i;

        let divInfoFav=document.createElement("div");
        divInfoFav.classList.add("contInfoFav");  
        divInfoFav.id="infoFav"+i;

        let botonFav=document.createElement("div");
        botonFav.classList.add("botonFav")
        botonFav.id="botonFav"+i;

        let imgFavFav=document.createElement("img");
        imgFavFav.src="./assets/icon-fav-active.svg";
        imgFavFav.classList.add("favFav");
        imgFavFav.id="favFav"+i;
        //Evento click para "desfavoritear" la imagen seleccionada
        imgFavFav.addEventListener("click", ()=>{
        
            let favDesactivado=document.querySelector("#favFav"+i);
            favDesactivado.setAttribute("src", "./assets/icon-fav-hover.svg");
            
            desfavoritear(imagenId);
        })

        botonFav.appendChild(imgFavFav);

        let imgDownFav=document.createElement("img");
        imgDownFav.src="./assets/icon-download.svg";
        imgDownFav.classList.add("downFav"); 
        imgDownFav.id="downFav"+i;
        //Evento click para descargar el giff seleccionado
        imgDownFav.addEventListener("click", async ()=>{
            let blob = await fetch(urlImageFav).then(img => img.blob());; 
            invokeSaveAsDialog(blob, nameImgFav + ".gif");
        })

        let imgMaxFav=document.createElement("img");
        imgMaxFav.src="./assets/icon-max-normal.svg";
        imgMaxFav.classList.add("maxFav");
        imgMaxFav.id="maxFav"+i;

        let userGifoFav=document.createElement("p");
        userGifoFav.classList.add("userFav"); 
        userGifoFav.textContent=imageUser;
        userGifoFav.id="userFav"+i;

        let titleGifoFav=document.createElement("h3");
        titleGifoFav.classList.add("tituloGifoFav"); 
        titleGifoFav.textContent=imageTitle;
        titleGifoFav.id="titleFav"+i;

        divIconsFav.appendChild(botonFav);
        divIconsFav.appendChild(imgDownFav);
        divIconsFav.appendChild(imgMaxFav);
        divInfoFav.appendChild(userGifoFav);
        divInfoFav.appendChild(titleGifoFav);
        divMinicontFav.appendChild(imgTrendFav);
        divMinicontFav.appendChild(btnCloseFav); 
        divMinicontFav.appendChild(btnCloseFavMobile);
        divMinicontFav.appendChild(divIconsFav);
        divMinicontFav.appendChild(divInfoFav);
        contImagenesTraidasApi.appendChild(divMinicontFav);
    }
    
    // Pone el efecto de mostrar los ícocnos sobre la imágen 
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#contFav"+i).addEventListener("mouseover", ()=>{
            document.querySelector("#iconsFav"+i).classList.toggle("showIconsFav");
            document.querySelector("#infoFav"+i).style.display="block";  
        })
        document.querySelector("#contFav"+i).addEventListener("mouseout", ()=>{
            document.querySelector("#iconsFav"+i).classList.toggle("showIconsFav");
            document.querySelector("#infoFav"+i).style.display="none";
       })
    }
    // Efefcto ligthbox a las imágenes
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#maxFav"+i).addEventListener("click", ()=>{
            
            document.querySelector("#contFav"+i).classList.toggle("miniContFav");
            document.querySelector("#contFav"+i).classList.toggle("miniContFavMax");

            document.querySelector("#imgFav"+i).classList.toggle("imgFav");
            document.querySelector("#imgFav"+i).classList.toggle("imgFavMax");

            document.querySelector("#iconsFav"+i).classList.toggle("contIconsFav");
            document.querySelector("#iconsFav"+i).classList.toggle("contIconsFavMax");

            document.querySelector("#infoFav"+i).classList.toggle("contInfoFav");
            document.querySelector("#infoFav"+i).classList.toggle("contInfoFavMax");

            document.querySelector("#maxFav"+i).classList.toggle("maxFav");
            document.querySelector("#maxFav"+i).classList.toggle("maxFavMax");

            document.querySelector("#userFav"+i).classList.toggle("userFav");
            document.querySelector("#userFav"+i).classList.toggle("userFavMax");

            document.querySelector("#titleFav"+i).classList.toggle("tituloGifoFav");
            document.querySelector("#titleFav"+i).classList.toggle("tituloGifoFavMax");

            document.querySelector("#closeFav"+i).classList.toggle("closeFav");
            document.querySelector("#closeFav"+i).classList.toggle("closeFavMax");

            document.querySelector("#downFav"+i).classList.toggle("downFav");
            document.querySelector("#downFav"+i).classList.toggle("downFavMax");

            document.querySelector("#botonFav"+i).classList.toggle("botonFav");
            document.querySelector("#botonFav"+i).classList.toggle("botonFavMax");
        })
    }
    // Cierra la imágen ampliada y muestra la galeria nuevamente
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#closeFav"+i).addEventListener("click", ()=>{
            console.log("voy a empezar a cerrar");
            document.querySelector("#contFav"+i).classList.toggle("miniContFav");
            document.querySelector("#contFav"+i).classList.toggle("miniContFavMax");

            document.querySelector("#imgFav"+i).classList.toggle("imgFav");
            document.querySelector("#imgFav"+i).classList.toggle("imgFavMax");

            document.querySelector("#iconsFav"+i).classList.toggle("contIconsFav");
            document.querySelector("#iconsFav"+i).classList.toggle("contIconsFavMax");

            document.querySelector("#infoFav"+i).classList.toggle("contInfoFav");
            document.querySelector("#infoFav"+i).classList.toggle("contInfoFavMax");

            document.querySelector("#maxFav"+i).classList.toggle("maxFav");
            document.querySelector("#maxFav"+i).classList.toggle("maxFavMax");

            document.querySelector("#userFav"+i).classList.toggle("userFav");
            document.querySelector("#userFav"+i).classList.toggle("userFavMax");

            document.querySelector("#titleFav"+i).classList.toggle("tituloGifoFav");
            document.querySelector("#titleFav"+i).classList.toggle("tituloGifoFavMax");

            document.querySelector("#closeFav"+i).classList.toggle("closeFav");
            document.querySelector("#closeFav"+i).classList.toggle("closeFavMax");

            document.querySelector("#downFav"+i).classList.toggle("downFav");
            document.querySelector("#downFav"+i).classList.toggle("downFavMax");

            document.querySelector("#botonFav"+i).classList.toggle("botonFav");
            document.querySelector("#botonFav"+i).classList.toggle("botonFavMax");
        })
    }
    //Efecto lightbox a las imágenes en dispositivos mobiles
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#contFav"+i).addEventListener("click", ()=>{
            //alert("dio click")
            document.querySelector("#contFav"+i).classList.toggle("miniContFavMaxMobile");

            document.querySelector("#imgFav"+i).classList.toggle("imgFavMaxMobile");
            
            document.querySelector("#iconsFav"+i).classList.toggle("contIconsFavMaxMobile");

            document.querySelector("#infoFav"+i).classList.toggle("contInfoFavMaxMobile");

            document.querySelector("#maxFav"+i).classList.toggle("maxFavMaxMobile");

            document.querySelector("#userFav"+i).classList.toggle("userFavMaxMobile");

            document.querySelector("#titleFav"+i).classList.toggle("tituloGifoFavMaxMobile");

            document.querySelector("#closeFavMobile"+i).classList.toggle("closeFavMobileMax");

            document.querySelector("#downFav"+i).classList.toggle("downFavMaxMobile");

            document.querySelector("#botonFav"+i).classList.toggle("botonContFavMaxMobile");
        })
       
    }
}
///// Borra los favoritos al dar en el corazón
function desfavoritear(idGifFav){
    let arrayBorrarGifFav = [];
    arrayBorrarGifFav = JSON.parse(stringIdsDeFavoritos);
    
    let posicionGiff = arrayBorrarGifFav.indexOf(idGifFav);
    arrayBorrarGifFav.splice(posicionGiff, 1);

    let nuevoStringIdsDeFavoritos = JSON.stringify(arrayBorrarGifFav);
    localStorage.setItem("idGifAgregado", nuevoStringIdsDeFavoritos);
    location.reload();
}
///////////////////////////////////////////////////////////////////////////////////////////////////