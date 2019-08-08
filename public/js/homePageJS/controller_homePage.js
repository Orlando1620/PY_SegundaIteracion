'use strict';
if(sessionStorage.getItem("nombre") == null){
    window.location.href = ("login.html");
}

//HOLA

document.getElementById("usrName").innerHTML = sessionStorage.getItem("nombre");S