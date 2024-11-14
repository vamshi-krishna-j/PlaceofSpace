const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    console.log("email sender")
    console.log(email + title + body)
    console.log(process.env.MAIL_PASS + process.env.MAIL_USER)
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: 'www.sandeepdev.me - Sandeep Singh',
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = mailSender;