
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/inputValidator');
const { userValidationRules } = require('../middleware/validationRules');

router.post('/signup', userValidationRules(), validate, authController.signup);
router.post('/login', authController.login);

module.exports = router;
