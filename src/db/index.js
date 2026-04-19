import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

const DBconnection = async () => {
    try {
        const connResp = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        console.log(connResp)
        console.log(`\n MoongoDB connected !! DB Host:${connResp.connection.host}`)
    }
    catch (error) {
        console.log("MoongoDb connection Error", error)
        process.exit(1)
    }
}

export default DBconnection 


