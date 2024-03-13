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
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "536692e49983d4",
                pass: "feae40365de7f4"
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
    const html = `<h1>You have been invited to use Accounts</h1><p>Please use the following link to set up your account.</p><p>${inviteURL}</p>`
    const subject = 'You have been invited to use Accounts!'
    await sendEmail(to, html, subject)
}