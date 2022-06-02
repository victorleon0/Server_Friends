const localStrategy = require(`passport-local`).Strategy;
const registerStrategy = new localStrategy (
    {
        usernameField: 'email', //Le pasamos los fields que queremos añadir en el proceso de registro 
        passwordField: 'password',
        passReqToCallback: true, //Pasarle la request al callback de abajo
    },
    (req, email, password, done) => {}
    );
module.exports = registerStrategy;