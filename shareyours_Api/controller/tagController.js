const tagModel = require("../models/tagModel");

const controller = {};

controller.listTags = async (_req, res) => {
    try {
        const tags = await tagModel.find({});
        res.send(tags);
    } catch{
        res.sendStatus(400);
    }
}

module.exports = controller;