const mongoose = require('mongoose');
const app = require('./app');
const port= process.env.PORT || 3977;
const {API_VERSION, IP_SERVER, PORT_DB}=require('./config');


/*mongoose.set("useFindAndModify",false);*/ /*se supone arreglame esta lanzando error */

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/sebastianrojaszambra`,
{useNewUrlParser:true,useUnifiedTopology:true},
(err,res)=>{
   if(err){
       throw err;
   } else {
       console.log("La conexion fue buena");

       app.listen(port, ()=>{
        console.log("####");           
        console.log("#APIREST##");
        console.log("####");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
       });
   }

 }

);// sebastianrojaszambra es el nombre de la base de dato




