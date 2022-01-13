//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Variables para  el request a la API//////////////////
const miApikey            =       "xvmqWbMiJxUysGNV2VzLVSGzt6sFhgrO";
const urlTrendingEndpoint =  "https://api.giphy.com/v1/gifs/trending";
///////// Consultando la API
async function buscarTrendingEndpoints(){
    const response = await fetch(urlTrendingEndpoint+"?api_key="+miApikey+"&limit=12"+"&offset=4");
    const dataGiphy = await response.json();
    let arregloImgsTrends=dataGiphy.data;
    crearImgsCarouselHTML(arregloImgsTrends);
    
}
buscarTrendingEndpoints();
///////// Se crea el carrousell
function crearImgsCarouselHTML(arreglo){
    let contImgsTrend=document.querySelector(".fila-imagenes");
    
    for(let i=0; i<arreglo.length; i++){
        const urlImgs = arreglo[i].images.downsized.url;
        const userGifo = arreglo[i].username;
        const titleGifo = arreglo[i].title;
        const nameGifo = arreglo[i].slug;
        const imagenId = arreglo[i].id;

        let divPasarela = document.createElement("div");
        divPasarela.classList.add("pasarela"); 
        divPasarela.id="pasarela"+i;

        let divMiniCont = document.createElement("div");
        divMiniCont.classList.add("miniContTrend"); 
        divMiniCont.id = "miniContTrend"+i;

        let divcontIconsTrend = document.createElement("div");
        divcontIconsTrend.classList.add("contIconsTrend"); 
        divcontIconsTrend.id = "contIconsTrend"+i;

        let divContInfoTrend = document.createElement("div");
        divContInfoTrend.classList.add("contInfoTrend");  
        divContInfoTrend.id = "contInfoTrend"+i;

        let imgnTrend=document.createElement("img");
        imgnTrend.classList.add("imagenTrend"); 
        imgnTrend.src=urlImgs;
        imgnTrend.alt=titleGifo;
        imgnTrend.id="imagenTrend"+i;

        let closeTrend=document.createElement("img");
        closeTrend.classList.add("closeTrend"); 
        closeTrend.src="./assets/close.svg";
        closeTrend.id="closeTrend"+i;

        let closTrendMobile=document.createElement("img");
        closTrendMobile.classList.add("closeTrendMobile");  //Agregado recien
        closTrendMobile.src="./assets/close.svg";
        closTrendMobile.id="closeTrendMobile"+i;



        let imgFav=document.createElement("img");
        imgFav.src="./assets/icon-fav.svg";
        imgFav.classList.add("favTrend");
        imgFav.id="favTrend"+i; 

        let botonContFavTrend=document.createElement("div");
        botonContFavTrend.classList.add("botonContFavTrend");
        botonContFavTrend.id="botonContFavTrend"+i;
        botonContFavTrend.addEventListener("click", ()=>{
            //Activa el ícono de favorito
            let iconoFavoritoTrend=document.querySelector("#favTrend"+i);
            iconoFavoritoTrend.setAttribute("src", "./assets/icon-fav-active.svg");

            favoritearImagen(imagenId);
        })

        botonContFavTrend.appendChild(imgFav);

        let imgDown=document.createElement("img");
        imgDown.src="./assets/icon-download.svg";
        imgDown.classList.add("downTrend");
        imgDown.id="downTrend"+i;
        //Evento click para descargar la imágen
        imgDown.addEventListener("click", async ()=>{
            let blob = await fetch(urlImgs).then(img => img.blob());;
            invokeSaveAsDialog(blob, nameGifo + ".gif");
        })

        let imgMax=document.createElement("img");
        imgMax.src="./assets/icon-max-normal.svg";
        imgMax.classList.add("maxTrend"); 
        imgMax.id="maxTrend"+i;

        let userGifoTrend=document.createElement("h4");
        userGifoTrend.classList.add("userGifoTrend"); 
        userGifoTrend.textContent=userGifo;
        userGifoTrend.id="userGifoTrend"+i;

        let titleGifoTrend=document.createElement("h3");
        titleGifoTrend.classList.add("titleGifoTrend"); 
        titleGifoTrend.textContent=titleGifo;
        titleGifoTrend.id="titleGifoTrend"+i;

        divcontIconsTrend.appendChild(botonContFavTrend);
        divcontIconsTrend.appendChild(imgDown);
        divcontIconsTrend.appendChild(imgMax);
        divContInfoTrend.appendChild(userGifoTrend);
        divContInfoTrend.appendChild(titleGifoTrend);
        divMiniCont.appendChild(imgnTrend);
        divMiniCont.appendChild(closeTrend);
        divMiniCont.appendChild(closTrendMobile);
        divMiniCont.appendChild(divcontIconsTrend);
        divMiniCont.appendChild(divContInfoTrend);
        divPasarela.appendChild(divMiniCont);
        contImgsTrend.appendChild(divPasarela);
        
    }
    /////////////////Efecto de poner los íconos y la informacion al pasar el mouse//////
    for(let i=0; i<arreglo.length; i++){
        document.querySelector("#pasarela"+i).addEventListener("mouseover", ()=>{
            document.querySelector("#contIconsTrend"+i).classList.toggle("showIconsTrend");
            document.querySelector("#contInfoTrend"+i).style.display="block";  
        })
        document.querySelector("#pasarela"+i).addEventListener("mouseout", ()=>{
            document.querySelector("#contIconsTrend"+i).classList.toggle("showIconsTrend");
            document.querySelector("#contInfoTrend"+i).style.display="none";
       })
    }
    ////////Efecto ligthBox a los Gifos tendencia
    for(let i=0; i<arreglo.length; i++){
        document.querySelector("#maxTrend"+i).addEventListener("click", ()=>{
            document.querySelector("#pasarela"+i).classList.toggle("pasarela");
            document.querySelector("#pasarela"+i).classList.toggle("pasarelaMax");

            document.querySelector("#imagenTrend"+i).classList.toggle("imagenTrend");
            document.querySelector("#imagenTrend"+i).classList.toggle("imagenTrendMax");

            document.querySelector("#contIconsTrend"+i).classList.toggle("contIconsTrend");
            document.querySelector("#contIconsTrend"+i).classList.toggle("contIconsTrendMax");

            document.querySelector("#contInfoTrend"+i).classList.toggle("contInfoTrend");
            document.querySelector("#contInfoTrend"+i).classList.toggle("contInfoTrendMax");

            document.querySelector("#maxTrend"+i).classList.toggle("maxTrend");
            document.querySelector("#maxTrend"+i).classList.toggle("maxTrendMax");

            document.querySelector("#userGifoTrend"+i).classList.toggle("userGifoTrend");
            document.querySelector("#userGifoTrend"+i).classList.toggle("userGifoTrendMax");

            document.querySelector("#titleGifoTrend"+i).classList.toggle("titleGifoTrend");
            document.querySelector("#titleGifoTrend"+i).classList.toggle("titleGifoTrendMax");

            document.getElementById("boton-Izq-Normal").style.display="none";
            document.getElementById("boton-Derecha-normal").style.display="none";
            document.getElementById("boton-Izquierda").style.display="none";
            document.getElementById("boton-Derecha").style.display="none";

            document.querySelector("#closeTrend"+i).classList.toggle("closeTrend");
            document.querySelector("#closeTrend"+i).classList.toggle("closeTrendMax");

            document.querySelector("#downTrend"+i).classList.toggle("downTrend");
            document.querySelector("#downTrend"+i).classList.toggle("downTrendMax");

            document.querySelector("#botonContFavTrend"+i).classList.toggle("botonContFavTrend");
            document.querySelector("#botonContFavTrend"+i).classList.toggle("botonContFavTrendMax");
        })
    }
    //Se cierra el ligthbox al darle en la equis y se restaura el carousel
    for(let i=0; i<arreglo.length; i++){
        document.querySelector("#closeTrend"+i).addEventListener("click", ()=>{
            document.querySelector("#pasarela"+i).classList.toggle("pasarela");
            document.querySelector("#pasarela"+i).classList.toggle("pasarelaMax");

            document.querySelector("#imagenTrend"+i).classList.toggle("imagenTrend");
            document.querySelector("#imagenTrend"+i).classList.toggle("imagenTrendMax");

            document.querySelector("#contIconsTrend"+i).classList.toggle("contIconsTrend");
            document.querySelector("#contIconsTrend"+i).classList.toggle("contIconsTrendMax");

            document.querySelector("#contInfoTrend"+i).classList.toggle("contInfoTrend");
            document.querySelector("#contInfoTrend"+i).classList.toggle("contInfoTrendMax");

            document.querySelector("#maxTrend"+i).classList.toggle("maxTrend");
            document.querySelector("#maxTrend"+i).classList.toggle("maxTrendMax");

            document.querySelector("#userGifoTrend"+i).classList.toggle("userGifoTrend");
            document.querySelector("#userGifoTrend"+i).classList.toggle("userGifoTrendMax");

            document.querySelector("#titleGifoTrend"+i).classList.toggle("titleGifoTrend");
            document.querySelector("#titleGifoTrend"+i).classList.toggle("titleGifoTrendMax");

            document.getElementById("boton-Izq-Normal").style.display="block";
            document.getElementById("boton-Derecha-normal").style.display="block";
            document.getElementById("boton-Izquierda").style.display="block";
            document.getElementById("boton-Derecha").style.display="block";

            document.querySelector("#closeTrend"+i).classList.toggle("closeTrend");
            document.querySelector("#closeTrend"+i).classList.toggle("closeTrendMax");

            document.querySelector("#downTrend"+i).classList.toggle("downTrend");
            document.querySelector("#downTrend"+i).classList.toggle("downTrendMax");

            document.querySelector("#botonContFavTrend"+i).classList.toggle("botonContFavTrend");
            document.querySelector("#botonContFavTrend"+i).classList.toggle("botonContFavTrendMax");

            /* document.querySelector("#contInfoTrend"+i).classList.toggle("contInfoTrend");
            document.querySelector("#contInfoTrend"+i).classList.toggle("contInfoTrendMaxMobile"); */
        })
    }

    

    ////////Crea el carrusel////////////////

    const botonDerechaNormal =  document.getElementById("boton-Derecha-normal");
    const botonIzqNormal     =      document.getElementById("boton-Izq-Normal");
    const botonIzquierda     =       document.getElementById("boton-Izquierda");
    const botonDerecha       =         document.getElementById("boton-Derecha");
    const contCarousel       =         document.getElementById("cont-carousel");
    const pasarela           =           document.querySelectorAll(".pasarela");
    const imagenes           =              document.getElementById("imagenes");

    const pasarelaWidth=pasarela[0].offsetWidth;
    console.log(pasarelaWidth);

    botonIzqNormal.onclick = ()=> move(1);
    botonDerechaNormal.onclick = ()=> move(2);
    botonIzquierda.onclick = ()=> move(1);
    botonDerecha.onclick = ()=> move(2);

    function move(value){
        const imagenesWidth=imagenes.offsetWidth;
        const listWidth=contCarousel.offsetWidth;

        imagenes.style.left=="" ? leftPosition=imagenes.style.left= 0 : leftPosition = parseFloat(imagenes.style.left.slice(0, -2) * -1)

        if(leftPosition < (imagenesWidth - listWidth) && value==2){
            imagenes.style.left =`${-1 * (leftPosition + pasarelaWidth)}px`
        } else if(leftPosition > 0 && value == 1){
            imagenes.style.left = `${-1 * (leftPosition - pasarelaWidth)}px`
        }
    }
}

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
    console.log(arregloIdsDeFavoritos);
    // se hace string y se sube el localstorage para recuperarlo en favoritos
    stringIdsDeFavoritos = JSON.stringify(arregloIdsDeFavoritos);
    localStorage.setItem("idGifAgregado", stringIdsDeFavoritos);

    //location.reload();
}

//////////////////////// Efecto hover a los botones del carrusel///////////

const botonDerechaNormal =  document.getElementById("boton-Derecha-normal");
const botonIzqNormal     =      document.getElementById("boton-Izq-Normal");
const botonIzquierda     =       document.getElementById("boton-Izquierda");
const botonDerecha       =         document.getElementById("boton-Derecha");

botonIzqNormal.addEventListener("mouseover", ()=>{
    botonIzqNormal.style.display="none";
})
botonIzquierda.addEventListener("mouseout",()=>{
    botonIzqNormal.style.display="block";
})
botonDerechaNormal.addEventListener("mouseover",()=>{
    botonDerechaNormal.style.display="none";
})
botonDerecha.addEventListener("mouseout",()=>{
    botonDerechaNormal.style.display="block";
})
//////////////////////////////////////////////////////////////////////////////