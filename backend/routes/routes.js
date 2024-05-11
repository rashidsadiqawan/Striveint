import express from "express";
import multer from 'multer';
import { Register } from '../controller/Auth/Register.js';
import { Login } from '../controller/Auth/Login.js';
import { registerMentor, getAllMentors } from '../controller/Home/Mentor.js';
import { registerStory, getAllStories } from '../controller/Home/SuccessStories.js';
import { registerEvent, getAllEvent } from '../controller/Home/Event.js';



import loginValidationRules from '../middleware/loginValidationMiddleware.js'
import {
    userValidationRules, validate
} from '../middleware/registerValidationMiddleware.js'



const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 5000000 }
});




// Route to create personal information
router.post("/register", upload.single('Img'), (req, res, next) => {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    next();
}, userValidationRules(), validate, Register);

router.post('/login', loginValidationRules(), Login);


router.post('/registerMentor', upload.single('Img'), registerMentor);
router.get('/getAllMentors', getAllMentors);
router.post('/registerStory', upload.single('Img'), registerStory);
router.get('/getAllStories', getAllStories);
router.post('/registerEvent', upload.single('Img'), registerEvent);
router.get('/getAllEvent', getAllEvent);



export default router;
