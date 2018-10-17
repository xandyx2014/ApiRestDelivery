const Cliente = require('../model/cliente.model');

function test(req, res) {
  Cliente.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
function clienteCrear(req, res) {
  const clienteBody = req.body;
  errorParams(clienteBody,res);
  let cliente = new Cliente();
  cliente.nombre = clienteBody.nombre;
  cliente.cliente = clienteBody.cliente;
  cliente.apellido_materno = clienteBody.apellido_materno;
  cliente.telefono = clienteBody.telefono;
  cliente.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      cliente: resBD
    });
  });
}
function clienteEditar(req, res) {
  const clienteId = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  Cliente.findOneAndUpdate(clienteId, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        cliente: respBD
      });
  });
}
function clienteMostrar(req, res) {
  Cliente.find().exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      cliente: resBD
    });
  });
}
function clienteMostrarId(req, res) {
  const clienteId = req.params.id;
  console.log(clienteId);
  if (!clienteId) {
    return errorParams(clienteId,res);
  }
  Cliente.findById(clienteId).exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      cliente: resBD
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
  clienteCrear,
  clienteEditar,
  clienteMostrar,
  clienteMostrarId
}