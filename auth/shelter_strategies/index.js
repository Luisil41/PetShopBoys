// const passport = require('passport');
// const registerStrategyShelter = require('../shelterRegister.strategy');
// const loginStrategyShelter = require('./login.strategy');
// const Shelter = require('../../models/Shelter.model');

// passport.serializeUser((user, done) => {

//     return done(null, user._id);
// });

// passport.deserializeUser(async(userId, done) => {
//     try {
//         const existingShelter = await Shelter.findById(userId);
//         return done(null, existingShelter);
//     } catch (error) {
//         return done(error, null);
//     }
// });


// const shelterUseStrategy = () => {
//     passport.use('register_shelter', registerStrategyShelter);
//     passport.use('login_shelter', loginStrategyShelter);
// };

// module.exports = { shelterUseStrategy };