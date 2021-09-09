const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { upload, uploadToCloudinary } = require('../middlewares/file.middlewares');

//User
router.post('/user/register', [upload.single('avatar'), uploadToCloudinary], controller.registerUserPost);
router.post('/user/login', controller.loginUserPost);

//Shelter
router.post('/shelter/register', [upload.single('avatar'), uploadToCloudinary], controller.registerShelterPost);
router.post('/shelter/login', controller.loginShelterPost);


router.post('/logout', controller.logoutPost);

module.exports = router;