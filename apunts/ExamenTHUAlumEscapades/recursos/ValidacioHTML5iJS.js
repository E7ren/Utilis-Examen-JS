

// iniciar app

window.onload = iniciar;

function iniciar (){

    document.getElementById("enviar").addEventListener("click", validar,false);

} 

function validarNom () {
      var element = document.getElementById("nom");
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




function validarNeix (){
    var element = document.getElementById("neix");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr una data.");
        }
        if (element.validity.rangeOverflow){
            error(element, "La data mínima ha de ser superior al 01/01/1900.");
        }
        if (element.validity.rangeUnderflow){
            error(element, "La data màxima ha de ser inferior al 31/12/2020.");
        }
        //error(element);
        return false;
    }
    return true;
}

function validarTel (){
    // HTML: <input type="tel" id="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{3}" required>
    var element = document.getElementById("tel");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un telèfon.");
        }
        if (element.validity.patternMismatch){
            error(element,"El telèfon ha de tindre el format 999 999 999.");
        }
        return false;
    }
    return true;
}

function validarEmail (){
    // HTML: <input type="email" id="email" required>
    var element = document.getElementById("email");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un email.");
        }
        if (element.validity.typeMismatch){
            error(element,"El email no té un format vàlid (ex: nom@domini.com).");
        }
        return false;
    }
    return true;
}

function validarEdat (){
    // HTML: <input type="number" id="edat" min="18" max="99" step="1" required>
    var element = document.getElementById("edat");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr una edat.");
        }
        if (element.validity.rangeUnderflow){
            error(element,"L'edat mínima és 18 anys.");
        }
        if (element.validity.rangeOverflow){
            error(element,"L'edat màxima és 99 anys.");
        }
        if (element.validity.stepMismatch){
            error(element,"L'edat ha de ser un número enter.");
        }
        if (element.validity.badInput){
            error(element,"Deus d'introduïr un número vàlid.");
        }
        return false;
    }
    return true;
}

function validarPais (){
    // HTML: <select id="pais" required><option value="">-- Tria --</option>...</select>
    var element = document.getElementById("pais");
    if (element.value === "" || element.value === null){
        error(element,"Deus de seleccionar un país.");
        return false;
    }
    return true;
}

function validarTermes (){
    // HTML: <input type="checkbox" id="termes" required>
    var element = document.getElementById("termes");
    if (!element.checked){
        error(element,"Has d'acceptar els termes i condicions.");
        return false;
    }
    return true;
}

function validarPassword (){
    // HTML: <input type="password" id="password" minlength="8" pattern="(?=.*[A-Za-z])(?=.*\d).{8,}" required>
    // Pattern: mínim 8 caràcters, almenys una lletra i un número
    var element = document.getElementById("password");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr una contrasenya.");
        }
        if (element.validity.tooShort){
            error(element,"La contrasenya ha de tindre mínim 8 caràcters.");
        }
        if (element.validity.patternMismatch){
            error(element,"La contrasenya ha de tindre mínim 8 caràcters, una lletra i un número.");
        }
        return false;
    }
    return true;
}

function validarConfirmPassword (){
    // HTML: <input type="password" id="confirmPassword" required>
    var pass = document.getElementById("password");
    var element = document.getElementById("confirmPassword");
    if (element.value === ""){
        error(element,"Deus de confirmar la contrasenya.");
        return false;
    }
    if (pass.value !== element.value){
        error(element,"Les contrasenyes no coincideixen.");
        return false;
    }
    return true;
}

function validarWeb (){
    // HTML: <input type="url" id="web" required>
    var element = document.getElementById("web");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr una URL.");
        }
        if (element.validity.typeMismatch){
            error(element,"La URL no té un format vàlid (ex: https://exemple.com).");
        }
        return false;
    }
    return true;
}

function validarComentari (){
    // HTML: <textarea id="comentari" minlength="10" maxlength="200" required></textarea>
    var element = document.getElementById("comentari");
    if (!element.checkValidity()){
        if (element.validity.valueMissing){
            error(element,"Deus d'introduïr un comentari.");
        }
        if (element.validity.tooShort){
            error(element,"El comentari ha de tindre mínim 10 caràcters.");
        }
        if (element.validity.tooLong){
            error(element,"El comentari no pot superar els 200 caràcters.");
        }
        return false;
    }
    return true;
}



function validar (e) {
    esborrarError ();
    if (
        validarNom() &&
        validarNeix() &&
        validarTel() &&
        validarEmail() &&
        validarEdat() &&
        validarPais() &&
        validarTermes() &&
        validarPassword() &&
        validarConfirmPassword() &&
        validarWeb() &&
        validarComentari() &&
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


// =======================================================
// EXEMPLES DE FILTRES AMB ARRAYS
// Array d'exemple amb la mateixa estructura que bbdd.json
// =======================================================

var escapades = [
    { destino: "SANTORINI",  precio: 1299, temporada: 2026, duracion: 4, estilo: "Relax",    regimen: "Media pensión" },
    { destino: "LISBOA",     precio: 599,  temporada: 2025, duracion: 3, estilo: "Relax",    regimen: "Alojamiento y desayuno" },
    { destino: "ISLANDIA",   precio: 1840, temporada: 2026, duracion: 5, estilo: "Aventura", regimen: "Media pensión" },
    { destino: "PARIS",      precio: 850,  temporada: 2025, duracion: 4, estilo: "Cultural", regimen: "Solo alojamiento" },
    { destino: "MALDIVES",   precio: 3200, temporada: 2026, duracion: 7, estilo: "Relax",    regimen: "Todo incluido" },
    { destino: "BANGKOK",    precio: 720,  temporada: 2025, duracion: 6, estilo: "Aventura", regimen: "Solo alojamiento" }
];

// -------------------------------------------------------
// 1. FILTRAR PER UN VALOR EXACTE
//    Retorna només les escapades d'un estil concret
// -------------------------------------------------------
function filtrarPerEstil(estil) {
    return escapades.filter(e => e.estilo === estil);
}
// Ús: filtrarPerEstil("Relax")  →  Santorini, Lisboa, Maldives

// -------------------------------------------------------
// 2. FILTRAR PER RANG NUMÈRIC (preu entre dos valors)
// -------------------------------------------------------
function filtrarPerPreu(min, max) {
    return escapades.filter(e => e.precio >= min && e.precio <= max);
}
// Ús: filtrarPerPreu(500, 1000)  →  Lisboa, Bangok, Paris

// -------------------------------------------------------
// 3. FILTRAR PER RANG DE TEMPORADA (anys)
// -------------------------------------------------------
function filtrarPerTemporada(desde, hasta) {
    return escapades.filter(e => e.temporada >= desde && e.temporada <= hasta);
}
// Ús: filtrarPerTemporada(2025, 2025)  →  Lisboa, Paris, Bangkok

// -------------------------------------------------------
// 4. FILTRAR PER RANG DE DURACIÓ (dies)
// -------------------------------------------------------
function filtrarPerDuracio(desde, hasta) {
    return escapades.filter(e => e.duracion >= desde && e.duracion <= hasta);
}
// Ús: filtrarPerDuracio(3, 5)  →  Santorini, Lisboa, Islandia, Paris

// -------------------------------------------------------
// 5. FILTRAR PER TEXT PARCIAL (cerca al destino)
//    includes() — no distingeix majúscules amb toLowerCase()
// -------------------------------------------------------
function filtrarPerDestino(text) {
    return escapades.filter(e => e.destino.toLowerCase().includes(text.toLowerCase()));
}
// Ús: filtrarPerDestino("is")  →  Lisboa, Islandia, Paris

// -------------------------------------------------------
// 6. FILTRAR COMBINANT MÚLTIPLES CAMPS (tots opcionals)
//    Si el camp és buit/null, no aplica eixe filtre
// -------------------------------------------------------
function filtrarCombinats(estil, precioMin, precioMax, temporadaDesde, temporadaHasta, duracioDesde, duracioHasta) {
    return escapades.filter(e => {
        let ok = true;
        if (estil)           ok = ok && e.estilo === estil;
        if (precioMin)       ok = ok && e.precio >= Number(precioMin);
        if (precioMax)       ok = ok && e.precio <= Number(precioMax);
        if (temporadaDesde)  ok = ok && e.temporada >= Number(temporadaDesde);
        if (temporadaHasta)  ok = ok && e.temporada <= Number(temporadaHasta);
        if (duracioDesde)    ok = ok && e.duracion >= Number(duracioDesde);
        if (duracioHasta)    ok = ok && e.duracion <= Number(duracioHasta);
        return ok;
    });
}
// Ús: filtrarCombinats("Relax", 500, 2000, 2025, 2026, null, null)

// -------------------------------------------------------
// 7. ORDENAR DE MAJOR A MENOR PREU (sort descendent)
// -------------------------------------------------------
function ordenarPreuAlt() {
    return [...escapades].sort((a, b) => b.precio - a.precio);
}
// Resultat: Maldives(3200), Islandia(1840), Santorini(1299)...

// -------------------------------------------------------
// 8. ORDENAR DE MENOR A MAJOR PREU (sort ascendent)
// -------------------------------------------------------
function ordenarPreuBaix() {
    return [...escapades].sort((a, b) => a.precio - b.precio);
}
// Resultat: Lisboa(599), Bangkok(720), Paris(850)...

// -------------------------------------------------------
// 9. ORDENAR PER TEXT ALFABÈTICAMENT (sort amb localeCompare)
// -------------------------------------------------------
function ordenarPerDestino() {
    return [...escapades].sort((a, b) => a.destino.localeCompare(b.destino));
}
// Resultat: Bangkok, Islandia, Lisboa, Maldives, Paris, Santorini

// -------------------------------------------------------
// 10. ELIMINAR DUPLICATS (filter + indexOf)
//     Retorna estils únics de l'array
// -------------------------------------------------------
function obtenirEstilsUnics() {
    return escapades.map(e => e.estilo).filter((estil, index, array) => array.indexOf(estil) === index);
}
// Resultat: ["Relax", "Aventura", "Cultural"]

// -------------------------------------------------------
// 11. COMPTAR QUANTS ELEMENTS COMPLEIXEN UNA CONDICIÓ
//     (filter + length)
// -------------------------------------------------------
function comptarPerRegimen(regimen) {
    return escapades.filter(e => e.regimen === regimen).length;
}
// Ús: comptarPerRegimen("Media pensión")  →  2

// -------------------------------------------------------
// 12. TROBAR EL MÉS BARAT / MÉS CAR (reduce)
// -------------------------------------------------------
function mesBarat() {
    return escapades.reduce((min, e) => e.precio < min.precio ? e : min, escapades[0]);
}
function mesCar() {
    return escapades.reduce((max, e) => e.precio > max.precio ? e : max, escapades[0]);
}
// mesBarat() → Lisboa (599)  |  mesCar() → Maldives (3200)

// -------------------------------------------------------
// 13. CALCULAR EL PREU MITJÀ (reduce + length)
// -------------------------------------------------------
function preuMitja() {
    const total = escapades.reduce((suma, e) => suma + e.precio, 0);
    return total / escapades.length;
}
// Resultat: (1299+599+1840+850+3200+720) / 6 = 1418