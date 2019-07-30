var Autor = require('./autor.model');
var Libro = require("../libro/libro.model");
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var fs = require('fs');

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
 * Registra un nuevo autor en la base de datos
 */
module.exports.registrarAutor = function(req, res) {
  var nombre = req.body.nombre;
  var apellido1 = req.body.apellido1;
  var apellido2 = req.body.apellido2;
  var nac = req.body.nac;
  var bio = req.body.bio;
  var path = req.body.path;
 
  Autor.find({nombre:nombre,apellido1:apellido1,apellido2:apellido2}).exec()
  .then(
    function(result){

      if(result.length == 0){
        cloudinary.uploader.upload(path, { tags: 'basic_sample' })
        .then(
          function (image) {
            console.log(image);
            fs.unlinkSync(path);

            var nuevoAutor = new Autor({
              _id: new mongoose.Types.ObjectId(),
              nombre: nombre,
              apellido1: apellido1,
              apellido2: apellido2,
              nac: nac,
              bio: bio,
              imgUrl: image['url'],
              fechaRegistro: new Date()
            });
            
            nuevoAutor.save()
            .then(
              function(result){
                console.log(result);
                res.json({result: 'exito'});
              }
            )
            .catch(
              function(err){
                console.log(err);
              }
            );
        })
        .catch(function (err) {
          console.log('error');
          console.log("** File Upload (Promise)");
          if (err) { console.warn(err); }
        });
      } else {
        res.json({result: 'repetido'});
      }
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

/**
 * Extrae todos los autores de la base de datos
 */
module.exports.listarAutores = function(req, res) {
  Autor.find().exec()
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

/**
 * Extrae los autores, que coincidan con la busqueda, de la base de datos
 */
module.exports.filtrarAutores = function(req, res) {
  var nombre = req.body.nombre;
  Autor.find({nombre:nombre}).exec()
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


module.exports.obtenerAutor = function (req, res) {
  Autor.findOne({ _id: req.body.id }).then(function (autor) {
      if (autor) {
          let nombreAutor = autor.nombre + " " + autor.apellido1 + " " + autor.apellido2;
          let libros = []
          Libro.find({ autor: nombreAutor.trim() }).then(function (respuesta) {
              if (respuesta) {
                  libros = respuesta;
              }
              autor.libros = libros;
              res.send(autor);
          })
         
      } else {
          res.send(autor);
      }
  })
};
