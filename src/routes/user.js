import express from "express";
import { register,login,getMyProfile,logout, googleSign, checkUser } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {getNavLinks} from "../controller/navlinks.js";

const router = express.Router();


// router.get("/getAllUsers",getAllUser);
router.post("/google/register",googleSign);
router.post("/google/check",checkUser);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout",logout);

router.get("/navLinks",getNavLinks);
export default router;
