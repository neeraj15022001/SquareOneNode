const express = require("express")
const router = express.Router();
const controllers = require("../controllers/index");
const homeController = controllers.homeController;
const cartController = controllers.cartController;
router.get("/", homeController.cart);
router.get("/add", cartController.add);
module.exports = router;