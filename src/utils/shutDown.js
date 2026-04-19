import mongoose from "mongoose";
import { getActiveRequests, setShutdownState } from "../middlewares/requestTracker.js";

let isShuttingDown = false;

let connections = new Set();

export const setupGracefulShutdown = (server) => {

    // 🔥 Track connections (keep-alive sockets)
    server.on("connection", (socket) => {
        connections.add(socket);

        socket.on("close", () => {
            connections.delete(socket);
        });
    });

    const shutdown = async (signal) => {
        if (isShuttingDown) return;
        isShuttingDown = true;

        console.log(`\nReceived ${signal}`);
        setShutdownState(true);

        // 1. Stop new connections
        server.close(() => {
            console.log("Stopped accepting new connections");
        });

        // 2. Wait for active requests
        const waitForRequests = () => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (getActiveRequests() === 0) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 500);
            });
        };

        console.log("Waiting for active requests...");
        await waitForRequests();

        // 3. Destroy remaining keep-alive connections
        console.log("Destroying open connections...");
        for (const socket of connections) {
            socket.destroy();
        }

        // 4. Close DB
        await mongoose.connection.close();
        console.log("MongoDB connection closed");

        process.exit(0);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
};
