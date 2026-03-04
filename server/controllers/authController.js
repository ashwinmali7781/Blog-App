// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const createToken = (user) =>
//   jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'dev-secret', {
//     expiresIn: '1d',
//   });

// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(409).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashedPassword });

//   return res.status(201).json({
//     token: createToken(user),
//     user: { id: user._id, name: user.name, email: user.email },
//   });
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const isMatched = await bcrypt.compare(password, user.password);
//   if (!isMatched) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   return res.json({
//     token: createToken(user),
//     user: { id: user._id, name: user.name, email: user.email },
//   });
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "1d" }
  );

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: createToken(user),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
