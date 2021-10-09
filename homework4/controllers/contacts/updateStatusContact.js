const {Contact} = require("../../models");

const {NotFound, BadRequest} = require('http-errors')
const updateStatusContact = async (req , res) => {
    const {id} = req.params
    if(!Object.keys(req.body).length) {
        res.status(400).json({
            status : "BadRequest",
            code: 400,
            message : "Missing field favorite"
        })
        throw new BadRequest('Missing field favorite')
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body , {new : true})
    if (!result) {
        res.status(404).json({
            status : "NotFound",
            code : 404,
            message : `Contact with id=${id} not found`
        })
        throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
        status : "success",
        code : 200,
        data : result
    })
}

module.exports = updateStatusContact
