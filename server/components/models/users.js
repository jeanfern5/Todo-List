//User Model: makes sure that input is valid
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    awsId: {
        type: String,
        required: true
    },
    createdTodos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
});

module.exports = mongoose.model('User', userSchema);