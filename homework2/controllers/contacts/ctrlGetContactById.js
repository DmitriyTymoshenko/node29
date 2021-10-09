const {getContactById} = require('../../model/contacts')
const {NotFound} = require('http-errors')
const ctrlGetContactById = async (req, res) => {
    const {id} = req.params
    const contact = await getContactById(id)
    console.log(contact)
    if (!contact) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
        status: 'success',
        code: 200,
        data: contact
    })
}

module.exports = ctrlGetContactById
