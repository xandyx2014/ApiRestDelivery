const express = require('express');
const EstadoController = require('../controllers/estado.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');
app.get('/test', EstadoController.test);
app.post('/',[auth.ensureAuth,auth.Administrador],EstadoController.estadoCrear);
app.put('/:id',[auth.ensureAuth,auth.Administrador],EstadoController.estadoEditar);
app.get('/',[auth.ensureAuth],EstadoController.estadoMostrar);
app.get('/:id',[auth.ensureAuth],EstadoController.estadoMostrarId);
module.exports = app;