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
        ref: 'users'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    },
},{ collection: 'ideas' });

const ideaSchema = mongoose.model('ideaModel', ideaSchema);
module.exports =ideaModel;