const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String
  },
  { collection: "users" }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
