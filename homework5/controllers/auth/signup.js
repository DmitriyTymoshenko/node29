const {User} = require("../../models");
const {Conflict} = require('http-errors')

const signup = async (req, res) => {
    const {email , password } = req.body
    const result = await User.findOne({email})
    if (result) {
        throw new Conflict('Email is already exist')
    }
    const newUser = new User({email})
    newUser.setPassword(password)
    newUser.createAvatar(email)
    await newUser.save()
    const { subscription , _id , avatarUrl} = newUser
    res.status(201).json({
        status: "success",
        code: 201,
        response : {
            user : {
                email, subscription, _id , avatarUrl
            }
        }
    });
}

module.exports = signup
