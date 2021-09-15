const passport = require('passport');
const User = require('../models/User.model');
const Shelter = require('../models/Shelter.model');

//User
const registerUserPost = (req, res, next) => {
    try {

        const done = (error, user) => {
            if (error) return res.json(error);
            req.login(user, (error) => (error ? next(error) : res.json(user)));
        };

        passport.authenticate('register_user', done)(req);

    } catch (error) {
        return next(error);
    }
};

const loginUserPost = (req, res, next) => {
    try {

        const done = (error, user) => {
            if (error) return res.json(error);
            req.login(user, (error) => (error ? next(error) : res.json(user)));
        };

        passport.authenticate('login_user', done)(req);

    } catch (error) {
        return next(error);
    }
};

//Shelter

const registerShelterPost = (req, res, next) => {
    try {

        const done = (error, shelter) => { //shelter -> user change
            if (error) return res.json(error);
            req.login(shelter, (error) => (error ? next(error) : res.json(shelter)));
        };

        passport.authenticate('register_shelter', done)(req);

    } catch (error) {
        return next(error);
    }
};

const loginShelterPost = (req, res, next) => {
    try {
        const done = (error, user) => { // user -> user change
            if (error) return res.json(error);
            req.login(user, (error) => (error ? next(error) : res.json(user)));
        };

        passport.authenticate('login_shelter', done)(req);

    } catch (error) {
        return next(error);
    }
};

const logoutPost = (req, res, next) => {
    console.log('holaa arriba!')
    console.log(req.user)
    try {
        if (req.user) { // aquí user incluye a shelter?
            console.log('holaa!')
            req.logout();
            req.session.destroy(() => {
                res.clearCookie('logincookie');
                return res.status(200).json('Logout con exito');
            });
        }

    } catch (error) {
        console.log('holaa error!')

        return next(error);
    }
};

const checkSession = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            const fullUser = req.user;
            fullUser.password = null;

            return res.status(200).json(fullUser);
        } else {
            return res.json('Necesitas logearte para acceder.')
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    loginUserPost,
    registerUserPost,
    registerShelterPost,
    loginShelterPost,
    logoutPost,
    checkSession
}