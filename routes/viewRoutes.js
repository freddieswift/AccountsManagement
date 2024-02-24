const express = require('express')

const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login').get(viewController.login)
router.route('/signup').get(viewController.signup)
router.route('/')
    .get(
        authController.isLoggedIn,
        authController.hasCompany,
        viewController.getHomepage)
router.route('/createCompany')
    .get(
        authController.isLoggedIn,
        authController.restrictTo('admin'),
        viewController.createCompany,
    )

module.exports = router