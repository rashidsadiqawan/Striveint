import asyncHandler from 'express-async-handler';
import { cloudinary } from '../../helper/upload.js';
import { StoryModel } from '../../Models/SeccessStory.js';
import { sendResponse, successResponse} from '../../helper/messageHelpers.js';


export const registerStory = asyncHandler(async (req, res) => {
    const {
        name, employeeAt, university, description
    } = req.body;

    try {
        // Check if the story with the same name and university already exists
        const existingStory = await StoryModel.findOne({ name, university });
        if (existingStory) {
            return sendResponse(res, 409, 'Story already registered with this name and university');
        }

        // Upload image to Cloudinary
        const { path } = req.file;
        const cloudinaryResponse = await cloudinary.uploader.upload(path);
        const {
            secure_url: imageUrl,
            public_id: imagePublicId
        } = cloudinaryResponse;

        // Create new story instance with image details
        const newStory = new StoryModel({
            name, employeeAt, university, description,
            Img: imageUrl,
            ImgPublicId: imagePublicId
        });

        await newStory.save();
        return sendResponse(res, 201, 'Story registered successfully');

    } catch (error) {
        // Send error response
        sendResponse(res, 500, 'Error registering story', error.message);
    }
});


export const getAllStories = asyncHandler(async (req, res) => {
    try {
        const stories = await StoryModel.find();
        successResponse(res, 200, 'Stories fetched successfully', stories);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching stories', error.message);
    }
})