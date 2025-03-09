import express from "express";
import { getEmployerProfile } from "../controller/employerController.js";

const employerRouter = express.Router();

employerRouter.get("/profile", getEmployerProfile);

export default employerRouter;
