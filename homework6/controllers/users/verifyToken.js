const { User } = require('../../models')
const { NotFound } = require('http-errors')
const verifyToken = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('User with not Found')
  }
  await User.findByIdAndUpdate(user._id, {
    verifyToken: null,
    verify: true
  }, {
    new: true,
    fields: 'email subscription verify'
  })
  res.json({
    status: 'success',
    code: 200,
    message: 'Email success verify',
  })
}
module.exports = verifyToken
