const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)