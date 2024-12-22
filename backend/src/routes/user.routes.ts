import express from "express";
import * as userController from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate.middleware";

const router = express.Router();

router.post("/", userController.createUser);
router.post("/password/forgot", userController.forgotPassword);
router.post("/password/reset", userController.resetPassword);

router.get("/current", authenticate, userController.getAuthenticatedUser);

router.patch(
  "/current/password",
  authenticate,
  userController.changeAuthenticatedUserPassword
);

export default router;
