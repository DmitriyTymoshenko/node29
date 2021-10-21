const {Unauthorized} = require('http-errors')
const jwt = require('jsonwebtoken')
const {User} = require('../models')
const {SECRET_KEY = 'SECRET'} = process.env

const authenticate = async (req, _, next) => {
    try {
        const {authorization} = req.headers
        if (!authorization) {
            next(new Unauthorized("Not authorized"))
            return
        }
        const [bearer, token] = authorization.split(' ')
        if (bearer !== "Bearer") {
            next(new Unauthorized("Invalid token"))
            return
        }
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            next(new Unauthorized("Not authorized"))
            return
        }
            req.user = user;
            next();
    } catch (error) {
        console.log('error')
        error.status = 401;
        next(error);
    }
}

module.exports = authenticate
