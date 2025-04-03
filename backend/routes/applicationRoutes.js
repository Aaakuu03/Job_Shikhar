import express from "express";
import {
  getApplicantsForJob,
  getApplication,
  updateApplicationStatus,
  statusNotification,
} from "../controller/applicationController.js";
import { verifyToken } from "../middleware/jwtVerify.js";

const applicationRouter = express.Router();
// applicationRouter.get("/application/:jobId", verifyToken, getApplicantsForJob);
applicationRouter.get("/application/:jobId", verifyToken, getApplicantsForJob);
applicationRouter.get(
  "/job/:jobId/application/:applicationId",
  verifyToken,
  getApplication
);
applicationRouter.put(
  "/application/:applicationId/status",
  verifyToken,
  updateApplicationStatus
);
applicationRouter.get("/notification", verifyToken, statusNotification);

export default applicationRouter;
