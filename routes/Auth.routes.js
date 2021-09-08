const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { upload, uploadToCloudinary } = require('../middlewares/file.middlewares');

router.post('/user/register', [upload.single('avatar'), uploadToCloudinary], controller.registerUserPost);
router.post('/user/login', controller.loginUserPost);
router.post('/logout', controller.logoutPost);

module.exports = router;