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
  getPricingPackage,
  deleteJobById,
} from "../controller/employerController.js";
import { verifyToken } from "../middleware/jwtVerify.js";
import { getCategory } from "../controller/admin/categoryController.js";
import { getPackage } from "../controller/admin/packageController.js";
import {
  checkActivePackage,
  getActiveEmployerPackage,
} from "../controller/activepackageController.js";

const employerRouter = express.Router();

employerRouter.get("/profile", verifyToken, getEmployerProfile);
employerRouter.post("/profile/create", verifyToken, createEmployerProfile);
employerRouter.get("/profiledetails/:id", verifyToken, getCompanyDetails);
employerRouter.put("/profile/:id", verifyToken, updateEmployerProfile);
employerRouter.post("/jobpost", verifyToken, postJob);
employerRouter.post("/purchase-package", verifyToken, purchasePackage);
// Get all jobs posted by a specific employer
employerRouter.get("/postedjobs", verifyToken, getJobsByEmployer);
employerRouter.get("/category", getCategory);

// Get a single job by ID
employerRouter.get("/jobs/:id", verifyToken, getJobById);
employerRouter.get("/packages", verifyToken, getPricingPackage);
employerRouter.get("/employer-packages", verifyToken, getActiveEmployerPackage);
employerRouter.get("/active-package", verifyToken, checkActivePackage);
// Edit a job by ID
employerRouter.put("/jobs/:id", verifyToken, editJobById);
employerRouter.delete("/jobs/:id", verifyToken, deleteJobById);

export default employerRouter;
