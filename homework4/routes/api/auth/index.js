const express = require('express')
const {controllerWrapper, validation, authenticate} = require("../../../middlewares");
const {auth: ctrl} = require("../../../controllers/");
const {JoiSchema} = require('../../../models/user')

const router = express.Router()

router.post('/signup', validation(JoiSchema), controllerWrapper(ctrl.signup))
router.post('/login', validation(JoiSchema), controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

module.exports = router
