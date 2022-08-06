const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            type: 'OAuth2',
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });
    // transporter.verify((err, success)=>{
    //     err ? console.log(err) : console.log(`Server is ready to take messages: ${success}`)
    // })
    const mailOPtions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendEmail(mailOPtions)
};

module.exports = sendEmail;