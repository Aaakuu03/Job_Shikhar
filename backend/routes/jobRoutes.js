import express from "express";
import { applyForJob } from "../controller/jobController.js";
const jobRouter = express.Router();

jobRouter.post("/job/apply", applyForJob);

export default jobRouter;
