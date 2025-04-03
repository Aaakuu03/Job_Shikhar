import express from "express";
import {
  getEmployerProfile,
  createEmployerProfile,
  getCompanyDetails,
  updateEmployerProfile,
  postJob,
  purchasePackage,
  editJobById,
  getJobById,
  getJobsByEmployer,
} from "../controller/employerController.js";
import { verifyToken } from "../middleware/jwtVerify.js";

const employerRouter = express.Router();

employerRouter.get("/profile", verifyToken, getEmployerProfile);
employerRouter.post("/profile/create", verifyToken, createEmployerProfile);
employerRouter.get("/profiledetails/:id", verifyToken, getCompanyDetails);
employerRouter.put("/profile/:id", verifyToken, updateEmployerProfile);
employerRouter.post("/jobpost", verifyToken, postJob);
employerRouter.post("/purchase-package", verifyToken, purchasePackage);
// Get all jobs posted by a specific employer
employerRouter.get("/postedjobs", verifyToken, getJobsByEmployer);

// Get a single job by ID
employerRouter.get("/jobs/:id", verifyToken, getJobById);

// Edit a job by ID
employerRouter.put("/jobs/:id", verifyToken, editJobById);
export default employerRouter;
