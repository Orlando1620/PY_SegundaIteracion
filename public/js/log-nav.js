if(sessionStorage.getItem("nombre") == null){
    document.getElementById("usrName").innerHTML = "Iniciar Sesión";
    document.getElementById("c-r").innerHTML = "Registrarse";

    document.getElementById("usrName").href = "login.html";
    document.getElementById("c-r").href = "registrarUC.html";
    document.getElementById("home").href = "landing-prod.html";

} else {
    document.getElementById("usrName").innerHTML = sessionStorage.getItem("nombre");
    document.getElementById("c-r").innerHTML = "Cerrar Sesión";
    document.getElementById("c-r").addEventListener('click', cerrarSesion);
    document.getElementById("home").href = "homePage.html";


    switch(sessionStorage.getItem("tipo")){
        case "usuarioCliente":
            document.getElementById("usrName").href = "perfil-uc.html";
            break;
        case "AdminLib":
            document.getElementById("usrName").href = "perfil-adminLib.html";
            break;
        case "adminGlobal":
            document.getElementById("usrName").href = "perfil-adminGlobal.html";
            break;
    }
}

document.getElementById("nav-libros").href = "listar-libros.html";
document.getElementById("nav-autores").href = "listar-autores.html";
document.getElementById("nav-librerias").href = "listar-librerias.html";
document.getElementById("nav-club").href = "listar-clubes.html";
document.getElementById("nav-promo").href = "#";


document.getElementById("select-nav").addEventListener('change', opcionesNav);

function opcionesNav(){
    var opc = document.getElementById("select-nav").value;
    console.log(opc);
    switch(opc){
        case "1":
            window.location.href = "listar-libros.html";
            break;
        case "2":
            window.location.href = "listar-autores.html";
            break;
        case "3":
            window.location.href = "listar-librerias.html";
            break;
        case "4":
            window.location.href = "listar-clubes.html";
            break;

    }
}


function cerrarSesion(){
    sessionStorage.clear();
    window.location.href = "login.html";
}