import mongoose from 'mongoose';
import colors from 'colors'

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.ATLAS_URI);
    console.log("|");
    console.log("===================================");
    console.log("Database Connected Successfully".yellow.bold);
  } catch (error) {
    console.log("|");
    console.log("===================================");
    console.log("Database error".red.bold);

  }
};
export default dbConnect;
