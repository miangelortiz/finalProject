const brainstormingModel = require("../models/brainstormingModel");

const controller = {};

//LIST PROJECTS OF THE WEEK (Brainstorming)
controller.listBrainProjects=async(_req, res)=>{
    try{
        const brainProjects=await brainstormingModel.find({})
        res.send(brainProjects);

    }catch{
        res.sendStatus(400);  
    }
}

//ADD PROJECT OF THE WEEK (Admin)
controller.addBrainProject = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const newBrainProject = new brainstormingModel({
        title: req.body.title
      });
      await newBrainProject.save(async (err, obj) => {
        if (err) {
          res.sendStatus(405);
        }
        res.send(newBrainProject);
      });
    }
  } catch {
    res.sendStatus(400);
  }
};

module.exports = controller;
