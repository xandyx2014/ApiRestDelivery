const Pedido = require('../model/pedido.model');

function test(req, res) {
  Pedido.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
function pedidoCrear(req, res) {
  const pedidoBody = req.body;
  errorParams(pedidoBody,res);
  let pedido = new Pedido();
  pedido.destino = pedidoBody.destino;
  pedido.fecha = pedidoBody.fecha;
  pedido.id_cliente = pedidoBody.id_cliente;
  pedido.id_transporte = pedidoBody.id_transporte;
  pedido.id_empleado = pedidoBody.id_empleado;
  pedido.id_estado = pedidoBody.id_estado;
  
  pedido.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      pedido: resBD
    });
  });
}
function pedidoEditar(req, res) {
  const pedidoId = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  Pedido.findOneAndUpdate(pedidoId, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        pedido: respBD
      });
  });
}
function pedidoMostrar(req, res) {
  Pedido.find().populate('id_transporte').populate('id_empleado','nombre imagen').populate('id_estado').exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      pedido: resBD
    });
  });
}
function pedidoMostrarId(req, res) {
  const pedidoId = req.params.id;
  console.log(pedidoId);
  if (!pedidoId) {
    return errorParams(pedidoId,res);
  }
  Pedido.findById(pedidoId).populate({
    path:'id_transporte',
    populate: [
      {
        path: 'id_transporte'
      },
      {
        path: 'id_empleado',
        select: 'nombre imagen'
      }
    ]

  }).populate('id_empleado','nombre imagen').populate('id_estado').exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      pedido: resBD
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
  pedidoCrear,
  pedidoEditar,
  pedidoMostrar,
  pedidoMostrarId
}