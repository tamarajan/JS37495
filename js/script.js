


let calcularNeto = () => {

    let montoBruto = document.getElementById("montoBruto").value
    let sueldoNeto = document.getElementById("sueldoNeto")
    let aportaSindicato, porcentajeAportado;

    aportaSindicato = document.querySelector('input[name="descuentoSindicato"]:checked').value || 'No';
    porcentajeAportado = aportaSindicato == 'Si' ? 3 : 0
    let descuentosTotal = (montoBruto * 0.11) + (montoBruto * 0.03) + (montoBruto * 0.03) + montoBruto * porcentajeAportado/100;

    
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
            "monto": montoBruto * porcentajeAportado/100,
        },
    ]

    sessionStorage.setItem('descuentos', JSON.stringify(descuentosNeto));
    let descuentosRecuperados = JSON.parse(sessionStorage.getItem('descuentos'));
    console.log(descuentosRecuperados);

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


