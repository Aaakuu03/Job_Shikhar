import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credential: true,
  })
);

// app.use(morgan("dev"));

app.use(express.json());

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.json({ respond: "Hello World" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
