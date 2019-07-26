const userModel = require('../models/Usermodel')
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const controller = {};

//Endpoint "sign" nos devuelve un token si el usuario es válido
//(Synchronous) Returns the JsonWebToken as string
controller.auth = (req, res) => {
    const data = req.body;
    userModel.find({
        name: data.name,
        password: md5(data.password)
    })
        .then(result => {
            console.log(result)
            if (result.length > 0) {
                var token = jwt.sign(
                    {
                        id: result[0]._id,
                        name: result[0].name,
                    }, "mysecret", { expiresIn: 3600 }
                );
                res.send(token);
            } else {
                res.status(400).send('Invalid credentials')
            }
        })
}


// controller.list = (req, res) => {
//     userModel.find({}).then(result => {
//         console.log(result)
//         res.send(result)
//     })
// }
module.exports = controller;