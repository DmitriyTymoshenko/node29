const express = require('express')
const {controllerWrapper , validation} = require("../../../middlewares");
const {auth: ctrl} = require("../../../controllers/");
const {JoiSchema} = require('../../../models/user')

const router = express.Router()

router.post('/signup', validation(JoiSchema),  controllerWrapper(ctrl.signup))

module.exports = router
