import express from "express";
import {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  createJobSeekerProfile,
  updatePreferredJob,
  getPreferredJobById,
  getAllPreferredJobs,
  getBasicInformationById,
  getJobSeekerDetails,
} from "../controller/jobseekerController.js";
import { verifyToken } from "../middleware/jwtVerify.js";
const jobseekerRouter = express.Router();

jobseekerRouter.get("/profile", verifyToken, getJobSeekerProfile);
jobseekerRouter.put("/profile/:id", verifyToken, updateJobSeekerProfile);
jobseekerRouter.post("/profile", verifyToken, createJobSeekerProfile);
jobseekerRouter.put("/preferred-job", verifyToken, updatePreferredJob);
jobseekerRouter.get("/preferred-job/:id", verifyToken, getPreferredJobById);
jobseekerRouter.get("/preferred-jobs", verifyToken, getAllPreferredJobs);
jobseekerRouter.get("/info/:id", verifyToken, getBasicInformationById);
jobseekerRouter.get("/profiledetails/:id", verifyToken, getJobSeekerDetails);
export default jobseekerRouter;
