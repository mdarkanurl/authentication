const { mailtrapClient, sender } = require("./config")
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, WELCOME_EMAIL_TEMPLATE } = require("./emailTemplates")

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        // console.log(mailtrapClient)
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: 'Email Verification'
        });

        console.log('Email sent successfully', response)
    } catch (error) {
        console.log(error);
    }
}

const sendWelcomeWmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Welcome email',
            html: WELCOME_EMAIL_TEMPLATE.replace('{userName}', name),
            category: 'Welcome email'
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        console.log(error);
    }
}

const sendPaaswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your pass',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
            category: 'Password reset'
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        console.log(error)
    }
}

const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your pass successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password reset'
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendVerificationEmail, sendWelcomeWmail, sendPaaswordResetEmail, sendResetSuccessEmail }