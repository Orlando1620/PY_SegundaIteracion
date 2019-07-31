'use strict';

let AdminLib = require('./adminLib.model');
let Libreria = require('../libreria/libreria.model');
var nodemailer = require('nodemailer');

module.exports.registrar_Admin = function (req, res) {
    AdminLib.findOne({ correo: req.body.correo }).then(function (user) {

        if (!user) {
            let nuevoAdminLib = new AdminLib({
                nombre: req.body.nombre,
                apellido1: req.body.apellido1,
                apellido2: req.body.apellido2,
                correo: req.body.correo,
                contrasena: req.body.contrasena,
                bloqueado: false,
                tipo: 'AdminLib',
                fechaNaci: req.body.fechaNaci,
                tipoIdentificacion: req.body.tipoIdentificacion,
                identificacion: req.body.numberIdentificacion,
                tipoSexo: req.body.tipoSexo,

            });
        
            let nuevaLib = new Libreria({
                nombre: req.body.nombre,
                nombreComercial: req.body.nombreComercial,
                nombreFantasia: req.body.nombreFantasia,
                tipo: 'lib',
                latitud: req.body.latitud,
                longitud: req.body.longitud,
                provincia: req.body.provincia,
                canton: req.body.canton,
                distrito: req.body.distrito,
                direccion: req.body.direccion,
                telefono: req.body.telefono
            });
         
            if (nuevaLib.latitud == 0 && nuevaLib.longitud == 0) {
                res.json({ codigo: 'mapaNoSelect' });

            } else {
                nuevoAdminLib.save(function (error, admin) {
                    if (error) {
                        console.log(error);
                        res.json({ codigo: 'errorADmin' });
                    } else {

                        nuevaLib.admin_id = admin.id

                        nuevaLib.save(function (error, response) {
                            if (error) {
                                res.json({codigo:'errorLib'});
                            } else {
                                res.json({codigo: 'exitoso'});
                            }
                        });
                        // res.json({ success: true, msg: 'El producto ' });
                    }
                });
            }


        } else {
            res.json({ codigo: 'CORREO_DUPLI' });
        }

    })
};

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

module.exports.perfil = function(req, res){
    var correo = req.body.correo;
    AdminLib.find({correo: correo}).exec()
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