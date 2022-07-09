
let calcularNeto = () => {
    let montoBruto = document.getElementById("montoBruto").value
    let sueldoNeto = document.getElementById("sueldoNeto")


    
    let jubilacion = parseInt(montoBruto) * 0.11;
    console.log('La Jubilacion es el pago mensual de una suma de dinero que el Estado paga a las personas que han concluido su ciclo laboral. Los aportes por este motivo son del 11% del salario bruto y se transfieren a la ANSeS.');
    let obraSocial = parseInt(montoBruto) * 0.03;
    console.log('Las obras sociales son entidades encargadas de organizar la prestación de la atención médica de los trabajadores. Los aportes por este motivo son del 3% del salario bruto y se transfieren a la obra social elegida por el trabajador.');
    let pami = parseInt(montoBruto) * 0.03;
    console.log('La ley 19032, es la Ley por la cual se crea el Instituto Nacional de Servicios Sociales para Jubilados y Pensionados (creación del PAMI). Es un descuento que se realiza a los trabajadores activos para brindarle asistencia social y salud a los jubilados y pensionados. Los aportes por este motivo son del 3% del salario bruto y se transfieren a PAMI.');

    


    montoBruto = montoBruto - jubilacion - obraSocial - pami
    console.log('El sueldo neto es el dinero total que percibe un trabajador de bolsillo por el trabajo que desempeña luego de que al mismo se le efectúen las correspondientes retenciones (descuentos).');


    sueldoNeto.innerHTML = `
        <div>
        <h3>Tu sueldo neto es de ${montoBruto} pesos argentinos</h3>
        </div>
    `
}
