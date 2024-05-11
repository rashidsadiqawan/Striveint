import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
    eventName: { type: String, required: [true, 'Event Name is required'], trim: true },
    eventDate: { type: Date, required: [true, 'Date is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    description: { type: String, required: [true, 'Department is required'] },
    Img: { type: String, required: [true, 'Image is required'] },
    ImgPublicId: { type: String },
});

const EventModel = model('Event', EventSchema);

export { EventModel };
