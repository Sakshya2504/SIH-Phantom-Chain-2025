import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./models/userSchema.js";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

try {
    await mongoose.connect("mongodb://localhost:27017/phantomchain");
    console.log("✅ Connected to MongoDB");
} catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
}

// --- Email Transporter Setup (Gmail SMTP) ---
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "youremail@gmail.com",       // your Gmail address
        pass: "your-app-password",         // use Gmail App Password (not your real password)
    },
});

// temporary in-memory store for OTPs
const otpStore = new Map(); // key: email, value: { otp, expiresAt }


app.get("/api/health", (req, res) => {
    res.send("Server is running!");
});

//Send OTP Route
app.post("/api/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(email, { otp, expiresAt });

    const mailOptions = {
        from: '"PhantomChain" <youremail@gmail.com>',
        to: email,
        subject: "Your OTP for Signup",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
});

//Verify OTP Route
app.post("/api/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp)
        return res.status(400).json({ error: "Email and OTP are required" });

    const record = otpStore.get(email);
    if (!record) return res.status(400).json({ error: "OTP not found" });
    if (Date.now() > record.expiresAt)
        return res.status(400).json({ error: "OTP expired" });
    if (record.otp !== otp)
        return res.status(400).json({ error: "Invalid OTP" });

    otpStore.delete(email); // remove after successful verification
    res.json({ success: true, message: "OTP verified successfully" });
});


//Signup Route
app.post("/api/signup", async (req, res) => {
    const { name, email, password, phone, photo } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ errors: ["User with this email already exists"] });
        }

        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                errors: ["Password must be between 6 and 10 characters long"],
            });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res
                .status(400)
                .json({ errors: ["Phone number must be 10 digits"] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            photo,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                photo: newUser.photo,
            },
        });
    } catch (err) {
        console.error("Signup error:", err);
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});


//Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: ["User with this email does not exist"] });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ errors: ["Invalid password"] });
        }

        res
            .status(200)
            .json({
                message: "Login successful",
                user: { name: user.name, email: user.email },
            });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
