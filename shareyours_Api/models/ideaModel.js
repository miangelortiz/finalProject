const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
    content: {type:String, required: true},
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
},{ collection: 'ideas' });

const ideaModel = mongoose.model('idea', ideaSchema);
module.exports =ideaModel;