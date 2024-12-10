const Part = require("../models/partModel")
const CustomError = require('../error/customError')

exports.createPart = async (req, res, next) => {
    try {
        const part = await Part.create({
            ...req.body,
            company: req.user.company
        })
        res.status(201).send({
            status: 'success',
            data: {
                part
            }
        })
    }
    catch (err) {
        next(err)
    }
}

exports.deletePart = async (req, res, next) => {
    try {
        const result = await Part.deleteOne({
            _id: req.params.id,
            company: req.user.company
        })
        if (result.deletedCount === 0) {
            return next(new CustomError('We cannot find what you are looking for', 404))
        }
        res.status(200).send({
            status: 'success',
            message: 'part deleted'
        })
    }
    catch (err) {
        next(err)
    }
}

exports.updatePart = async (req, res, next) => {
    try {
        const part = await Part.findOneAndUpdate(
            {
                _id: req.params.id,
                company: req.user.company
            },
            req.body,
            {
                new: true,
                runValidators: true
            })
        res.status(200).send({
            status: 'success',
            message: 'Part updated',
            data: {
                part
            }
        })
    }
    catch (err) {
        next(err)
    }
}
