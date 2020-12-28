const router = require("express").Router();

const FortuneController = require("../controllers/fortune");
const KarmaController = require("../controllers/karma");

const fortuneValidator = require("../middlewares/validators/fortune");

router.get("/api/fortunes", FortuneController.index);

router.get("/api/fortune", FortuneController.show);

router.post("/api/fortunes", fortuneValidator, FortuneController.store);

router.get("/api/karmas", KarmaController.index);

router.get("/api/karma", KarmaController.show);

module.exports = router;
