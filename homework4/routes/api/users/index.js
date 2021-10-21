const express = require('express')
const {controllerWrapper, authenticate, validation} = require("../../../middlewares");
const {JoiSubscriptionSchema} = require("../../../models/user");
const {users: ctrl} = require("../../../controllers/");

const router = express.Router()

router.get('/current' , authenticate  , controllerWrapper(ctrl.getCurrent))

router.patch('/subscription' , authenticate , validation(JoiSubscriptionSchema)  , controllerWrapper(ctrl.updateSubscription) )

module.exports = router
