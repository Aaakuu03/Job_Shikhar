import express from "express";
import {
  applyForJob,
  getAllJobs,
  getJobDetailsById,
  getAppliedJobDeatilsById,
  getAppliedJobCount,
  getPostedJobStats,
  getJobsByCategory,
} from "../controller/jobController.js";
import { verifyToken } from "../middleware/jwtVerify.js";

const jobRouter = express.Router();

jobRouter.post("/job-application/apply", verifyToken, applyForJob);
jobRouter.get("/jobs", getAllJobs);
jobRouter.get("/job/:jobId", getJobDetailsById); // No authentication required
jobRouter.get("/applied-jobs", verifyToken, getAppliedJobDeatilsById);
jobRouter.get("/applied-jobs/count", verifyToken, getAppliedJobCount);
jobRouter.get("/posted-jobs/count", verifyToken, getPostedJobStats);
jobRouter.get("/jobs/category/:category", getJobsByCategory);

export default jobRouter;
