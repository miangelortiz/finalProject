const userModel = require('../models/userModel')
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const controller = {};

//GET TOKEN
//Endpoint "sign" returns a token if the user is valid
//(Synchronous) Returns the JsonWebToken as string
controller.auth = (req, res) => {
    userModel.find({
        name: req.body.name,
        password: md5(req.body.password)
    })
        .then(result => {
            if (result.length > 0) {
                var token = jwt.sign(
                    {
                        id: result[0]._id,
                        name: result[0].name,
                    }, "mysecret", { expiresIn: 3600 }
                );
                localStorage.setItem("token", token)
                res.send(token);
            } else {
                res.status(400).send('Invalid credentials')
            }
        })
}

//REGISTER NEW USER

controller.add = (req, res) => {


    try {
        if (!req.headers.authorization) {
            const newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password),
                nick_name: req.body.nick_name,
                avatar: req.body.avatar
            });
            newUser.save((err, obj) => {
                if (err) {
                    res.sendStatus(err);
                } else {
                    res.send(obj);
                }
            })
        } else {
            localStorage.removeItem(token);
        }
    } catch{
        res.sendStatus(400);
    }

}


module.exports = controller;