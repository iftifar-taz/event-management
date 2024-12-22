import express from "express";
import * as sessionController from "../controllers/session.controller";

const sessionRoutes = express.Router();

sessionRoutes.post("/", sessionController.createSession);
sessionRoutes.delete("/", sessionController.deleteSession);

export default sessionRoutes;
