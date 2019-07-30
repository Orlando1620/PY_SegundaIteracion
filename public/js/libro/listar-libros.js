var libros = [];

fetch('/genero/listar', {
method: 'GET',
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
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("generos").appendChild(opc);
        }
    }
)
.catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
);

fetch('/categoria/listar', {
    method: 'GET',
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
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("categorias").appendChild(opc);
        }
    }
)
.catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
);

fetch('/libro/listar', {
    method: 'GET',
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
        for(var i=0;i<json.length;i++){
            libros.push(json[i]);

            var card = document.createElement("div");
            card.classList.add("card");

            var img = document.createElement("img");
            img.classList.add("img-card");
            img.src = json[i]['urlImg'];
            card.appendChild(img);

            var cardTextCont = document.createElement("div");
            cardTextCont.classList.add("card-text-cont");
            var title = document.createElement("a");
            var textTitle = document.createTextNode(json[i]["nombre"]);
            title.appendChild(textTitle);
            cardTextCont.appendChild(title);
            card.appendChild(cardTextCont);

            title.href = "#";
            title.id = json[i]["isbn"];
            title.addEventListener('click', perfil);

            var cardTextCont2 = document.createElement("div");
            cardTextCont2.classList.add("card-text-cont");
            var label = document.createElement("label");
            var textLabel = document.createTextNode("Por: ");
            label.appendChild(textLabel);
            cardTextCont2.appendChild(label);
            var autor = document.createElement("label");
            var textAutor = document.createTextNode(json[i]["autor"]);
            autor.appendChild(textAutor);
            cardTextCont2.appendChild(autor);
            card.appendChild(cardTextCont2);

            var cardTextCont3 = document.createElement("div");
            cardTextCont3.classList.add("card-text-cont");
            for(var j=0;j<5;j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                cardTextCont3.appendChild(icon);
            }
            card.appendChild(cardTextCont3);

            

            document.getElementById("cards-cont").appendChild(card);
        }
    }
)
.catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
);

function perfil(e){
    var a = e.target;
    var isbn = a.id;
    sessionStorage.setItem("idLibro",isbn);
    window.location.href = "perfil-libro.html";
}

