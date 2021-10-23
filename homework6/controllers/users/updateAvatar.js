const { User } = require('../../models')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')
const updateAvatar = async (req, res, next) => {
  const { path: tempDir, originalname } = req.file
  const { _id: id } = req.user
  const [extension] = originalname.split('.').reverse()
  const filename = `${id}.${extension}`
  const uploadDir = path.join(__dirname, '../../public/avatars/', filename)
  try {
    const changeImage = await Jimp.read(tempDir)
    changeImage.resize(250, Jimp.AUTO).write(uploadDir)
    const image = path.join('avatars', filename)
    const result = await User.findByIdAndUpdate(id, { avatarUrl: image }, {
      new: true,
      fields: 'email , subscription , avatarUrl'
    })
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: result
      }
    })
    // await fs.unlink(tempDir)
  } catch (error) {
    await fs.unlink(tempDir)
    next(error)
  }
}

module.exports = updateAvatar
