const { User } = require('../../models')
const { Conflict } = require('http-errors')
const { sendMail } = require('../../utils')

const signup = async (req, res) => {
  const { email, password } = req.body
  const result = await User.findOne({ email })
  if (result) {
    throw new Conflict('Email is already exist')
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.createAvatar(email)
  newUser.setVerificationToken()
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${newUser.verifyToken}">Нажмите для подтверждения email</a>
        `
  }

  await sendMail(mail)
  const { subscription, _id, avatarUrl } = newUser
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email, subscription, _id, avatarUrl
      }
    }
  })
}

module.exports = signup
