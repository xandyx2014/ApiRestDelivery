const Transporte = require('../model/transporte.model');
const fs = require('fs');
const path = require('path');
function test(req, res) {
  Transporte.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
function transporteCrear(req, res) {
  const transporteBody = req.body;
  errorParams(transporteBody,res);
  let transporte = new Transporte();
  transporte.tipo_transporte = transporteBody.tipo_transporte;
  transporte.placa = transporteBody.placa;
  transporte.costo = transporteBody.costo;
  transporte.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      transporte: resBD
    });
  });
}
// ===================================
// Actualizar Transporte
// ===================================
function transporteActualizar(req, res) {
  const idTransporte = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  Transporte.findOneAndUpdate(idTransporte, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        transporte: respBD
      });
  });
  
  
}
// ===================================
// Mostrar Todas las comidas
// ===================================
function transporteMostrar(req, res) {

  Transporte.find().exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      transporte: resBD
    });
  });
}

// ===================================
// Mostrar Transporte por Id
// ===================================
function transporteMostrarId(req, res) {
  const transporte = req.params.id;
  errorParams(transporte,res);
  Transporte.findById(transporte).exec( (err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      transporte: resBD
    });
  });
}
// ===================================
// Subir Imagen Transporte
// ===================================
function transporteImagen(req, res) {
  const transporteId = req.params.id;
  if (!transporteId) {
   return res.status(505).json({
      ok: false,
      message: 'Falta el id del comida'
    });
  }
  console.log(req.files);
  if (req.files && Object.keys(req.files).length !== 0) {
    
    const filePath = req.files.image.path;
    const filesSplit = filePath.split('\\');
    let fileName = req.files.image.path.split('\\')[2];
    let extension = req.files.image.type.split('/')[1];
    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
      Transporte.findOneAndUpdate(transporteId,{imagen: fileName},{new: true})
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
          transporte: resDB
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
// Obtener imagen de comida
// ===================================
function transporteImagenObtener(req, res) {
  const transporteId = req.params.id || '';
  let pathImagen = './uploads/transportes';
  if (transporteId === '') {
    return res.status(200).json({
      ok: true,
      message: 'Falta parametros'
    });
  }
  Transporte.findById(transporteId).exec((err, resDB) => {
    if (err) {
      return errorBD('Ha ocurrido un error', res)
    }
    if (!resDB) {
      return res.status(404).json({
        ok: false,
        message: 'No se ha enconrado el usuario'
      });
    }
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
const errorBD  = (err, resBD,res) => {
  if (err) {
    return res.status(505).json({
      ok: false,
      message: 'ha ocurrido un error',
      err
    })
  }
  if (!resBD) {
    res.status(404).json({
      ok: false,
      message: 'Respuesta no encontrada'
    })
  }
}
const errorParams = (params,res) => {
  if (!params) {
    return res.status(505).json({
      ok: 'false',
      message: 'faltan pararemos'
    })
  }
}
const removeFileUpload = (res, filePath, message) => {

  fs.unlink(filePath, (err) => {
    return res.status(200).json({
      message
    })
  });
}
module.exports = {
  test,
  transporteCrear,
  transporteActualizar,
  transporteMostrar,
  transporteMostrarId,
  transporteImagen,
  transporteImagenObtener
}