import express from "express";
import { verifyToken } from "../middleware/jwtVerify.js";
import {
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  getWorkExperience,
  getWorkExperienceById,
} from "../controller/workexperienceController.js";

const workExperienceRouter = express.Router();

// Define routes with jobSeekerId as part of the URL
workExperienceRouter.post("/add", verifyToken, addWorkExperience); // Add WorkExperience
workExperienceRouter.get("/", verifyToken, getWorkExperience); // Get WorkExperience for a job seeker
workExperienceRouter.put("/update/:id", verifyToken, updateWorkExperience); // Update WorkExperience
workExperienceRouter.delete("/:id", verifyToken, deleteWorkExperience); // Delete WorkExperience
workExperienceRouter.get("/:id", getWorkExperienceById);
// get WorkExperience by Id

export default workExperienceRouter;
