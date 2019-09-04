const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: { type: String, unique: true }
}, { collection: "tags" });

const tagModel = mongoose.model("tag", tagSchema);
module.exports = tagModel;