document.addEventListener('DOMContentLoaded', main);

let bbd = JSON.parse(localStorage.getItem('schedules')) || {};
let times = JSON.parse(localStorage.getItem('schedules')) || {};

async function main(){
     carregarTimbres()
     dibuixarTaula()
     document.getElementById("filtrar").addEventListener("click", validar);

}

function carregarTimbres(){

    carregarTimes();
    carregarSchedule();
    carregarPlaylists();



}
async function carregarSchedule(){
    try {
        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('schedules', JSON.stringify(data.schedules));
        dadesGuardades = [...data.schedules];

        console.log('localStorage["schedules"]:', localStorage.getItem('schedules'));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function carregarPlaylists(){
    try {
        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('Playlists', JSON.stringify(data.playlists));
        dadesGuardades = [...data.schedules];

        console.log('localStorage["Playlists"]:', localStorage.getItem('Playlists'));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function carregarTimes(){
    try {
        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();

        localStorage.setItem('times', JSON.stringify(data.schedules));
        dadesGuardades = [...data.schedules.times];

        console.log('localStorage["times"]:', localStorage.getItem('times'));
    } catch (error) {
        console.error('Error:', error);
    }
}

function dibuixarTaula(){

    const listado = document.getElementById("listado");

    bbd.forEach(element => {

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
          //error(element);
          return false;
      }
      return true;

}

function validar (e) {
    esborrarError ();
    if (
        validarNom() &&
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

