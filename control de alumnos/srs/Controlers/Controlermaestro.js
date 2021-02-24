const Maestro = require("../modelos/modelomaestro");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../servicios/jwt");


function controlmaestro(req, res){
    var modeloMaestro = Maestro();
    modeloMaestro.nombre = "Maestro";
    modeloMaestro.password = "123456";
    modeloMaestro.rol = "Maestro";

    if(modeloMaestro.nombre == "Maestro" && modeloMaestro.password == "123456"){
        res.status(200).send({mensaje: `maestro......conectando`})
    }else{
        res.status(200).send({mensaje: `no conectado...`})
    }
}


function agregar(req, res){
    var usuarioModel = new Maestro();
    var params = req.body;

    if(params.nombre && params.password){
        usuarioModel.nombre = params.nombre;
        usuarioModel.rol = params.rol
        if(params.rol){
            if(usuarioModel.rol = "Estudiante"){
                if(usuarioModel.cantidad < 3){
                    usuarioModel.nombrecursos = params.nombrecursos;
                }
            }else{
                if(usuarioModel.rol = "Maestro"){
                    usuarioModel.nombrecursos = params.nombrecursos;
                }else{
                    res.status(200).send({mensaje: 'acceso no permitido'})
                }
            }
        }else{
            res.status(200).send({mensaje: `Ingrese los datos requeridos`})
        }


        Maestro.find({$or:[
            {usuario: usuarioModel.usuario}
        ]}).exec((err, usuariosEncontrados) => {
            if(err) return res.status(500).send({mensaje: "Invalido"})

            if(usuariosEncontrados && usuariosEncontrados.length >= 1){
                return res.status(500).send({mensaje: "Usuario existente"})
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) =>{
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) =>{
                        if(err) return res.status(500).send({mensaje: "Error al guardar usuario"})

                        if(usuarioGuardado){
                            res.status(200).send(usuarioGuardado)
                        }else{
                            res.status(404).send({mensaje: "No se registro el usuario"});
                        }
                    })

                })
            }

        })
    }else{
        res.status(200).send({mensaje: 'Complete los espacios'})
    }
}




function vertodo(req, res){
    Maestro.find((err, usuariosEncontrados)=>{
        if(err) return res.status(500).send({mensaje: "Erro al encontrar usario"})
        if(!usuariosEncontrados) return res.status(500).send({mensaje: "Error en la consulta"})
        return res.status(200).send({usuariosEncontrados})
    })

}
    
function eliminar(req, res){
    var usuarioModel = new Maestro();
    var params = req.body;
    var idUsuario = req.params.idUsuario
    usuarioModel.findById(idUsuario, (err, usuariosEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Peticion erronea"})
        if(!usuariosEncontrado) return res.status(500).send({mensaje: "Obtencion de datos erronea"});
        if(usuarioModel.rol = "Estudiante"){
            usuarioModel.remove(idUsuario);
        }else{
            if(usuarioModel.rol = "Maestro"){
                usuarioModel.remove(idUsuario);
            }
        }
    })
}

function eliminarCursos(req, res){
    var usuarioModel = new Maestro();
    var params = req.body;
    if(usuarioModel.rol = "Maestro"){
        var idUsuario = req.params.idUsuario;
        var cursos = req.params.cursos
    userModel.findById(idUsuario, (err, usuariosEncontrado)=>{
        if(err) return res.status(500).send({mensaje: "Peticion erronea"})
        if(!usuariosEncontrado) return res.status(500).send({mensaje: "obtencion de datos erronea"});

        if(usuarioModel.cursos = cursos){
            userModel.remove(cursos);
        }else{
            res.status(200).send({mensaje: 'Curso no existente'})
        }
    })
    }else{
        res.status(200).send({mensaje: 'Puedes aliminar al no ser administrador'})
    }

}

function editarperfil(req, res){
    var usuarioModel = new Maestro();
    var params = req.body;
    var idUsuario = params.idUsuario;
    if(idUsuario==0){
        userModel.findById(idUsuario, (err, usuariosEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "Peticion erronea"})
            if(!usuariosEncontrado) return res.status(500).send({mensaje: "obtencion de datos erronea"});
            userModel.nombre = params.nombre;
            userModel.password = params.password;
        })
    }
}

function editarcursos(req, res){
    var usuarioModel = new Maestro();
    var params = req.body;
    var idUsuario = params.idUsuario;
    if(idUsuario==0){
        userModel.findById(idUsuario, (err, usuariosEncontrado)=>{
            if(err) return res.status(500).send({mensaje: "Peticion erronea"})
            if(!usuariosEncontrado) return res.status(500).send({mensaje: "obtencion de datos erronea"});
            userModel.cursos = params.cursos;
        })
    }
}

function login(req, res){
    var params = req.body;

    Maestro.findOne({ nombre: params.nombre}, (err, usuariosEncontrado) =>{
        if (err) return res.status(500).send({mensaje: "petición erronea"});

        if(usuariosEncontrado){
            bcrypt.compare(params.password, usuariosEncontrado.password, (err, passCorrecta)=>{
                if(passCorrecta){
                    if(params.obtenerToken === "true"){
                        return res.status(200).send({
                            token: jwt.createToken(usuariosEncontrado)
                        });
                    }else{
                        usuariosEncontrado.password = undefined;
                        return res.status(200).send({usuariosEncontrado})
                    }
                }else{
                    return res.status(404).send({mensaje: "Usuario no encontrado"})
                }
            })
        }else{
            return res.status(404).send({mensaje: "No has podido ingresar"})
        }
    })
}


module.exports = {
    controlmaestro,
    agregar,
    vertodo,
    eliminar,
    eliminarCursos,
    editarperfil,
    editarcursos,
    login
}
