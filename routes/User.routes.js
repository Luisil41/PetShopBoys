const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/edit/:id', controller.editById);
router.put('/edit/:id', controller.putById);

router.delete('/delete/:id', controller.deleteById);

router.get('/:id', controller.getById);

module.exports = router;
