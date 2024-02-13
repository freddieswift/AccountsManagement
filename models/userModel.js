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
    email: {
        type: String,
        required: [true, 'Must provide password'],
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    companyID: {
        defualt: null,
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User