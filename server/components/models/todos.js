//Todo Model: makes sure that input is valid
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: String
})

module.exports = mongoose.model('Todo', todoSchema);