"use strict";
const mongose = require('mongoose');
const Schema = mongose.Schema;

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      require: [true, 'El nombre del Menu es requerido'],
      default: ''
    },
  }
);
module.exports = mongose.model('Menu',UserSchema);