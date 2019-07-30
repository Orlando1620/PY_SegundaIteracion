//Fetch para listar autores
async function listarLibro(nombreSucursal){

  var data = {
      nombreSuc: nombreSucursal
  }
  fetch('/inventario/listar', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
    .then(
      function(response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else
          return response.json();
      }
    )
    .then(
        function(json){
          console.log(json);
          for(var i=0;i<json.length;i++){
              var tr = document.createElement("tr");
              var td1 = document.createElement("td");
              var td2 = document.createElement("td");
              var td3 = document.createElement("td");


              var textTd1 = document.createTextNode(json[i]['libro']);
              var textTd2 = document.createTextNode(json[i]['cantidad']);
              var textTd3 = document.createTextNode(json[i]['precio']);

              td1.appendChild(textTd1);
              td2.appendChild(textTd2);
              td3.appendChild(textTd3);

              td2.colSpan = 2;

              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);

              document.getElementById("lista-lib").appendChild(tr);
          }
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

async function filtrar(){
  var nombreSucursal = "Libreria Internacional Terramall";
  var list = document.getElementById("lista-lib");
  removeElements(list);
  var nombreReq = document.getElementById("buscar").value;
  nombreReq = nombreReq.toLowerCase();
  var data = {
      nombreSuc: nombreSucursal
  }
  fetch('/inventario/listar', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
      .then(
      function(response) {
          if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
          else
          return response.json();
      }
      )
      .then(
          function listarSucursal(json){
              if(json.length>0){
                var resultados = 0;
                  for(var i=0;i<json.length;i++){

                      var nombreRes = json[i]['libro'];
                      nombreRes  = nombreRes.toLowerCase();

                      if(nombreRes.includes(nombreReq)){
                        resultados++;

                          var tr = document.createElement("tr");
                          var td1 = document.createElement("td");
                          var td2 = document.createElement("td");
                          var td3 = document.createElement("td");


                          var textTd1 = document.createTextNode(json[i]['libro']);
                          var textTd2 = document.createTextNode(json[i]['cantidad']);
                          var textTd3 = document.createTextNode(json[i]['precio']);

                          td1.appendChild(textTd1);
                          td2.appendChild(textTd2);
                          td3.appendChild(textTd3);

                          td2.colSpan = 2;

                          tr.appendChild(td1);
                          tr.appendChild(td2);
                          tr.appendChild(td3);

                          document.getElementById("lista-lib").appendChild(tr);

                          document.getElementById("alert").classList.add("oculto");

                      }
                  }
                  console.log(resultados);
                  if (resultados == 0){

                  document.getElementById("alert").classList.remove("oculto");
                  document.getElementById("msg").innerHTML = "No se encontraron resultados";
                }
              } else {
                  document.getElementById("alert").classList.remove("oculto");
                  document.getElementById("msg").innerHTML = "No se encontraron resultados";
              }


          }
      )
      .catch(
      function(err) {
          console.log('Ocurrió un error con la ejecución', err);
      }
      );
}

function removeElements(list){
  while (list.childNodes[1]) {
      list.removeChild(list.childNodes[1]);
  }
  var titles = document.createElement("tr");
  var t1 = document.createElement("td");
  var t2 = document.createElement("td");
  var t3 = document.createElement("td");

  var textT1 = document.createTextNode("Nombre");
  var textT2 = document.createTextNode("Cantidad");
  var textT3 = document.createTextNode("Precio");

  t1.appendChild(textT1);
  t2.appendChild(textT2);
  t3.appendChild(textT3);

  t2.colSpan = 2;

  titles.appendChild(t1);
  titles.appendChild(t2);
  titles.appendChild(t3);

  titles.classList.add("table-titles");

  document.getElementById("lista-lib").appendChild(titles);
}

listarLibro(sessionStorage.getItem("nombreSucursal"));
