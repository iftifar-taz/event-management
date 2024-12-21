import express from "express";
import { requiresAuth } from "../middleware/auth";
import * as UserController from "../controllers/users";

const router = express.Router();

router.get("/current", requiresAuth, UserController.getAuthenticatedUser);

router.post("/current/password/change", UserController.changePassword);

export default router;
