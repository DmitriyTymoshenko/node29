const {InternalServerError, BadRequest} = require('http-errors')
const {Contact} = require("../../models");
const addContact = async (req , res) => {
    if(!Object.keys(req.body).length) {
        throw new BadRequest('No data in request')
    }
    const result = await Contact.create({...req.body , owner : req.user._id})
    if(!result) {
        throw new InternalServerError('Contact not added')
    }
    res.status(201).json({
        status : "success",
        code : 201,
        data : result
    })
}

module.exports = addContact
