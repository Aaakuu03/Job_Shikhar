import express from "express";
import { verifyToken } from "../middleware/jwtVerify.js";
import {
  addEducation,
  getEducation,
  updateEducation,
  deleteEducation,
  getEducationById,
} from "../controller/educationController.js";

const educationRouter = express.Router();

// Define routes with jobSeekerId as part of the URL
educationRouter.post("/add", verifyToken, addEducation); // Add education
educationRouter.get("/", verifyToken, getEducation); // Get education for a job seeker
educationRouter.put("/update/:id", verifyToken, updateEducation); // Update education
educationRouter.delete("/:id", verifyToken, deleteEducation); // Delete education
educationRouter.get("/:educationId", verifyToken, getEducationById); // Get education for a job seeker

export default educationRouter;
