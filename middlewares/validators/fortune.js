const { body } = require("express-validator");

const fortuneValidation = [
    body("message", "message field is required").not().isEmpty(),
];

module.exports = fortuneValidation;
