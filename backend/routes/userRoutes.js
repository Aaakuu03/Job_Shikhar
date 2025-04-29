import express from "express";
import {
  jobSeekerRegister,
  employerRegister,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
  jobSeekerLogin,
  employerLogin,
} from "../controller/userController.js";

const userRouter = express.Router();

// userRouter.post("/user/login", userLogin);
userRouter.post("/jobseeker/login", jobSeekerLogin);
userRouter.post("/employer/login", employerLogin);
userRouter.post("/jobseeker/register", jobSeekerRegister);
userRouter.put("/verify-email/:userType/:token", verifyEmail);
userRouter.post("/forgot-password", sendResetPasswordEmail);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/employer/register", employerRegister);

export default userRouter;
