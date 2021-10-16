const fs = require("fs/promises");
const contactsPath = require('./contactsPath')

const rewriteContacts  = async(contacts) => {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
    } catch (e) {
        console.log(e.message)
    }
};

module.exports = rewriteContacts
