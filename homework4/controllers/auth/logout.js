const {User} = require('../../models')

const logout = async (req, res) => {
    console.log('logout')
    const {_id: id} = req.user
    await User.findByIdAndUpdate(id, {token: null})
    res.status(204).json()
}

module.exports = logout
