const bcrypt = require("bcrypt-nodejs");// encriptacion requerida
const User = require('../models/user');
const jwt = require('../services/jwt');


function signUp(req,res){
   
   
   const user=new User();

   const{name,lastname,email,password,repeatPassword}=req.body;// esto es lo que llega desde el navegador req.body el cliente lo esta escribiendo
   
   user.name=name;
   user.lastname=lastname;
   user.email=email.toLowerCase();//user.email viene de models
   user.role="admin";//esta infromacion se la damos nosotros ya que no esta activo
   user.active=false;// esta informacion se la damos nosotros ya que no esta activo
 
   if(!password || !repeatPassword ){// si password o repeatpassword no esta manda el mensaje
     res.status(404).send({message:"Las contraseñas son obligatorias"});
   }else{
      if(password !== repeatPassword){// si password es diferente a password
      res.status(404).send({message:"Las contraseñas no son  iguales"});
      }else{
         bcrypt.hash(password,null,null,function(err,hash){ //si cumple las dos encriptalas 
            if(err){ // si manda un error mensaje problema al escriptar
               res.status(500).send({message:"Error al encriptar la contraseña"});
            }else{ // si no presenta error encriptar
               user.password=hash; //la password del usr la encriptamos por el metodo hash
               user.save((err,userStored)=>{ //aca lo guarda
                  if(err){//si err(error) existe enonces
                     res.status(500).send({message:"El usuario ya existe"})
                  }else {
                     if(!userStored){// si userStore no tiene nada es nulo.
                        res.status(404).send({message:"Error al crear el usuario"});
                     }else{// en caso contrario guarda en user: la informacion userstored
                        res.status(200).send({user:userStored});
                     }
                  }


                })

            }
         });
      }
   }
  
 
}

function signIn(req, res){
   const params = req.body;
   const email =params.email.toLowerCase();// esto va en minuscula tolwercase porque lo recibo en minusculas
   const password=params.password;

   User.findOne({email}, (err,userStored)=>{// user find one va a encontrar el email, la funcion de flecha va a tener el error y el userStored donde se va a guardar el usuario
      if(err){// si existe error entonces status 500 
          res.status(500).send({message:"Error de servidor"});
      }else{
         if(!userStored){// si userStore no existe es por que no existe el email
          res.status(404).send({message:"Usuario no encontrado"});
         }else{ // bcryp tiene una funcion que compara contraseña encriptada y una sin encriptar
           bcrypt.compare(password,userStored.password,(err,check)=>{// bcryp tiene una herramienta para comparar el password con el que esta guardado
              if(err){
                res.status(500).send({message:"Error del servidor"});
              } else if(!check){
               res.status(404).send({message:"La contraseña es incorrecta"});

              }else{
               if(!userStored.active){
                  res.status(200).send({code:200, message:"El usuario no se ha activado"});
               }else{
                  res.status(200).send({//despues del send es lo que e¿le vamos a enviar al front
                    accessToken:jwt.createAccessToken(userStored),//userStored es el usuario
                    refreshToken: jwt.createRefreshToken(userStored)
                  });
               }
              }
           });
         }
      }
   });
}

module.exports= {
    signUp,
    signIn
};