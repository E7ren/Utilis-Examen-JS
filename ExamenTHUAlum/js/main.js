document.addEventListener('DOMContentLoaded', main);
let cotxes = JSON.parse(localStorage.getItem('cotxes')) || {};

async function main(){
    agafarDadesaLS()
    dibuixarTaula()
}

async function agafarDadesaLS(){

    try{
        const resposta = await fetch('js/bbdd.json');
        const cotxes    = await resposta.json();
        console.log(cotxes); 
        localStorage.setItem('cotxes', JSON.stringify(data));
        let dadesGuardades = [...data.cars]; //aplanar array ma gi
    }catch(error){

    }
}

function dibuixarTaula(){
    const cardCotxe = document.getElementById('listado')

    while (cardCotxe.firstChild) {
        cardCotxe.removeChild(cardCotxe.firstChild);
    }

    cotxes.cars.forEach(element => {
        
        const prinCard = document.createElement("div");
        prinCard.classList.add("card", "mb-4")
        cardCotxe.appendChild(prinCard)

        const enlace = document.createElement("a");
        enlace.href = "#!";
        prinCard.appendChild(enlace);

        const imageCotxe = document.createElement("img");
        imageCotxe.src   = "img/" +  element.img;
        imageCotxe.classList.add("card-img-top")
        enlace.appendChild(imageCotxe);

        const cosCard = document.createElement("div");
        cosCard.classList.add("card-body")
        prinCard.appendChild(cosCard)

        const titulCotxe = document.createElement("h2")
        titulCotxe.classList.add("card-title")
        titulCotxe.textContent = element.marca + element.modelo
        cosCard.appendChild(titulCotxe)

        const divRow = document.createElement("div");
        divRow.classList.add("row","justify-content-end");
        cosCard.appendChild(divRow);

        const divPreu = document.createElement("div");
        divPreu.classList.add("p-2", "mb-1", "col-md-3", "offset-md-3", "bg-warning", "rounded", "text-center");
        divRow.appendChild(divPreu);            

        const preu = document.createElement("h2")
        preu.classList.add("fw-blod");
        preu.textContent = element.precio + "€"
        divPreu.appendChild(preu)

        const rowContengut = document.createElement("div");
        rowContengut.classList.add("row");
        cosCard.appendChild(rowContengut);

        const any = document.createElement("div");
        any.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        any.textContent = "anyo";
        rowContengut.appendChild(any);

        const Kilometros = document.createElement("div");
        Kilometros.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        Kilometros.textContent = 'km';
        rowContengut.appendChild(Kilometros);
        
        const cambio = document.createElement("div");
        cambio.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        cambio.textContent = "cambio";
        rowContengut.appendChild(cambio);

        const combustible = document.createElement("div");
        combustible.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        combustible.textContent = "combustible"
        rowContengut.appendChild(combustible)

        const rowValues = document.createElement("div");
        rowValues.classList.add("w-100");
        rowContengut.appendChild(rowValues)

        const anyValue = document.createElement("div");
        anyValue.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        anyValue.textContent = element.anyo;
        rowContengut.appendChild(anyValue);

        const kilometrosValue = document.createElement("div");
        kilometrosValue.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        kilometrosValue.textContent = element.km + ' km';
        rowContengut.appendChild(kilometrosValue);
        
        const cambioValue = document.createElement("div");
        cambioValue.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        cambioValue.textContent = element.cambio;
        rowContengut.appendChild(cambioValue);

        const combustibleValue = document.createElement("div");
        combustibleValue.classList.add("col", "p-3", "text-center", "border-bottom", "border-dark");
        combustibleValue.textContent = element.combustible
        rowContengut.appendChild(combustibleValue)

        const enlaceReserva = document.createElement("a")
        enlaceReserva.classList.add("btn", "btn-primary", "m-3");
        enlaceReserva.href = "#!"
        enlaceReserva.textContent = "Reservar"
        cosCard.appendChild(enlaceReserva);
    });

}
