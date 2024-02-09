const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must provide password'],
        select: false
    },
    age: {
        type: Number,
        default: 18
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User