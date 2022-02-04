var express = require('express');
var router = express.Router();
const controllers = require("../controllers")
const homeController = controllers.homeController
const authController = controllers.authController
/* GET home page. */
router.get('/', homeController.home);
router.use('/login',authController.login)
module.exports = router;
