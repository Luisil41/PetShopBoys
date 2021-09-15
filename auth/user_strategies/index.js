// const passport = require('passport');
// const registerStrategy = require('./register.strategy');
// const loginStrategy = require('./login.strategy');
// const User = require('../../models/User.model');

// passport.serializeUser((user, done) => {

//     return done(null, user._id);
// });

// passport.deserializeUser(async(userId, done) => {
//     try {
//         const existingUser = await User.findById(userId);
//         return done(null, existingUser);
//     } catch (error) {
//         return done(error, null);
//     }
// });


// const userUseStrategy = () => {
//     passport.use('register_user', registerStrategy);
//     passport.use('login_user', loginStrategy);
// };

// module.exports = { userUseStrategy };