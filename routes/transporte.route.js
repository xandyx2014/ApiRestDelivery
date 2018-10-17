const express = require('express');
const TransporteController = require('../controllers/transporte.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');
const multipart = require('connect-multiparty');

const mdUpload = multipart({
  uploadDir: './uploads/transportes'
});
app.get('/test', TransporteController.test);
app.get('/',[auth.ensureAuth],TransporteController.transporteMostrar);
app.get('/:id',[auth.ensureAuth],TransporteController.transporteMostrarId);
app.post('/img/:id',[auth.ensureAuth,
  auth.Administrador,mdUpload],TransporteController.transporteImagen);
app.get('/img/:id',[auth.ensureAuth],TransporteController.transporteImagenObtener);
app.post('/', [auth.ensureAuth],TransporteController.transporteCrear);
app.put('/:id',[auth.ensureAuth, auth.Administrador],TransporteController.transporteActualizar);

module.exports = app;