import express from "express";
import userRouter from "./routes/user.js";
import cardRouter from "./routes/cards.js";
import dashboardRouter from "./routes/dashboard.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import admin from "firebase-admin";
// import serviceAccount from "../config/firebase-service-account.json" assert { type: "json" };
export const app = express();

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Handle multiline private key
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
  // Optional, if you're using the Firebase Realtime Database:
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

configDotenv({
  path: "./src/data/.env",
});
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
