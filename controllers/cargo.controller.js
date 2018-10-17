const Cargo = require('../model/cargo.model');

function pruebaCargo(req ,res) {
  res.status(200).json({
    test: 'test'
  })
}
// ===================================
// Crear Usuario
// ===================================
function crearCargo(req ,res) {
  const nombreCargo = req.body.cargo || 'Operador';
  const cargo = new Cargo();
  cargo.nombre = nombreCargo;
  console.log(cargo);
  cargo.save((err, cargoBD) => {
    if (err) return errorBD('No se ha podido crear el cargo', res);
    if (!cargoBD) {
     return res.status(404).json({
        ok: false,
        message: 'No se ha encontrado el Cargo'
      })
    } 
      
    res.status(200).json({
        ok: true,
        cargo: cargoBD
      });
    
  });
}
function cargoActualizar(req, res) {
  const cargoId = req.params.id;
  const cargoNombre = req.body.nombre;
  if (!cargoId || !cargoNombre) {
    return res.status(505).json({
      ok: false,
      message: 'Faltan parametros en la solicitud'
    });
  }
  Cargo.findByIdAndUpdate(cargoId,{nombre: cargoNombre})
  .exec((err, respBD) => {
    errorBD(err,respBD,res);
    res.status(200).json({
      ok: true,
      cargo: respBD
    });
  });

}


const errorBD  = (err, resBD, res) => {
  if (err) {
    return res.status(505).json({
      ok: false,
      message: 'ha ocurrido un error',
      err
    })
  }
  if (!resBD) {
    res.status(404).json({
      ok: false,
      message: 'Respuesta no encontrada'
    })
  }
}
module.exports = {
  pruebaCargo,
  crearCargo,
  cargoActualizar
}
