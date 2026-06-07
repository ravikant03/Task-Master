import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { blacklistedTokens } from "../utils/blacklistedtokens.js";
import Otp from "../models/otp.model.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return next(new AppError("Email already exists", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// send otp
export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    await Otp.deleteMany({ email });
    const response = await Otp.create({
      email,
      otp: hashedOtp,
    });

    await sendEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP send successfully",
    });
  } catch (error) {
    next(error);
  }
};

// verify otp
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (otpRecord.otp !== hashedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(new AppError("User Not Found", 400));
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return next(new AppError("Wrong Password", 400));
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// logout
export const logout = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    blacklistedTokens.add(token);
  }

  return res.status(200).json({
    success: true,
    message: "Logout success",
  });
};
