const {v4} = require("uuid");
const listContacts = require('./listContacts')
const rewriteContacts = require('./utils/rewriteContacts')

const addContact = async (data) => {
    const newContact = {...data, id: v4()}
    const arr = await listContacts()
    if (!arr) {
        return null
    }
    const newArr = [...arr, newContact]
    await rewriteContacts(newArr)
    return newContact
}

module.exports = addContact
