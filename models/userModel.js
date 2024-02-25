const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const CustomError = require('../error/customError')

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
        required: [true, 'Must provide email'],
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    company: {
        defualt: null,
        type: mongoose.Schema.ObjectId,
        ref: 'Company'
    }
})

//hash password
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.checkPassword = async function (passwordToCompare) {
    console.log(passwordToCompare)
    console.log(this)
    if (!await bcrypt.compare(passwordToCompare, this.password)) {
        throw new CustomError('invalid credentials', 400)
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User