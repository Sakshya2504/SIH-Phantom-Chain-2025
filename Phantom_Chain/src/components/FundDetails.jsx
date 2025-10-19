import { useState } from 'react';
import InvestmentModal from './InvestmentModal';

function FundDetails({ fund, onBack }) {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState(1);

    const calculateUnits = () => {
        if (!investmentAmount || isNaN(investmentAmount)) return '0.00';
        return (parseFloat(investmentAmount) / fund.nav).toFixed(2);
    };

    const handleInvestNow = () => {
        if (investmentAmount && parseFloat(investmentAmount) >= fund.minInvestment) {
            setModalStep(1);
            setShowModal(true);
        }
    };

    const handleConfirmInvestment = () => {
        setModalStep(2);
        // Simulate processing
        setTimeout(() => {
            setModalStep(3);
        }, 3000);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalStep(1);
    };

    const handleViewPortfolio = () => {
        setShowModal(false);
        onBack();
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-dark-100 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="text-gray-400 hover:text-white transition"
                        >
                            ← Back
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Phantom Chain</h1>
                            <p className="text-sm text-gray-400">Blockchain Mutual Funds</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-300">Network: Active</span>
                        <span className="text-gray-300">Investor</span>
                        <span className="text-gray-300">Admin</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Fund Header */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-800">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h2 className="text-3xl font-bold text-white">{fund.name}</h2>
                                        {fund.verified && (
                                            <span className="text-green-400 text-xl">✓</span>
                                        )}
                                    </div>
                                    <p className="text-gray-400">{fund.category} • Verified</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">₹{fund.nav}</div>
                                    <div className="text-sm text-gray-400">Current NAV</div>
                                    <div className="text-green-400 font-semibold">{fund.returns1Y}</div>
                                </div>
                            </div>
                            <p className="text-gray-300">{fund.description}</p>
                        </div>

                        {/* Smart Contract Address */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-800">
                            <h3 className="text-sm text-gray-400 mb-2">Smart Contract Address</h3>
                            <div className="font-mono text-sm text-gray-300 break-all bg-dark-300 p-3 rounded-lg">
                                {fund.contractAddress}
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-800">
                            <h3 className="text-xl font-bold mb-4">Key Metrics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">AUM</div>
                                    <div className="text-xl font-semibold text-white">{fund.aum}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Fund Manager</div>
                                    <div className="text-xl font-semibold text-white">{fund.fundManager}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Expense Ratio</div>
                                    <div className="text-xl font-semibold text-white">{fund.expenseRatio}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Risk Level</div>
                                    <div className="text-xl font-semibold text-white">{fund.risk}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Min Investment</div>
                                    <div className="text-xl font-semibold text-white">₹{fund.minInvestment}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Exit Load</div>
                                    <div className="text-sm font-semibold text-white">{fund.exitLoad}</div>
                                </div>
                            </div>
                        </div>

                        {/* Top Holdings */}
                        <div className="bg-dark-100 rounded-2xl p-6 border border-gray-800">
                            <h3 className="text-xl font-bold mb-4">Top Holdings</h3>
                            <div className="space-y-3">
                                {fund.topHoldings.map((holding, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-gray-300">{holding.name}</span>
                                        <div className="flex items-center gap-4 flex-1 ml-4">
                                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{ width: holding.percentage }}
                                                ></div>
                                            </div>
                                            <span className="text-white font-semibold w-12 text-right">
                                                {holding.percentage}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Investment Calculator */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-100 rounded-2xl p-6 border border-green-500/30 sticky top-4">
                            <h3 className="text-xl font-bold mb-6">Investment Calculator</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-gray-400 text-sm block mb-2">
                                        Investment Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            value={investmentAmount}
                                            onChange={(e) => setInvestmentAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full bg-dark-300 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-white focus:border-green-500 focus:outline-none"
                                            min={fund.minInvestment}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Minimum investment: ₹{fund.minInvestment}
                                    </p>
                                </div>

                                <div className="bg-dark-300 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-sm">Investment Amount</span>
                                        <span className="text-white font-semibold">
                                            ₹{investmentAmount || '0'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-sm">NAV</span>
                                        <span className="text-white font-semibold">₹{fund.nav}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-sm">Units Allocated</span>
                                        <span className="text-green-400 font-bold text-lg">
                                            {calculateUnits()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-sm">Settlement Time</span>
                                        <span className="text-white font-semibold">~30 seconds</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleInvestNow}
                                disabled={!investmentAmount || parseFloat(investmentAmount) < fund.minInvestment}
                                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300"
                            >
                                Invest Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Modal */}
            {showModal && (
                <InvestmentModal
                    fund={fund}
                    investmentAmount={investmentAmount}
                    units={calculateUnits()}
                    step={modalStep}
                    onConfirm={handleConfirmInvestment}
                    onClose={handleCloseModal}
                    onViewPortfolio={handleViewPortfolio}
                />
            )}
        </div>
    );
}

export default FundDetails;
