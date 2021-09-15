// const passport = require('passport');
// const registerStrategy = require('./user_strategies/register.strategy');
// const loginStrategy = require('./user_strategies/login.strategy');
// const User = require('../models/User.model');

// const registerStrategyShelter = require('./shelter_strategies/register.strategy');
// const loginStrategyShelter = require('./shelter_strategies/login.strategy');
// const Shelter = require('../models/Shelter.model');



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

// const useStrategy = () => {
//     passport.use('register_user', registerStrategy);
//     passport.use('login_user', loginStrategy);
//     passport.use('register_shelter', registerStrategyShelter);
//     passport.use('login_shelter', loginStrategyShelter);
// };

// module.exports = { useStrategy };