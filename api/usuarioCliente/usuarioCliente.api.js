var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var Usuario = require('./usuarioCliente.model');
var fs = require('fs');
var nodemailer = require('nodemailer');

//Configuracion de multer
var multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
});
const upload = multer({
  storage: storage
}).single('foto');

/**
 * Upload de multer
 */
module.exports.localUploadImg = function (req, res) {
  upload(req, res, function(err){
    console.log(req.file);
    res.send(req.file);
  })
}

/**
 * Sube la imagen a cloudinary
 * @returns informacion de la imagen subida a cloudinary
 */
module.exports.uploadImg = function(req,res){
  var path = req.body.path;
  cloudinary.uploader.upload(path, { tags: 'basic_sample' })
  .then(function (image) {
    console.log(image);
    res.send(image);
  })
  .catch(function (err) {
    console.log('error');
    console.log("** File Upload (Promise)");
    if (err) { console.warn(err); }
  });
}

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
  var fechaNacimiento = req.body.fechaNacimiento;
  var sexo = req.body.sexo;
  var provincia= req.body.provincia;
  var canton = req.body.canton;
  var distrito = req.body.distrito;
  var direccionExacta = req.body.direccionExacta;
  var latitud = req.body.latitud;
  var longitud = req.body.longitud;
  var generosFav = req.body.generosFav;
  var clubes = req.body.clubes;
  var libros = req.body.libros;
  var librosFav = req.body.librosFav;
  var path = req.body.path;

  Usuario.find({correo: correo}).exec()
  .then(
    function(result){
      if(result.length == 0){
        Usuario.find({identificacion: identificacion})
        .then(
          function(result){
            if(result.length == 0){
              cloudinary.uploader.upload(path, { tags: 'basic_sample' })
              .then(function (image) {
                console.log(image);
                fs.unlinkSync(path);
      
                var nuevoUsuario = new Usuario({
                  _id: new mongoose.Types.ObjectId(),
                  tipo: tipoUsuario,
                  fechaRegistro: fechaRegistro,
                  nombre: nombre,
                  apellido1: primerApellido,
                  apellido2: segundoApellido,
                  correo: correo,
                  contrasena: contrasena,
                  tipoIdentificacion: tipoIdentificacion,
                  identificacion: identificacion,
                  fechaNacimiento: fechaNacimiento,
                  sexo: sexo,
                  provincia: provincia,
                  canton: canton,
                  distrito: distrito,
                  direccionExacta: direccionExacta,
                  latitud: latitud,
                  longitud: longitud,
                  imgUrl: image['url'],
                  generosFav: generosFav,
                  clubes: clubes,
                  libros: libros,
                  librosFav: librosFav,
                  bloqueado: false
                });
                  
                
                nuevoUsuario.save()
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
            }
          )
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

module.exports.perfil = function(req, res) {
  var id = req.body.id;
  Usuario.findOne({_id:id}).exec()
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



