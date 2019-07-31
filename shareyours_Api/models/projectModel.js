const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now
    },
    votes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tag: String
},{ collection: 'projects' });

const projectModel = mongoose.model('project', projectSchema);
module.exports = projectModel;