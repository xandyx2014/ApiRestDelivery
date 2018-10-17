const Comida = require('../model/comida.model');
const fs = require('fs');
const path = require('path')
function test(req, res) {
  Comida.find((err, respDB) => {
    res.status(200).json({
      ok: true,
      respDB
    })
  })
}
// ===================================
// Crear Comida
// ===================================
function comidaCrear(req, res) {
  const comidaBody = req.body;
  errorParams(comidaBody,res);
  let comida = new Comida();
  comida.nombre = comidaBody.nombre;
  comida.id_menu = comidaBody.id_menu;
  comida.save((err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      comida: resBD
    });
  })
}
// ===================================
// Actualizar Comida
// ===================================
function comidaActualizar(req, res) {
  const idComida = req.params.id;
  const updateBody = req.body;
  if(Object.keys(updateBody).length === 0) {
   return res.status(505).json({
     ok: false,
     message: 'Faltan parametros'
   })
  }
  Comida.findOneAndUpdate(idComida, updateBody ,{new:  true})
  .exec( (err, respBD) => {
      errorBD(err,respBD,res);
      res.status(200).json({
        ok: true,
        comida: respBD
      });
  });
}
// ===================================
// Mostrar Todas las comidas
// ===================================
function comidaMostrar(req, res) {

  Comida.find().populate('id_comida').populate('id_menu').exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      comida: resBD
    });
  });
}
// ===================================
// Mostrar comidas por menu
// ===================================
function comidaMostrarMenu(req, res) {
  const idMenu = req.params.id;
  console.log(idMenu);
  if (!idMenu) {
    return errorParams(idMenu,res);
  }
  Comida.find({id_menu: idMenu}).populate('id_menu').exec( (err, resBD) => {
    errorBD(err, resBD,res);
    res.status(200).json({
      ok: true,
      comida: resBD
    });
  });
}
// ===================================
// Mostrar Comida por Id
// ===================================
function comidaMostrarId(req, res) {
  const comidaId = req.params.id;
  errorParams(comidaId,res);
  Comida.findById(comidaId).populate('id_comida').populate('id_menu').exec( (err, resBD) => {
    errorBD(err, resBD);
    res.status(200).json({
      ok: true,
      comida: resBD
    });
  });
}
// ===================================
// Actualizar Imagen comida
// ===================================
function comidaImagen(req, res) {
  const comidaId = req.params.id;
  if (!comidaId) {
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
      Comida.findOneAndUpdate(comidaId,{imagen: fileName},{new: true})
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
// Obtener imagen de comida
// ===================================
function comidaImagenObtener(req, res) {
  const comidaId = req.params.id || '';
  let pathImagen = './uploads/comidas';
  if (comidaId === '') {
    return res.status(200).json({
      ok: true,
      message: 'Falta parametros'
    });
  }
  Comida.findById(comidaId).exec((err, resDB) => {
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
  comidaCrear,
  comidaMostrar,
  comidaMostrarId,
  comidaMostrarMenu,
  comidaActualizar,
  comidaImagen,
  comidaImagenObtener
}