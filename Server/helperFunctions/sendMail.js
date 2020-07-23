const nodeMailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();

const auth = {
    auth: {
        api_key: `${process.env.APIKEY}`,
        domain: `${process.env.DOMAIN}`
    }
}
console.log(auth)

const transport = nodeMailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, message, cb ) => {
    const mailOption = {
        from: email,
        to: `${process.env.EMAIL}`,
        name: name,
        subject: subject,
        text: message
    }
    transport.sendMail(mailOption, (err, data) => {
        if(err) {
            cb(err, null)
        } else {
            cb(null, data)
        }
    })
}

module.exports.sendMail = sendMail;
