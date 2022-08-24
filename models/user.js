// este es el modelo user

//mongosse es una bliblioteca que te permite creas esquemas

const mongoose=require('mongoose');//Mongoose es una librería para Node. js que nos permite escribir consultas para una base de datos de MongooDB
const Schema = mongoose.Schema;//Un esquema en Mongoose es una estructura JSON que contiene información acerca de las propiedades de un documento

const UserSchame= Schema({
    name: String,
    lastname:String,
    email:{
        type:String,
        unique: true
    },
    password:String,
    role:String,
    active:Boolean,
})

module.exports = mongoose.model("User",UserSchame);/*va a usar User y va a ocupar la funcion UserScame */