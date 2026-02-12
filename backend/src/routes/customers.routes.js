const router = require("express").Router();
const auth = require("../middlewares/auth");
const subscription = require("../middlewares/subscription");
const controller = require("../controllers/customers.controller");

router.use(auth);
router.use(subscription);

router.post("/", controller.addCustomer);
router.get("/", controller.getCustomers);

module.exports = router;
