const router = require('express').Router();

// Controllers
const AuthController = require('../controllers/auth');
const FortuneController = require('../controllers/fortune');
const KarmaController = require('../controllers/karma');

// API Authentication Middleware
const authAPI = require('../middlewares/auth');

// Validator Middlewares
const authValidator = require('../middlewares/validators/auth');
const fortuneValidator = require('../middlewares/validators/fortune');

router.post('/auth/register', authValidator.register, AuthController.register);

router.post('/auth/login', authValidator.login, AuthController.login);

router.get('/fortunes', authAPI, FortuneController.index);

router.get('/fortune', FortuneController.show);

router.post('/fortunes', authAPI, fortuneValidator, FortuneController.store);

router.get('/karmas', authAPI, KarmaController.index);

router.get('/karma', KarmaController.show);

module.exports = router;
