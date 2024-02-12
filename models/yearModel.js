const mongoose = require('mongoose')

const yearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'PLease provide a name'],
        unique: true
    }
})

const Year = mongoose.model('Year', yearSchema)

module.exports = Year