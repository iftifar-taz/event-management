import express from "express";
import * as EventController from "../controllers/events";

const router = express.Router();

router.get("/", EventController.getAllEvent);

export default router;
