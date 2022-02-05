var express = require('express');
var router = express.Router();
const controllers = require("../controllers");
const homeController = controllers.homeController;
const authController = controllers.authController;
const menuController = controllers.menuController;
var middlewares = require("../config/middlewares")

router.get('/', middlewares.checkUser, homeController.home);
router.get('/login', authController.login)
router.get('/register', authController.register)
router.get('/menu', menuController.menu)
router.get('/recharge', homeController.recharge)
router.use('/users', require("./users"))
module.exports = router;
