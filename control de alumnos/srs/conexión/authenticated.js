var jwt = require("jwt-simple");
var moment = require("moment")
var secret = "auntentication"

exports.ensureAuth = function (req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send({mensaje: "No tienes los respectivos permisos"})
    }

    var token = req.headers.authorization.replace(/[""]+/g, "")

    try{
        var playload = jwt.decode(token, secret);

        if(playload.exp <= moment().unix()){
            return res.status(401).send({
                mensaje: "Token expirado"
            });
        }
        }catch (error){
            return res.status(404).send({
                mensaje: "Token Valido"
            });
        }
    req.user = playload;
    next();
} 