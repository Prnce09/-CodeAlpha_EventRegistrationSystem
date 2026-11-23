
import Event from "../models/event.model.js";
import mongoose from "mongoose";

// Create a new event
export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            location,
            capacity
        } = req.body;

        // Check required fields
        if (
            !title ||
            !description ||
            !date ||
            !location ||
            capacity === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate date and capacity
        if (
            Number.isNaN(new Date(date).getTime()) ||
            !Number.isInteger(capacity) ||
            capacity < 1
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid date or capacity"
            });
        }

        // Save event in MongoDB
        const newEvent = await Event.create({
            title,
            description,
            date,
            location,
            capacity
        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });

    } catch (error) {
        console.error("Create Event Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            count: events.length,
            data: events
        });

    } catch (error) {
        console.error("Get Events Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get a single event by ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID"
            });
        }

        // Find event in MongoDB
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event fetched successfully",
            data: event
        });

    } catch (error) {
        console.error("Get Event Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
