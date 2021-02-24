var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "autentication"

exports.createToken = function (Maestro){
    var playload = {
        id: Maestro.id,
        nombre: Maestro.nombre,
        rol: Maestro.rol,
        cusros: Maestro.cursos,
        iat: moment().unix(),
        exp: moment().day(1, "years").unix()
    }

    return jwt.encode(playload, secret);
}