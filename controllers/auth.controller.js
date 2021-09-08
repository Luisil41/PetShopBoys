const passport = require('passport');
const User = require('../models/User.model');

const registerUserPost = (req, res, next) => {
    try {

        const done = (error, user) => {
            if(error) return res.json(error);
            req.login(user, (error) => (error ? next(error) : res.json(user)));
        };

        passport.authenticate('register_user', done)(req);

    }catch (error) {
        return next(error);
    }
};

const loginUserPost = (req, res, next) => {
    try {

        const done = (error, user) => {
            if(error) return res.json(error);
            req.login(user, (error) => (error ? next(error) : res.redirect('/')));
        };

        passport.authenticate('login_user', done)(req);

    }catch (error) {
        return next(error);
    }
};

const logoutPost = (req, res, next) => {
    try {

        if(req.user){
            req.logout();
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                return res.redirect('/');
            });
        }

    }catch (error) {
        return next(error);
    }
};

module.exports = {
    loginUserPost,
    registerUserPost,
    logoutPost
}

