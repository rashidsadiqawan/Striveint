import { validationResult, body } from 'express-validator';

const userValidationRules = () => [
    body('email').isEmail().withMessage('Invalid email address format'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must include a number')
        .matches(/[a-z]/)
        .withMessage('Password must include a lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must include an uppercase letter')
        .matches(/[#@!]/)
        .withMessage('Password must include one of the special characters: #, @, !'),

    body('name')
        .trim()
        .not().isEmpty()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters long'),

    body('phoneNumber')
        .isNumeric()
        .withMessage('Phone number must be numeric')
        .isLength({ min: 10, max: 15 })
        .withMessage('Phone number must be between 10 and 15 digits'),

    body('country').not().isEmpty().withMessage('Country is required'),
    body('dob')
        .isDate()
        .withMessage('Date of Birth must be a valid date')
        .custom((value, { req }) => {
            const today = new Date();
            const dob = new Date(value);
            if (today <= dob) {
                throw new Error('Date of Birth must be in the past');
            }
            return true;
        }),
    body('university').not().isEmpty().withMessage('University is required'),
    body('studyLevel').not().isEmpty().withMessage('Study level is required'),
    body('department').not().isEmpty().withMessage('Department is required'),
    body('courseOfStudy').not().isEmpty().withMessage('Course of study is required')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export { userValidationRules, validate };
