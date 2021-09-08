const express = require('express');
const controller = require('../controllers/shelter.controller');

const router = express.Router();

router.put('/edit/:id', controller.shelterEditPut);
router.get('/edit/:id', controller.shelterEditGet);

router.delete("/delete/:id", controller.shelterDeleteById);

router.get("/:id", controller.shelterById);

module.exports = router;