import express from "express";
import { register,login,getMyProfile,logout, googleSign, checkUser, passwordResetRequest, passwordReset } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {getNavLinks} from "../controller/navlinks.js";

const router = express.Router();

// /api/v1/user
// router.get("/getAllUsers",getAllUser);
router.post("/google/register",googleSign);
router.post("/google/check",checkUser);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout",logout);
router.post("/requestPasswordReset",passwordResetRequest);
router.post("/reset-password/:token",passwordReset);

router.get("/navLinks",getNavLinks);


export default router;
