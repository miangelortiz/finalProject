const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: String
}, { collection: "tags" });

const tagModel = mongoose.model("tag", tagSchema);
module.exports = tagModel;