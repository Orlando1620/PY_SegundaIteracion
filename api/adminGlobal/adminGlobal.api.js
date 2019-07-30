var mongoose = require('mongoose');
var AdminGlobal = require('./adminGlobal.model');
var nodemailer = require('nodemailer');

module.exports.registrarUsuario = function(req, res) {
  var tipoUsuario = req.body.tipoUsuario;
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;
  var primerApellido = req.body.primerApellido;
  var segundoApellido = req.body.segundoApellido;
  var correo = req.body.correo;
  var contrasena = req.body.contrasena;
  var tipoIdentificacion = req.body.tipoIdentificacion;
  var identificacion = req.body.identificacion;

  AdminGlobal.find({correo: correo}).exec()
  .then(
    function(result){
      if(result.length == 0){
        AdminGlobal.find({identificacion: identificacion})
        .then(
          function(result){
            if(result.length == 0){
      
                var nuevoAdminGlobal = new AdminGlobal({
                  _id: new mongoose.Types.ObjectId(),
                  tipo: tipoUsuario,
                  fechaRegistro: fechaRegistro,
                  nombre: nombre,
                  apellido1: primerApellido,
                  apellido2: segundoApellido,
                  correo: correo,
                  contrasena: contrasena,
                  tipoIdentificacion: tipoIdentificacion,
                  identificacion: identificacion
                });
                  
                
                nuevoAdminGlobal.save()
                .then(
                  function(result){
                    console.log(result); 
                    res.json({result:"exito"});
                  }
                )
                .catch(
                  function(err){
                    console.log(err);
                  }
                );
            } else {
              res.json({result:"idRepetido"});
            }
        })
        .catch(function (err) {
          console.log('error');
          console.log("** File Upload (Promise)");
          if (err) { console.warn(err); }
        });
      } else {
        res.json({result:"correoRepetido"});
      }
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

module.exports.enviarContrasena = function(req,res){
  const output = `
      <html>
      <head>
          <style>
              @import url(https://fonts.googleapis.com/css?family=Open+Sans|Satisfy|Caveat);

              .font{
                  font-family: 'Open Sans', sans-serif;
              }
              h1{
                  font-family: 'Open Sans', sans-serif;
                  color: #487252;
              } 
              p{
                  font-family: 'Open Sans', sans-serif;
              }    
          </style>
      </head>

      <body>
          <h1>¡Bienvenido a Leer+!</h1>
          <p>Utiliza la siguiente contraseña para ingresar al sitio. </p>
          <p>Contraseña: ${req.body.contrasena}</p>
      </body>
    </html>
  `

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'servicio.leemas@gmail.com',
           pass: '123queso!'
       }
   });
  
  const mailOptions = {
    from: 'servicio.leemas@gmail.com', // sender address
    to: req.body.correo, // list of receivers
    subject: 'Bienvenido a Leer+', // Subject line
    html: output// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports.checkCorreo = function(req, res) {
  var correo = req.body.correo;

  Usuario.find({correo: correo}).exec()
  .then(
    function(result){
      //console.log(result);
      res.json(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

module.exports.buscarAdminGlobal = function(req, res) {
  var id = req.body.id;
  AdminGlobal.findOne({_id:id}).exec()
  .then(
    function(result){
      console.log(result);
      res.send(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}



