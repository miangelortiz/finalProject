const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const projectController = require("../controller/projectController");
const tagController = require("../controller/tagController");
const ideaController = require("../controller/ideaController");
const avatarController = require("../controller/avatarController");
const brainController = require("../controller/brainController");
const bsIdeasController = require("../controller/bsIdeasController");

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
router.delete("/admin/tags/:id", tagController.delTags); //Admin
router.post("/admin/tags", tagController.addTag); //Admin

//IDEAS ROUTE
//List ideas
router.get("/ideas", ideaController.listIdeas);
//Add idea
router.post("/ideas/add/:id", ideaController.addIdea);
//Edit idea
router.put("/idea/edit/:id", ideaController.editIdea);
//Delete Idea
router.delete("/ideas/delete/:id", ideaController.delIdea);

//AVATAR ROUTE
router.get("/avatars", avatarController.listAvatar);

//BRAINSTORMING ROUTES
router.get("/brainstorming", brainController.listBrainProjects);
router.post("/brainstorming/add", brainController.addBrainProject);
router.post("/brainstorming/add/idea", bsIdeasController.addBsIdea);
router.get("/brainstorming/ideas", bsIdeasController.listBsIdeas);
router.put("/brainstorming/votes/:id", bsIdeasController.updateBSvotes)

module.exports = router;
