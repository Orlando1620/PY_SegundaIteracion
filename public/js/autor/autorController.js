/**
 * Funcion para el registro de un libro
 **/ 
var sizeImg = false;
async function addAutor(e){
  e.preventDefault();

  var esValido = validarCamposFormulario("form");
  if (esValido == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    if(validarFecha()){
      tamanoImg();
      if(sizeImg){
        document.getElementById("alert").classList.add("oculto");
        registro();
      } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "La foto del autor debe ser de 194x260";  
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";  
    }
  }
}
  
function validarFecha(){
  var fecha = new Date(document.getElementById('nac').value);
  var hoy = new Date();
    if (hoy <= fecha) {
      return false;
    } else {
      return true;
    }
}

function tamanoImg() {
  var file = document.getElementById('foto').files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
      var img = new Image();      
      img.src = e.target.result;

      img.onload = function () {
          var w = this.width;
          var h = this.height;
          console.log(w);
          console.log(h);

          if(w == 194 && h == 260){
            sizeImg = true;
          } else {
            sizeImg = false;
          }
      }
  };
  reader.readAsDataURL(file);
}

