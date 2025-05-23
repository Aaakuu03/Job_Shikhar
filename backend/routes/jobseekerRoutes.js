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
  getNotification,
  searchJobs,
} from "../controller/jobseekerController.js";
import { verifyToken } from "../middleware/jwtVerify.js";
import {
  readAllNotification,
  readNotification,
} from "../controller/applicationController.js";
const jobseekerRouter = express.Router();

jobseekerRouter.get("/profile", verifyToken, getJobSeekerProfile);
jobseekerRouter.put("/profile/:id", verifyToken, updateJobSeekerProfile);
jobseekerRouter.post("/profile", verifyToken, createJobSeekerProfile);
jobseekerRouter.put("/preferred-job", verifyToken, updatePreferredJob);
jobseekerRouter.get("/preferred-job/:id", verifyToken, getPreferredJobById);
jobseekerRouter.get("/preferred-jobs", verifyToken, getAllPreferredJobs);
jobseekerRouter.get("/info/:id", verifyToken, getBasicInformationById);
jobseekerRouter.get("/profiledetails/:id", verifyToken, getJobSeekerDetails);
jobseekerRouter.get("/notifications", verifyToken, getNotification);
jobseekerRouter.get("/job/search", searchJobs);
jobseekerRouter.put("/notifications/:id/read", verifyToken, readNotification);
jobseekerRouter.put(
  "/notifications/mark-all-read",
  verifyToken,
  readAllNotification
);
export default jobseekerRouter;
