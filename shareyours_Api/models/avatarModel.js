const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avatarShema = new Schema(
  {
    name: { type: String, default: "avatar-01" }
  },
  { collection: "avatars" }
);

const avatarModel = mongoose.model("avatar", avatarShema);
module.exports = avatarModel;
