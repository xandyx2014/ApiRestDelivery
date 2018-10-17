"use strict";
const express = require('express');
const app = express();

app.use('/cargo',require('./routes/cargo.route'));
app.use('/usuario', require('./routes/empleado.route'));
app.use('/transporte',require('./routes/transporte.route'));
app.use('/transporteEncargado',require('./routes/transporte-encargado.route'));
app.use('/estado',require('./routes/estado.route'));
app.use('/cliente',require('./routes/cliente.route'));
app.use('/menu',require('./routes/menu.route'));
app.use('/comida', require('./routes/comida.route'))
app.use('/detallePedido', require('./routes/detallePedido.route'));
app.use('/pedido', require('./routes/pedido.route'));

module.exports = app;