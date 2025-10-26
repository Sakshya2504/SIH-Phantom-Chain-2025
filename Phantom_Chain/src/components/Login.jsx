import { useState } from "react";

function Login({ onLogin, onSwitchToSignup }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login successful!");
                onLogin(result.user);
            } else {
                alert(result.errors?.[0] || result.message || "Login failed.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-300 px-4 py-12">
            <div className="max-w-md w-full bg-dark-100 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    Login to Phantom Chain
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Don't have an account?{" "}
                    <button
                        onClick={onSwitchToSignup}
                        className="text-green-400 hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
