
import express from "express";

import {
    registerForEvent,
    getEventRegistrations,
    cancelRegistration
} from "../controllers/registration.controller.js";

const router = express.Router();

// Register a user for an event
router.post("/", registerForEvent);
router.get("/event/:eventId", getEventRegistrations);
router.patch("/:registrationId/cancel", cancelRegistration);

export default router;
