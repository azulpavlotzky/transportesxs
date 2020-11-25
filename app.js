var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();//para que cargue los datos del .env
var session = require('express-session');


var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users');
var nosotrosRouter = require('./routes/nosotros');
var serviciosRouter = require('./routes/servicios');
var galeriaRouter = require('./routes/galeria');
var novedadesRouter = require('./routes/novedades');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/login');
var adminNovedadesRouter = require('./routes/listado');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'PW2020', //datos secreto para seguridad
  cookie: { maxAge: null }, // milisegundos  1000*60*60*24 =100 *60 =1 minuto * 60 = 1 hora * cant. horas
  resave: false,
  saveUninitialized: true
}))


secured = async(req,res,next) =>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next(); // va a la página siguiente que nosotros declaremos
    } else{
      res.redirect('/admin/login');
    }//cierre else
  }catch(error){
    console.log(error);
  } //cierra catch
}//cierra linea 41



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/servicios', serviciosRouter);
app.use('/galeria', galeriaRouter);
app.use('/novedades', novedadesRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminNovedadesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
