const express = require('express');
const ComidaController = require('../controllers/comida.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');
const multipart = require('connect-multiparty');

const mdUpload = multipart({
  uploadDir: './uploads/comidas'
});
app.get('/test', ComidaController.test);
app.post('/',[auth.ensureAuth,auth.Administrador] ,ComidaController.comidaCrear);
app.get('/',[auth.ensureAuth], ComidaController.comidaMostrar);
app.get('/:id',[auth.ensureAuth], ComidaController.comidaMostrarId);
app.get('/menu/:id',[auth.ensureAuth], ComidaController.comidaMostrarMenu);
app.put('/:id',[auth.ensureAuth], ComidaController.comidaActualizar);
app.post('/img/:id',[auth.ensureAuth,auth.Administrador,mdUpload],ComidaController.comidaImagen);
app.get('/img/:id',[auth.ensureAuth],ComidaController.comidaImagenObtener);

module.exports = app;
