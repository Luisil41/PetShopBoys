const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User.model");
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
            const existingUser = await User.findOne({email});

            if(existingUser){
                const error = new Error('El usuario ya existe.');
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

            const newUser = new User({
                email,
                password:hash,
                fullName: req.body.fullName,
                birthdate: req.body.birthdate,
                avatar: req.imageUrl ? req.imageUrl : '',
                phone: req.body.phone,
                province: req.body.province,
                interest: req.body.interest,
            });

            const user = await newUser.save();
            user.password = null;
            
            return done(null, user);

        }catch (error) {
            return done(error);
        }
    }
);

module.exports = registerStrategy;