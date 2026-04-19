let activeRequests = 0;
let isShuttingDown = false;

export const requestTracker = (req, res, next) => {
    if (isShuttingDown) {
        return res.status(503).json({
            message: "Server is restarting, please try again later"
        });
    }

    activeRequests++;

    res.on("finish", () => {
        activeRequests--;
    });

    next();
};

// expose controls
export const getActiveRequests = () => activeRequests;
export const setShutdownState = (state) => {
    isShuttingDown = state;
};