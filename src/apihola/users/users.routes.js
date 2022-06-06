const express = require('express');
const {postRegister} = require('./users.controller.js');

const UserRoutes = express.Router();

UserRoutes.post(`/register`, postRegister);

module.exports = UserRoutes;