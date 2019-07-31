const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const projectController = require('../controller/projectController')

//USERS ROUTES
//User authentication
router.post('/auth', userController.auth);
router.post('/user/add', userController.add)



//PROJECTS ROUTES
//List projects
router.get('/projects/list', projectController.list)


module.exports = router;
