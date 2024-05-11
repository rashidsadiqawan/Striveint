import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbConnect from './config/dbConnect.js'
import router from './routes/routes.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Define the rate limiter with desired options
// const apiLimiter = rateLimit({
//     max: 500,
//     windowMs: 15 * 60 * 1000,
//     message: "Too many requests from this IP, please try again later.",
// });
// connection
dbConnect();


// Middleware
// app.use(apiLimiter);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API 
app.use("/api",router)


//server running port
app.listen(port, () => {
    console.log("===================================");
    console.log(`Server is running  at PORT ==> ${port}`.yellow.bold);
    console.log("===================================");
    console.log("|");
});

