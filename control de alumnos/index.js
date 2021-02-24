const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Control_de_alumnos", {
    useNewUrlParser: 
        true, useUnifiedTopology: 
        true}).then(()=>{
    console.log("Conectado a la base de datos");

    app.listen(3000, function () {
        console.log("El servidor esta funcionando en el puerto 4000");
    })

}).catch(err => console.log(err));

