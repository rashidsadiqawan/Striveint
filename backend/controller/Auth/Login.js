import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { SignUpModel } from '../../Models/SingUpModel.js'
import { sendResponse } from '../../helper/messageHelpers.js';
import jwt from 'jsonwebtoken'

export const Login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    try {
        // Assuming you have a SignUpModel model set up for your database
        const user = await SignUpModel.findOne({ email });
        if (!user) {
            return sendResponse(res, 400, 'Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 400, 'Invalid credentials');
        }

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            country: user.country,
            dob: user.dob,
            university: user.university,
            studyLevel: user.studyLevel,
            department: user.department,
            courseOfStudy: user.courseOfStudy,
            Img: user.Img,
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                return res.status(200).json({
                    token: token,
                    user: payload,
                    message: 'Login successful',
                    status: 200,
                    success: true,
                })
            }
        );
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
});
