document.addEventListener('DOMContentLoaded', main);
let dadesGuardades = [];
let cotxes = JSON.parse(localStorage.getItem('dates')) || {};
let cotxes1 = cotxes;
async function main(){
    await carrgarCochesLS();
    plenarAnos();
    llistarCoches();

    let filtre = document.getElementById('filtrar')
    let formFiltre = filtre.closest('form'); //buscar el pare en la etiqueta form de el boto submit
    formFiltre.addEventListener("submit", validar);  


    document.getElementById('precioAlto').addEventListener('click', preuAlt);
    document.getElementById('precioBajo').addEventListener('click', preuBaix);
    document.getElementById('relevancia').addEventListener('click', relevancia);
}

function filtrar(){
    if(validar() == true){

    }else{
        console.log("no sa pogut validar");
    }
    
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    let dates = JSON.parse(localStorage.getItem('dates')) || [];
    if (validarAnyMatriculació() && validarkilometros() && confirm("Confirma si vols enviar el formulari")) {
        obtindreDades();
        return true;

    } else {

        return false;
    }

}

function preuAlt(){

    cotxes.cars.sort((a,b) => b.precio - a.precio);
    llistarCoches();
}
function preuBaix(){

    cotxes.cars.sort((a,b) => a.precio - b.precio);
    llistarCoches();

}
function relevancia(){

    cotxes.cars = [...dadesGuardades];
    llistarCoches();
}



async function carrgarCochesLS(){
    try {
        const response = await fetch('js/bbdd.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('dates', JSON.stringify(data));
        dadesGuardades = [...data.cars]; //aplanar array ma gi
        console.log('localStorage["dates"]:', localStorage.getItem('dates'));
    } catch (error) {
        console.error('Error:', error);
    }
}

function llistarCoches(){

    let contenedor = document.getElementById('listado');

    
    
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }

    if (!cotxes.cars) return;
    cotxes.cars.forEach(element => {
    
        let card = document.createElement("div");
        card.classList.add('card', 'mb-4');

        let enlace = document.createElement("a");
        enlace.href = "#!"
        
        let image = document.createElement("img");
        image.src = "img/" + element.img;
        image.classList.add("card-img-top");
        enlace.appendChild(image);
        card.appendChild(enlace);

        let cardBody = document.createElement("div");
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        let tituloH2 = document.createElement("h2");
        tituloH2.classList.add('card-title');
        tituloH2.textContent = element.marca + " " + element.modelo;
        cardBody.appendChild(tituloH2);

        let row = document.createElement("div");
        row.classList.add('row', 'justify-content-end');
        cardBody.appendChild(row);

        let divDinsdeRow = document.createElement("div");
        divDinsdeRow.classList.add('p-2', 'mb-1', 'col-md-3', 'offset-md-3', 'bg-warning', 'rounded', 'text-center');
        row.appendChild(divDinsdeRow);

        let preu = document.createElement("h2");
        preu.classList.add("font-weight-bold");
        preu.textContent = element.precio + " " + "$";
        divDinsdeRow.appendChild(preu);

        let row2 = document.createElement("row");
        row2.classList.add("row");
        cardBody.appendChild(row2);

        let info1t = document.createElement("div");
        info1t.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info1t.textContent = "anyo";
        row2.appendChild(info1t);

        let info2t = document.createElement("div");
        info2t.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info2t.textContent = "km";
        row2.appendChild(info2t);

        let info3t = document.createElement("div");
        info3t.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info3t.textContent = "Cambio";
        row2.appendChild(info3t);

        let info4t = document.createElement("div");
        info4t.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info4t.textContent = "combustible";
        row2.appendChild(info4t);

        let divSeparacio = document.createElement("div");
        divSeparacio.classList.add("w-100");
        row2.appendChild(divSeparacio);

        let info1 = document.createElement("div");
        info1.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info1.textContent = element.anyo;
        row2.appendChild(info1);

        let info2 = document.createElement("div");
        info2.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info2.textContent = element.km;
        row2.appendChild(info2);

        let info3 = document.createElement("div");
        info3.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info3.textContent = element.cambio;
        row2.appendChild(info3);

        let info4 = document.createElement("div");
        info4.classList.add('col', 'p-3', 'text-center', 'border-bottom', 'border-dark');
        info4.textContent = element.combustible;
        row2.appendChild(info4);

        let reservar = document.createElement("a");
        reservar.classList.add('btn', 'btn-primary', 'm-3');
        reservar.textContent = "Reservar";
        cardBody.appendChild(reservar);

        contenedor.appendChild(card);
    });
}


function esborrar(index){
    let llistarApunts = JSON.parse(localStorage.getItem('apuntes')) || [];
    llistarApunts.splice(index, 1);
    localStorage.setItem('apuntes', JSON.stringify(llistarApunts));

}





function validarImporte() {
    var element = document.getElementById("importe");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un importe.");
        }
        if (element.validity.rangeUnderflow) {
            error(element, "L'importe ha de ser mayor que 0.");
        }
        if (element.validity.rangeOverflow) {
            error(element, "L'importe no puede superar los 10.000.");
        }
        if (element.validity.typeMismatch) {
            error(element, "Introduce un valor numérico válido.");
        }

        return false;
    }
    return true;
}

function validarSaldo() {
    var element = document.getElementById("saldo");

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un importe.");
        }
        if (element.validity.rangeUnderflow) {
            error(element, "L'importe ha de ser mayor que 0.");
        }
        if (element.validity.rangeOverflow) {
            error(element, "L'importe no puede superar los 10.000.");
        }
        if (element.validity.typeMismatch) {
            error(element, "Introduce un valor numérico válido.");
        }

        return false;
    }
    return true;
}

function validarDh() {
    var element = document.getElementById("dh");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un dh.");
        }
        if (element.validity.patternMismatch) {
            error(element, "El nom ha de tindre entre 2 i 14 caracters.");
        }
        //error(element);
        return false;
    }
    return true;

}

function validarFecha() {
    var element = document.getElementById("fecha");
    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            error(element, "Deus d'introduïr un fecha.");
        }
        if (element.validity.rangeOverflow) {
            error(element, "fecha inferior actual.");
        }

        //error(element);
        return false;
    }
    return true;

}


function error(element, missatge) {
    let miss = document.createTextNode(missatge);
    document.getElementById("errorMensaje").appendChild(miss);
    element.classList.add("error");
    element.focus();
}


function esborrarError() {
    document.getElementById("errorMensaje").textContent = "";
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length; i++) {
        formulari.elements[i].classList.remove("error");
    }
}

function plenarAnos() {

    let desde = document.getElementById('anyoDesde');
    let fins  = document.getElementById('anyoHasta');

    if (!cotxes.cars) return;
    desde.innerHTML = '';
    fins.innerHTML = '';

    // 1. Extraer años
    let anys = cotxes.cars.map(c => c.anyo);

    // 2. Eliminar duplicados
    anys = [...new Set(anys)];

    // 3. Ordenar
    anys.sort();

  
    anys.forEach(anyo => {

        let optionDesde = document.createElement("option");
        optionDesde.textContent = anyo;
        desde.appendChild(optionDesde);

        let optionFins = document.createElement("option");
        optionFins.textContent = anyo;
        fins.appendChild(optionFins);
    });
}

function validarAnyMatriculació(){
    var desde = document.getElementById("anyoDesde");
    var fins  = document.getElementById("anyoHasta");

    // Convertir a número para comparar correctamente
    var valorDesde = parseInt(desde.value);
    var valorFins = parseInt(fins.value);

    if (valorDesde > valorFins) {
        error(desde, "El año 'Desde' no puede ser mayor que 'Hasta'.");
        return false;
    } else {
        return true;
    }
}

function validarkilometros(){
    var desde = document.getElementById("kmDesde");
    var fins  = document.getElementById("kmHasta");

    // Convertir a número para comparar correctamente
    var valorDesde = parseInt(desde.value);
    var valorFins = parseInt(fins.value);

    if (valorDesde > valorFins) {
        error(desde, "El km 'Desde' no puede ser mayor que 'Hasta'.");
        return false;
    } else {
        return true;
    }
}

function autocompletar(){

    var avaiableTags = [...cotxes];$("#tags").autocomplete({

    });


}