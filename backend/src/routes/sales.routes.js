const router = require("express").Router();
const auth = require("../middlewares/auth");
const subscription = require("../middlewares/subscription");
const controller = require("../controllers/sales.controller");

// Protect all sales routes
router.use(auth);
router.use(subscription);

// Quick Sale
router.post("/quick-sale", controller.quickSale);

module.exports = router;
