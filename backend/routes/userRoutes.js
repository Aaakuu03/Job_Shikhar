import express from "express";
import {
  adminLogin,
  adminRegister,
  userLogin,
  jobSeekerRegister,
  employerRegister,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/user/login", userLogin);
userRouter.post("/jobseeker/register", jobSeekerRegister);
userRouter.put("/verify-email/:token", verifyEmail);
userRouter.post("/forgot-password", sendResetPasswordEmail);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/employer/register", employerRegister);
userRouter.post("/admin/login", adminLogin);
userRouter.post("/admin/register", adminRegister);
export default userRouter;
