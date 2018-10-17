const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../services/jwt.service');

const ensureAuth = function(req, res, next) {
  let payload;
  
  if(!req.headers.authorization) {
    return res.status(403).json({
      message: 'falta la cabezera de autenticacion'
    });
  }
  const token = req.headers.authorization.replace(/['"]+/g, '');
  try {
     payload = jwt.decode(token, secret);
    if (payload.exp  <= moment().unix()) {
      return res.status(401).json({
        message: 'token expirado'
      });
    }
  } catch (error) {

    return res.status(404).json({
      message: 'token no es valido',
      error
    });

  }
  req.empleado = payload ;
  next();
  
}
const Administrador = function (req, res, next) {
  const cargo = req.empleado.id_cargo;
  if (cargo === '') {
    return res.status(505).json({
      ok: false,
      message: 'Falta el cargo'
    });
  }
  if (cargo === 'Administrador') {
    next();
  } else {
    return res.status(200).json({
      ok: true,
      message: 'No tienes permiso necesarios'
    });
  }
}
const mismoEmpleado = function (req, res, next) {
  const idEmpleado = req.params.id || '';
  if (idEmpleado === '') {
    return res.status(404).json({
      ok: false,
      message: 'Falta el id del empleado'
    });
  }
  if(idEmpleado === req.empleado.idx){
    return res.status(200).json({
      ok: false,
      message: 'Eres el mismo usuario'
    })
  } else {
    next();
  }
}
module.exports  = {
  ensureAuth,
  Administrador,
  mismoEmpleado
}