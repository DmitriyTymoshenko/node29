const express = require('express')
const router = express.Router()
const {contacts : ctrl} = require('../../../controllers')
const {contacts : {JoiSchema}} = require('../../../models')
const {controllerWrapper , validation} = require('../../../middlewares')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:id' , controllerWrapper(ctrl.getContactById))

router.post('/' , validation(JoiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:id', controllerWrapper(ctrl.removeContact))

router.put('/:id' , validation(JoiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:id/favorite' , controllerWrapper(ctrl.updateContact))


module.exports = router
