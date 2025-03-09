import express from "express";
import {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  createJobSeekerProfile,
} from "../controller/jobseekerController.js";
import { verifyToken } from "../middleware/jwtVerify.js";
const jobseekerRouter = express.Router();

jobseekerRouter.get("/profile", verifyToken, getJobSeekerProfile);
jobseekerRouter.put("/profile", verifyToken, updateJobSeekerProfile);
jobseekerRouter.post("/profile", verifyToken, createJobSeekerProfile);

export default jobseekerRouter;
