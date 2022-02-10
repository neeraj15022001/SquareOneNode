const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const itemsController = controllers.itemsController;
router.post("/create", itemsController.create);
module.exports = router;