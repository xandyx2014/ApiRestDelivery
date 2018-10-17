const Estado = require('../model/estado.model');

function test(req, res) {
  Estado.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
function estadoCrear(req, res) {
  const estadoBody = req.body;
  errorParams(estadoBody,res);
  let estado = new Estado();
  estado.nombre = estadoBody.nombre;
  estado.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      estado: resBD
    });
  });
}
function estadoEditar(req, res) {
  const idEstado = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  Estado.findOneAndUpdate(idEstado, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        estado: respBD
      });
  });
}
function estadoMostrar(req, res) {
  Estado.find().exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      estado: resBD
    });
  });
}
function estadoMostrarId(req, res) {
  const estadoId = req.params.id;
  console.log(estadoId);
  if (!estadoId) {
    return errorParams(estadoId,res);
  }
  Estado.findById(estadoId).exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      estado: resBD
    });
  });
}
const errorBD  = (err, resBD,res) => {
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
  estadoCrear,
  estadoEditar,
  estadoMostrar,
  estadoMostrarId
}