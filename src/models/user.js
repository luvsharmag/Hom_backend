import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      // unique: [true, "Email already Exist"],
      required: [true, "Please enter email"],
    },
    photo: {
      type: String,
      // required: [true, "Please add photo"],
    },
    company: {
      type: String,
      required: [true, "Please add Company"],
    },
    number: {
      type: String,
      required: [true, "Please enter Phone Number"],
      trim: true,
      // validate:validator.default.isMobilePhone
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      // validate:validator.default.isStrongPassword
    },
    resetToken: { type: String, select: false },
    resetTokenExpiration: { type: Date, select: false },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
