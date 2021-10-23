const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY, EMAIL_SEND_FROM } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)
const sendGridMail = async (data) => {
  const email = { ...data, from: EMAIL_SEND_FROM }
  try {
    await sgMail.send(email)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = sendGridMail
