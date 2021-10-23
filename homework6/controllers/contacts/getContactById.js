const { Contact } = require('../../models')
const { NotFound } = require('http-errors')
const getContactById = async (req, res) => {
  const { _id: owner } = req.user
  const { id } = req.params
  const contact = await Contact.findOne({ id, owner })
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: contact
  })
}

module.exports = getContactById
