var pool = require('./bd');

async function getNovedades() {

    var query = "select * from novedades";
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
} // cierra insertNovedad

async function deleteNovedadesByID(id) {
    var query = "delete from novedades where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows;
} // cierra deleteNovedadesByID


// traer los datos (*) de esa novedad por ID en MODIFICAR 

async function getNovedadesById(id) {
    var query = "select * from novedades where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadById(obj, id) {
    try {
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}


async function buscarNovedades(busqueda) {
    var query = "select * from novedades where titulo like ? or subtitulo like ? or cuerpo like ? ";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}



module.exports = {
    getNovedades, insertNovedad, deleteNovedadesByID,
    getNovedadesById, modificarNovedadById, buscarNovedades }