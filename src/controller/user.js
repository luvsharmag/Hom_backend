import bcryptjs from "bcryptjs";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import admin from "firebase-admin";
export const checkUser = async (req, res ,next) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const {email} = decodedToken;
    const user = await User.findOne({ email });

    if (user) {
      sendCookie(user, res, 200);
      return res.status(200).json({ exists: true,username:user.name });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return res.status(500).json({ message: "Error checking user existence" });
  }
};
export const googleSign = async (req, res,next) => {
  const { idToken, company, number, password } = req.body;

  try {
    
    // Verify the Google ID token using Firebase Admin SDK
    // console.log(idToken);
    const numberExist = await User.findOne({number});
    if(numberExist){
      console.log(numberExist);
      return next(new ErrorHandler("phone Number already exist!",400));
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name, picture } = decodedToken;

    const user = new User({
      _id: uid || undefined,
      email: email,
      name: name,
      company: company,
      number: number,
      password: await bcryptjs.hash(password, 10), // hash the password
    });

    await user.save();
    sendCookie(user, res, 201);
    return res.json({
      status: "success",
      message:  "user successfully created",
    });
  } catch (error) {
    console.error("Error verifying token or saving user:", error);
    return res.status(401).json({ message: "Error processing request", error });
  }
};

export const register = async (req, res, next) => {
  const { name, email, company, number, password, role } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide given fields", 400));
  }
  let user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });
  if (user) {
    return next(
      new ErrorHandler("Email already exist Please login to continue", 409)
    );
  }
  const numberExist = await User.findOne({number});
  console.log(numberExist.number);
  if(numberExist){
    return next(new ErrorHandler("phone Number already exist!",400));
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  user = await User.create({
    name,
    email,
    company,
    number,
    password: hashedPassword,
    role,
  });
  // return res.send("success");
  sendCookie(user, res, 201);
  return res.json({
    status: "success",
    message:  "user successfully created",
  });
};
export const getMyProfile = async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let findUser = await User.findOne({ email }).select("+password");

  if (!findUser) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }
  const isValidPassword = await bcryptjs.compare(password, findUser.password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid password", 404));
  }
  sendCookie(findUser, res, 200);
  return res.json({
    status:"success",
    message:`welcome, ${findUser.name}`,
  })
};
export const logout = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("already logged out", 404));
  }
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      sameSite: "lax",
      secure: false,
    })
    .json({
      status: "success",
      message: "logout successfully",
    });
};
