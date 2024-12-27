import express from "express";
import * as eventController from "../controllers/event.controller";
import { authorizedEmail } from "../middleware/authorizedEmail.middleware";

const router = express.Router();

router.get("/", eventController.getEvents);
router.post("/", authorizedEmail, eventController.createEvent);
router.get("/:id", eventController.getEvent);
router.patch("/:id", authorizedEmail, eventController.updateEvent);
router.delete("/:id", authorizedEmail, eventController.deleteEvent);

export default router;
