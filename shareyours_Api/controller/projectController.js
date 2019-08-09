const projectModel = require("../models/projectModel");
const jwt = require("jsonwebtoken");

const controller = {};

//LIST ALL PROJECTS (and user name -> populate)
controller.listProjects = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // const decoded = jwt.verify(token, "mysecret");
  // console.log(decoded)
  try {
    if (token) {
      const projects = await projectModel
        .find({})
        .populate("user", { name: 1 })
        .populate("tags", { name: 1 });
      res.send(projects);
    } else {
      res.sendStatus(401); //UNAUTHORIZED The request has not been applied because it lacks valid authentication credentials for the target resource.
    }
  } catch {
    res.sendStatus(400); //BAD REQUEST (The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).)
  }
};

//ADD PROJECT BY USER
controller.addProject = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const decoded = jwt.verify(token, "mysecret");
      userId = decoded.id;
      const newProject = new projectModel({
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
        votes: 0,
        created: new Date(),
        edited: new Date(),
        user: userId,
        tags: req.body.tags
      });
      await newProject.save((err, obj) => {
        if (err) {
          res.sendStatus(405);
        } else {
          res.send(obj);
        }
      });
    }
  } catch {
    res.sendStatus(400);
  }
};

//FOUND USER PROJECTS(by id)
// controller.listUserProject = async (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     if (token) {
//       const myProjects = await projectModel.find({ user: req.params.id });
//       if (myProjects.length <= 0) {
//         res.sendStatus(404); //Not found user projects
//       } else {
//         res.send(myProjects);
//       }
//     } else {
//       res.sendStatus(404);
//     }
//   } catch {
//     res.sendStatus(400); //Bad Request
//   }
// };

//EDIT PROJECT (if the project belongs to the user logged in)
controller.editProject = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      // const decoded = jwt.verify(token, "mysecret");
      // const userId = decoded.id
      await projectModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...(req.body.title !== null && { title: req.body.title }),
          ...(req.body.subtitle !== null && { subtitle: req.body.subtitle }),
          ...(req.body.content !== null && { content: req.body.content }),
          edited: new Date(),
          ...(req.body.tags !== null && {
            tags: req.body.tags
          })
        }
      );
    }
    const newProject = await projectModel.findById({ _id: req.params.id });
    res.send(newProject);
  } catch {
    res.sendStatus(400);
  }
};

//DELETE USER PROJECT
controller.delProject = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const projectId = req.params.id;
      await projectModel.findOneAndDelete({ _id: projectId }, (err, _obj) => {
        if (err) {
          res.sendStatus(404);
          console.log("no hay nada");
        } else {
          res.send(projectId);
        }
      });
    }
  } catch {
    res.sendStatus(400);
  }
};

module.exports = controller;
