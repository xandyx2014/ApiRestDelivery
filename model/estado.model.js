"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      require: [true, 'El nombre del Estado es requerido'],
      enum: ['Preparacion','Enviado','Entregado','Rechazado'],
      default:'Preparacion'
    }
  }
);
module.exports = mongose.model('Estado',UserSchema);