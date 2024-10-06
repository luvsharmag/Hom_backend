import express from "express";
import userRouter from "./routes/user.js";
import cardRouter from "./routes/cards.js";
import dashboardRouter from "./routes/dashboard.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { initializeFirebase } from "../config/initializeFirebase.js";
export const app = express();


dotenv.config();

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
