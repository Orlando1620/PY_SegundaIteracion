document.getElementById("generos").addEventListener("change", filtrarGenCat);
document.getElementById("categorias").addEventListener("change", filtrarGenCat);

var formato = 'digital';
var sizeImg = false;
/**
 * Funcion para el registro de un libro
 **/ 
async function addLibro(e){
  e.preventDefault();
  var esValido = validarCamposFormulario("form");
  if (esValido == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    var pisbn = document.getElementById("isbn").value;
    //Valida el ISBN
    var validarIsbn = await validarISBN(pisbn);
    if(validarIsbn){
      tamanoImg();
      if(sizeImg){
        switch(formato){
          case 'digital':
              registroDigital();
              break;
          case 'impreso':
              registroImpreso();
              break;    
        }
      } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "La portada del libro debe ser de 181x278";
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "El código ISBN es inválido";
    }
  }
  
}

function validarISBN(isbn){
    var data = {
        isbn: isbn
    };
    return fetch('/libro/validarISBN', {
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
          function(response){
            var validate = response;
            return validate;
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}

async function tamanoImg() {
  var file = document.getElementById('portada').files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
      var img = new Image();      
      img.src = e.target.result;

      img.onload = function () {
          var w = this.width;
          var h = this.height;
          console.log(w);
          console.log(h);

          if(w == 181 && h == 278){
            sizeImg = true;
          } else {
            sizeImg = false;
          }
      }
  };
  reader.readAsDataURL(file);
}

function digital(){
    document.getElementById("pdf-title").classList.remove("oculto");
    document.getElementById("pdf-file").classList.remove("oculto");

    document.getElementById("tab-digital").classList.remove("tab-unselected");
    document.getElementById("tab-digital").classList.add("tab-selected");

    document.getElementById("tab-impreso").classList.add("tab-unselected");
    document.getElementById("tab-impreso").classList.remove("tab-selected");

    document.getElementById("pdf").required = true;

    formato = 'digital';
}

function impreso(){
    document.getElementById("pdf-title").classList.add("oculto");
    document.getElementById("pdf-file").classList.add("oculto");

    document.getElementById("tab-impreso").classList.remove("tab-unselected");
    document.getElementById("tab-impreso").classList.add("tab-selected");

    document.getElementById("tab-digital").classList.add("tab-unselected");
    document.getElementById("tab-digital").classList.remove("tab-selected");

    document.getElementById("pdf").required = false;

    formato = 'impreso';
}



