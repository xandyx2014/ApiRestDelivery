const express = require('express');
const ClienteController = require('../controllers/cliente.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');

app.get('/test', ClienteController.test);
app.post('/', [auth.ensureAuth,auth.Administrador], ClienteController.clienteCrear);
app.put('/:id',[auth.ensureAuth],ClienteController.clienteEditar)
app.get('/',[auth.ensureAuth], ClienteController.clienteMostrar);
app.get('/:id',[auth.ensureAuth], ClienteController.clienteMostrarId);



module.exports = app;