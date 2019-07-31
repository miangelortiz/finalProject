const projectModel = require('../models/projectModel');
const jwt = require('jsonwebtoken');

const controller = {};

controller.list = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, "mysecret");
    // console.log(decoded)
    try {
        if (token) {
            const projects = await projectModel.find({}).populate('user', { name: 1 })
            res.send(projects)
        } else {
            res.sendStatus(401); //UNAUTHORIZED The request has not been applied because it lacks valid authentication credentials for the target resource.
        }

    } catch{
        res.sendStatus(400); //BAD REQUEST (The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).)
    }

}

module.exports = controller;