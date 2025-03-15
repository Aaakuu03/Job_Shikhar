import express from "express";
import {
  getEmployerProfile,
  createEmployerProfile,
} from "../controller/employerController.js";

const employerRouter = express.Router();

employerRouter.get("/profile", getEmployerProfile);
employerRouter.post("/profile/create", createEmployerProfile);

export default employerRouter;
