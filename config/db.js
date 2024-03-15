import mongoose from "mongoose";
import colors from 'colors'

export const db =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(colors.cyan('DB connected'))
    } catch (error) {
        console.log(colors.red(error))
        process.exit(1)
    }
}	