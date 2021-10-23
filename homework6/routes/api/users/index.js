const express = require('express')
const { controllerWrapper, authenticate, validation, upload } = require('../../../middlewares')
const { JoiSubscriptionSchema } = require('../../../models/user')
const { users: ctrl } = require('../../../controllers/')

const router = express.Router()

router.get('/current', authenticate, controllerWrapper(ctrl.getCurrent))

router.patch('/subscription', authenticate, validation(JoiSubscriptionSchema), controllerWrapper(ctrl.updateSubscription))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verifyToken))

router.post('/verify/', controllerWrapper(ctrl.verifyEmail))

module.exports = router
