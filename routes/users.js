var express = require('express');
var router = express.Router();
const controllers = require("../controllers/index.js")
const usersController = controllers.userController;
const homeController = controllers.homeController;
const passport = require("passport");
router.get("/profile", homeController.profile);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: "/login",
    failureMessage: true
}), usersController.createSession);
router.post('/create-user', usersController.createUser);

module.exports = router;
