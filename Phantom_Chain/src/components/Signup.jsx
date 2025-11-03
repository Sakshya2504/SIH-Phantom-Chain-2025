import { useState } from "react";

function Signup({ onSignup, onSwitchToLogin }) {
    const [step, setStep] = useState(1); // 1: email+OTP, 2: full signup
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [phone, setPhone] = useState("");

    //Step 1: Send OTP
    const handleSendOtp = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsOtpSent(true);
                alert("OTP sent to your email!");
            } else {
                alert(data.message || "Failed to send OTP.");
            }
        } catch (err) {
            console.error("Send OTP error:", err);
            alert("Something went wrong.");
        }
    };

    //Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (data.success) {
                setIsOtpVerified(true);
                setStep(2);
                alert("OTP verified successfully!");
            } else {
                alert(data.error || "Invalid OTP.");
            }
        } catch (err) {
            console.error("Verify OTP error:", err);
            alert("Something went wrong.");
        }
    };

    //Step 3: Signup after OTP verification
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone,
                    photo: userPhoto || "default.png",
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Signup successful! Please login.");
                onSwitchToLogin();
            } else {
                alert(data.errors?.[0] || data.message || "Signup failed.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-300 px-4 py-12">
            <div className="max-w-md w-full bg-dark-100 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    {step === 1 ? "Verify Email" : "Create Account"}
                </h2>

                {/* STEP 1: Email + OTP */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@iiti.ac.in"
                                className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        {!isOtpSent && (
                            <button
                                onClick={handleSendOtp}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                            >
                                Send OTP
                            </button>
                        )}

                        {isOtpSent && (
                            <>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Enter OTP</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        placeholder="6-digit OTP"
                                        className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleVerifyOtp}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* STEP 2: Full Signup Form */}
                {step === 2 && (
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Your full name"
                                className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="Your phone number"
                                className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Profile Photo URL</label>
                            <input
                                type="text"
                                value={userPhoto}
                                onChange={(e) => setUserPhoto(e.target.value)}
                                placeholder="Optional"
                                className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••"
                                className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••"
                                className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-green-400 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signup;
