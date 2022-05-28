
//////////////////////////////////functions///////////////////////////////////

// Loads the web with the fetched data
async function loadTable(url, table){
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    show(data);
}

// Creation of the table head(column names 1 to 5)

function createTableHead(head1,head2,head3,head4,head5,head6) {
    let table = 
        `<tr>
          <th>${head1}</th>
          <th>${head2}</th>
          <th>${head3}</th>
          <th>${head4}</th>
          <th>${head5}</th>
          <th>${head6}</th>
         </tr>`;
         return table;
         
}

// Creation of the table rows, recieves 'sede' to filter the results.

function createTableRows(data, sede){
    let table = ''; // No unwanted empty rows
    var x = 2; // Declaration of var to color the rows of the table (odd = white / even = gray)

    for (let r of data.datos) {

        if(r.sede == sede) // Filter classes by 'sede'
        {
            
            var f = x % 2; // odd or even
            switch(f)
            {
                case 0:
                    table += `<tr> 
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
                    table += `<tr> 
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
    return table;
}

// Creates the table and title and sends them to the HTML elements
function show(data) {

    let tab = createTableHead("HORARIO","MATERIA / ACTIVIDAD", "GRADO / POSGRADO", "PROFESOR", "AULA", "PISO")  
    
    tab += createTableRows(data, 'Callao') ;

    //set the data to the HTML elemtents
    document.getElementById("classes").innerHTML = tab;

    document.getElementById("titulo").innerHTML = createTitle();
}

function createTitle(){
    var date = new Date();
    var title = 'CARTELERA DE ACTIVIDADES ' + date.getDate() + '/' + date.getMonth();
    return title;
}


/////////////////////////MAIN/////////////////////////

loadTable("./clases.json", document.querySelector("table"));


