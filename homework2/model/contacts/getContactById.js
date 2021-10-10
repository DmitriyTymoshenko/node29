const listContacts = require('./listContacts')
const findContactIdx = require('./utils/findContactIdx')

const getContactById = async (contactId) => {
    const arr = await listContacts()
    if (!arr) {
        return null
    }
    const idx = findContactIdx(contactId , arr)
    if (idx === -1) {
        return null
    }
    return arr[idx]


}

module.exports = getContactById
