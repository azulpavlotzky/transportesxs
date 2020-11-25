var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {

    try {
        var query = "select * from usuarios where usuario = ? and password = ? limit 1";
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        throw error;
    }// fin catch
}// fin function

module.exports = { getUserByUsernameAndPassword }


//try - catch > estructura de control de manejo de errores > despues hbs con un if podemos
// error > usuario incorrecto en el cao que coloque mal el user o pass

// siempre que aparece async > tenemos que escribir await > funcion asincronica porque
// depende en que momento se completen los datos.

//[user, md5(password)]  > 2 lugares > informa complete usuario va a ir user, password.
//rows[0] > fuerzo a que si o si sea 1.