const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const projectController = require('../controller/projectController')
const tagController = require('../controller/tagController');

//USERS ROUTES
//User authentication
router.post('/auth', userController.auth);
//Add user
router.post('/user/add', userController.add);



//PROJECTS ROUTES
//List projects
router.get('/projects', projectController.listProjects);
//List user projects
// router.get('/projects/user/:id', projectController.listUserProject)
//Add projects
router.post('/projects/add', projectController.addProject);
//Edit project
router.put('/projects/:id', projectController.editProject);
//Delete project
router.delete('/projects/:id', projectController.delProject);

//TAGS ROUTE
router.get('/tags', tagController.listTags)

module.exports = router;
