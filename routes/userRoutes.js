const express = require('express')

const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router()

router.route('/login').post(authController.login)
router.route('/logout').post(authController.logout)
router.route('/').post(userController.createNewUser)
router.route('/invite').post(
    authController.isLoggedIn,
    authController.restrictTo('admin'),
    authController.hasCompany,
    userController.inviteTeamMember
)
router.route('/register/:inviteToken').post(userController.register)
//router.route('/register/:companyID/:inviteToken').post(userController.register)

module.exports = router