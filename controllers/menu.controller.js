const Menu = require('../model/menu.model');

function test(req, res) {
  Menu.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
// ===================================
// Crear Menu
// ===================================

function menuCrear(req, res) {
  const nombreMenuBody = req.body.nombre || '';
  if (nombreMenuBody === '') {
    return res.status(505).json({
      ok: false,
      message: 'menu no se ha enviado el nombre'
    });
  }
  menu = new Menu();
  menu.nombre = nombreMenuBody;
  menu.save( (err, respDB) => {
    errorBD(err,respDB,res);
    res.status(200).json({
      ok: true,
      menu: respDB
    });
  });

}
// ===================================
// Mostrar todos los menus
// ===================================
function menuMostrarTodos(req, res) {
  Menu.find().exec((err, respDB) => {
    errorBD(err, respDB,res);
    res.status(200).json({
      ok: true,
      menu: respDB
    });
  });
}
// ===================================
// mostrar Menu por id
// ===================================
function menuMostrarId(req, res) {
  const idParams = req.params.id;
  errorParams(idParams,res);
  Menu.findById(idParams).exec((err, respDB) => {
    errorBD(err, respDB,res);
    res.status(200).json({
      ok: true,
      menu: respDB
    });
  });
}
// ===================================
// Actualizar un menu
// ===================================
function menuActualizar(req, res) {
  const idParams = req.params.id;
  const nombreBody = req.body.nombre;
  errorParams({idParams,nombreBody},res);
  Menu.findOneAndUpdate(idParams,{nombre: nombreBody},{new: true}).exec((err, respDB) => {
    errorBD(err, respDB,res);
    res.status(200).json({
      ok: true,
      menu: respDB
    });
  });
}
// ===================================
// Borrar un menu
// ===================================
function menuBorrar(req, res) {
  const idParams = req.params.id;
  errorParams(idParams, res);
  Menu.findByIdAndRemove(idParams).exec((err, respDB) => {
    errorBD(err, respDB,res);
    res.status(200).json({
      ok: true,
      menu: respDB
    });
  });
}
const errorBD  = (err, respDB,res) => {
  if (err) {
    return res.status(505).json({
      ok: false,
      message: 'ha ocurrido un error'
    })
  }
  if (!respDB) {
    res.status(404).json({
      ok: false,
      message: 'Respuesta no encontrada'
    })
  }
}
const errorParams = (params,res) => {
  if (!params) {
    return res.status(505).json({
      ok: 'false',
      message: 'faltan pararemos'
    })
  }
}
module.exports = {
  test,
  menuCrear,
  menuMostrarTodos,
  menuMostrarId,
  menuActualizar,
  menuBorrar
}