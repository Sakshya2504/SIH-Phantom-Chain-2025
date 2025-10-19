import { useState } from 'react';

function Signup({ onSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password && password === confirmPassword) {
            onSignup();
        }
    };

    // function handleSubmit1 = (e) =>{
    //     e,preventDefault();
    //     if(password !)
    // }

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-300 px-4 py-12">
            <div className="max-w-md w-full bg-dark-100 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    Sign Up for Phantom Chain
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white
                         focus:border-green-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white
                         focus:border-green-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-dark-300 border border-gray-700 rounded-lg px-4 py-3 text-white
                         focus:border-green-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3
                       rounded-lg transition-all duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
