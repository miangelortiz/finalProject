const bsIdeaModel = require("../models/bsIdeaModel");
const jwt = require("jsonwebtoken");

const controller = {};

//LIST IDEAS for the project of the week
controller.listBsIdeas = async (_req, res) => {
  try {
    const bsIdeas = await bsIdeaModel
      .find({})
      .populate("user", { name: 1 })
      .populate("brain", { title: 1 });
    res.send(bsIdeas);
  } catch {
    res.sendStatus(400);
  }
};

//ADD IDEA for the project of the week
controller.addBsIdea = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const decoded = jwt.verify(token, "mysecret");
      userId = decoded.id;
      const newBsIdea = new bsIdeaModel({
        content: req.body.content,
        user: userId,
        brain: req.body.brain
      });
      await newBsIdea.save(async (err, obj) => {
        if (err) {
          res.sendStatus(405);
        } else {
          const new_bsIdeas = await bsIdeaModel
            .findById({ _id: obj._id })
            .populate("user", { name: 1 })
            .populate("brain", { title: 1 });
          res.send(new_bsIdeas);
        }
      });
    }
  } catch {
    res.sendStatus(400);
  }
};

//UPDATE BRAINSTORMING VOTES
controller.updateBSvotes = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      await bsIdeaModel.findOneAndUpdate(
        { _id: req.params.id },
        { votes: req.body.votes }
      );
    }
    const updateVote = await bsIdeaModel
      .findById({ _id: req.params.id })
      .populate("user", { name: 1 })
      .populate("brainstorming", { title: 1 });
    res.send(updateVote);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = controller;
