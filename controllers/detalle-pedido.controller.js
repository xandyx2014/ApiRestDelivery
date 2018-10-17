const DetallePedido = require('../model/detalle-pedido.model');

function test(req, res) {
  DetallePedido.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
function detallePedidoCrear(req, res) {
  const detallePedidoBody = req.body;
  errorParams(detallePedidoBody,res);
  let detallePedido = new DetallePedido();
  detallePedido.id_pedido = detallePedidoBody.id_pedido;
  detallePedido.id_comida = detallePedidoBody.id_comida;
  detallePedido.cantidad = detallePedidoBody.cantidad;
  detallePedido.precio_unidad = detallePedidoBody.precio_unidad;
  detallePedido.precio_total = detallePedidoBody.precio_total;
  detallePedido.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      detallePedido: resBD
    });
  });
}
function detallePedidoEditar(req, res) {
  const transEncId = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  DetallePedido.findOneAndUpdate(transEncId, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        detallePedido: respBD
      });
  });
}
function detallePedidoMostrar(req, res) {
  DetallePedido.find().populate({
    path: 'id_comida'
  }).exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      detallePedido: resBD
    });
  });
}
function detallePedidoMostrarId(req, res) {
  const detalleId = req.params.id;
  console.log(detalleId);
  if (!detalleId) {
    return errorParams(detalleId,res);
  }
  DetallePedido.findById(detalleId)
  .populate({
    path: 'id_comida'
  })
  .exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      detallePedido: resBD
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
  detallePedidoCrear,
  detallePedidoEditar,
  detallePedidoMostrar,
  detallePedidoMostrarId
}