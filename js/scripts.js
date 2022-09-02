

function valorSindicato() {
    let seleccion = document.getElementById('selectSindicato').value == '2' ? 2 : 3
    return seleccion;
}


function activarSelect() {
    document.getElementById("selectSindicato").disabled = false;
}

function desactivarSelect() {
    document.getElementById("selectSindicato").disabled = true;
}

activarSelect();
desactivarSelect();


let calcularNeto = () => {

    let montoBruto = document.getElementById("montoBruto").value
    let montoAdicionales = document.getElementById("montoAdicionales").value
    let sueldoNeto = document.getElementById("sueldoNeto")
    let aportaSindicato, porcentajeAportado;


    aportaSindicato = document.querySelector('input[name="descuentoSindicato"]:checked').value || 'No';
    porcentajeAportado = aportaSindicato == 'Si' ? (document.getElementById('selectSindicato').value == '2' ? 2 : 3) : 0


    let descuentosTotal = (montoBruto * 0.11) + (montoBruto * 0.03) + (montoBruto * 0.03) + montoBruto * porcentajeAportado / 100;
    montoAdicionales = (montoAdicionales - 0);


    let montoNetoSinAdic = montoBruto - descuentosTotal;
    let montoNeto = montoNetoSinAdic + montoAdicionales;


    sueldoNeto.innerHTML = `
        <div>
        <p class="lead mb-0">Tu sueldo neto es de <strong>$${montoNeto}</strong> pesos argentinos. Las retenciones al Sueldo Bruto están conformadas por: </p>
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

    let sueldoNetoAGuardar = montoNetoSinAdic;
    sessionStorage.setItem('neto', sueldoNetoAGuardar);

}




let buttonMostrarInfo = document.querySelector("#mostrarMasInfo");
let informacion = document.querySelector("#masInfo");

buttonMostrarInfo.addEventListener("click", mostrarInformacion);

function mostrarInformacion(event) {
    event.preventDefault();
    informacion.classList.toggle("hidden");
    this.innerText = informacion.classList.contains("hidden")
        ? "Mostrar más información"
        : "Ocultar la información";
}



let calcularAguinaldoActual = () => {

    let aguinaldoActual = parseFloat(sessionStorage.getItem('neto'));

    aguinaldoActual = aguinaldoActual / 2

    aguinaldoActualFinal.innerHTML = `
        <div>
        <p class="lead mb-0">En base a tu Sueldo Neto actual, tu próximo aguinaldo será de <strong>$${aguinaldoActual}</strong> pesos argentinos.</p>
        </div>
    `

}

let calcularAguinaldo = () => {

    let aguinaldo = document.getElementById("aguinaldo").value

    aguinaldo = aguinaldo / 2

    aguinaldoFinal.innerHTML = `
        <div>
        <p class="lead mb-0">Tu Aguinaldo será de <strong>$${aguinaldo}</strong> pesos argentinos.</p>
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
    <p class="lead mb-0">Han pasado ${mesesIngreso} meses desde tu ingreso. Por lo tanto, te corresponden <strong>${diasVacaciones}</strong> días de Vacaciones pagas.</p>
    </div>
`
    } else {
        vacacionesFinal.innerHTML = `
    <div>
    <p class="lead mb-0">Ha/n pasado ${mesesIngreso} mes/es desde tu ingreso. Por lo tanto, te corresponden <strong>${diasVacacionesHabil}</strong></p>
    </div>
`
    }

})



const listaFeriados = async () => {

    const response = await fetch("https://holidayapi.com/v1/holidays?pretty&key=242bf3a6-0141-4c7b-b1fe-d2a2e50d9ae9&country=AR&year=2021&language=es");
    const respuesta = await response.json();
    const holidays = respuesta.holidays;
    console.log(holidays);


    let listaHolidaysEnero = ``;
    let listaHolidaysFebrero = ``;
    let listaHolidaysMarzo = ``;
    let listaHolidaysAbril = ``;
    let listaHolidaysMayo = ``;
    let listaHolidaysJunio = ``;
    let listaHolidaysJulio = ``;
    let listaHolidaysAgosto = ``;
    let listaHolidaysSeptiembre = ``;
    let listaHolidaysOctubre = ``;
    let listaHolidaysNoviembre = ``;
    let listaHolidaysDiciembre = ``;

    const enero = holidays.filter(
        (item) => {
            const feriadosEnero = new Date(item.date);
            return feriadosEnero.getMonth() === 0;
        });
    enero.forEach((holiday) => {
        listaHolidaysEnero += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const febrero = holidays.filter(
        (item) => {
            const feriadosFebrero = new Date(item.date);
            return feriadosFebrero.getMonth() === 1;
        });
    febrero.forEach((holiday) => {
        listaHolidaysFebrero += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const marzo = holidays.filter(
        (item) => {
            const feriadosMarzo = new Date(item.date);
            return feriadosMarzo.getMonth() === 2;
        });
    marzo.forEach((holiday) => {
        listaHolidaysMarzo += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const abril = holidays.filter(
        (item) => {
            const feriadosAbril = new Date(item.date);
            return feriadosAbril.getMonth() === 3;
        });
    abril.forEach((holiday) => {
        listaHolidaysAbril += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const mayo = holidays.filter(
        (item) => {
            const feriadosMayo = new Date(item.date);
            return feriadosMayo.getMonth() === 4;
        });
    mayo.forEach((holiday) => {
        listaHolidaysMayo += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const junio = holidays.filter(
        (item) => {
            const feriadosJunio = new Date(item.date);
            return feriadosJunio.getMonth() === 5;
        });
    junio.forEach((holiday) => {
        listaHolidaysJunio += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const julio = holidays.filter(
        (item) => {
            const feriadosJulio = new Date(item.date);
            return feriadosJulio.getMonth() === 6;
        });
    julio.forEach((holiday) => {
        listaHolidaysJulio += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const agosto = holidays.filter(
        (item) => {
            const feriadosAgosto = new Date(item.date);
            return feriadosAgosto.getMonth() === 7;
        });
    agosto.forEach((holiday) => {
        listaHolidaysAgosto += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const septiembre = holidays.filter(
        (item) => {
            const feriadosSeptiembre = new Date(item.date);
            return feriadosSeptiembre.getMonth() === 8;
        });
    septiembre.forEach((holiday) => {
        listaHolidaysSeptiembre += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const octubre = holidays.filter(
        (item) => {
            const feriadosOctubre = new Date(item.date);
            return feriadosOctubre.getMonth() === 9;
        });
    octubre.forEach((holiday) => {
        listaHolidaysOctubre += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const noviembre = holidays.filter(
        (item) => {
            const feriadosNoviembre = new Date(item.date);
            return feriadosNoviembre.getMonth() === 10;
        });
    noviembre.forEach((holiday) => {
        listaHolidaysNoviembre += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });

    const diciembre = holidays.filter(
        (item) => {
            const feriadosDiciembre = new Date(item.date);
            return feriadosDiciembre.getMonth() === 11;
        });
    diciembre.forEach((holiday) => {
        listaHolidaysDiciembre += `
        <div class="feriados">
        <h4>${holiday.date}</h4>
        <p>Festividad: ${holiday.name}</p>
        <p>Día de la Semana: ${holiday.weekday.date.name}</p>
        </div>
            `;
    });


    let feriadosEnero = document.getElementById('feriadosEnero')
    feriadosEnero.innerHTML = listaHolidaysEnero;

    let feriadosFebrero = document.getElementById('feriadosFebrero')
    feriadosFebrero.innerHTML = listaHolidaysFebrero;

    let feriadosMarzo = document.getElementById('feriadosMarzo')
    feriadosMarzo.innerHTML = listaHolidaysMarzo;

    let feriadosAbril = document.getElementById('feriadosAbril')
    feriadosAbril.innerHTML = listaHolidaysAbril;

    let feriadosMayo = document.getElementById('feriadosMayo')
    feriadosMayo.innerHTML = listaHolidaysMayo;

    let feriadosJunio = document.getElementById('feriadosJunio')
    feriadosJunio.innerHTML = listaHolidaysJunio;

    let feriadosJulio = document.getElementById('feriadosJulio')
    feriadosJulio.innerHTML = listaHolidaysJulio;

    let feriadosAgosto = document.getElementById('feriadosAgosto')
    feriadosAgosto.innerHTML = listaHolidaysAgosto;

    let feriadosSeptiembre = document.getElementById('feriadosSeptiembre')
    feriadosSeptiembre.innerHTML = listaHolidaysSeptiembre;

    let feriadosOctubre = document.getElementById('feriadosOctubre')
    feriadosOctubre.innerHTML = listaHolidaysOctubre;

    let feriadosNoviembre = document.getElementById('feriadosNoviembre')
    feriadosNoviembre.innerHTML = listaHolidaysNoviembre;

    let feriadosDiciembre = document.getElementById('feriadosDiciembre')
    feriadosDiciembre.innerHTML = listaHolidaysDiciembre;


    let buttonMostrarFeriados = document.querySelector("#mostrarFeriados");
    let informacionFeriados = document.querySelector("#masInfoFeriados");


    buttonMostrarFeriados.addEventListener("click", mostrarInformacion);

    function mostrarInformacion(event) {
        event.preventDefault();
        informacionFeriados.classList.toggle("hidden");
        this.innerText = informacionFeriados.classList.contains("hidden")
            ? "Mostrar Feriados"
            : "Ocultar Feriados";
    }

};

listaFeriados();
