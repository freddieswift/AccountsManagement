const express = require('express')

const authController = require('../controllers/authController')
const partController = require('../controllers/partController')

const router = express.Router()

router.route('/')
    .post(
        authController.isLoggedIn,
        authController.hasCompany,
        partController.createPart
    )
router.route('/:id')
    .delete(
        authController.isLoggedIn,
        authController.hasCompany,
        partController.deletePart
    )
router.route('/:id')
    .put(
        authController.isLoggedIn,
        authController.hasCompany,
        partController.updatePart
    )

module.exports = router