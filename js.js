async function loadTable(url, table){
    const tableHead = await table.querySelector("thead");
    const tableBody = await table.querySelector("tbody");
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    show(data);
}


function show(data) {
    let tab = 
        `<tr>
          <th style=>Fecha</th>
          <th>Dia</th>
          <th>Hora desde</th>


          <th>Profesores</th>

          <th>Nombre de materia</th>
          <th>Tipo de clase</th>
          <th>Aula asignada</th>
          <th>Edificio</th>

         </tr>`;
    
    // Loop to access all rows 
    for (let r of data.datos) 
    {
        if(r.sede == 'Callao'){
    tab += `<tr> 
    <td>${r.fecha} </td>
    <td>${r.dia}</td>
    <td>${((r["hora desde"]/100) - ((r["hora desde"]%100)/100)) + ':' + r["hora desde"]%100 + ' - ' + ((r["hora hasta"]/100) - ((r["hora hasta"]%100)/100)) + ':' + r["hora hasta"]%100 }</td> 


    <td>${r["apellido y nombre"]}</td>

    <td>${r["nombre de materia"]}</td>   
    <td>${r["tipo de clase"]} </td>
    <td>${r["aula asignada"]}</td>
    <td>${r.edificio}</td> 
 
    </tr>`;
        }
    }
    // Setting innerHTML as tab variable
    document.getElementById("classes").innerHTML = tab;
}


loadTable("./clases.json", document.querySelector("table"));


