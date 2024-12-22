import express from "express";
import * as eventController from "../controllers/event.controller";

const router = express.Router();

router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.get("/:id", eventController.getEvent);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
