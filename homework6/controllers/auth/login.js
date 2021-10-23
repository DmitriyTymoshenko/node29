const { User } = require('../../models')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Wrong email or password')
  }
  if (!user.verify) {
    throw new Unauthorized('Email not verified')
  }
  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  const { subscription } = user
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription
      }
    }
  })
}

module.exports = login
