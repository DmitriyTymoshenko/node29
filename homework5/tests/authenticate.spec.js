const authenticate = require('../middlewares/authenticate')
const {Unauthorized} = require('http-errors')
const {User} = require('../models')
const jwt = require("jsonwebtoken");


const next = jest.fn()
const _ = {}
let req = {
    headers : {
        authorization : ''
    }
}


describe('Middleware authenticate' , () => {
    beforeEach(() => {
        req.user = undefined
    })

    it('Work correctly' , async () => {
        req = {
            headers : {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmE4YWJmZjRkMWFlYjVlYTQ0ZjA2MSIsImlhdCI6MTYzNDM3NDc5Nn0.nyyKogdo915DAwKdAxwNQFhtTcrbR8UDq7OLlOQWkIc',            }
        }
        const user = {
            "email": "test1234@gmail.com",
            "subscription": "starter",
        }
        jwt.verify = jest.fn().mockReturnValue('616a8abff4d1aeb5ea44f061')
        User.findById = jest.fn().mockReturnValue({
            "email": "test1234@gmail.com",
            "subscription": "starter",
        })
        await authenticate(req , _ , next)
        expect(req.user).toEqual(user)
    })

    it('No token' , async () => {
        req.headers.authorization = ''
        await authenticate(req , _ , next)
        expect(next).toBeCalledWith(new Unauthorized("Not authorized"))
    })
    it('No valid token' , async () => {
        req.headers.authorization = '1111111'
        await authenticate(req , _ , next)
        expect(next).toBeCalledWith(new Unauthorized("Invalid token"))
    })
    it('No user' , async () => {
        req.headers.authorization = 'Bearer 1111111'
        await authenticate(req , _ , next)
        expect(next).toBeCalledWith(new Unauthorized("Not authorized"))
    })
})
