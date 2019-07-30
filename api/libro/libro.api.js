var Libro = require('./libro.model');
var ISBN = require('isbn-validate');
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
}).fields([{
  name: 'portada', maxCount: 1
}, {
  name: 'pdf', maxCount: 1
}]);
/**
 * Upload de multer img
 */
module.exports.localUpload= function (req, res) {
  upload(req, res, function(err){
    console.log(req.file);
    res.send(req.file);
  })
}

/**
 * Registra un nuevo libro en la base de datos
 */
module.exports.registrarLibroDigital = function(req, res) {
  var nombre = req.body.nombre;
  var isbn = req.body.isbn;
  var idioma = req.body.idioma;
  var autor = req.body.autor;
  var genero = req.body.genero;
  var categoria = req.body.categoria;
  var desc = req.body.desc;
  var pathImg = req.body.pathImg;
  var pathPdf = req.body.pathPdf;

  Libro.find({isbn: isbn}).exec()
  .then(
    function(result){
      if(result.length == 0){
        cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' })
        .then(
          function(image){
            console.log(image);
            fs.unlinkSync(pathImg);
            cloudinary.uploader.upload(pathPdf, { tags: 'basic_sample' })
            .then(
              function(pdf){
                console.log(pdf);
                fs.unlinkSync(pathPdf);
                var nuevoLibro = new Libro({
                  _id: new mongoose.Types.ObjectId(),
                  nombre: nombre,
                  isbn: isbn,
                  idioma: idioma,
                  autor: autor,
                  genero: genero,
                  categoria: categoria,
                  descripcion: desc,
                  urlImg: image['url'],
                  urlPdf: pdf['url'],
                  fechaRegistro: new Date(),
                  formato: 'digital'
                });
                
                nuevoLibro.save()
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
          })
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

module.exports.registrarLibroImpreso = function(req, res) {
  var nombre = req.body.nombre;
  var isbn = req.body.isbn;
  var idioma = req.body.idioma;
  var autor = req.body.autor;
  var genero = req.body.genero;
  var categoria = req.body.categoria;
  var desc = req.body.desc;
  var pathImg = req.body.pathImg;

  Libro.find({isbn: isbn}).exec()
  .then(
    function(result){
      if(result.length == 0){
        cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' })
        .then(
          function(image){
            console.log(image);
            fs.unlinkSync(pathImg);
                
            var nuevoLibro = new Libro({
              _id: new mongoose.Types.ObjectId(),
              nombre: nombre,
              isbn: isbn,
              idioma: idioma,
              autor: autor,
              genero: genero,
              categoria: categoria,
              descripcion: desc,
              urlImg: image['url'],
              fechaRegistro: new Date(),
              formato: 'impreso'
            });
            
            nuevoLibro.save()
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
 * Revisa que el formato del ISBN sea correcto
 */
module.exports.validarISBN = function(req, res) {
  var isbn = req.body.isbn;
  if(ISBN.Validate(isbn)){
    res.send(true);
  } else {
    res.send(false);
  }
}

/**
 * Extrae todos los libros de la base de datos
 */
module.exports.listarLibros = function(req, res){
  Libro.find().exec()
  .then(
    function(result){
      //console.log(result);
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
 * Extrae los libros de la base de datos, que coincidan con la busqueda
 */
module.exports.filtrarLibrosNombre = function(req, res) {
  var nombre = req.body.nombre;
  Libro.find({nombre:nombre}).exec()
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
 * Extrae los libros de la base de datos, que coincidan con la busqueda
 */
module.exports.filtrarLibrosGenCat = function(req, res) {
  var gen = req.body.gen;
  var cat = req.body.cat;
  if(gen == "Generos" && cat != "Categorias"){
    console.log("cat");
    Libro.find({categoria:cat}).exec()
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
  } else {
    if(cat == "Categorias" && gen != "Generos"){
      console.log("gen");
      Libro.find({genero:gen}).exec()
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
    } else {
      if(cat != "Categorias" && gen != "Generos"){
        console.log("catgen");
        Libro.find({genero:gen,categoria:cat}).exec()
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
      } else {
        console.log("none");
        Libro.find().exec()
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
    }
  }
  
}

module.exports.perfilLibro = function(req, res){
  var isbn = req.body.isbn;
  Libro.findOne({isbn: isbn}).exec()
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