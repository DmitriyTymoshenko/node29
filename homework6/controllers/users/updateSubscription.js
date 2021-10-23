const { User } = require('../../models')
const updateSubscription = async (req, res) => {
  const { subscription } = req.body
  const { _id: id } = req.user
  const user = await User.findByIdAndUpdate(id, { subscription }, { new: true, fields: 'email , subscription' },)
  res.json({
    status: 'success',
    code: 200,
    data: {
      user
    }
  })
}

module.exports = updateSubscription
