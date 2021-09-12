const express = require('express');
const controller = require('../controllers/user.controller');
const formController = require('../controllers/form.controller');

const router = express.Router();

router.put('/edit/:id', controller.putById);

router.delete('/delete/:id', controller.deleteById);

router.post('/form/new', formController.formCreate);
router.get('/form/download/:id', formController.formDownload); // ID -> form
router.delete('/form/delete', formController.formDelete);
router.put('/form/edit/:id', formController.formEdit); // ID -> form
router.put('/form/:id', formController.formById); // ID -> user

router.get('/:id', controller.getById);

module.exports = router;
