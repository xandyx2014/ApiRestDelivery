"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    tipo_transporte: {
      type: String
    },
    placa: {
      type: String
    },
    costo: {
      type: Number
    },
    imagen: {
      type: String,
      default: 'imagenNoEncontrada.png'
    }

  }
);
module.exports = mongose.model('Transporte',UserSchema);