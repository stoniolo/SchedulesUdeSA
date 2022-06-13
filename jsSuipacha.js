
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
            //start and end time formatting
            let horad;
            if(r["hora_desde"]%100 == 0) {horad = r["hora_desde"]/100 + ':' + '00';}
            else {horad = ((r["hora_desde"]/100) - ((r["hora_desde"]%100)/100)) + ':' + r["hora_desde"]%100;}

            let horah;
            if(r["hora_hasta"]%100 == 0) {horah = r["hora_hasta"]/100 + ':' + '00';}
            else {horah = ((r["hora_hasta"]/100) - ((r["hora_hasta"]%100)/100)) + ':' + r["hora_hasta"]%100;}
            
            // floor from number to text
            let floor;

            switch(r["piso"]){
                case -2:
                    floor = 'Segundo subsuelo';
                break;

                case -1:
                    floor = 'Primer subsuelo';
                break;

                case 0:
                    floor = 'Planta baja';
                break;

                case 1:
                    floor = 'Primer piso';                
                break;

                case 2:
                    floor = 'Segundo piso';   
                break;

                case 3:
                    floor = 'Tercer piso';           
                break;
            }

            var f = x % 2; // odd or even row?

            switch(f)
            {
                case 0:
                    table += `<tr>
                    <td>${horad + ' - ' + horah}</td> 
                    <td>${r["nombre_de_materia"]}</td>
                    <td>${r["unidad"]} </td>
                    <td>${r["apellido_nombre"]}</td>   
                    <td>${r["aula_asignada"]}</td>
                    <td>${floor}</td>        
                    </tr>`;
                    x++;
                break;

                case 1:
                    table += `<tr> 
                    <td style="background-color: #dddddd" ;" >${horad + ' - ' + horah}</td> 
                    <td style="background-color: #dddddd" ;>${r["nombre_de_materia"]}</td>
                    <td style="background-color: #dddddd" ;>${r["unidad"]}</td>   
                    <td style="background-color: #dddddd" ;>${r["apellido_nombre"]} </td>
                    <td style="background-color: #dddddd" ;>${r["aula_asignada"]}</td>
                    <td style="background-color: #dddddd" ;>${floor}</td>        
                    </tr>`;
                    x++;
            }
            hora = null;
        }
    }
    return table;
}

// Creates the table and title and sends them to the HTML elements
function show(data) {

    let tab = createTableHead("HORARIO","MATERIA / ACTIVIDAD", "GRADO / POSGRADO", "PROFESOR", "AULA", "PISO")  
    
    tab += createTableRows(data, 'Suipacha') ;

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

loadTable("./cartelera.json", document.querySelector("table"));
