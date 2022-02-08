var express = require('express');
var router = express.Router();
const controllers = require("../controllers");
const homeController = controllers.homeController;
const authController = controllers.authController;
const menuController = controllers.menuController;
const userController = controllers.userController;
router.get('/', homeController.home);
router.get('/login', authController.login)
router.get('/register', authController.register)
router.get('/menu', menuController.menu)
router.get('/recharge', homeController.recharge)
router.get("/cart", homeController.cart);
router.use('/users', require("./users"))
router.get("/signOut", userController.destroySession);
module.exports = router;
