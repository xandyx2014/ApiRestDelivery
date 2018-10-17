"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      require: [true, 'El nombre del cargo es requerido'],
      default: ''
    },
    apellido_paterno: String,
    apellido_materno: String,
    telefono: String,
  }
);
module.exports = mongose.model('Cliente',UserSchema);