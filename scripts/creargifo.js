////////// Script para crear gifo /////////////////////////////////////////
elApiKey = "xvmqWbMiJxUysGNV2VzLVSGzt6sFhgrO"
/// Variables a usar
let pasoActivo        =  document.querySelectorAll("#creargifo-pasos-numero");
let cubierta          =           document.getElementById("cubiertaDinamica");
let accionesCargando  =           document.getElementById("cubiertaDinamica");
let repetirCaptura    =             document.getElementById("repetirCaptura");
let iconoCargando     =              document.getElementById("iconoCubierta");
let textoCargando     =              document.getElementById("textoCubierta");
let contadorGrabacion =               document.getElementById("temporizador");
let btnFinalizar      =               document.getElementById("btnFinalizar");
let tituloGrabar      =               document.getElementById("tituloRecord");
let btnSubirGifo      =                document.getElementById("btnSubirGif");
let btnComenzar       =                document.getElementById("btnComenzar");    
let textoGrabar       =                 document.getElementById("textRecord");   
let gifGrabado        =                  document.getElementById("gifoListo");   
let btnGrabar         =                  document.getElementById("btnGrabar");       
let cubiertaCargando  =                   document.getElementById("cubierta");
let video             =                     document.getElementById("grabar");  

//Iniciar variables para recorderRTC (libreria online sugerida en Acamica)
let recorder;
let form = new FormData();
///// Se da click en comenzar y se piden los permisos al usuario para usar la cámara
btnComenzar.addEventListener('click', ()=>{
    informaciónUsuario()
    pedirAutorizacion()
});

function informaciónUsuario(){
    btnComenzar.style.display = "none";
    tituloGrabar.innerHTML = "¿Nos das acceso </br>a tu cámara?";
    textoGrabar.innerHTML = "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO."
    pasoActivo[0].classList.add('paso-activo');
}

function pedirAutorizacion() {
    //Pedir permiso (sugerido en acamica)
    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })

        // Al dar acceso aparece la ventana de grabación
        .then(function (mediaStream) {
            cambiosPasoUno()
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
            recorder = RecordRTC(mediaStream, {
                type: 'gif'
            });
        })
}

function cambiosPasoUno(){
    tituloGrabar.style.display = "none";
    textoGrabar.style.display = "none";
    btnGrabar.style.display = "block";

    pasoActivo[0].classList.remove('paso-activo');
    pasoActivo[1].classList.add('paso-activo');

    video.style.display = "block";
}

let dateStarted;
///// Evento click al botón grabar
btnGrabar.addEventListener('click', ()=>{
    grabar();
    cambiosPasoDos();
});

function cambiosPasoDos(){
    btnGrabar.style.display = "none";
    btnFinalizar.style.display = "block";

    contadorGrabacion.style.display = "block";
    repetirCaptura.style.display = "none";
}

function grabar() {

    recorder.startRecording();
    console.log("grabando gif");
    // Contador de segundos
    dateStarted = new Date().getTime();

    (function looper() {
        if (!recorder) {
            return;
        }
        contadorGrabacion.innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();
}

let blob;
// Evento click al botón finalizar
btnFinalizar.addEventListener('click', ()=>{
    stopRecord();
    cambiosPasoTres();
});

function cambiosPasoTres(){
    btnFinalizar.style.display = "none";
    btnSubirGifo.style.display = "block";

    contadorGrabacion.style.display = "none";
    repetirCaptura.style.display = "block";
}

function stopRecord() {

    console.log("gif terminado");

    recorder.stopRecording(function () {
        video.style.display = "none";
        gifGrabado.style.display = "block";

        blob = recorder.getBlob();
        gifGrabado.src = URL.createObjectURL(recorder.getBlob());

        form.append('file', recorder.getBlob(), 'myGif.gif');
        form.append('api_key', elApiKey);
    });

    console.log(form.get('file'));
}
/// Evento click para subir el giffo creado
btnSubirGifo.addEventListener('click', ()=>{
    subirGifo();
    cambiosPasoCuatro();
});
/// se muestra la cubierta mientras se sube el giff
function cambiosPasoCuatro(){
    cubiertaCargando.style.display = "flex";
    cubiertaCargando.style.justifyContent="center"
    cubiertaCargando.style.alignItems="center"
    btnSubirGifo.style.display = "none";
    pasoActivo[1].classList.remove('paso-activo');
    pasoActivo[2].classList.add('paso-activo');
    repetirCaptura.style.display = "none";
}

///Iniciar variables para subir Gifo creado
let arrayDeIdsGifCreados  = [];
let stringIdsDeGifCreados = localStorage.getItem("idMisGifosCreados");
let urlSubirGifo          =        `https://upload.giphy.com/v1/gifs`;

//Request a la API para subir el gifo creado
async function subirGifoCreado(){
    const response = await fetch(urlSubirGifo, {
        method: 'POST',
        body: form,
    })
    const dataGiphy = response.json()
    let objetoRetornado=dataGiphy
    return objetoRetornado
}
//subirGifoCreado()
function subirGifo(){
    let objetoRetornadoDeGiphy = subirGifoCreado()
    objetoRetornadoDeGiphy.then((object)=>{
        let IdGifoCreado = object.data.id;
        // Mensaje de gifo subido con éxito
        accionesCargando.style.display = "block";
        iconoCargando.setAttribute("src", "./assets/check.svg");
        textoCargando.innerText = "GIFO subido con éxito";
        crearBotonesHTML(object);

        if(stringIdsDeGifCreados == null){
            arrayDeIdsGifCreados = [];
        } else{
            arrayDeIdsGifCreados = JSON.parse(stringIdsDeGifCreados);
        }
        arrayDeIdsGifCreados.push(IdGifoCreado);
            console.log(arrayDeIdsGifCreados)
            
            stringIdsDeGifCreados = JSON.stringify(arrayDeIdsGifCreados);
            localStorage.setItem("idMisGifosCreados", stringIdsDeGifCreados);
        
    })

    .catch(error => console.log("error al subir gif a GIPHY" + error))
}
/// Crea los botones para mostrar cuando el giff se suba
function crearBotonesHTML(object){
    let IdDeGiff=object.data.id;

    let btnDescargar = document.createElement("button");
    btnDescargar.type="button";
    btnDescargar.classList.add("overlay-video-button");
    btnDescargar.id="btnDownGiff";
    //Descargar gifo creado
    btnDescargar.addEventListener("click", async ()=>{
        let blob = await fetch(IdDeGiff).then( img => img.blob());;
        invokeSaveAsDialog(blob, "migifo.gif");
    })

    let btnLink = document.createElement("button");
    btnLink.type="button";
    btnLink.classList.add("overlay-video-button");
    btnLink.id="btnLink";

    let imgDown=document.createElement("img");
    imgDown.alt="download";
    imgDown.src="./assets/icon-download.svg";  

    let imgLink=document.createElement("img");
    imgLink.src="./assets/icon-link-normal.svg";

    btnDescargar.appendChild(imgDown)
    btnLink.appendChild(imgLink)

    cubierta.appendChild(btnDescargar)
    cubierta.appendChild(btnLink)
}

/// Evento click al boton repetir captura
repetirCaptura.addEventListener('click', ()=>{
    repetirGrabacion();
    cambiosPasoCinco();
});

function cambiosPasoCinco(){
    repetirCaptura.style.display = "none";
    btnSubirGifo.style.display = "none";
    gifGrabado.style.display = "none";
    btnGrabar.style.display = "block";
}

function repetirGrabacion() {
    recorder.clearRecordedData();
    console.log("re grabando gif");

    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })
        .then(function (mediaStream) {

            video.style.display = "block";
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };

            recorder = RecordRTC(mediaStream, {
                type: 'gif'
            });
        })
}
/// Función para contar el tiempo de grabación
function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    return hr + ':' + min + ':' + sec;
}
////////////////////////////////////////////////////////////////////////////////////////////////////