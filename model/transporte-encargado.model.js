"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    id_transporte: {
      type: Schema.Types.ObjectId,
      ref: 'Transporte',
      require: [true, 'Necesita un Transporte']
    },
    id_empleado: {
      type: Schema.Types.ObjectId,
      ref: 'Empleado',
      require: [true, 'Necesita un Empleado']
    },
    disponible: {
      type: Boolean,
      default: true
    }
  }
);
module.exports = mongose.model('TransporteEncargado',UserSchema);