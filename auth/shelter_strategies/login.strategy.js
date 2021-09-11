const LocalStrategy = require("passport-local").Strategy;
const Shelter = require("../../models/Shelter.model");
const bcrypt = require("bcrypt");

const loginStrategy2 = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, pass, done) => {
        try{
            const existingUser = await Shelter.findOne({email});
            
            if(!existingUser){
                const error = new Error('El refugio no existe.');
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

module.exports = loginStrategy2;
