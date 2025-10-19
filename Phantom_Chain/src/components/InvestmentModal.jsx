function InvestmentModal({ fund, investmentAmount, units, step, onConfirm, onClose, onViewPortfolio }) {
    const networkFee = 2.50;
    const totalAmount = parseFloat(investmentAmount) + networkFee;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-100 rounded-2xl border border-gray-800 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Step 1: Confirm Investment */}
                {step === 1 && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Confirm Investment</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="bg-dark-300 rounded-lg p-6 space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Fund</span>
                                <span className="text-white font-semibold">{fund.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Investment Amount</span>
                                <span className="text-white font-semibold">₹{investmentAmount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">NAV</span>
                                <span className="text-white font-semibold">₹{fund.nav}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Units</span>
                                <span className="text-white font-semibold">{units}</span>
                            </div>
                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Network Fee</span>
                                    <span className="text-white font-semibold">₹{networkFee.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-white font-bold">Total</span>
                                <span className="text-green-400 font-bold">₹{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                            >
                                Confirm Investment
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Processing Transaction */}
                {step === 2 && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Processing Transaction</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center py-12">
                            {/* Loading Spinner */}
                            <div className="relative mb-8">
                                <div className="w-20 h-20 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin"></div>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2">
                                Broadcasting Transaction
                            </h3>
                            <p className="text-gray-400 text-center mb-8">
                                Please wait while we process your investment...
                            </p>

                            <div className="bg-dark-300 rounded-lg p-4 w-full">
                                <p className="text-sm text-gray-400 text-center">
                                    Expected settlement time: <span className="text-white font-semibold">~30 seconds</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Investment Successful */}
                {step === 3 && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Investment Successful</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center py-8">
                            {/* Success Icon */}
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="w-12 h-12 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-green-400 mb-2">
                                Investment Successful!
                            </h3>
                            <p className="text-gray-400 text-center mb-8">
                                Your investment has been confirmed on the blockchain
                            </p>

                            <div className="bg-dark-300 rounded-lg p-6 space-y-4 w-full mb-8">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Transaction Hash</span>
                                    <span className="text-white font-mono text-sm">0x1a2b3c4d...</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Block Confirmation</span>
                                    <span className="text-white font-semibold">#1,234,567</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Settlement Time</span>
                                    <span className="text-green-400 font-bold">0.3 seconds</span>
                                </div>
                            </div>

                            <button
                                onClick={onViewPortfolio}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                            >
                                View Portfolio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InvestmentModal;
