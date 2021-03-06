"use strict"
const app = require('./app');
app.set('port',3000);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deliveryueb',{
  useNewUrlParser: true
}).then( () => {
  app.listen(process.env.PORT || app.get('port'), () => {
    console.log(`Conexion Correcta escuchando en el puerto ${ app.get('port') }`);
  });
});
