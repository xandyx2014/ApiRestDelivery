const jwt = require('jwt-simple');
const moment = require('moment');

const secret = 'mi_clave_secreta';
const createToken = (user) => {
  const payload = {
    idx: user._id,
    nombre: user.nombre,
    apellido_paterno: user.apellido_paterno,
    apellido_materno: user.apellido_materno,
    CI: user.CI,
    telefono: user.telefono,
    id_cargo: user.id_cargo.nombre,
    iat: moment().unix(),
    exp: moment().add(30, 'days')
  };
  return jwt.encode(payload, secret);
}
module.exports = {
  createToken,
  secret
};