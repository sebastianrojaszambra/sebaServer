//aca se ven las rutas desde el servidor

const express=require('express');
const AuthController = require('../controllers/auth');


const api=express.Router();// esta es para crear rutas

api.post("/refresh-access-token", AuthController.refreshAccessToken);
// la api es tipo post, la url va a ser refresh-access-token, y de autcontroler va a ejecutar refrestoken
//de authcontroller va a ejecutar refreshAccess
module.exports=api;
