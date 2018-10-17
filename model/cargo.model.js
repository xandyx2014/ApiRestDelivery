"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      require: [true, 'El nombre del cargo es requerido'],
      enum: ['Repartidor','Operador','Administrador'],
      default: 'Operador'
    }

  }
);
module.exports = mongose.model('Cargo',UserSchema);