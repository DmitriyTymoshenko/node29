const {updateContact} = require("../../model/contacts");
const {NotFound} = require('http-errors')
const ctrlUpdateContact = async (req , res) => {
    const {id} = req.params
    const result = await updateContact(id , req.body)
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
        status : "success",
        code : 200,
        data : result
    })
}

module.exports = ctrlUpdateContact
