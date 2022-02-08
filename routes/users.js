var express = require('express');
var router = express.Router();
const controllers = require("../controllers/")
const usersController = controllers.userController;
const passport = require("passport");
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: "/login"
}), usersController.createSession);
router.post('/create-user', usersController.createUser);

module.exports = router;
