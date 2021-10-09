const listContacts = require('./listContacts')
const rewriteContacts = require('./utils/rewriteContacts')

const removeContact = async (contactId) => {
    try {
        const arr = await listContacts()
        if (!arr) {
            return null
        }
        const newArr = arr.filter(item => item.id.toString() !== contactId)
        await rewriteContacts(newArr)
        return true
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = removeContact
