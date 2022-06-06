const passport = require("passport");
console.log(__dirname)
const User = require("../../api/users/users.models.js");

const loginStrategy = require("./loginStrategy");
const registerStrategy = require("./registerStrategy");

// Esta función usará el usuario de req.LogIn para registrar su id id.
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

// Esta función buscará un usuario dada su _id en la DB y populará req.user si existe
passport.deserializeUser(async (userId, done) => {
  try {
    const existingUser = await User.findById(userId);
    return done(null, existingUser); // esto nos crea una propiedad req.user en todo el server.
  } catch (err) {
    return done(err);
  }
});

passport.use("registrito", registerStrategy);
passport.use("logincito", loginStrategy);