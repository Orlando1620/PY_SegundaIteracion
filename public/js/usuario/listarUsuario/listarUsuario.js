listarUsuario();
function listarUsuario() {

  fetch('/usuario/listar', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(
      function (response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else
          return response.json();
      }
    )
    .then(
      function (json) {
        console.log(json);
        for (var i = 0; i < json.length; i++) {
          var tr = document.createElement("tr");
          var td = document.createElement("td");


          var textNode = document.createTextNode(json[i]['nombre'] + " " + json[i]['apellido1'] + " " + json[i]['apellido2']);
          td.appendChild(textNode);
          tr.appendChild(td);

          var td2 = document.createElement("td");
          td2.colSpan = "2";
          
          for(var j=0;j<5;j++){
              var icon = document.createElement("i");
              icon.classList.add("fas");
              icon.classList.add("fa-book");
              td2.appendChild(icon);
          }
          tr.appendChild(td2);

          var td3 = document.createElement("td");

          var textNode = document.createTextNode(json[i]['tipo']);
          td3.appendChild(textNode);
          tr.appendChild(td3);

          document.getElementById("listUsuario").appendChild(tr);
        }
      }
    )
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}
