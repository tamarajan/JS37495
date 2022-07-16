


let calcularNeto = () => {

    let montoBruto = document.getElementById("montoBruto").value
    let sueldoNeto = document.getElementById("sueldoNeto")
    

    function descuentos (jubilacion, obraSocial, pami, sindicato) {

        switch (sindicato = document.getElementById("sindicato").value) {
            case "no":
                sindicato = 0;
                break;
            case "si":
                sindicato = parseInt(montoBruto) * 0.02;
                break;
            default:
                alert("Por favor, ingresá si o no.");
                break;
        }

        return jubilacion + obraSocial + pami + sindicato;

        
    }


    let descuentosTotal = descuentos((parseInt(montoBruto) * 0.11), (parseInt(montoBruto) * 0.03), (parseInt(montoBruto) * 0.03), (parseInt(montoBruto) * 0.02));


    montoBruto = montoBruto - descuentosTotal
    console.log('El sueldo neto es el dinero total que percibe un trabajador de bolsillo por el trabajo que desempeña luego de que al mismo se le efectúen las correspondientes retenciones (descuentos).');


    sueldoNeto.innerHTML = `
        <div>
        <h3>Tu sueldo neto es de $${montoBruto} pesos argentinos</h3>
        </div>
    `
}

const adicionales = [
    { nombre: 'Gastos equipamiento del trabajador', monto: 1600 },
    { nombre: 'Viáticos', monto: 8000 },
    { nombre: 'Bono por ventas', monto: 2000 },
]

const adicionalesDic = [
    { nombre: 'Bono Fin de Año', monto: 1600 },
    { nombre: 'Bono reemplazo Caja Navideña', monto: 2300 },
]

adicionales.push(adicionalesDic)
console.log(adicionales);