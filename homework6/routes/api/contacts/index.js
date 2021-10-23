const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../../controllers')
const { JoiSchema } = require('../../../models/contact')
const { controllerWrapper, validation, authenticate } = require('../../../middlewares')

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:id', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(JoiSchema), controllerWrapper(ctrl.addContact))

router.delete('/:id', authenticate, controllerWrapper(ctrl.removeContact))

router.put('/:id', authenticate, validation(JoiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:id/favorite', authenticate, controllerWrapper(ctrl.updateContact))

module.exports = router
