import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.get("/current", UserController.getAuthenticatedUser);

router.patch(
  "/current/password",
  UserController.changeAuthenticatedUserPassword
);

export default router;
