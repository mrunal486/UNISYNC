
const { body } = require('express-validator');

exports.userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').not().isEmpty().withMessage('Name is required'),
    body('userType').isIn(['student', 'alumni', 'expert', 'admin']).withMessage('Invalid user type'),
  ];
};

exports.loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  ];
};

