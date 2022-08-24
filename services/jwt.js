const jwt = require("jwt-simple");// paquete de jwt en package jso
const moment = require("moment");

const SECRET_KEY="gR7CH95xfj";// esta clave la pone uno


// Primera funcion, esta funcion crea el access token tiene los datos del usuario
exports.createAccessToken=function(user){ // esto es lo mismo que export module
   const payload ={
        id:user._id,
        name: user.name,
        lastname: user.lastname,
        email:user.email,
        role:user.role,
        createToken: moment().unix(),// fecha de creacion del token se ocupa moment que es unprograma para crear fecha
        exp:moment().add(3,"hours").unix() // fecha de expiracion del token esto es en 3 horas de expiracion
  };// en la linea de abajo codifica el objeto
  return jwt.encode(payload,SECRET_KEY);
};


// Segunda funcion, esta funcion crea el refress token 
exports.createRefreshToken=function(user) {// le pasamos el user
    const payload ={
        id: user._id, // id del usuario
        exp:moment().add(30,"days").unix() // unix es unica, este refresh token no caduca hasta 30 dias
    };
    return jwt.encode(payload,SECRET_KEY);

};


// Tercera funcion,esta es la funcion que decodifica cualquiera de estos dos token
exports.decodedToken= function(token){
    return jwt.decode(token,SECRET_KEY,true);
};