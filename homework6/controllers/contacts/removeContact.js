const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const removeContact = async (req, res) => {
  const { id } = req.params
  const { _id: owner } = req.user
  const result = await Contact.findOneAndDelete({ _id: id, owner })
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: result,
    message: 'Success delete'
  })
}

module.exports = removeContact
