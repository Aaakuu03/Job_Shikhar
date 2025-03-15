import express from "express";
import { verifyToken } from "../middleware/jwtVerify.js";
import {
  addTraining,
  updateTraining,
  deleteTraining,
  getTraining,
  getTrainingById,
} from "../controller/trainingController.js";

const trainingRouter = express.Router();

// Define routes with jobSeekerId as part of the URL
trainingRouter.post("/add", verifyToken, addTraining); // Add training
trainingRouter.get("/", verifyToken, getTraining); // Get training for a job seeker
trainingRouter.put("/update/:id", verifyToken, updateTraining); // Update training
trainingRouter.delete("/:id", verifyToken, deleteTraining); // Delete training
trainingRouter.get("/:trainingId", verifyToken, getTrainingById); // get training by Id

export default trainingRouter;
