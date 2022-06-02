const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./src/utils/auth/index");
dotenv.config();

const friendRoutes = require('./src/api/friends/friends.routes.js');
const UserRoutes = require('./src/api/users/users.routes.js');


const { bdConnect } = require('./src/utils/database/db');

const PORT = 4000; // Mi puerto

const app = express();
app.disable("x-powered-by");
bdConnect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE'); //Definimos los metodos que permitimos para nuestra API
    res.header('Access-Control-Allow-Credentials', 'true'); //Decimos que permitos la conexion con credenciales(cookies, autenticacion, etc)
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(cors({   //Definimos las rutas para las que damos permiso a acceder a nuestra API, para que no la bloquee el CORS
    origin: ['https://localhost:3000', 'https://localhost:4200', 'http://pepitoperez.com'],    //Implementamos el cors para poder conectarnos desde los puertos estandar de ANGULAR Y REACT
    credentials: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({
    limit: '5mb'            //Limitamos el tamaño máximo de nuestra petición
}))

app.use(express.urlencoded({limit: '5mb', extended: true}))  //Se asegura que lo que recibas sean urls con clave--valor(ej: name:Pepe, apellido:perez)

app.use('/friends', friendRoutes);
app.use('/users', UserRoutes);


app.use('/', (req, res) => {
    return res.status(200).json("Mi api de Amigos");
})

app.use('*', (req, res, next) => {              //Para las rutas que no estén definidas muestranos un Route not found
    return res.status(404).json('Route not found');
});

app.use((error, req, res, next)=>{              //Para cualquier error que suceda en la aplicación
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.listen(PORT, ()=>{
    console.log(`listening in http://localhost:${PORT}`);
});
