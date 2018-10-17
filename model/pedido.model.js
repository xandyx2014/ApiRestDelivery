"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    destino: {
      type: String,
      require: [true, 'El nombre del cargo es requerido'],
      default: ''
    },
    fecha: String,
    id_cliente: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      require: [true, 'Necesita un Menu']
    },
    id_transporte: {
      type: Schema.Types.ObjectId,
      ref: 'TransporteEncargado',
      require: [true, 'Necesita un transporte']
    },
    id_empleado: {
      type: Schema.Types.ObjectId,
      ref: 'Empleado',
      require: [true, 'Necesita un Empleado']
    },
    id_estado: {
      type: Schema.Types.ObjectId,
      ref: 'Estado'
    }

  }
);
module.exports = mongose.model('Pedido',UserSchema);