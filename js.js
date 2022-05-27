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
          <th>HORARIO</th>
          <th>MATERIA / ACTIVIDAD</th>
          <th>GRADO / POSGRADO</th>
          <th>PROFESOR</th>
          <th>AULA</th>
          <th>PISO</th>
         </tr>`;
    
    // Loop to access all rows 
    var x = 2;
    var date = new Date();
    var today = 'CARTELERA DE ACTIVIDADES ' + date.getDate() + '/' + date.getMonth();
    for (let r of data.datos) 
    {
        //console.log(r.sede);
        if(r.sede == 'Riobamba')
        {
            var f = x % 2;
            switch(f)
            {
                case 0:
                    tab += `<tr> 
                    <td style="background-color: #00589b ; color: white;" >${((r["hora desde"]/100) - ((r["hora desde"]%100)/100)) + ':' + r["hora desde"]%100 + ' a ' + ((r["hora hasta"]/100) - ((r["hora hasta"]%100)/100)) + ':' + r["hora hasta"]%100 }</td> 
                    <td>${r["nombre de materia"]}</td>
                    <td>${r["tipo de clase"]} </td>
                    <td>${r["apellido y nombre"]}</td>   
                    <td>${r["aula asignada"]}</td>
                    <td>${r.edificio}</td>        
                    </tr>`;
                    x++;
                break;

                case 1:
                    tab += `<tr> 
                    <td style="background-color: #00589b ; color: white;" >${((r["hora desde"]/100) - ((r["hora desde"]%100)/100)) + ':' + r["hora desde"]%100 + ' a ' + ((r["hora hasta"]/100) - ((r["hora hasta"]%100)/100)) + ':' + r["hora hasta"]%100 }</td> 
                    <td style="background-color: #dddddd" ;>${r["nombre de materia"]}</td>
                    <td style="background-color: #dddddd" ;>${r["tipo de clase"]}</td>   
                    <td style="background-color: #dddddd" ;>${r["apellido y nombre"]} </td>
                    <td style="background-color: #dddddd" ;>${r["aula asignada"]}</td>
                    <td style="background-color: #dddddd" ;>${r.edificio}</td>        
                    </tr>`;
                    x++;
            }
        }
    }
    tab.className="classes";
    // Setting innerHTML as tab variable
    document.getElementById("classes").innerHTML = tab;

    document.getElementById("titulo").innerHTML = today;
}


loadTable("./clases.json", document.querySelector("table"));


