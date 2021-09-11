const express = require('express');
const controller = require('../controllers/request.controller');

const router = express.Router();

router.post('/new', controller.postRequest);
router.delete('/delete/:id', controller.deleteRequest);

router.get('/find/user/:id', controller.requestByUserId);
router.get('/find/shelter/:id', controller.requestByShelterId);
router.get('/find/pet/:id', controller.requestByPetId);

router.get('/:id', controller.getId);

module.exports = router;