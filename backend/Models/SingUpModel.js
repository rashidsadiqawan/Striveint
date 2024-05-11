import { Schema, model } from 'mongoose';

const SignUpSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
    phoneNumber: { type: Number, required: [true, 'Phone number is required'] },
    country: { type: String, required: [true, 'Country is required'] },
    dob: { type: Date, required: [true, 'Date of birth is required'] },
    university: { type: String, required: [true, 'University is required'] },
    studyLevel: { type: String, required: [true, 'Study level is required'] },
    department: { type: String, required: [true, 'Department is required'] },
    courseOfStudy: { type: String, required: [true, 'Course of study is required'] },
    Img: { type: String, required: [true, 'Image is required'] },
    ImgPublicId: { type: String },
    password: { type: String, required: [true, 'Password is required'] }
});

const SignUpModel = model('SignUp', SignUpSchema);

export { SignUpModel };
