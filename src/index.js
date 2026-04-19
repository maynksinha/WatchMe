// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import DBconnection from './db/index.js'

dotenv.config(
    {
        path:'./env'    
    }
)

DBconnection()


// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)

//         app.on("error" , (error) => {
//                 console.log("ERROR",error)
//         })
//         app.listen(process.env.PORT , ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
        
//     } catch (error) {
//         console.log(error);
//         throw error 
        
//     }

// })
// ()