const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const projectController = require("../controller/projectController");
const tagController = require("../controller/tagController");
const ideaController = require("../controller/ideaController");
const avatarController = require("../controller/avatarController");

//USERS ROUTES
//User authentication
router.post("/auth", userController.auth);
//Add user
router.post("/user/add", userController.add);
//List user
router.get("/users/list", userController.listUsers);
//Edit user
router.put("/user/:id", userController.editUser);
//Delete user
router.delete("/user/:id", userController.delUser);

//PROJECTS ROUTES
//List projects
router.get("/projects", projectController.listProjects);
//List user projects
// router.get('/projects/user/:id', projectController.listUserProject)
//Add projects
router.post("/projects/add", projectController.addProject);
//Edit project
router.put("/projects/:id", projectController.editProject);
//Update project votes
router.put("/projects/votes/:id", projectController.updateProjectVotes);
//Delete project
router.delete("/projects/:id", projectController.delProject);

//TAGS ROUTE
router.get("/tags", tagController.listTags);

//IDEAS ROUTE
//List ideas
router.get("/ideas", ideaController.listIdeas);
//Add idea
router.post("/ideas/add/:id", ideaController.addIdea);
//Edit idea
router.put("/idea/edit/:id", ideaController.editIdea);

//AVATAR ROUTE
router.get("/avatars", avatarController.listAvatar);

module.exports = router;
