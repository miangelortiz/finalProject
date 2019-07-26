const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: String,
    nickname: String,
    avatar: String
}, { collection: 'users' });

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;