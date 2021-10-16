const {Contact} = require("../../models");

const listContacts = async (req, res) => {
    const {_id} = req.user
    const {page = 1 , limit = 10 , favorite} = req.query
    const skip = (page - 1) * limit
    const obj = {owner : _id}
    if (favorite === 'true' || favorite === 'false') {
        obj.favorite = favorite
    }
    const contacts = await Contact.find(obj , '_id , name , email , favorite' , {skip, limit: +limit}).populate("owner", "email")
        res.json({
            status: 'success',
            data: contacts
        })
}

module.exports = listContacts
