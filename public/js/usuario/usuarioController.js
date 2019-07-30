/**
 * Funcion para el registro de un usuario
 **/
async function addUsuario(e){
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
        return false;
    } else {
        var correo = document.getElementById('correo').value;
        if(validarCorreo(correo)){
            if(validarFecha()){
                if(lat != 0){
                    e.preventDefault();
                    registrarUsuario(); 
                } else {
                    document.getElementById("alert").classList.remove("oculto");
                    document.getElementById("msg").innerHTML = "Debe marcar su localización en el mapa";
                }
                
            } else{
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";
            }
        } else {
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "Formato del correo electrónico no es válido";
        }
    }
}

function validarCorreo(correo){
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(correo.match(format)){
        return true;
    } else {
        return false;
    }
} 

function validarFecha(){
    var fecha = new Date(document.getElementById('fechaNacimiento').value);
    var hoy = new Date();
      if (hoy <= fecha) {
        return false;
      } else {
        return true;
      }
}