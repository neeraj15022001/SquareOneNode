var express = require('express');
var router = express.Router();
const controllers = require("../controllers/")
const usersController = controllers.userController;

router.post('/create-session', usersController.createSession);
router.post('/create-user', usersController.createUser);

module.exports = router;
