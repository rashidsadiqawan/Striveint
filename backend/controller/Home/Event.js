import asyncHandler from 'express-async-handler';
import { cloudinary } from '../../helper/upload.js';
import { EventModel } from '../../Models/EventModel.js';
import { sendResponse, successResponse} from '../../helper/messageHelpers.js';

export const registerEvent = asyncHandler(async (req, res) => {
    const {
        eventName, eventDate, location, description
    } = req.body;

    try {
        // Check if the story with the same event name and date already exists
        const existingEvent = await EventModel.findOne({ eventName, eventDate });
        if (existingEvent) {
            return sendResponse(res, 409, 'A story for this event already exists on the given date.');
        }

        // Upload image to Cloudinary
        const { path } = req.file;
        const cloudinaryResponse = await cloudinary.uploader.upload(path);
        const {
            secure_url: imageUrl,
            public_id: imagePublicId
        } = cloudinaryResponse;

        // Create new story instance with image details
        const newEvent = new EventModel({
            eventName,
            eventDate,
            location,
            description,
            Img: imageUrl,
            ImgPublicId: imagePublicId
        });

        await newEvent.save();
        return sendResponse(res, 201, 'Event registered successfully');

    } catch (error) {
        // Send error response
        sendResponse(res, 500, 'Error registering event', error.message);
    }
});

export const getAllEvent = asyncHandler(async (req, res) => {
    try {
        const events = await EventModel.find();
        successResponse(res, 200, 'Events fetched successfully', events);
    } catch (error) {
        sendResponse(res, 500, 'Error fetching events', error.message);
    }
})