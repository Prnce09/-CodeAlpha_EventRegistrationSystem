
import mongoose from "mongoose";
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";

// Register a user for an event
export const registerForEvent = async (req, res) => {
    try {
        const { eventId, name, email } = req.body;

        // Validate required fields
        if (!eventId || !name || !email) {
            return res.status(400).json({
                success: false,
                message: "Event ID, name and email are required"
            });
        }

        // Validate event ID
        if (!mongoose.isValidObjectId(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID"
            });
        }

        // Find event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Check available seats
        if (event.registeredCount >= event.capacity) {
            return res.status(400).json({
                success: false,
                message: "Event is fully booked"
            });
        }

        // Check existing registration
        const existingRegistration = await Registration.findOne({
            event: eventId,
            email: email.trim().toLowerCase()
        });

      
if (existingRegistration) {

    // Allow cancelled users to register again
    if (existingRegistration.status === "cancelled") {
        existingRegistration.status = "registered";
        existingRegistration.name = name;

        await existingRegistration.save();

        event.registeredCount += 1;
        await event.save();

        return res.status(200).json({
            success: true,
            message: "Registration reactivated successfully",
            data: existingRegistration
        });
    }

    // Prevent duplicate active registration
    return res.status(409).json({
        success: false,
        message: "This email is already registered for this event"
    });
}


        // Create registration
        const registration = await Registration.create({
            event: eventId,
            name,
            email
        });

        // Update registered count
        event.registeredCount += 1;
        await event.save();

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            data: registration
        });

    } catch (error) {
        console.error("Registration Error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Duplicate registration"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get all registrations for a specific event
export const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Validate Event ID
        if (!mongoose.isValidObjectId(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID"
            });
        }

        // Check if event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Fetch registrations
        const registrations = await Registration.find({
            event: eventId,
            status: "registered"
        });

        return res.status(200).json({
            success: true,
            message: "Registrations fetched successfully",
            eventTitle: event.title,
            count: registrations.length,
            data: registrations
        });

    } catch (error) {
        console.error("Get Registrations Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


 // Cancel an event registration
export const cancelRegistration = async (req, res) => {
    try {
        const { registrationId } = req.params;

        // Validate registration ID
        if (!mongoose.isValidObjectId(registrationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid registration ID"
            });
        }

        // Find registration
        const registration = await Registration.findById(
            registrationId
        );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        // Check if already cancelled
        if (registration.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Registration is already cancelled"
            });
        }

        // Find associated event
        const event = await Event.findById(registration.event);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Associated event not found"
            });
        }

        // Update registration status
        registration.status = "cancelled";
        await registration.save();

        // Decrease registered count
        if (event.registeredCount > 0) {
            event.registeredCount -= 1;
            await event.save();
        }

        return res.status(200).json({
            success: true,
            message: "Registration cancelled successfully",
            data: registration
        });

    } catch (error) {
        console.error("Cancel Registration Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

