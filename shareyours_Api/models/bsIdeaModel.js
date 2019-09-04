const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bsIdeaSchema = new Schema(
  {
    content: { type: String, required: true },
    created: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    brain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brain"
    },
    votes: new Array
  },
  { collection: "bsIdeas" }
);

const bsIdeaModel = mongoose.model("bsIdea", bsIdeaSchema);
module.exports = bsIdeaModel;
