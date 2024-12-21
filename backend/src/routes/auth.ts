import express from "express";
import { requiresAuth } from "../middleware/auth";
import * as UserController from "../controllers/auth";

const router = express.Router();

router.get("/user", requiresAuth, UserController.getAuthenticatedUser);

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;
