const fs = require("fs/promises");
const contactsPath = require('./utils/contactsPath')

const listContacts = async () => {
    try {
        return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = listContacts;
