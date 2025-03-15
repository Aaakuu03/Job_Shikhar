import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import jobseekerRouter from "./routes/jobseekerRoutes.js";
import educationRouter from "./routes/educationRoutes.js";
import employerRouter from "./routes/employerRoutes.js";
import trainingRouter from "./routes/trainingRoutes.js";
import workExperienceRouter from "./routes/workexperienceRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

console.log("SECRET_KEY:", process.env.SECRET_KEY);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credential: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/jobseeker", jobseekerRouter);
app.use("/api/education", educationRouter);
app.use("/api/training", trainingRouter);
app.use("/api/workexperience", workExperienceRouter);
app.use("/api/jobseekers", jobRouter);
app.use("/api/employers", employerRouter);
app.use("/api/workexperience", workExperienceRouter);

app.get("/", (req, res) => {
  res.json({ respond: "Hello World" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
