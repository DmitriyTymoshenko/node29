const {Contact} = require("../../models");

const {NotFound, BadRequest} = require('http-errors')
const updateStatusContact = async (req , res) => {
    const {_id : owner} = req.user
    const {id} = req.params
    if(!Object.keys(req.body).length) {
        throw new BadRequest('Missing field favorite')
    }
    const result = await Contact.findOneAndUpdate({ _id: id , owner }, req.body , {new : true})
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
        status : "success",
        code : 200,
        data : result
    })
}

module.exports = updateStatusContact
