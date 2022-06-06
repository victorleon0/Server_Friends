const express = require("express"); // Instalamos el paquete express y lo requerimos
const cors = require("cors"); // Instalamos el cors 
const dotenv = require("dotenv"); //Instalamos Dotenv
const passport = require("passport"); //Instalamos passport para el registro y el login
const session = require("express-session"); //Instalamos Express session para el registro y el login
const MongoStore = require("connect-mongo"); // Instalamos connect mongo para la BBDD
require("./src/utils/auth/index");  // Llamamos al archivo de index de la autorizacion.
dotenv.config(); // Configuramos dotenv llamando a la fucnion config

const friendRoutes = require('./src/api/friends/friends.routes.js'); //Llamamos al archivo de rutas de amigos
const UserRoutes = require('./src/api/users/users.routes.js'); //Llamamos al archivo de usuarios


const { bdConnect } = require('./src/utils/database/db'); //Llamamos al archivo de la BBDD

const PORT = 4000; // Añadimos el puerto donde queramos que se ejecute

const app = express(); // LLamamos a la funcion de la app
app.disable("x-powered-by"); 
bdConnect(); // Conectamos la BBDD

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE'); //Definimos los metodos que permitimos para nuestra API
    res.header('Access-Control-Allow-Credentials', 'true'); //Decimos que permitos la conexion con credenciales(cookies, autenticacion, etc)
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(cors({   //Definimos las rutas para las que damos permiso a acceder a nuestra API, para que no la bloquee el CORS
    origin: ['https://localhost:3000', 'https://localhost:4200', 'http://pepitoperez.com'],    //Implementamos el cors para poder conectarnos desde los puertos estandar de ANGULAR Y REACT
    credentials: true,
}));

app.use(
    session({
      secret: process.env.SESSION_SECRET, // ¡Este secreto tendremos que cambiarlo en producción!
      resave: false, // Solo guardará la sesión si hay cambios en ella.
      saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
      cookie: {
        maxAge: 60 * 60 * 1000, // Milisegundos de duración de nuestra cookie, en este caso será una hora.
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB,
      }),
    })
  );
  

app.use(passport.initialize());
app.use(session());

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
