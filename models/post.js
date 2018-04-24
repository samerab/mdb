const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    body: {type: String, required: true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

var post = mongoose.model('post',postSchema);
module.exports = post;