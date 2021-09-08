const LocalStrategy = require("passport-local").Strategy;
const Shelter = require("../../models/Pet.model");
const bcrypt = require("bcrypt");
const { validateEmail, validatePass } = require("../utils");

const registerStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, pass, done) => {
        try{
            const existingShelter = await Shelter.findOne({email});

            if(existingUser){
                const error = new Error('El refugio ya existe.');
                return done(error);
            }

            if(!validateEmail(email)){
                const error = new Error('El formato de email no es correcto.');
                return done(error);
            }

            if(!validatePass(pass)){
                const error = new Error('El formato de contraseña no es válido.');
                return done(error);
            }

            const rounds = 10;
            const hash = await bcrypt.hash(pass, rounds);

            const newShelter = new Shelter({
                email,
                password:hash,
                name: req.body.name,
                adress: req.body.adress,
                avatar: req.imageUrl ? req.imageUrl : '',
                phone: req.body.phone,
            });

            const shelter = await newShelter.save();
            user.password = null;
            
            return done(null, shelter);

        }catch (error) {
            return done(error);
        }
    }
);

module.exports = registerStrategy;