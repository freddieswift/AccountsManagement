const mongoose = require('mongoose')
const CustomError = require('../error/customError')
const crypto = require('crypto')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide company name'],
        unique: true
    },
    // invitations: [{
    //     email: {
    //         type: String,
    //         required: [true, 'please provide email']
    //     },
    //     inviteToken: {
    //         type: String,
    //         required: true
    //     }
    // }]
    invitations: {
        type: [{
            email: {
                type: String,
                required: [true, 'please provide email']
            },
            inviteToken: {
                type: String,
                required: true
            }
        }],
        select: false,
        default: []
    }
})

companySchema.methods.generateInvite = async function (email) {
    const company = await Company.findOne({ _id: this._id }).select('+invitations')
    if (company.invitations.find(invite => invite.email === email)) {
        throw new CustomError('you have already invited this user', 400)
    }
    const inviteToken = crypto.randomBytes(32).toString('hex');
    company.invitations.push({
        email: email,
        inviteToken: inviteToken
    })
    await company.save()
    return inviteToken
}

const Company = mongoose.model('Company', companySchema)

module.exports = Company