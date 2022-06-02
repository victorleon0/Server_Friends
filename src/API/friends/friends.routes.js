const express = require('express');
const { getAllfriends, getfriend, postNewfriend, putfriend, deletefriend } = require('./friends.controller');

const friendRoutes = express.Router();


//Podemos usar la misma ruta para distintos metodos, tanto POST, PUT, DELETE, GET pueden usar la misma ruta dado que son metodos distintos
friendRoutes.get('/', getAllfriends);
friendRoutes.get('/:id', getfriend);
friendRoutes.post('/', postNewfriend);
friendRoutes.put('/:id', putfriend);
friendRoutes.delete('/:id', deletefriend);

module.exports = friendRoutes;
