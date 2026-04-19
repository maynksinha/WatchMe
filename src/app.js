import express from "express";
import { requestTracker } from "./middlewares/requestTracker.js";

const app = express();

// global middlewares
app.use(requestTracker);



export default app;

