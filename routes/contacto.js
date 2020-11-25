var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contacto page. */
router.get('/', function (req, res, next) {
  res.render('contacto', {
    IsContacto: true
  });
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  //variables parq que me guarde la info
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  //datos a donde se envian el mail
  var obj = {
    to: 'flavia.ursino@gmail.com',
    subjet: 'CONTACTO WEB',
    html: nombre + ' se contacto a traves de la web y quiere mas información a este correo: '
      + email + ' .<br> Ademas, hizo este comentario: ' + mensaje + '. <br> Su tel es: ' + tel
  } // fin obj


  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }); // fin del transport


  var info = await transport.sendMail(obj);

  res.render('contacto', {
      message: 'Mensaje enviado correctamente'
    })

}); //fin del router.post

module.exports = router;
