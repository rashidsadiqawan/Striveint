import { check } from 'express-validator';

const loginValidationRules = () => [
    // Validate the email field
    check('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail(),  // Optionally normalize the email address

    // Validate the password field
    check('password', 'Password is required')
        .exists()
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];

export default loginValidationRules;
