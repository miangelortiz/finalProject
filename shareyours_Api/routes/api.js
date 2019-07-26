const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//User authentication
router.post('/auth', userController.auth)


module.exports = router;
