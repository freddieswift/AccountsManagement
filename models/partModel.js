const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
    partNumber: {
        type: String,
        required: [true, 'Please provide a part number']
    },
    description: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 0
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
})

const Part = mongoose.model('Part', partSchema)

module.exports = Part