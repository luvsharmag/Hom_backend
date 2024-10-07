import express from "express";
import userRouter from "./routes/user.js";
import cardRouter from "./routes/cards.js";
import dashboardRouter from "./routes/dashboard.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import dotenv from "dotenv";
dotenv.config({ path: path.join(path.resolve(), ".env") });
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { initializeFirebase } from "../config/initializeFirebase.js";
import nodemailer from "nodemailer";
export const app = express();
// console.log(process.env.EMAIL);
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // or 587 for TLS
  secure: false, // use true for port 465
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});
initializeFirebase();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Api working with /api/v1");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/card", cardRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(errorMiddleware);
