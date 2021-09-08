const express = require('express');
const app = express();
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const shelterRoutes = require('./routes/Shelter.routes');
const petRoutes = require('./routes/Pet.routes');
const userRoutes = require('./routes/User.routes');
const requestRoutes = require('./routes/Request.routes');

const rootRoutes = require('./routes/Root.routes');

const { connect } = require('./utils/mongodb');
connect();


const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRoutes);
app.use('/shelter', shelterRoutes);
app.use('/pet', petRoutes);
app.use('/user', userRoutes);
app.use('/request', requestRoutes);

app.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json(error.message);
});

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Unexpected Error");
});

app.listen(PORT, () => console.log(`Servidor funcionando http://localhost:${PORT}`));