import express from "express";

import { logout } from "../controller/logoutController.js";
import { verifyToken } from "../middleware/jwtVerify.js";

const logoutRouter = express.Router();

logoutRouter.post("/logout", verifyToken, logout); // get training by Id

export default logoutRouter;
