const {InternalServerError, BadRequest} = require('http-errors')
const {Contact} = require("../../models/contact");
const addContact = async (req , res) => {
    console.log(req.body)
    if(!Object.keys(req.body).length) {
        throw new BadRequest('No data in request')
    }
    const result = await Contact.create(req.body)
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
