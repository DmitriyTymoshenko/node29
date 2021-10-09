const {listContacts} = require('../../model/contacts')

const ctrlListContacts = async (req, res) => {
    const contacts = await listContacts();
    res.json({
        status: 'success',
        data: contacts
    })
}

module.exports = ctrlListContacts
