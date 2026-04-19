// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import DBconnection from './db/index.js'
import app from './app.js'
import { setupGracefulShutdown } from './utils/shutDown.js'

dotenv.config(
    {
        path:'./env'    
    }
)

const PORT = process.env.PORT || "8000"

let server;

const startServer = async () => {
    try {
        await DBconnection();

        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // console.log("******************************", server)
        // attach graceful shutdown
        setupGracefulShutdown(server);

    } catch (err) {
        console.error("Startup error:", err);
        process.exit(1);
    }
};

startServer();

