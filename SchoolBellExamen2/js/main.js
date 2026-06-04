document.addEventListener('DOMContentLoaded', main);

let datos   = JSON.parse(localStorage.getItem('baseDades')) || {};
let times = JSON.parse(localStorage.getItem('schedules')) || {};
let songs = JSON.parse(localStorage.getItem('Playlists')) || {}; 


async function main(){

     plenarCansons()
     carregarTimbres()
     dibuixarTaula()
     document.getElementById("filtrar").addEventListener("click", validar);

     

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

    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
    }

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
        nomCancion = songs.songs.find(c => c.id === element.songId).name
        tdCancion.textContent = nomCancion
        tableRow.appendChild(tdCancion);

        const columnaBorrar = document.createElement("td")
        tableRow.appendChild(columnaBorrar)

        const botoBorrar = document.createElement("button")
        botoBorrar.classList.add("btn")
        botoBorrar.textContent = "Borrar"
        botoBorrar.addEventListener("click", () => Borrar(element.id))

        columnaBorrar.appendChild(botoBorrar)
    });

    songs.songs.forEach(element => {

        const canicionName  = document.createElement("td")
        canicionName.textContent = element.name
        tableRow.appendChild(canicionName)

    });

}

function anyadirMomento (e){
    const id = times.times.length > 0 ? Math.max(...times.times.map(t => t.id)) + 1 : 1;
    const name = document.getElementById("timeName").value;
    const hour = document.getElementById("timeHour").value;
    const duration = parseInt(document.getElementById("timeDuration").value);
    const songId = songs.songs.find(c => c.name === document.getElementById("timeSongSelect").value).id;

    const nuevoMomento = { id, name, hour, duration, songId };
    times.times.push(nuevoMomento);
    localStorage.setItem('schedules', JSON.stringify(times));
    dibuixarTaula();
    
    document.getElementById("timeForm").reset();
}

function Borrar (id){
    times.times = times.times.filter(t => t.id !== id);
    localStorage.setItem('schedules', JSON.stringify(times));
    dibuixarTaula();
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
        anyadirMomento(e);
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

