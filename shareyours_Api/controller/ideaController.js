const ideaModel = require("../models/ideaModel");
const jwt = require("jsonwebtoken");

const controller = {};

//LIST IDEAS
controller.listIdeas = async (_req, res) => {
  try {
    const ideas = await ideaModel
      .find({})
      .populate("user", { name: 1 })
      .populate("project", { title: 1 });
    res.send(ideas);
  } catch {
    res.sendStatus(400);
  }
};

//ADD IDEA
controller.addIdea = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const decoded = jwt.verify(token, "mysecret");
      userId = decoded.id;
      projectId = req.params.id;
      const newIdea = new ideaModel({
        content: req.body.content,
        created: new Date(),
        user: userId,
        project: projectId
      });
      await newIdea.save(async (err, obj) => {
        if (err) {
          res.sendStatus(405);
        } else {
          const new_ideas = await ideaModel
            .findById({ _id: obj._id })
            .populate("user", { name: 1 })
            .populate("project", { title: 1 });
          res.send(new_ideas);
        }
      });
    }
  } catch {
    res.sendStatus(400);
  }
};

//EDIT IDEA (by user log)
controller.editIdea = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      await ideaModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...(req.body.content !== null && { content: req.body.content }),
          created: new Date()
        }
      );
    }
    const updateIdea = await ideaModel
      .findById({ _id: req.params.id })
      .populate("user", { name: 1 })
      .populate("project", { title: 1 });
    res.send(updateIdea);
  } catch {
    res.sendStatus(400);
  }
};

//DELETE IDEA
controller.delIdea = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      await ideaModel.findOneAndDelete({ _id: req.params.id }, (err, obj) => {
        if (err) {
          res.sendStatus(404);
        }
      });
      res.sendStatus(200);
    }
  } catch {
    res.sendStatus(400);
  }
};

module.exports = controller;
