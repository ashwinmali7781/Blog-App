// import { Router } from 'express';
// import { loginUser, registerUser } from '../controllers/authController.js';

// const router = Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// export default router;

// import express from "express";
// import { login } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/login", login);

// export default router;


import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
