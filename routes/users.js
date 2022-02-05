var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users_controller")
/* GET users listing. */
router.get('/create-session', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/create-user', usersController.createUser)
module.exports = router;
