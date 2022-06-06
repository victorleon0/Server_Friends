const express = require('express');
const { getAllfriends, getfriend, postNewfriend, putfriend, deletefriend } = require('./friends.controller');
const upload = require('../../utils/middlewares/uploadFiles.middleware.js');
const friendRoutes = express.Router();


//Podemos usar la misma ruta para distintos metodos, tanto POST, PUT, DELETE, GET pueden usar la misma ruta dado que son metodos distintos
friendRoutes.get('/', getAllfriends);
friendRoutes.get('/:id', getfriend);
friendRoutes.post('/', upload.fields([
    { name: 'image', maxCount: 1 },             //nombre del campo y cantidad --> genera un array
    { name: 'image2', maxCount: 1 }
  ]), postNewfriend);

friendRoutes.put('/:id', putfriend);
friendRoutes.delete('/:id', deletefriend);

module.exports = friendRoutes;
