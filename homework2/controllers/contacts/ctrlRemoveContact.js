const {removeContact} = require('../../model/contacts')
const {NotFound} = require('http-errors')

const ctrlRemoveContact = async (req, res) => {
    const { id } = req.params;
    const result = await removeContact(id)
    if (!result) {
        throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data : result,
        message : 'Success delete'
    });
};

module.exports = ctrlRemoveContact
