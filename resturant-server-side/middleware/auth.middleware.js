import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protect = async (req, res, next) => {
  try {
    // Header se token lo
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token nahi mila, access denied" });
    }

    const token = authHeader.split(" ")[1];

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User database se lo (password ke bina)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User nahi mila" });
    }

    // User ko request mein attach karo
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token invalid hai" });
  }
};

export default protect;
