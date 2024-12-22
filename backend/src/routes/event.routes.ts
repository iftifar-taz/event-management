import express from "express";
import * as eventController from "../controllers/event.controller";

const router = express.Router();

router.get("/", eventController.getEvents);

export default router;
