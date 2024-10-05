import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            status:"failed",
            message:"login first"
        })
    }
    const decrypted = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decrypted._id);
    next();
};
export const isAdmin = async(req,res,next)=>{
    const {_id} = req.user;
    if(!_id) return next(new ErrorHandler("login First",401));
    const user = await User.findById(_id);
    if(!user)return next(new ErrorHandler("User not found",404));
    if(user.role !== "admin"){
        return next(new ErrorHandler("unauthorised access",401));
    }
    next();
};