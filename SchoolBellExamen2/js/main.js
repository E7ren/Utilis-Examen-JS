document.addEventListener('DOMContentLoaded', main);

async function main(){
     carregarTimbres()
     dibuixarTaula()

}

async function carregarTimbres(){
    try {
        const response = await fetch('/SchoolBellExamen2/data/data.json');
        const data = await response.json();
        console.log(data);
        localStorage.setItem('schedules', JSON.stringify(data));
        dadesGuardades = [...data.schedules];
        console.log('localStorage["schedules"]:', localStorage.getItem('schedules'));
    } catch (error) {
        console.error('Error:', error);
    }
}

function dibuixarTaula(){





    
}



