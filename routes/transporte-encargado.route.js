const express = require('express');
const TransporteEncargadoController = require('../controllers/transporte-encargado.controllers');
const app = express.Router();
const auth = require('../middleware/auth.middleware');
app.get('/test', TransporteEncargadoController.test);
app.post('/',[auth.ensureAuth],TransporteEncargadoController.transEnCrear);
app.put('/:id',[auth.ensureAuth], TransporteEncargadoController.transEnEditar);
app.get('/',[auth.ensureAuth], TransporteEncargadoController.transEnMostrar);
app.get('/:id',[auth.ensureAuth], TransporteEncargadoController.transEncMostrarId);

module.exports = app;