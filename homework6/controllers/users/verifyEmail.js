const {
  BadRequest,
  NotFound
} = require('http-errors')
const { User } = require('../../models')
const { sendMail } = require('../../utils')

const verifyEmail = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound('User with not Found')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const mail = {
    to: email,
    subject: 'Повторное подтверждение регистрации на сайте',
    html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${user.verifyToken}">Нажмите для подтверждения email</a>
        `
  }

  await sendMail(mail)

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = verifyEmail
