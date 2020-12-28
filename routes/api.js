const router = require("express").Router();

const FortuneController = require("../controllers/fortune");
const KarmaController = require("../controllers/karma");

const fortuneValidator = require("../middlewares/validators/fortune");

router.get("/fortunes", FortuneController.index);

router.get("/fortune", FortuneController.show);

router.post("/fortunes", fortuneValidator, FortuneController.store);

router.get("/karmas", KarmaController.index);

router.get("/karma", KarmaController.show);

module.exports = router;
