import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { cloudinary } from '../../helper/upload.js';
import { SignUpModel } from '../../Models/SingUpModel.js';
import { sendResponse } from '../../helper/messageHelpers.js';


export const Register = asyncHandler(async (req, res) => {
    const {
        name, email, phoneNumber, country, dob, university,
        studyLevel, department, courseOfStudy, password
    } = req.body;

    try {
        // Check if email already exists
        const existingUser = await SignUpModel.findOne({ email });
        if (existingUser) {
            return sendResponse(res, 409, 'Email already in use');
        }

        // Upload image to Cloudinary
        const { path } = req.file;
        const cloudinaryResponse = await cloudinary.uploader.upload(path);
        const {
            secure_url: imageUrl,
            public_id: imagePublicId
        } = cloudinaryResponse;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance with image details
        const newUser = new SignUpModel({
            name, email, phoneNumber, country,
            dob, university, studyLevel, department, courseOfStudy,
            password: hashedPassword,
            Img: imageUrl,
            ImgPublicId: imagePublicId
        });

        await newUser.save();
        return sendResponse(res, 201, 'User registered successfully');

    } catch (error) {
        // Send error response
        sendResponse(res, 500, 'Error registering user', error.message);
    }
});
