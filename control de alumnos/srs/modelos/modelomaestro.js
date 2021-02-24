const express = require("express");
const Controlersmaestro = require("../controlers/controlermaestro");


var md_autentication = require("../conexion/authenticated")


var api = express.Router();
api.get("/controlmaestro", Controlersmaestro.controlmaestro);
api.post("/agregarusuario", ControlersMaestro.agregar);
api.post("/eliminarUsuario", ControlersMaestro.eliminar);
api.post("/eliminarCursos", ControlersMaestro.eliminarCursos);
api.post("/editarperfil", ControlersMaestro.editarperfil);
api.post("/editarcursos", ControlersMaestro.editarcursos);
api.post("/login", ControlersMaestro.login);
api.get("/vertodo", ControlersMaestro.vertodo);



module.exports = api;