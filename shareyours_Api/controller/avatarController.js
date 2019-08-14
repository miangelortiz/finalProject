const avatarModel = require("../models/avatarModel");

const controller = {};


controller.listAvatar = async (_req, res) => {
    try {
        const avatars = await avatarModel
            .find({})
        res.send(avatars);
    } catch{
        res.sendStatus(400);
    }
};

module.exports = controller;