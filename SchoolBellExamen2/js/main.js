document.addEventListener('DOMContentLoaded', main);

let datos   = JSON.parse(localStorage.getItem('schedules')) || {};
let times = JSON.parse(localStorage.getItem('schedules')) || {};
let songs = JSON.parse(localStorage.getItem('Playlists')) || {}; 


async function main(){

     carregarTimbres()
     dibuixarTaula()
     document.getElementById("filtrar").addEventListener("click", validar);
     plenarCansons()
     

}

function carregarTimbres(){
    carregarSchedule();
    carregarPlaylists();
    carregaBaseDades();

}

function plenarCansons() {

    console.log("ieeee")
    let desde = document.getElementById('timeSongSelect');
    let anys = songs.songs.map(c => c.name);
    anys = [...new Set(anys)];
    anys.sort();
    anys.forEach(anys => {
        let optionDesde = document.createElement("option");
        optionDesde.textContent = anys;
        desde.appendChild(optionDesde);

    });
}


async function carregarSchedule(){
    try {

        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('schedules', JSON.stringify(data.schedules[0]));
        dadesGuardades = [...data.schedules];

        console.log('localStorage["schedules"]:', localStorage.getItem('schedules'));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function carregaBaseDades(){
    try {
        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('baseDades', JSON.stringify(data));
        dadesGuardades = [...data.schedules];

        console.log('localStorage["baseDades"]:', localStorage.getItem('baseDades'));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function carregarPlaylists(){
    try {
        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('Playlists', JSON.stringify(data.playlists[0]));
        dadesGuardades = [...data.schedules];

        console.log('localStorage["Playlists"]:', localStorage.getItem('Playlists'));
    } catch (error) {
        console.error('Error:', error);
    }
}
function dibuixarTaula(){

    const listado = document.getElementById("listado");
    
    times.times.forEach(element => {

        const tableRow = document.createElement("tr")
        tableRow.classList.add("table", "table-striped")
        listado.appendChild(tableRow)

        const tdId  = document.createElement("td")
        tdId.textContent = element.id
        tableRow.appendChild(tdId)

        const tdNombre  = document.createElement("td")
        tdNombre.textContent = element.name
        tableRow.appendChild(tdNombre)

        const tdHora    = document.createElement("td")
        tdHora.textContent = element.hour
        tableRow.appendChild(tdHora)

        const tdSegs    = document.createElement("td")
        tdSegs.textContent = element.duration
        tableRow.appendChild(tdSegs)
        
        const tdCancion = document.createElement("td")
        tdCancion.textContent = element.tdCancion
        tableRow.appendChild(tdCancion);
    });

    songs.songs.forEach(element => {

        const canicionName  = document.createElement("td")
        canicionName.textContent = element.name
        tableRow.appendChild(canicionName)

        
    });


        




}


function validarNom () {
      var element = document.getElementById("timeName");
      if (!element.checkValidity()){
          if (element.validity.valueMissing){
              error(element,"Deus d'introduïr un nom.");
          }
          if (element.validity.patternMismatch){
              error(element, "El nom ha de tindre entre 2 i 14 caracters.");
          }

          return false;
      }
      return true;

}
function validarSegs (){
    var element = document.getElementById("timeDuration");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr una timeDuration.");
        }
        if (element.validity.rangeUnderflow){
            error(element,"el mínima és 100");
        }
        if (element.validity.rangeOverflow){
            error(element,"El màxima és 600 .");
        }
        if (element.validity.stepMismatch){
            error(element,"ha de ser un número enter.");
        }
        if (element.validity.badInput){
            error(element,"Deus d'introduïr un número vàlid.");
        }
        return false;
    }
    return true;
}

function validarhor (){
    var element = document.getElementById("timeHour");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr una hora.");
        }
        if (element.validity.rangeUnderflow){
            error(element,"el mínima és 0");
        }
        if (element.validity.rangeOverflow){
            error(element,"El màxima és 24 .");
        }
        if (element.validity.stepMismatch){
            error(element,"ha de ser un número enter.");
        }
        if (element.validity.badInput){
            error(element,"Deus d'introduïr un hora vàlida.");
        }
        return false;
    }
    return true;
}

function validar (e) {
    esborrarError ();
    if (
        validarNom() &&
        validarSegs () &&
        validarhor () &&
        confirm("Confirma si vols enviar el formulari")
    ){
        return true;

    }else{
        e.preventDefault();
        return false;
    }
}

function error (element, missatge){
    let miss=document.createTextNode(missatge);    
    document.getElementById("missatgeError").appendChild(miss);
    element.classList.add("error");
    element.focus();
}


function esborrarError (){
    document.getElementById("missatgeError").textContent="";
    let formulari = document.forms[0];
        for ( let i=0; i < formulari.elements.length; i++){
            formulari.elements[i].classList.remove("error");
        }
}

