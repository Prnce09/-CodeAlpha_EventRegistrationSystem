
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["registered", "cancelled"],
            default: "registered"
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate registration for same event and email
registrationSchema.index(
    { event: 1, email: 1 },
    { unique: true }
);

const Registration = mongoose.model(
    "Registration",
    registrationSchema
);

export default Registration;
