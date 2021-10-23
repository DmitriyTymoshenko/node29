const controllerWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next)
    } catch (e) {
      switch (e) {
        case e.name === 'CastError' :
          e.status = 404
          break
        default :
          next(e)
          break
      }
    }
  }
}

module.exports = controllerWrapper
