const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide company name'],
        unique: true
    }
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company