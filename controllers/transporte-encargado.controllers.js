const TransporteEncargado = require('../model/transporte-encargado.model');

function test(req, res) {
  TransporteEncargado.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
function transEnCrear(req, res) {
  const transEncBody = req.body;
  errorParams(transEncBody,res);
  let transporteEnc = new TransporteEncargado();
  transporteEnc.id_transporte = transEncBody.id_transporte;
  transporteEnc.id_empleado = transEncBody.id_empleado;
  transporteEnc.disponible = transEncBody.disponible;
  transporteEnc.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      transporteEncargado: resBD
    });
  });
}
function transEnEditar(req, res) {
  const transEncId = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  TransporteEncargado.findOneAndUpdate(transEncId, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        transporteEncargado: respBD
      });
  });
}
function transEnMostrar(req, res) {
  TransporteEncargado.find().populate('id_transporte').populate('id_empleado','nombre imagen').exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      transporteEncargado: resBD
    });
  });
}
function transEncMostrarId(req, res) {
  const transEncaId = req.params.id;
  console.log(transEncaId);
  if (!transEncaId) {
    return errorParams(transEncaId,res);
  }
  TransporteEncargado.findById(transEncaId).populate('id_transporte').populate('id_empleado','nombre imagen').exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      transporteEncargado: resBD
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
  transEnCrear,
  transEnEditar,
  transEnMostrar,
  transEncMostrarId
  
}