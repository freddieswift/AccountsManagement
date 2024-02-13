const express = require('express')

const authController = require('../controllers/authController')
const companyController = require('../controllers/companyController')

const router = express.Router()

router.route('/').post(
    authController.isLoggedIn,
    authController.restrictTo('admin'),
    companyController.createCompany
)

module.exports = router