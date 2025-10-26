import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import FundDetails from "./components/FundDetails";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [selectedFund, setSelectedFund] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage("welcome");
  };

  const handleSignup = () => {
    setCurrentPage("login");
  };

  const handleViewFund = (fund) => {
    setSelectedFund(fund);
    setCurrentPage("fund-details");
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
    setSelectedFund(null);
  };

  // (mock data same as before)
  // ... your fundsData and portfolioData ...
  // Mock data for funds
  const fundsData = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap',
      nav: 756.23,
      aum: '₹45,230 Cr',
      returns1Y: '+12.45%',
      risk: 'Moderate',
      verified: true,
      description: 'A diversified equity fund that invests in top 100 companies by market capitalization.',
      contractAddress: '0x1a2b3c4d5e6f7g8h9i0j1k213m4n5o6p7q8r9s0t',
      fundManager: 'Prashant Jain',
      expenseRatio: '1.05%',
      minInvestment: 500,
      exitLoad: '1% (if redeemed within 1 year)',
      topHoldings: [
        { name: 'Reliance Industries', percentage: '8.5%' },
        { name: 'HDFC Bank', percentage: '7.2%' },
        { name: 'Infosys', percentage: '6.8%' },
        { name: 'TCS', percentage: '6.1%' },
        { name: 'ICICI Bank', percentage: '5.9%' }
      ]
    },
    {
      id: 2,
      name: 'ICICI Prudential Bluechip',
      category: 'Large Cap',
      nav: 89.67,
      aum: '₹32,450 Cr',
      returns1Y: '+15.23%',
      risk: 'Low',
      verified: true,
      description: 'A large cap equity fund focusing on blue chip companies with consistent performance.',
      contractAddress: '0x9s8r7q6p5o4n3m2k1j0i9h8g7f6e5d4c3b2a1z',
      fundManager: 'S. Naren',
      expenseRatio: '0.98%',
      minInvestment: 500,
      exitLoad: '1% (if redeemed within 1 year)',
      topHoldings: [
        { name: 'HDFC Bank', percentage: '9.2%' },
        { name: 'ICICI Bank', percentage: '8.1%' },
        { name: 'Infosys', percentage: '7.5%' },
        { name: 'Reliance Industries', percentage: '6.9%' },
        { name: 'TCS', percentage: '6.3%' }
      ]
    }
  ];

  // Mock portfolio data
  const portfolioData = {
    totalValue: '₹1,25,000',
    invested: '₹1,00,000',
    gains: '₹25,000',
    returns: '22.84%'
  };

  return (
    <div className="min-h-screen bg-dark-300">
      {currentPage === "login" && (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentPage("signup")}
        />
      )}
      {currentPage === "signup" && (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
      )}
      {currentPage === "welcome" && (
        <LandingPage onStart={() => setCurrentPage("dashboard")} />
      )}
      {currentPage === "dashboard" && (
        <Dashboard
          fundsData={fundsData}
          portfolioData={portfolioData}
          onViewFund={handleViewFund}
        />
      )}
      {currentPage === "fund-details" && selectedFund && (
        <FundDetails fund={selectedFund} onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;
