const express = require('express')
const router = express.Router()
const {contacts : {ctrlListContacts , ctrlGetContactsById , ctrlAddContact , ctrlRemoveContact , ctrlUpdateContact}} = require('../../../controllers')
const {JoiSchema} = require('../../../schemas')
const {controllerWrapper , validation} = require('../../../middlewares')

router.get('/', controllerWrapper(ctrlListContacts))

router.get('/:id' , controllerWrapper(ctrlGetContactsById))

router.post('/', validation(JoiSchema) , controllerWrapper(ctrlAddContact))

router.delete('/:id', controllerWrapper(ctrlRemoveContact))

router.put('/:id' , validation(JoiSchema) , controllerWrapper(ctrlUpdateContact))

module.exports = router
