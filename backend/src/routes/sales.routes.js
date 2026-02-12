const router = require("express").Router();
const auth = require("../middlewares/auth");
const subscription = require("../middlewares/subscription");
const controller = require("../controllers/sales.controller");

router.use(auth);
router.use(subscription);

router.post("/quick-sale", controller.quickSale);
router.get("/", controller.getSales);

module.exports = router;
