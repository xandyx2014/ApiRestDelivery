const express = require('express');
const EmpleadoController = require('../controllers/empleado.controller');
const app = express.Router();
const auth = require('../middleware/auth.middleware');
const multipart = require('connect-multiparty');

const mdUpload = multipart({
  uploadDir: './uploads/empleados'
});
app.post('/Empleado',[auth.ensureAuth, auth.Administrador ],EmpleadoController.crearEmpleado);
app.get('/Empleado/:id',[auth.ensureAuth],EmpleadoController.empleadoId);
app.delete('/Empleado/:id',[auth.ensureAuth,
  auth.mismoEmpleado,auth.Administrador],
  EmpleadoController.empleadoEliminar);
app.put('/Empleado/:id',[auth.ensureAuth],EmpleadoController.empleadoActualizar);
app.get('/Empleados',[auth.ensureAuth],EmpleadoController.empleadosTodos);
app.post('/EmpleadoImagen/:id',[auth.ensureAuth,mdUpload],EmpleadoController.empleadoImagen);
app.get('/EmpleadoImagen/:id',[auth.ensureAuth],EmpleadoController.empleadoImagenObtener);
app.post('/login', EmpleadoController.loginEmpleado);


module.exports = app;