
var mongoose = require('mongoose');

var Identificacion = require('./identificacion.model');

module.exports.listarIdentificacion = function(req, res) {
  
  Identificacion.find().exec()
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
