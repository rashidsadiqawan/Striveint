import { Schema, model } from 'mongoose';

const StorySchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    employeeAt: { type: String, required: [true, 'Company is required'] },
    university: { type: String, required: [true, 'University is required'] },
    description: { type: String, required: [true, 'Department is required'] },
    Img: { type: String, required: [true, 'Image is required'] },
    ImgPublicId: { type: String },
});

const StoryModel = model('Story', StorySchema);

export { StoryModel };
