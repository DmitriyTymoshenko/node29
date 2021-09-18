const fs = require('fs/promises')
const path = require('path')
const {v4} = require("uuid");
const contactsPath = (path.join(__dirname , '/db/contacts.json'))

const updateContacts  = async(contacts) => {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
    } catch (e) {
        console.log(e.message)
    }
};
async function listContacts() {
    try {
        return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
    } catch (e) {
        console.log(e.message)
    }
}

async function getContactById(contactId) {
    try {
        const arr = await listContacts()
        if (!arr) {
            return null
        }
        return arr.find(item => item.id.toString() === contactId)
    } catch (e) {
        console.log(e.message)
    }

}

async function removeContact(contactId) {
    try {
        const arr = await listContacts()
        if (!arr) {
            return null
        }
        const newArr = arr.filter(item => item.id.toString() !== contactId)
        await updateContacts(newArr)
        return true
    } catch (e) {
        console.log(e.message)
    }
}

async function addContact(name = 'Alex', email = 'alex@gmail.com', phone = '+380111111111') {
    try {
        const obj = {name , email , phone , id : v4()}
        const arr = await listContacts()
        if (!arr) {
            return null
        }
            const newArr = [...arr, obj]
            await updateContacts(newArr)
            return newArr
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = {listContacts , getContactById , removeContact , addContact}
