import { Schema, model } from 'mongoose';

const MentorSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    country: { type: String, required: [true, 'Country is required'] },
    university: { type: String, required: [true, 'University is required'] },
    jobLevel: { type: String, required: [true, 'Study level is required'] },
    description: { type: String, required: [true, 'Department is required'] },
    Img: { type: String, required: [true, 'Image is required'] },
    ImgPublicId: { type: String },
});

const MentorModel = model('Mentor', MentorSchema);

export { MentorModel };
