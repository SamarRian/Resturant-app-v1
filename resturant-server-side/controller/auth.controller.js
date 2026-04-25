import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

// JWT token generate karne ka helper
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ─── Register ────────────────────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check karo email already exist toh nahi karta
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // User banao (password model mein auto hash hoga)
    const user = await User.create({ name, email, password });

    // Token banao
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── Login ───────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email aur password required hain" });
    }

    // User dhoondo
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Password check karo
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Token banao
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── Get current user (protected route test) ─────────────────────────────────
export const getMe = async (req, res) => {
  try {
    // req.user middleware se aata hai
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
