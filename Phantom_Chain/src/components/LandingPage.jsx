function LandingPage({ onStart }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-6xl w-full">
                {/* Main Title */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Welcome to Phantom Chain
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4">
                        The Future of Mutual Fund Investments
                    </p>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Experience the future of mutual fund investments with blockchain technology
                    </p>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Instant Settlement */}
                    <div className="bg-dark-100 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Instant Settlement</h3>
                        <p className="text-gray-400">
                            T+0 settlement powered by blockchain technology
                        </p>
                    </div>

                    {/* Complete Transparency */}
                    <div className="bg-dark-100 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Complete Transparency</h3>
                        <p className="text-gray-400">
                            Every transaction recorded on immutable blockchain
                        </p>
                    </div>

                    {/* Bank-Grade Security */}
                    <div className="bg-dark-100 rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition-all duration-300">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Bank-Grade Security</h3>
                        <p className="text-gray-400">
                            Smart contracts ensure secure and automated transactions
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border border-green-500/30 mb-12">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">₹45.2Cr</div>
                            <div className="text-gray-300 text-sm md:text-base">Total Volume</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">12,847</div>
                            <div className="text-gray-300 text-sm md:text-base">Transactions</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">0.4s</div>
                            <div className="text-gray-300 text-sm md:text-base">Avg Settlement</div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button
                        onClick={onStart}
                        className="bg-green-500 hover:bg-green-600 text-white text-xl font-semibold px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
                    >
                        Let's Start →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
