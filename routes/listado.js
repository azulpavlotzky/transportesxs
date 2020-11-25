var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');


/* GET admin/novedades > presentacin del admin page. */
router.get('/', async function (req, res, next) {
 console.log(req.query.q) 
  var novedades
  if (req.query.q === undefined) {
    novedades = await novedadesModel.getNovedades();
  } else {
    novedades = await novedadesModel.buscarNovedades(req.query.q);
  }
  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades,
    is_search: req.query.q !== undefined,
    q: req.query.q
  });
});

// ADMINISTRADOR
//veo pagina agregar 
router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});
// pagina agregar > post
router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo) {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Todos los campos son requeridos'
      }) //cierre 28
    } // cierro else
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargo la novedad'
    }) // cierro linea 35

  } // cierro catch

}); // cierro router.post

//Para eliminar
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesByID(id);
  res.redirect('/admin/novedades')
}); // cierro router.get para eliminar


//Para Modificar > get > id > la novedad que elija
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadesById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  }); // cierra render
}); // cierra router.get

//Modifique los datos > aprito boton modificar > update (novedadesModel.js)
router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    //console.log(obj) > para ver si pasan los datos > muestra en consola
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, message: 'No se modifico la novedad'
    })
  }
})

module.exports = router;

