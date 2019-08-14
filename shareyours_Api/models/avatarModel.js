const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avatarShema = new Schema({
    name: String
}, { collection: "avatars" })

const avatarModel = mongoose.model("avatar", avatarShema);
module.exports = avatarModel