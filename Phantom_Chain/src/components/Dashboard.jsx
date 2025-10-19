function Dashboard({ fundsData, portfolioData, onViewFund }) {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-dark-100 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Phantom Chain</h1>
                        <p className="text-sm text-gray-400">Blockchain Mutual Funds</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-300 hover:text-green-400 cursor-pointer transition">Network</span>
                        <span className="text-gray-300 hover:text-green-400 cursor-pointer transition">Investor</span>
                        <span className="text-gray-300 hover:text-green-400 cursor-pointer transition">Admin</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Portfolio Overview */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-6">Portfolio Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Total Portfolio Value</div>
                                    <div className="text-2xl font-bold text-white">{portfolioData.totalValue}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Invested</div>
                                    <div className="text-2xl font-bold text-white">{portfolioData.invested}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Gains</div>
                                    <div className="text-2xl font-bold text-green-400">{portfolioData.gains}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Returns</div>
                                    <div className="text-2xl font-bold text-green-400">{portfolioData.returns}</div>
                                </div>
                            </div>
                            <button className="text-green-400 text-sm hover:text-green-300 transition">
                                Click to view detailed portfolio →
                            </button>
                        </div>

                        {/* Available Mutual Funds */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Available Mutual Funds</h2>
                            <div className="space-y-4">
                                {fundsData.map((fund) => (
                                    <div
                                        key={fund.id}
                                        className="bg-dark-100 rounded-2xl p-6 border border-gray-800 hover:border-green-500 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-white">{fund.name}</h3>
                                                    {fund.verified && (
                                                        <span className="text-green-400">✓</span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-sm">{fund.category}</p>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                                                <div>
                                                    <div className="text-gray-400 text-xs mb-1">NAV</div>
                                                    <div className="font-semibold text-white">₹{fund.nav}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs mb-1">AUM</div>
                                                    <div className="font-semibold text-white">{fund.aum}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs mb-1">Returns (1Y)</div>
                                                    <div className="font-semibold text-green-400">{fund.returns1Y}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs mb-1">Risk</div>
                                                    <div className="font-semibold text-white">{fund.risk}</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => onViewFund(fund)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 whitespace-nowrap"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Network Metrics */}
                    <div className="space-y-6">
                        {/* Settlement Speed */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-800">
                            <h3 className="text-lg font-bold mb-4">Live Network Metrics</h3>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Settlement Speed</span>
                                    <span className="text-2xl font-bold text-green-400">0.3s</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Last Settlement
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Average: 0.4s | Best: 0.1s
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Network Speed</span>
                                    <span className="text-green-400 text-sm font-semibold">Optimal</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Network Status Indicator */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-green-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-semibold">Network: Active</span>
                            </div>
                            <div className="text-xs text-gray-400">
                                All systems operational
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
