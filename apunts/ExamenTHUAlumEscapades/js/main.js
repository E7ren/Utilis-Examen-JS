document.addEventListener('DOMContentLoaded', main);
let dadesGuardades = [];
let escapades = JSON.parse(localStorage.getItem('escapades')) || {};

async function main(){
     carregarEscapadesLS()
     llistarEscapades()

     document.getElementById("filtrar").addEventListener("click", validar,false);
     document.getElementById("eliminarFiltro").addEventListener("submit", relevancia)

     document.getElementById("precioAlto"). addEventListener("click", preuAlt);
     document.getElementById("precioBajo"). addEventListener("click", preuBaix);
     document.getElementById("relevancia"). addEventListener("click", relevancia);

}

async function carregarEscapadesLS(){
    try {
        const response = await fetch('js/bbdd.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('escapades', JSON.stringify(data));
        dadesGuardades = [...data.escapades]; //aplanar array ma gi
        console.log('localStorage["escapades"]:', localStorage.getItem('escapades'));
    } catch (error) {
        console.error('Error:', error);
    }
}

function filtrarArray() {
    const desdeTemp = document.getElementById("temporadaDesde").value;
    const hastaTemp = document.getElementById("temporadaHasta").value;
    const desdeDura = document.getElementById("duracionDesde").value;
    const hastaDura = document.getElementById("duracionHasta").value;

    escapades.escapades = dadesGuardades.filter(e => {
        let ok = true;
        if (desdeTemp) ok = ok && Number(e.temporada) >= Number(desdeTemp);
        if (hastaTemp) ok = ok && Number(e.temporada) <= Number(hastaTemp);
        if (desdeDura) ok = ok && Number(e.duracion)  >= Number(desdeDura);
        if (hastaDura) ok = ok && Number(e.duracion)  <= Number(hastaDura);
        return ok;
    });

    llistarEscapades();
}

function borrarFilteres(){

    const desdeTemp = document.getElementById("temporadaDesde");
    const hastaTemp = document.getElementById("temporadaHasta");
    const desdeDura = document.getElementById("duracionDesde");
    const hastaDura = document.getElementById("duracionHasta");
    
    while (desdeTemp.firstChild) {
        desdeTemp.removeChild(desdeTemp.firstChild);
    }
    while (hastaTemp.firstChild) {
        hastaTemp.removeChild(hastaTemp.firstChild);
    }
    while (desdeDura.firstChild) {
        desdeDura.removeChild(desdeDura.firstChild);
    }
    while (hastaDura.firstChild) {
        hastaDura.removeChild(hastaDura.firstChild);
    }
    alert(funsaina);
}
function preuAlt(){

    escapades.escapades.sort((a,b) => b.precio - a.precio);
    llistarEscapades();
}
function preuBaix(){

    escapades.escapades.sort((a,b) => a.precio - b.precio);
    llistarEscapades();

}
function relevancia(){

    escapades.escapades = [...dadesGuardades];
    llistarEscapades();
}


function validar (e) {
    esborrarError ();
    if (validarDesdeTemporada() && validarHastaTemporada() && validarHastaDesdeTemporada() && validarDesdeDuracio() && validarHastaDuracio() && confirm("Confirma si vols enviar el formulari") ){
        e.preventDefault();
        filtrarArray();
        return true;

    }else{
        e.preventDefault();
        return false;
    }
}

function validarDesdeDuracio(){
    var element = document.getElementById("duracionDesde");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un dia.");
        }
        if (element.validity.patternMismatch){
            error(element,"Escribe un número de días.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarHastaDuracio(){
    
    var element = document.getElementById("duracionHasta");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un dia.");
        }
        if (element.validity.patternMismatch){
            error(element,"te de ser un dia valid.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarHastaDesdeTemporada(){
    var hasta = document.getElementById("temporadaHasta");
    var desde = document.getElementById("temporadaDesde");

    if (hasta.value !== "" && desde.value !== "") {
        if (Number(hasta.value) < Number(desde.value)) {
            error(hasta, "Hasta no pot ser menor que desde.");
            return false;
        }
    }
    return true;
}


function validarDesdeTemporada(){
    var element = document.getElementById("temporadaDesde");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un temporada(any).");
        }
        if (element.validity.patternMismatch){
            error(element,"La temporada te de ser apartir de 2000.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarHastaTemporada(){
    
    var element = document.getElementById("temporadaHasta");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un temporada(any).");
        }
        if (element.validity.patternMismatch){
            error(element,"La temporada hasta te de ser apartir de 2000.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarHastaDesdeTemporada(){
    var hasta = document.getElementById("temporadaHasta");
    var desde = document.getElementById("temporadaDesde");

    if (hasta.value !== "" && desde.value !== "") {
        if (Number(hasta.value) < Number(desde.value)) {
            error(hasta, "Hasta no pot ser menor que desde.");
            return false;
        }
    }
    return true;
}


function error (element, missatge){
    let miss=document.createTextNode(missatge);    
    document.getElementById("errorMensaje").appendChild(miss);
    element.classList.add("error");
    element.focus();
}


function esborrarError (){
    document.getElementById("errorMensaje").textContent="";
    let formulari = document.forms[0];
        for ( let i=0; i < formulari.elements.length; i++){
            formulari.elements[i].classList.remove("error");
        }
}


function llistarEscapades(){

    const listado = document.getElementById("listado");

    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }


    escapades.escapades.forEach(element => {
        
            const divCol = document.createElement("div")
            divCol.classList.add("col")
            listado.appendChild(divCol)

            const cardEscapada = document.createElement("div")
            cardEscapada.classList.add("card", "h-100", "shadow-sm", "border-0")
            divCol.appendChild(cardEscapada);

            const enllasReserva = document.createElement("a");
            enllasReserva.href = "reserva.html"
            cardEscapada.appendChild(enllasReserva)

            const ratio = document.createElement("div")
            ratio.classList.add("ratio", "ratio-16x9")
            enllasReserva.appendChild(ratio)

            const image = document.createElement("img")
            image.src = "img/" + element.img
            image.classList.add("card-img-top", "object-fit-cover")
            image.alt = element.destino
            ratio.appendChild(image)

            const cardBody = document.createElement("div")
            cardBody.classList.add("card-body", "d-flex", "flex-column")
            cardEscapada.appendChild(cardBody);

            const divTitle = document.createElement("div")
            divTitle.classList.add("d-flex", "justify-content-between", "align-items-start", "mb-1")
            cardBody.appendChild(divTitle);

            const tituloDestino = document.createElement("h2")
            tituloDestino.classList.add("card-title", "h6", "fw-bold", "mb-0")
            tituloDestino.textContent = element.destino
            divTitle.appendChild(tituloDestino)

            const preu = document.createElement("span")
            preu.classList.add("badge" ,"text-bg-warning", "ms-2", "text-black")
            preu.textContent = element.precio + "€";
            divTitle.appendChild(preu);
            
            const descripcion = document.createElement("p");
            descripcion.classList.add("card-text", "text-muted", "small", "mb-3", "flex-grow-1")
            descripcion.textContent = element.descripcion
            cardBody.appendChild(descripcion)

            const div1 = document.createElement("div")
            div1.classList.add("col");
            cardBody.appendChild(div1);

            const col1 = document.createElement("div")
            col1.classList.add("border", "rounded", "py-2", "h-100")
            div1.appendChild(col1)

            const small1 = document.createElement("small")
            small1.textContent = "Temporada"
            col1.appendChild(small1)
            
            const strong1 = document.createElement("strong")
            strong1.classList.add("text-muted", "1h-1", "mb-1")
            strong1.textContent = " " + element.temporada
            col1.appendChild(strong1)

            const div2 = document.createElement("div")
            div2.classList.add("col");
            cardBody.appendChild(div2);

            const col2 = document.createElement("div")
            col2.classList.add("border", "rounded", "py-2", "h-100")
            div2.appendChild(col2)

            const small2 = document.createElement("small")
            small2.textContent = "Duracion"
            col2.appendChild(small2)
            
            const strong2 = document.createElement("strong")
            strong2.classList.add("text-muted", "1h-1", "mb-1")
            strong2.textContent = " " + element.duracion + " dias"
            col2.appendChild(strong2)

            const div3 = document.createElement("div")
            div3.classList.add("col");
            cardBody.appendChild(div3);

            const col3 = document.createElement("div")
            col3.classList.add("border", "rounded", "py-2", "h-100")
            div3.appendChild(col3)

            const small3 = document.createElement("small")
            small3.textContent = "Estilo"
            col3.appendChild(small3)
            
            const strong3 = document.createElement("strong")
            strong3.classList.add("text-muted", "1h-1", "mb-1")
            strong3.textContent = " " + element.estilo 
            col3.appendChild(strong3)
            

            const div4 = document.createElement("div")
            div4.classList.add("col");
            cardBody.appendChild(div4);

            const col4 = document.createElement("div")
            col4.classList.add("border", "rounded", "py-2", "h-100")
            div4.appendChild(col4)

            const small4 = document.createElement("small")
            small4.textContent = "Pension"
            col4.appendChild(small4)
            
            const strong4 = document.createElement("strong")
            strong4.classList.add("text-muted", "1h-1", "mb-1")
            strong4.textContent = " " + element.regimen 
            col4.appendChild(strong4)

            const enlaceReserva = document.createElement("a")
            enlaceReserva.classList.add("btn", "btn-dark", "btn-sm", "mt-auto");
            enlaceReserva.href = "#!"
            enlaceReserva.textContent = "Reserva"
            cardBody.appendChild(enlaceReserva)

    });
}
