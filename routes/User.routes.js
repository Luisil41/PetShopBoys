const express = require('express');
const controller = require('../controllers/user.controller');


const router = express.Router();



router.get('/edit', controller.editById);

router.put('/edit', controller.putById);

router.get('/:id', controller.getById);
