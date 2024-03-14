const nodemailer = require('nodemailer')

const sendEmail = async (to, html, subject) => {

    let transporterOptions

    if (process.env.NODE_ENV === 'production') {
        transporterOptions = {
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        }
    }
    else {
        transporterOptions = {
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        }
    }

    const transporter = nodemailer.createTransport(transporterOptions)

    const options = {
        from: process.env.SENDGRID_FROM,
        to,
        subject,
        html
    }

    try {
        await transporter.sendMail(options)
    }
    catch (err) {
        console.log(err)
    }
}

exports.sendInviteEmail = async (to, inviteURL) => {
    const html = `<h1>You have been invited to use Accounts</h1><p>Please use the following link to set up your account.</p><a href='${inviteURL}'>Click Here!</a>`
    const subject = 'You have been invited to use Accounts!'
    await sendEmail(to, html, subject)
}

exports.sendWelcomeEmail = async (to) => {
    const html = `<h1>Test</h1>`
    const subject = 'Test'
    await sendEmail(to, html, subject)
}