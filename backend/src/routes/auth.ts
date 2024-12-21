import express from "express";
import * as AuthController from "../controllers/auth";

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

router.post("/password/forgot", AuthController.forgotPassword);

router.post("/password/reset", AuthController.resetPassword);

export default router;
