import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { cloudinary } from '../../helper/upload.js';
import { MentorModel } from '../../Models/MentorsModel.js';
import { sendResponse, successResponse} from '../../helper/messageHelpers.js';


export const registerMentor = asyncHandler(async (req, res) => {
    const {
        name, country, university, jobLevel, description
    } = req.body;

    try {
        // Check if the mentor with the same name and university already exists
        const existingMentor = await MentorModel.findOne({ name, university });
        if (existingMentor) {
            return sendResponse(res, 409, 'Mentor already registered with this name and university');
        }

        // Upload image to Cloudinary
        const { path } = req.file;
        const cloudinaryResponse = await cloudinary.uploader.upload(path);
        const {
            secure_url: imageUrl,
            public_id: imagePublicId
        } = cloudinaryResponse;

        // Create new mentor instance with image details
        const newMentor = new MentorModel({
            name, country, university, jobLevel, description,
            Img: imageUrl,
            ImgPublicId: imagePublicId
        });

        await newMentor.save();
        return sendResponse(res, 201, 'Mentor registered successfully');

    } catch (error) {
        // Send error response
        sendResponse(res, 500, 'Error registering mentor', error.message);
    }
});

export const getAllMentors = asyncHandler(async (req, res) => {
    try {
        const mentors = await MentorModel.find();
        return successResponse(res, 200, 'All mentors', mentors);
    } catch (error) {
        sendResponse(res, 500, 'Error getting mentors', error.message);
    }
})