const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const{API_VERSION}= require('./config');

//load routes
const authRoutes=require('./routers/auth');
const userRoutes = require("./routers/user");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // para que lo encode en .json


// configuracion de los header http
//....

//Route basic
//....
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,userRoutes);

module.exports= app;


