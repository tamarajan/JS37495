
function valorSindicato() {
    let seleccion = document.getElementById('selectSindicato').value == '2' ? 2 : 3
    return seleccion;
}


let calcularNeto = () => {

    let montoBruto = document.getElementById("montoBruto").value
    let sueldoNeto = document.getElementById("sueldoNeto")
    let aportaSindicato, porcentajeAportado;



    aportaSindicato = document.querySelector('input[name="descuentoSindicato"]:checked').value || 'No';
    porcentajeAportado = aportaSindicato == 'Si' ? (document.getElementById('selectSindicato').value == '2' ? 2 : 3) : 0
    let descuentosTotal = (montoBruto * 0.11) + (montoBruto * 0.03) + (montoBruto * 0.03) + montoBruto * porcentajeAportado / 100;


    let montoNeto = montoBruto - descuentosTotal;


    sueldoNeto.innerHTML = `
        <div>
        <h3>Tu sueldo neto es de $${montoNeto} pesos argentinos. Las retenciones al Sueldo Bruto están conformadas por: </h3>
        </div>
    `


    let descuentosNeto = [
        {
            "descuento": "Jubilación",
            "monto": (montoBruto) * 0.11,
        },
        {
            "descuento": "Obra Social",
            "monto": (montoBruto) * 0.03,
        },
        {
            "descuento": "PAMI",
            "monto": (montoBruto) * 0.03,
        },
        {
            "descuento": "Sindicato",
            "monto": montoBruto * porcentajeAportado / 100,
        },
    ]

    sessionStorage.setItem('descuentos', JSON.stringify(descuentosNeto));
    let descuentosRecuperados = JSON.parse(sessionStorage.getItem('descuentos'));

    function mostrarDescuentos() {
        let lista = document.getElementById("ulListado");
        descuentosNeto.forEach(function (data) {
            let linew = document.createElement("li");
            let contenido = document.createTextNode(data.descuento + ": $" + data.monto);
            lista.appendChild(linew);
            linew.appendChild(contenido);
        })
    }
    mostrarDescuentos();


    let sueldoNetoAGuardar = montoNeto;
    sessionStorage.setItem('neto', sueldoNetoAGuardar);


}


let buttonMostrarInfo = document.querySelector("#mostrarMasInfo");
let información = document.querySelector("#masInfo");

buttonMostrarInfo.addEventListener("click", mostrarInformación);

function mostrarInformación(event) {
    event.preventDefault();
    información.classList.toggle("hidden");
    this.innerText = información.classList.contains("hidden")
        ? "Mostrar más información"
        : "Ocultar la información";
}

/*
async function bringData() {
    const response = await fetch('./js/data.json', {
        'mode': 'no-cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }
    );
    const data = await response.json();
    console.log(data);
    crearHTML(data);
}

window.onload = bringData();

const container = document.querySelector('#adicionales');


let crearHTML = (array) => {

    array.forEach((adicional) => {
        const checkbox = `
        <input type="checkbox" id="checkbox">
        <label for="nombre">${adicional.nombre}: $${adicional.monto}</label>
        </br>
        `;
        container.innerHTML += checkbox;
    })
}


function calcularAdicionales() {

    if (('input[id="checkbox"]:checked').value) {
        return bringData(adicional.monto);
    } else {
        return 0;
    }

}

let adicional = calcularAdicionales();
console.log(adicional);

adicionalesTotal.innerHTML = `
    <div>
    <h3>Tu sueldo neto tendrá un adicional de $${adicional} pesos argentinos.</h3>
    </div>
`




let calcularAdicionalesDic = () => {

    const adicionales = [
        { nombre: 'Gastos equipamiento del trabajador', monto: 1600 },
        { nombre: 'Viáticos', monto: 8000 },
        { nombre: 'Bono por ventas', monto: 2000 },
        { nombre: 'Bono Fin de Año', monto: 1600 },
        { nombre: 'Bono reemplazo Caja Navideña', monto: 2300 },
    ]


    const adicionalesDic = adicionales.reduce((acc, num) => acc + num.monto, 0)



    adicionalesDiciembre.innerHTML = `
    <div>
    <h3>En el mes de Diciembre, tu sueldo neto tendrá un adicional de $${adicionalesDic} pesos argentinos conformados por:</h3>
    </div>
`
    function mostrarAdicionales() {
        let lista = document.getElementById("ulListadoDic");
        adicionales.forEach(function (data) {
            let linew = document.createElement("li");
            let contenido = document.createTextNode(data.nombre + ": $" + data.monto);
            lista.appendChild(linew);
            linew.appendChild(contenido);

        })
    }

    mostrarAdicionales();

}

*/





let calcularAguinaldoActual = () => {

    let aguinaldoActual = parseFloat(sessionStorage.getItem('neto'));

    aguinaldoActual = aguinaldoActual / 2

    aguinaldoActualFinal.innerHTML = `
        <div>
        <h3>En base a tu Sueldo Neto actual, tu próximo aguinaldo será de $${aguinaldoActual} pesos argentinos.</h3>
        </div>
    `

}


let calcularAguinaldo = () => {

    let aguinaldo = document.getElementById("aguinaldo").value

    aguinaldo = aguinaldo / 2

    aguinaldoFinal.innerHTML = `
        <div>
        <h3>Tu Aguinaldo Neto a cobrar será de $${aguinaldo} pesos argentinos.</h3>
        </div>
    `

}


const DateTime = luxon.DateTime;

const btnCalcular = document.getElementById('calcular');

window.onload = () => {
    let fechas = document.querySelectorAll('input[type="date"]');
    let fechaIngreso = DateTime.now().toFormat('yyyy-MM-dd');
    let fechaVacaciones = DateTime.now().toFormat('yyyy-MM-dd');


}


function calcularMesesIngreso(ingreso, vacaciones) {
    let totalMeses = vacaciones.diff(ingreso);
    return totalMeses.as('months');

}


btnCalcular.addEventListener('click', () => {
    let ingreso = DateTime.fromISO(document.getElementById('fechaIngreso').value);
    let vacaciones = DateTime.fromISO(document.getElementById('fechaVacaciones').value);
    let mesesIngreso = parseInt(calcularMesesIngreso(ingreso, vacaciones));
    let diasVacacionesHabil = '1 día de vacaciones por cada 20 días de trabajo efectivo (días hábiles).';
    let diasVacaciones = mesesIngreso >= 6 ? 14 : diasVacacionesHabil

    if (mesesIngreso >= 6) {
        vacacionesFinal.innerHTML = `
    <div>
    <h3>Han pasado ${mesesIngreso} meses desde tu ingreso. Por lo tanto, te corresponden ${diasVacaciones} días de Vacaciones pagas.</h3>
    </div>
`
    } else {
        vacacionesFinal.innerHTML = `
    <div>
    <h3>Ha/n pasado ${mesesIngreso} mes/es desde tu ingreso. Por lo tanto, te corresponden ${diasVacacionesHabil}</h3>
    </div>
`
    }

})

fetch('https://holidayapi.com/v1/holidays?pretty&key=242bf3a6-0141-4c7b-b1fe-d2a2e50d9ae9&country=AR&year=2021')
.then((response) => response.json())
.then((data) => console.log(data));

const contenedor = document.querySelector('#contenedorTarjetas');
const container = document.querySelector('#cardContainer');
const btnBuscar = document.querySelector('#buscar');



let crearHTML = (array) =>  {
    contenedor.innerHTML = '';
    container.innerHTML = '';
    array.forEach((holidays) => {
        const tarjeta = `
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${holidays.name}</h5>
                        <p class="card-text">Fecha: ${holidays.date}</p>
                        <p class="card-text">Día de la Semana: ${holidays.weekday}</p>
                    </div>
                </div>
            </div>`;
        contenedor.innerHTML += tarjeta;
    })
}

btnBuscar.addEventListener('click', () => {
    fetch('https://holidayapi.com/v1/holidays?pretty&key=242bf3a6-0141-4c7b-b1fe-d2a2e50d9ae9&country=AR&year=2021')
        .then((response) => response.json())
        .then((data) => {
            crearHTML((data));
        })
})
