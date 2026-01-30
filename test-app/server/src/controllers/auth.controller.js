import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    // TODO: hash password properly (bcrypt)
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, passwordHash: password });

    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
}
