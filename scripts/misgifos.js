///////////////////// Script para mis gifos/////////////////////////////////////////////////
const elApiKy                     =                     "xvmqWbMiJxUysGNV2VzLVSGzt6sFhgrO";
///// Variables necesarias
let contenedorMisGifosConImagenes =  document.getElementById("contenedorBusquedaMisGifos");
let contImagenesCreadasTraidasApi =            document.getElementById("contGridMisGifos");
const urlBusquedaGiffoPorId       =                        "https://api.giphy.com/v1/gifs";
let contenedorMisGifosVacio       =           document.getElementById("contMisGifosVacio");
///// Trayendo los Ids de los Giffs creados.
let stringIdsDeGifCreados         =               localStorage.getItem("idMisGifosCreados");
let arrayDeIdsGifCreados = [];
//let urlActual = window.location.pathname;

function traerGifosCreados(){
    // Disyunción, es verdadero si se cumple una de las dos (ambas inclusive)
    if(stringIdsDeGifCreados == null || stringIdsDeGifCreados == "[]"){
        contenedorMisGifosVacio.style.display="block";
        contenedorMisGifosConImagenes.style.display="none";
        //console.log("en el local storage no hay nada")

    } else{
        arrayDeIdsGifCreados = JSON.parse(stringIdsDeGifCreados);
        let arregloIdsGifsCreadosTraidos = arrayDeIdsGifCreados;
        return arregloIdsGifsCreadosTraidos;
    } 
}
traerGifosCreados();

let arregloIdsGifCreadosRetornados=traerGifosCreados();

///// Se consume la informacion de la API para traer los giffs por medio de los Ids que se traen desde "Crear Giff"
async function searchGifById(){
    const response = await fetch(urlBusquedaGiffoPorId+"?api_key="+elApiKy+"&ids="+arregloIdsGifCreadosRetornados);
    const dataGiphy = await response.json();
    let arregloGifCreadossListo = dataGiphy.data;
    return arregloGifCreadossListo;
}

function funcionBuscarGifCreado(){
    let arregloGifsCreadoListoTraido=searchGifById();
    arregloGifsCreadoListoTraido.then((arregloGifsCreados)=>{
        crearMiGifHTML(arregloGifsCreados);
    })
}
funcionBuscarGifCreado()
///// Crea los giffs HTML
function crearMiGifHTML(arregloGifos){
    for(let i=0; i<arregloGifos.length; i++){
        const urlImageMiGif=arregloGifos[i].images.downsized.url;
        const imageTitleMiGif=arregloGifos[i].title;
        const imageUserMisGif=arregloGifos[i].username;
        const nameImgMisGif=arregloGifos[i].slug;
        const imagenIdGif=arregloGifos[i].id;

        let imgMisGif=document.createElement("img");
        imgMisGif.src=urlImageMiGif;
        imgMisGif.classList.add("imgMisGif");
        imgMisGif.alt=nameImgMisGif;
        imgMisGif.id="imgMisGif"+i;

        let btnCloseMisGif=document.createElement("img");
        btnCloseMisGif.src="./assets/close.svg";
        btnCloseMisGif.classList.add("closeMisGif"); 
        btnCloseMisGif.id="closeMisGif"+i;

        let btnCloseMisGifMobile=document.createElement("img");
        btnCloseMisGifMobile.src="./assets/close.svg";
        btnCloseMisGifMobile.classList.add("closeMisGifMobile");
        btnCloseMisGifMobile.id="closeMisGifMobile"+i;

        let divMinicontMisGif=document.createElement("div");
        divMinicontMisGif.classList.add("miniContMisGif");
        divMinicontMisGif.id="contMisGif"+i;
        
        let divIconsMisGif=document.createElement("div");
        divIconsMisGif.classList.add("contIconsMisGif");  
        divIconsMisGif.id="iconsMisGif"+i;

        let divInfoMisGif=document.createElement("div");
        divInfoMisGif.classList.add("contInfoMisGif");  
        divInfoMisGif.id="infoMisGif"+i;

        let botonEliminar=document.createElement("div");
        botonEliminar.classList.add("botonEliminar");
        botonEliminar.id="botonEliminar"+i;

        let imgTrashGif=document.createElement("img");
        imgTrashGif.src="./assets/icon-trash-normal.svg";
        imgTrashGif.classList.add("trashGif"); 
        imgTrashGif.id="trashGif"+i;
        //Evento click para "Eliminar el gif creado" la imagen seleccionada
        imgTrashGif.addEventListener("click", ()=>{
            
            eliminarGiff(imagenIdGif);
        })
        botonEliminar.appendChild(imgTrashGif);

        let imgDownMisGif=document.createElement("img");
        imgDownMisGif.src="./assets/icon-download.svg";
        imgDownMisGif.classList.add("downMisGif");              
        imgDownMisGif.id="downMisGif"+i;
        //Evento click para descargar el giff seleccionado
        imgDownMisGif.addEventListener("click", async ()=>{
            let blob = await fetch(urlImageMiGif).then(img => img.blob());; 
            invokeSaveAsDialog(blob, nameImgMisGif + ".gif");
        })

        let imgMaxMisGif=document.createElement("img");
        imgMaxMisGif.src="./assets/icon-max-normal.svg";
        imgMaxMisGif.classList.add("maxMisGif");
        imgMaxMisGif.id="maxMisGif"+i;

        let userGifoMisGif=document.createElement("p");
        userGifoMisGif.classList.add("userMisGif"); 
        userGifoMisGif.textContent=imageUserMisGif;
        userGifoMisGif.id="userMisGif"+i;

        let titleGifoMisGif=document.createElement("h3");
        titleGifoMisGif.classList.add("tituloGifoMisGif"); 
        titleGifoMisGif.textContent=imageTitleMiGif;
        titleGifoMisGif.id="titleMisGif"+i;

        divIconsMisGif.appendChild(botonEliminar);
        divIconsMisGif.appendChild(imgDownMisGif); 
        divIconsMisGif.appendChild(imgMaxMisGif);
        divInfoMisGif.appendChild(userGifoMisGif);
        divInfoMisGif.appendChild(titleGifoMisGif);
        divMinicontMisGif.appendChild(imgMisGif);
        divMinicontMisGif.appendChild(btnCloseMisGif);
        divMinicontMisGif.appendChild(btnCloseMisGifMobile);
        divMinicontMisGif.appendChild(divIconsMisGif);
        divMinicontMisGif.appendChild(divInfoMisGif);
        contImagenesCreadasTraidasApi.appendChild(divMinicontMisGif);
    }
    // Pone el efecto de mostrar los ícocnos sobre la imágen 
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#contMisGif"+i).addEventListener("mouseover", ()=>{
            document.querySelector("#iconsMisGif"+i).classList.toggle("showIconsMisGif");
            document.querySelector("#infoMisGif"+i).style.display="block";  
        })
        document.querySelector("#contMisGif"+i).addEventListener("mouseout", ()=>{
            document.querySelector("#iconsMisGif"+i).classList.toggle("showIconsMisGif");
            document.querySelector("#infoMisGif"+i).style.display="none";
       })
    }
    // Efefcto ligthbox a las imágenes
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#maxMisGif"+i).addEventListener("click", ()=>{
            
            document.querySelector("#contMisGif"+i).classList.toggle("miniContMisGif");
            document.querySelector("#contMisGif"+i).classList.toggle("miniContMisGifMax");

            document.querySelector("#imgMisGif"+i).classList.toggle("imgMisGif");
            document.querySelector("#imgMisGif"+i).classList.toggle("imgMisGifMax");

            document.querySelector("#iconsMisGif"+i).classList.toggle("contIconsMisGif");
            document.querySelector("#iconsMisGif"+i).classList.toggle("contIconsMisGifMax");

            document.querySelector("#infoMisGif"+i).classList.toggle("contInfoMisGif");
            document.querySelector("#infoMisGif"+i).classList.toggle("contInfoMisGifMax");

            document.querySelector("#maxMisGif"+i).classList.toggle("maxMisGif");
            document.querySelector("#maxMisGif"+i).classList.toggle("maxMisGifMax");

            document.querySelector("#userMisGif"+i).classList.toggle("userMisGif");
            document.querySelector("#userMisGif"+i).classList.toggle("userMisGifMax");

            document.querySelector("#titleMisGif"+i).classList.toggle("tituloGifoMisGif");
            document.querySelector("#titleMisGif"+i).classList.toggle("tituloGifoMisGifMax");

            document.querySelector("#closeMisGif"+i).classList.toggle("closeMisGif");
            document.querySelector("#closeMisGif"+i).classList.toggle("closeMisGifMax");

            document.querySelector("#downMisGif"+i).classList.toggle("downMisGif");
            document.querySelector("#downMisGif"+i).classList.toggle("downMisGifMax");

            document.querySelector("#botonEliminar"+i).classList.toggle("botonEliminar");
            document.querySelector("#botonEliminar"+i).classList.toggle("botonEliminarMax");
        })
    }
    // Cierra la imágen ampliada y muestra la galeria nuevamente
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#closeMisGif"+i).addEventListener("click", ()=>{
            
            document.querySelector("#contMisGif"+i).classList.toggle("miniContMisGif");
            document.querySelector("#contMisGif"+i).classList.toggle("miniContMisGifMax");

            document.querySelector("#imgMisGif"+i).classList.toggle("imgMisGif");
            document.querySelector("#imgMisGif"+i).classList.toggle("imgMisGifMax");

            document.querySelector("#iconsMisGif"+i).classList.toggle("contIconsMisGif");
            document.querySelector("#iconsMisGif"+i).classList.toggle("contIconsMisGifMax");

            document.querySelector("#infoMisGif"+i).classList.toggle("contInfoMisGif");
            document.querySelector("#infoMisGif"+i).classList.toggle("contInfoMisGifMax");

            document.querySelector("#maxMisGif"+i).classList.toggle("maxMisGif");
            document.querySelector("#maxMisGif"+i).classList.toggle("maxMisGifMax");

            document.querySelector("#userMisGif"+i).classList.toggle("userMisGif");
            document.querySelector("#userMisGif"+i).classList.toggle("userMisGifMax");

            document.querySelector("#titleMisGif"+i).classList.toggle("tituloGifoMisGif");
            document.querySelector("#titleMisGif"+i).classList.toggle("tituloGifoMisGifMax");

            document.querySelector("#closeMisGif"+i).classList.toggle("closeMisGif");
            document.querySelector("#closeMisGif"+i).classList.toggle("closeMisGifMax");

            document.querySelector("#downMisGif"+i).classList.toggle("downMisGif");
            document.querySelector("#downMisGif"+i).classList.toggle("downMisGifMax");

            document.querySelector("#botonEliminar"+i).classList.toggle("botonEliminar");
            document.querySelector("#botonEliminar"+i).classList.toggle("botonEliminarMax");
            
        })
    }
    //Efecto ligthbox a las imáhgenes en dispositivos móbiles
    for(let i=0; i<arregloGifos.length; i++){
        document.querySelector("#contMisGif"+i).addEventListener("click", ()=>{
            document.querySelector("#contMisGif"+i).classList.toggle("miniContMisGifMaxMobile");  

            document.querySelector("#imgMisGif"+i).classList.toggle("imgMisGifMaxMobile"); 
            
            document.querySelector("#iconsMisGif"+i).classList.toggle("contIconsMisGifMaxMobile"); 

            document.querySelector("#infoMisGif"+i).classList.toggle("contInfoMisGifMaxMobile"); 

            document.querySelector("#maxMisGif"+i).classList.toggle("maxMisGifMobile");  
            

            document.querySelector("#userMisGif"+i).classList.toggle("userMisGifMaxMobile"); 

            document.querySelector("#titleMisGif"+i).classList.toggle("tituloGifoMisGifMaxMobile"); 

            document.querySelector("#closeMisGifMobile"+i).classList.toggle("closeMisGifMobileMax"); 

            document.querySelector("#downMisGif"+i).classList.toggle("downMisGifMaxMobile");  

            document.querySelector("#botonEliminar"+i).classList.toggle("botonEliminarMaxMobile"); 
        })
    }
}
///// Se elimina el giff creado
function eliminarGiff(idGifCreado){
    let arrayBorrarGifCreado = [];
    arrayBorrarGifCreado = JSON.parse(stringIdsDeGifCreados);
    
    let indice = arrayBorrarGifCreado.indexOf(idGifCreado);
    arrayBorrarGifCreado.splice(indice, 1);

    let nuevoStringIdsDeGifCreados = JSON.stringify(arrayBorrarGifCreado);
    localStorage.setItem("idMisGifosCreados", nuevoStringIdsDeGifCreados);
    //refresco pag
    location.reload();
}
////////////////////////////////////////////////////////////////////////////////////////////////////