
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import eventRoutes from "./src/routes/event.routes.js";
import registrationRoutes from "./src/routes/registration.routes.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

await connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

//Event Routes API
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// Test API
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Event Registration System API is running!"
    });
});

// Server Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
