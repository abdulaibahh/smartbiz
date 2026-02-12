const router = require("express").Router();
const auth = require("../middlewares/auth");
const subscription = require("../middlewares/subscription");
const controller = require("../controllers/dashboard.controller");

router.use(auth);
router.use(subscription);

router.get("/summary", controller.getSummary);

module.exports = router;
