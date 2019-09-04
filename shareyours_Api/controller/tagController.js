const tagModel = require("../models/tagModel");
const jwt = require("jsonwebtoken");

const controller = {};

//TAGS LIST
controller.listTags = async (_req, res) => {
  try {
    const tags = await tagModel.find({});
    res.send(tags);
  } catch {
    res.sendStatus(400);
  }
};

//DELETE TAGS by Admin
controller.delTags = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "mysecret");
    if (decoded.isAdmin) {
      await tagModel.findOneAndDelete({ _id: req.params.id }, (err, _obj) => {
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

//ADD TAG by Admin
controller.addTag = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "mysecret");
    if (decoded.isAdmin) {
      const newTag = new tagModel({
        name: req.body.name
      });
      await newTag.save((err, obj) => {
        if (err) {
          if (err.code === 11000) {
            res.sendStatus(409);
          } else {
            res.send(405);
          }
        } else {
          res.send(obj);
        }
      });
    } else {
      res.status(401).send("You don't have permission. Not Admin");
    }
  } catch {
    res.status(401).send("You don't have permission");
  }
};
module.exports = controller;
