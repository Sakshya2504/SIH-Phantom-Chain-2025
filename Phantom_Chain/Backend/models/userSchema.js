import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [20, "Name must be at most 20 characters long"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[\w.-]+@iiti\.ac\.in$/,
                "Email must be a valid @iiti.ac.in address",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
        },
        photo: {
            type: String, // store image URL or base64 string
            default: "", // can be empty initially
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
