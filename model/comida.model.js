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
    imagen: {
      type: String,
      default: 'imagenNoEncontrada.png'
    },
    id_menu:{
      type: Schema.Types.ObjectId,
      ref: 'Menu',
      require: [true, 'Necesita un Menu']
    }
  }
);
module.exports = mongose.model('Comida',UserSchema);