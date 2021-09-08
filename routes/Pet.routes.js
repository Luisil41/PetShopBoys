const express = require('express');
const controller = require('../controllers/pet.controller');

const router = express.Router();

router.get('/all', controller.petsGet);
router.put('/edit/:id', controller.petEditPut);

router.post('/new', controller.petCreatePost);

router.get('/filter', controller.petFilter);

router.delete("/delete/:id", controller.petDelete);

router.get("/:id", controller.petDetailGet);

module.exports = router;