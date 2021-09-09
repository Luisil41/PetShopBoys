const passport = require('passport');
const User = require('../models/User.model');
const registerStrategy = require('./user_strategies/register.strategy');
const loginStrategy = require('./user_strategies/login.strategy');

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async(userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error, null);
    }
});

const useStrategy = () => {
    passport.use('register_user', registerStrategy);
    passport.use('login_user', loginStrategy);
};

module.exports = { useStrategy };