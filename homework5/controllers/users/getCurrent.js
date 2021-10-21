const {User} = require('../../models')

const getCurrent = async (req ,res) => {
    const {_id : id} = req.user
    const user = await User.findById(id , '_id , email , subscription')
    res.json({
        status : 'success',
        code : 200,
        data : {
            user
        }
    })
}

module.exports = getCurrent
