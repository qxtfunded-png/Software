import React, { useState, useEffect, useCallback } from 'react';
import { AppState, UserDetails, Plan } from './types.ts';
import LandingPage from './components/LandingPage.tsx';
import LicenseGate from './components/LicenseGate.tsx';
import SubscriptionFlow from './components/SubscriptionFlow.tsx';
import Dashboard from './components/Dashboard.tsx';
import ExitScreen from './components/ExitScreen.tsx';
import LiveUsers from './components/LiveUsers.tsx';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.LANDING);
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', email: '' });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserDetails(prev => ({ 
          ...prev, 
          ip: data.ip,
          deviceId: `${navigator.platform}-${navigator.userAgent.slice(0, 20)}`
        }));
      } catch (e) {
        setUserDetails(prev => ({ 
          ...prev, 
          ip: 'Local/Restricted', 
          deviceId: 'Anonymous-Web' 
        }));
      }
    };
    fetchIp();
  }, []);

  const handleStepChange = useCallback((step: AppState) => {
    setCurrentStep(step);
  }, []);

  const renderContent = () => {
    switch (currentStep) {
      case AppState.LANDING:
        return <LandingPage onNavigate={handleStepChange} />;
      case AppState.LICENSE_CHECK:
        return (
          <LicenseGate 
            onSuccess={() => handleStepChange(AppState.DASHBOARD)} 
            onBack={() => handleStepChange(AppState.LANDING)}
            ip={userDetails.ip}
          />
        );
      case AppState.GET_SUBSCRIPTION:
      case AppState.PLAN_SELECTION:
      case AppState.PAYMENT_GATEWAY:
        return (
          <SubscriptionFlow 
            step={currentStep}
            userDetails={userDetails}
            selectedPlan={selectedPlan}
            setUserDetails={setUserDetails}
            setSelectedPlan={setSelectedPlan}
            onStepChange={handleStepChange}
          />
        );
      case AppState.DASHBOARD:
        return <Dashboard onExit={() => handleStepChange(AppState.EXIT)} />;
      case AppState.EXIT:
        return <ExitScreen />;
      default:
        return <LandingPage onNavigate={handleStepChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-pink-500/30">
      <LiveUsers />
      {renderContent()}
    </div>
  );
};

export default App;