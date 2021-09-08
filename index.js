const express = require('express');
const app = express();

const shelterRoutes = require('./routes/Shelter.routes');
const rootRoutes = require('./routes/Root.routes');

const { connect } = require('./utils/mongodb');
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRoutes);
app.use('/shelter', shelterRoutes);
app.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    return res.status(404).json(error.message);
});

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Unexpected Error");
});