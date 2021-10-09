const rewriteContacts = require("./utils/rewriteContacts");
const listContacts = require("./listContacts");
const findContactIdx = require("./utils/findContactIdx");

const updateContact = async (contactId , data) => {
    const contacts = await listContacts()
    const idx = findContactIdx(contactId , contacts);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {...contacts[idx], ...data};
    await rewriteContacts(contacts)
    return contacts[idx]
}

module.exports = updateContact
