const express = require('express');
const CargoController = require('../controllers/cargo.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');

app.get('/prueba', CargoController.pruebaCargo);
app.post('/', [auth.ensureAuth],CargoController.crearCargo);
app.put('/:id',[auth.ensureAuth],CargoController.cargoActualizar);

module.exports = app;