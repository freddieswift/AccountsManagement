const User = require('../models/userModel')
const Company = require('../models/companyModel')
const CustomError = require('../error/customError')

exports.createCompany = async (req, res, next) => {
    if (req.user.companyID) return next(new CustomError('you cannot have more than one company', 400))
    try {
        const company = await Company.create({
            name: req.body.name
        })
        const user = req.user
        user.companyID = company._id
        await user.save()
        res.status(201).send({
            status: 'success',
            data: {
                company
            }
        })
    }
    catch (err) {
        next(err)
    }
}