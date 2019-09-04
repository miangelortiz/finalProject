const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brainstormingShema = new Schema(
  {
    title: String,
    created: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "brainstorming" }
);

const brainstormingModel = mongoose.model("brain", brainstormingShema);
module.exports = brainstormingModel;
