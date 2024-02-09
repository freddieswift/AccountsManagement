const express = require('express')

const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login').post(authController.login)
router.route('/logout').post(authController.logout)
router.route('/').post(authController.createUser)

module.exports = router