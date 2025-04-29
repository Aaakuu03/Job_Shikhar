import express from "express";

import { logout } from "../controller/logoutController.js";

const logoutRouter = express.Router();

logoutRouter.post("/logout", logout); // get training by Id

export default logoutRouter;
