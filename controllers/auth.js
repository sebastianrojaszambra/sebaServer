const jwt = require('../services/jwt');
const moment = require('moment');
const User = require('../models/user');


//vamos a comprobar si el token a expirado en el cliente y el servidor aca estamos en el servidor 

function willExpiredToken(token) {
    const {exp}=jwt.decodedToken(token);
    const currentDate = moment().unix();

    if (currentDate>exp){ // si currentDate >exp significa que el token a caducado
        return true; //si esto es verdadero entonces expiro 
    }
    return false;// no ha expirado el token, el token a expirado si o no asi se lee


}


function refreshAccessToken(req,res){
    const {refreshToken}=req.body;
    const isTokenExpired = willExpiredToken(refreshToken);

    if(isTokenExpired){
        res.status(404).send({message:"El refreshtoken a expirado"});
    }else{
        const{id}=jwt.decodedToken(refreshToken);
        User.findOne({_id:id},(err,userStored)=>{
          if(err){
            res.status(500).send({message:"Error del servidor"})
          }else{
            if(!userStored){
                res.status(404).send({message:"No ha encontrado usuario"})
            }else{
                res.status(200).send({
                    accessToken:jwt.createAccessToken(userStored),
                    refreshToken:refreshToken
                });
            }
          }

        })
        
    }


   


}

module.exports = {
   refreshAccessToken
};