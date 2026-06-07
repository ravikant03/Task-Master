import jwt from "jsonwebtoken";
import { blacklistedTokens } from "../utils/blacklistedtokens.js";

export const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({
      success: false,
      message: "Token has been logged out",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;

  next();
};
