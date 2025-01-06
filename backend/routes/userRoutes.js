import express from "express";
import {
  adminLogin,
  adminRegister,
  jobSeekerLogin,
  jobSeekerRegister,
  employerLogin,
  employerRegister,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/jobseeker/login", jobSeekerLogin);
userRouter.post("/jobseeker/register", jobSeekerRegister);
userRouter.post("/employer/login", employerLogin);
userRouter.post("/employer/register", employerRegister);
userRouter.post("/admin/login", adminLogin);
userRouter.post("/admin/register", adminRegister);

export default userRouter;
