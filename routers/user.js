const express = require("express"); // proporciona manejos rutas HTTPS
const UserController = require('../controllers/user');

const api=express.Router();

api.post("/sign-up", UserController.signUp); // api.post es un endpint tipo post, la ruta del endpoint /sign-up, y cuando haga un post va a ejecutar el userControler la funcion singUp
//api.post esta guardado dentro de apis

api.post("/sign-in", UserController.signIn); // esta es la ruta de sign In

module.exports = api;