require('./config/config');
const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const routesUsuario = require('../routes/usuario');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Rutas de usuario
app.use(routesUsuario);

//mLab
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) =>{
    if( err ) throw err;
    console.log("Base de datos ONLINE");
    
});
 
app.listen(process.env.PORT, () =>{
    console.log('Listening in port ', process.env.PORT);
})