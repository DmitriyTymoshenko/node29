const {Contact} = require("../../models");
const {NotFound} = require('http-errors')

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete({ _id: id })
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data : result,
        message : 'Success delete'
    });
};

module.exports = removeContact
