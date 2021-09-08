const express = require('express');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();


const dotenv = require('dotenv');
dotenv.config();

const auth = require('./auth');
auth.useStrategy();

const shelterRoutes = require('./routes/Shelter.routes');
const petRoutes = require('./routes/Pet.routes');
const userRoutes = require('./routes/User.routes');
const requestRoutes = require('./routes/Request.routes');
const authRoutes = require('./routes/Auth.routes');

const rootRoutes = require('./routes/Root.routes');

const { connect, mongodb } = require('./utils/mongodb');
connect();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: mongodb }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', rootRoutes);
app.use('/shelter', shelterRoutes);
app.use('/pet', petRoutes);
app.use('/user', userRoutes);
app.use('/request', requestRoutes);
app.use('/auth', authRoutes);

app.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json(error.message);
});

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Unexpected Error");
});

app.listen(PORT, () => console.log(`Servidor funcionando http://localhost:${PORT}`));