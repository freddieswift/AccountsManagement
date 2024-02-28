const express = require('express')

const authController = require('../controllers/authController')
const yearController = require('../controllers/yearController')

const router = express.Router()

router.route('/')
    .post(
        authController.isLoggedIn,
        authController.hasCompany,
        yearController.createYear
    )
    .get(
        authController.isLoggedIn,
        authController.hasCompany,
        yearController.getAllYears
    )

module.exports = router