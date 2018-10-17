"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      require: [true, 'El nombre  es requerido'],
      default: ''
    },
    contrasegna: String,
    apellido_paterno: String,
    apellido_materno: String,
    CI: {
      uniqued: true,
      type: String,
      require: [true, 'El CI es requerido']
    },
    telefono: String,
    imagen: {
      type: String,
      default: 'imagenNoEncontrada.png'
    },
    id_cargo: {
      type: Schema.Types.ObjectId,
      ref: 'Cargo',
      require: [true, 'Necesita un cargo']
    }

  }
);
module.exports = mongose.model('Empleado',UserSchema);