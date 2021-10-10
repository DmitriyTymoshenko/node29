const {addContact} = require('../../model/contacts')
const {InternalServerError} = require('http-errors')
const ctrlAddContact = async (req , res) => {
    const result = await addContact(req.body)
    if(!result) {
        throw new InternalServerError('Product not added')
    }
    res.status(201).json({
        status : "success",
        code : 201,
        data : result
    })
}

module.exports = ctrlAddContact
