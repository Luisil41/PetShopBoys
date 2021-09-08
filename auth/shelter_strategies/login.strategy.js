const LocalStrategy = require("passport-local").Strategy;
const Shelter = require("../../models/Shelter.model");
const bcrypt = require("bcrypt");

const loginStrategy = new LocalStrategy(
    {
        shelternameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, pass, done) => {
        try{
            const existingUser = await Shelter.findOne({email});
            
            if(!existingShelter){
                const error = new Error('El refugio no existe.');
                return done(error);
            }

            const checkPassword = await bcrypt.compare(pass, existingShelter.password);

            if(!checkPassword){
                const error = new Error('La contraseña no es correcta.');
                return done(error);
            }

            existingShelter.password = null;

            return done(null, existingShelter);

        }catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;