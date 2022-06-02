const passport = require('passport');

const registerStrategy = require('./registerStrategy');

passport.use (`registrito`, registerStrategy);