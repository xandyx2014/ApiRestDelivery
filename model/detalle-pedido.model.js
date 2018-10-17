"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    id_pedido:{
      type: Schema.Types.ObjectId,
      ref: 'Pedido',
      require: [true, 'Necesita un Pedido']
    },
    id_comida: {
      type: Schema.Types.ObjectId,
      ref: 'Comida',
      require: [true, 'Necesita un Pedido']
    },
    cantidad: Number,
    precio_unidad: Number,
    precio_total: Number
  }
);
module.exports = mongose.model('DetallePedido',UserSchema);