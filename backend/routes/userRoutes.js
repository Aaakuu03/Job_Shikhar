import express from "express";
import {
  adminLogin,
  adminRegister,
  jobSeekerLogin,
  jobSeekerRegister,
  employerLogin,
  employerRegister,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/jobseeker/login", jobSeekerLogin);
userRouter.post("/jobseeker/register", jobSeekerRegister);
userRouter.get("/verify-email/:token", verifyEmail);
userRouter.post("/forgot-password", sendResetPasswordEmail);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/employer/login", employerLogin);
userRouter.post("/employer/register", employerRegister);
userRouter.post("/admin/login", adminLogin);
userRouter.post("/admin/register", adminRegister);

export default userRouter;
