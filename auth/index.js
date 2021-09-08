const passport = require('passport');
const registerStrategy = require('./register.strategy');
const loginStrategy = require('./login.strategy');
const User = require('../models/User.model');