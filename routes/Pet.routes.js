const express = require('express');
const controller = require('../controllers/pet.controller');
const { upload, uploadToCloudinary } = require('../middlewares/file.middlewares');

const router = express.Router();

router.get('/all', controller.petsGet);
router.put('/edit/:id', controller.petEditPut);

router.post('/new', [upload.single('avatar'), uploadToCloudinary], controller.petCreatePost);

router.get('/filter', controller.filteredPet);

router.delete("/delete/:id", controller.petDelete);

router.get("/:id", controller.petDetailGet);

module.exports = router;