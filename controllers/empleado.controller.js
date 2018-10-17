const Empleado = require('../model/empleado.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt.service');
const fs = require('fs');
const path = require('path');
// ===================================
// Crear Empleado
// ===================================

function crearEmpleado(req, res) {
  const empleadoBody = req.body;
  if (!empleadoBody) {
    return errorBD('faltan parametros', res);
  }
  const empleado = new Empleado();
  empleado.nombre = empleadoBody.nombre;
  empleado.apellido_paterno = empleadoBody.apellido_paterno;
  empleado.apellido_materno = empleadoBody.apellido_materno;
  empleado.CI = empleadoBody.CI;
  empleado.telefono = empleadoBody.telefono;
  empleado.id_cargo = empleadoBody.id_cargo;
  bcrypt.hash(empleadoBody.contrasegna, null, null, (err, hash) => {
    if (err) return errorBD('Ha ocurrido un error al crear contraseña',res);
    if (hash) {
      empleado.contrasegna = hash;
      empleado.save((err, empleadoDB) => {
        if (err) return errorBD('Ha ocurrido un error', res);
        empleadoDB.contrasegna = '...';
        return res.status(200).json({
          ok: true,
          empleado: empleadoDB
        })
      });
    }
  });
  
}
// ===================================
// Loguear Empleado
// ===================================
function loginEmpleado(req, res) {
  const CI = req.body.CI;
  const contrasegna = req.body.contrasegna;
  if (!CI || !contrasegna) {
    return errorBD('faltan parametros', res);
  }
  Empleado.findOne({CI}).populate('id_cargo','nombre').exec((err ,resDB) => {
    if (err) return errorBD('error Al loguear el usuario',res);
    if (!resDB) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario No encontrado en la base de datos'
      });
    }
    bcrypt.compare(contrasegna, resDB.contrasegna, (err, check) => {
      if (check) {
        resDB.contrasegna = '...';
       return res.status(200).json({
          ok: true,
          empleado: resDB,
          token: jwt.createToken(resDB)
        });
      }
    });
    
  });
}
// ===================================
// Obtener empleado Por Id
// ===================================
function empleadoId (req, res) {
  const idEmpleado = req.params.id || '';
  if (idEmpleado === '') {
    return res.status(404).json({
      ok: false,
      message: 'Falta el idEmpleado'
    });
  }
  Empleado.findById(idEmpleado).exec((err, resDB) => {
    if (err) {
      return errorBD('ha ocurrido un error al buscar el empleado',res);
    }
    if (!resDB) {
      return res.status(404).json({
        ok: false,
        message: 'El empleado no ha sido encontrado'
      });
    }
    resDB.contrasegna = '...';
    res.status(200).json({
      ok: true,
      empleado: resDB
    });
  })
}
// ===================================
// Eliminar Empleado por id
// ===================================
function empleadoEliminar(req, res) {
  const idEmpleado = req.params.id || '';
  if (idEmpleado === '') {
    return res.status(404).json({
      ok: false,
      message: 'Falta el idEmpleado'
    });
  }
  Empleado.findOneAndDelete(idEmpleado).exec((err, resDB) => {
    if (err) {
      return errorBD('ha ocurrido un error al buscar el empleado',res);
    }
    if (!resDB) {
      return res.status(404).json({
        ok: false,
        message: 'El empleado no ha sido encontrado'
      });
    }
    resDB.contrasegna = '...';
    res.status(200).json({
      ok: true,
      empleado: resDB
    });
  })
}
// ===================================
// Actualizar un empleado
// ===================================
function empleadoActualizar(req, res) {
  const empleadoBody = req.body;
  const idEmpleado = req.params.id;
  if (!empleadoBody || !idEmpleado) {
    return res.status(505).json({
      ok: false,
      message: 'Falta parametros para actualizar'
    });
  }
  Empleado.findOneAndUpdate(idEmpleado,empleadoBody,{new: true})
  .exec((err, resDB) => {
    if (err) {
      return errorBD(`Error en Actualizar el usuario ${err}`, res)
    }
    if (!resDB) {
      return res.status(404).json({
        ok: false,
        message: 'No se ha encontrado al usuario'
      });
    }
    resDB.contrasegna = '...';
    res.status(200).json({
      ok: true,
      empleado: resDB
    });
  });
}
// ===================================
// Traer todos los empleados
// ===================================
function empleadosTodos( req, res) {
  const desde = Number(req.query.desde) || 0;
  const limite = 5;
  Empleado.find().skip(desde).limit(limite).populate('id_cargo')
  .exec((err, resDB) => {
    if (err) {
      return errorBD('Ha ocurrido un error ',res)
    }
    if (!resDB) {
      return res.status(404).json({
        ok: 'false',
        message: 'No se encuentran usuarios'
      })
    }
    
    res.status(200).json({
      ok: true,
      empleado: resDB
    })
  });
}
// ===================================
// Subir imagen de empleado
// ===================================
function empleadoImagen(req, res) {
  const empleadoId = req.params.id;
  if (!empleadoId) {
   return res.status(505).json({
      ok: false,
      message: 'Falta el id del usuario'
    });
  }
  if (req.files && Object.keys(req.files).length !== 0) {
    console.log(req.files);
    const filePath = req.files.image.path;
    const filesSplit = filePath.split('\\');
    let fileName = req.files.image.path.split('\\')[2];
    let extension = req.files.image.type.split('/')[1];
    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
      Empleado.findOneAndUpdate(empleadoId,{imagen: fileName},{new: true})
      .exec( (err, resDB) => {
        if (err) {
          return errorBD('Ha ocurrido un error al subir la imagen', res);
        }
        if (!resDB) {
          return res.status(404).json({
            ok: false,
            message: 'No se ha encontrao el usuario'
          });
        }
        resDB.contrasegna = '...';
        res.status(200).json({
          ok: true,
          empleado: resDB
        });
      });
    } else {
      return removeFileUpload(res, filePath, 'no es un archivo');
    }
  } else {

    return res.status(200).json({
      message: 'no se han subido archivos o imagen'
    });
  }
  
}
// ===================================
// Obtener imagen 
// ===================================
function empleadoImagenObtener(req, res) {
  const empleadoId = req.params.id || '';
  let pathImagen = './uploads/empleados';
  if (empleadoId === '') {
    return res.status(200).json({
      ok: true,
      message: 'Falta parametros'
    });
  }
  Empleado.findById(empleadoId).exec((err, resDB) => {
    if (err) {
      return errorBD('Ha ocurrido un error', res)
    }
    if (!resDB) {
      return res.status(404).json({
        ok: false,
        message: 'No se ha enconrado el usuario'
      });
    }
    resDB.contrasegna = '...';
    pathImagen = `${pathImagen}/${resDB.imagen}`;
    fs.exists(pathImagen,(exists) => {
      if (exists) {
        res.sendFile(path.resolve(pathImagen));
      } else {
        res.sendFile(path.resolve('./uploads/imagenNoEncontrada.png'));
      }
    });
  });
  
}
const errorBD  = (message, res) => {
  res.status(505).json({
   ok: false,
   message
 }) 
}
const removeFileUpload = (res, filePath, message) => {

  fs.unlink(filePath, (err) => {
    return res.status(200).json({
      message
    })
  });
}
module.exports = {
  crearEmpleado,
  loginEmpleado,
  empleadoId,
  empleadosTodos,
  empleadoEliminar,
  empleadoActualizar,
  empleadoImagen,
  empleadoImagenObtener

}