var express = require('express');
var router = express.Router();
var usuariosModel = require('./../models/usuariosModel');
// habilito getUserByUsernameAndPassword (function)



/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(); // destruir la conexion
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});


router.post('/', async (req, res, next) =>{
  try {
    var usuario = req.body.usuario; // trae datos del form de login > usuario (name)
    var password = req.body.password;  // trae datos del form de login > password (name)

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password); // voy al archivo > donde esta select

    if (data != undefined) {  // si ests ok > manda a la pagina novedades (listado donde puedo  + , modif)
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      
      res.redirect('/admin/novedades'); // pagina de novedades adentro del admin
    } else {
      res.render('admin/login', {
        layout: 'admin/layout', // vuelve al login> para que lo vuelva a escribir y ademas
        error: true // habilitar error puse true > para que aparezca usuario incorrecto
      }); // cierra linea 26
    } // cierra el else
  } catch (error) {
      console.log(error);
  }
}); // cierra la funcion asincr.


module.exports = router;
