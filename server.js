import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//API Endpoints
app.get("/", (req, res) => {
  res.send({ mssg: "hello" });
});
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
