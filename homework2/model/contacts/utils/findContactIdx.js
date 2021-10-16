const findContactIdx = (contactId , contacts) => {
    return contacts.findIndex(item => item.id.toString() === contactId.toString());
}

module.exports = findContactIdx
