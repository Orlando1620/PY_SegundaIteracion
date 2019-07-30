'use strict';


window.onload = function () {
    cargarPerfil();
}

async function cargarPerfil() {
    let autor = await obtener_autor(localStorage.getItem('idAutor'));
    document.getElementById("nombreCompletoAutor").innerHTML = autor.nombre + " " + autor.apellido1 + " " + autor.apellido2;
    var fechaDeNacimiento = new Date(autor.nac);
    document.getElementById("fechaDeNacimiento").innerHTML = "Fecha de nacimiento: " + fechaDeNacimiento.toLocaleDateString();

    document.getElementById("edad").innerHTML = "Edad: " + getAnnos(autor.nac)

    document.getElementById("infoAutor").innerHTML = autor.bio;

    document.getElementById("imagenAutor").src = autor.imgUrl;

    for (var i = 0; i < autor.libros.length; i++) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");


        var imagen = document.createElement('img');
        imagen.src = autor.libros[i].urlImg;

        var nombreLibro = autor.libros[i].nombre;
        var n = document.createElement("span");
        n.innerHTML = nombreLibro;

        td1.appendChild(imagen);
        td1.appendChild(n);

        tr.appendChild(td1);

        document.getElementById("librosAutor").appendChild(tr);

    }
    

    /*var tbl = document.getElementById("lista-lib");
    var tblbdy = document.createElement('tbody');
    var tbltd;
    var tblrw;
    debugger;
    for (var i = 0; i < autor.libros.length; i++) {
        tblrw = document.createElement('tr');
        tbltd = document.createElement('td');

        var imagen = document.createElement('img');

        imagen.src = autor.libros[i].urlImg;
        var nombreLibro = autor.libros[i].nombre;

        // imagen.appendChild(tbltd);
        // nombreLibro.createTextNode(tbltd)
        var n = document.createElement("span");
        n.innerHTML = nombreLibro;
        tbltd.appendChild(imagen);
        tbltd.appendChild(n);
        tblrw.appendChild(tbltd);
        tblbdy.appendChild(tblrw);

    }
    document.getElementById("librosAutor").appendChild(tblbdy);*/
}

function getAnnos(nacimiento) {
    var today = new Date();
    var birthDate = new Date(nacimiento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

