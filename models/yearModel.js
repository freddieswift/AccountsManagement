const mongoose = require('mongoose')

const yearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    turnover: {
        type: Number,
        default: 0,
    },
    predictedDozens: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: false
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    totalCOS: {
        type: Number,
        default: 0
    },
    totalOH: {
        type: Number,
        default: 0
    },
    totalOI: {
        type: Number,
        default: 0
    },
})

const Year = mongoose.model('Year', yearSchema)

module.exports = Year