const express = require('express');
const MenuController = require('../controllers/menu.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');
app.get('/test', MenuController.test);
app.post('/',[auth.ensureAuth,auth.Administrador] ,MenuController.menuCrear);
app.get('/',[auth.ensureAuth], MenuController.menuMostrarTodos);
app.get('/:id',[auth.ensureAuth], MenuController.menuMostrarId);
app.put('/:id',[auth.ensureAuth,auth.Administrador], MenuController.menuActualizar);
app.delete('/:id',[auth.ensureAuth,auth.Administrador], MenuController.menuBorrar);


module.exports = app;