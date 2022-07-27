


let calcularNeto = () => {

    let montoBruto = document.getElementById("montoBruto").value
    let sueldoNeto = document.getElementById("sueldoNeto")


    function descuentos(jubilacion, obraSocial, pami, sindicato, aportaSindicato, porcentajeSindicato) {

        switch (aportaSindicato = document.getElementById("sindicato").value.toLowerCase()) {

            case "no":
                sindicato = 0;
                break;

            case "si":
                switch (porcentajeSindicato = document.getElementById("sindicatoPorcentaje").value) {
                    case "2": {
                        sindicato = 0.02;
                        break;
                    }

                    case "3": {
                        sindicato = 0.03;
                        break;
                    }

                    default:
                        alert("Por favor, ingresá si o no.");
                        break;
                }



        }

        return jubilacion + obraSocial + pami + sindicato;

    }

    let descuentosTotal = descuentos((parseInt(montoBruto) * 0.11), (parseInt(montoBruto) * 0.03), (parseInt(montoBruto) * 0.03), (parseInt(montoBruto) * parseInt(sindicato)));

    montoBruto = montoBruto - descuentosTotal


    sueldoNeto.innerHTML = `
        <div>
        <h3>Tu sueldo neto es de $${montoBruto} pesos argentinos.</h3>
        </div>
    `
    
}

window.addEventListener('load', init, false);
    function init() {
        let div = document.querySelector('#masInfo');
        div.style.visibility = 'hidden';
        let boton = document.querySelector('#mostrarMasInfo');
        boton.addEventListener('click', function (e) {
            if(div.style.visibility === 'visible'){
                div.style.visibility = 'hidden';
            }else{
                div.style.visibility = 'visible';
            }
        }, false);
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
    <h3>En el mes de Diciembre, tu sueldo neto tendrá un adicional de $${adicionalesDic} pesos argentinos.</h3>
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



