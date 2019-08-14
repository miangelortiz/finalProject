const userModel = require("../models/userModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const controller = {};

//GET TOKEN
//Endpoint "sign" returns a token if the user is valid
//(Synchronous) Returns the JsonWebToken as string
controller.auth = (req, res) => {
  userModel
    .find({
      email: req.body.email,
      password: md5(req.body.password)
    })
    .then(result => {
      if (result.length > 0) {
        var token = jwt.sign(
          {
            id: result[0]._id,
            email: result[0].email,
            name: result[0].name
          },
          "mysecret",
          { expiresIn: 3600 }
        );
        res.send(token);
      } else {
        res.status(400).send("Invalid credentials");
      }
    });
};

//LIST USERS
controller.listUsers = async (_req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch{
    res.sendStatus(400);
  }
}


//REGISTER NEW USER
controller.add = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        avatar: req.body.avatar
      });
      await newUser.save((err, obj) => {
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
      localStorage.removeItem(token);
    }
  } catch {
    res.sendStatus(400);
  }
};

module.exports = controller;
