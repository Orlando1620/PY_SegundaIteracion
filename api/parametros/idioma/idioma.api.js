var Idioma = require('./idioma.model');
var mongoose = require('mongoose');

module.exports.listarIdiomas = function(req, res) {
  Idioma.find().exec()
  .then(
    function(result){
      res.send(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}
