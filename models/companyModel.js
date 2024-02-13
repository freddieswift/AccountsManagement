const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide company name'],
        unique: true
    },
    invitations: [{
        email: {
            type: String,
            required: true
        },
        inviteToken: {
            type: String,
            required: true
        }
    }]
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company