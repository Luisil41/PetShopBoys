const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User.model");
const bcrypt = require("bcrypt");

const loginStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, pass, done) => {
        try{
            const existingUser = await User.findOne({email});
            
            if(!existingUser){
                const error = new Error('El usuario no existe.');
                return done(error);
            }

            const checkPassword = await bcrypt.compare(pass, existingUser.password);

            if(!checkPassword){
                const error = new Error('La contraseña no es correcta.');
                return done(error);
            }

            existingUser.password = null;

            return done(null, existingUser);

        }catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;
