
import React, { useState } from 'react';
import { AppState, UserDetails, Plan } from '../types';
import { PLANS, CRYPTO_ADDRESSES, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../constants';

interface SubscriptionFlowProps {
  step: AppState;
  userDetails: UserDetails;
  selectedPlan: Plan | null;
  setUserDetails: (details: UserDetails) => void;
  setSelectedPlan: (plan: Plan) => void;
  onStepChange: (step: AppState) => void;
}

export default function SubscriptionFlow({
  step,
  userDetails,
  selectedPlan,
  setUserDetails,
  setSelectedPlan,
  onStepChange,
}: SubscriptionFlowProps) {
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<typeof CRYPTO_ADDRESSES[0] | null>(null);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetails.name && userDetails.email) {
      onStepChange(AppState.PLAN_SELECTION);
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    onStepChange(AppState.PAYMENT_GATEWAY);
  };

  const handlePaymentSubmit = async () => {
    if (!proofFile) {
      alert('Please upload the payment screenshot first.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const message = `
🔥 **NEW ORDER: ${selectedPlan?.name}** 🔥
━━━━━━━━━━━━━━━━━━━━━━━━
👤 **Customer:** ${userDetails.name}
📧 **Email:** ${userDetails.email}
💎 **Plan:** ${selectedPlan?.name} ($${selectedPlan?.price})
🌐 **Network:** ${selectedNetwork?.network}
━━━━━━━━━━━━━━━━━━━━━━━━
📍 **IP:** ${userDetails.ip}
📱 **Device:** ${userDetails.deviceId}
━━━━━━━━━━━━━━━━━━━━━━━━
(License will be sent to Gmail: ${userDetails.email})
`;
      
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('photo', proofFile);
      formData.append('caption', message);
      formData.append('parse_mode', 'Markdown');

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('ORDER SUBMITTED! Your license key will be sent to your Gmail (' + userDetails.email + ') shortly.');
        onStepChange(AppState.LANDING);
      } else {
        throw new Error('Telegram bot rejected the request.');
      }
    } catch (err) {
      alert('Error during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4 bg-[#0b0e11] text-slate-200 antialiased overflow-hidden">
      <div className="w-full max-w-sm">
        
        {step === AppState.GET_SUBSCRIPTION && (
          <div className="bg-[#151921] border border-white/[0.1] p-6 rounded-[2.5rem] shadow-2xl space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Registration</h2>
              <p className="text-slate-500 font-bold text-[8px] tracking-widest uppercase opacity-70">Secured Database Link</p>
            </div>

            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div className="space-y-3">
                <input
                  required
                  type="text"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  className="w-full bg-[#0b0e11] border border-white/[0.1] rounded-2xl px-5 py-4 text-white focus:border-pink-500 outline-none transition-all placeholder:text-slate-900 font-bold text-xs"
                  placeholder="Full Name"
                />
                <input
                  required
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  className="w-full bg-[#0b0e11] border border-white/[0.1] rounded-2xl px-5 py-4 text-white focus:border-pink-500 outline-none transition-all placeholder:text-slate-900 font-bold text-xs"
                  placeholder="Your Gmail Address"
                />
                <div className="p-4 bg-pink-500/5 border border-pink-500/10 rounded-2xl">
                  <p className="text-pink-400 font-black text-[9px] uppercase tracking-widest leading-tight italic text-center">
                    IMPORTANT: YOUR LICENSE KEY WILL BE SENT TO YOUR GMAIL AFTER PAYMENT CONFIRMATION.
                  </p>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-5 bg-pink-600 hover:bg-pink-500 text-white font-black rounded-2xl transition-all shadow-lg uppercase tracking-widest italic text-xs active:scale-95"
              >
                PROCEED TO PLANS
              </button>
            </form>
          </div>
        )}

        {step === AppState.PLAN_SELECTION && (
          <div className="animate-fadeIn space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Choose Plan</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {PLANS.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className="bg-[#151921] border border-white/[0.1] p-5 rounded-3xl hover:border-pink-500 transition-all cursor-pointer flex justify-between items-center active:scale-[0.98] shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/5 transition-all"></div>
                  <div className="flex flex-col relative z-10">
                    <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">{plan.tag.split(' / ')[0]}</span>
                    <span className="text-base font-black text-white uppercase italic tracking-tighter">{plan.name}</span>
                  </div>
                  <div className="text-2xl font-black text-white italic relative z-10">
                    <span className="text-xs text-pink-500 mr-1">$</span>{plan.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === AppState.PAYMENT_GATEWAY && selectedPlan && (
          <div className="animate-fadeIn bg-[#151921] border border-white/[0.1] p-6 rounded-[2.5rem] shadow-2xl space-y-5">
            {!selectedNetwork ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Payment Node</h2>
                  <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest opacity-60">Select Network</p>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-[45vh] overflow-y-auto custom-scrollbar pr-1">
                  {CRYPTO_ADDRESSES.map((crypto) => (
                    <button 
                      key={crypto.network}
                      onClick={() => setSelectedNetwork(crypto)}
                      className="p-4 bg-[#0b0e11] border border-white/[0.05] rounded-2xl flex items-center gap-4 hover:border-pink-500 transition-all text-left"
                    >
                      <img src={crypto.logo} alt={crypto.network} className="w-8 h-8 object-contain" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{crypto.network}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
                  <button onClick={() => setSelectedNetwork(null)} className="text-slate-500 text-[10px] font-black uppercase tracking-widest">← Back</button>
                  <div className="text-right">
                    <div className="text-xl font-black text-pink-500 italic leading-none">${selectedPlan.price}</div>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <div className="p-4 bg-[#0b0e11] border border-white/5 rounded-2xl space-y-4">
                    <div className="text-[10px] font-black text-indigo-400 uppercase italic">Send Funds To:</div>
                    <div className="text-[11px] font-mono text-slate-300 break-all leading-relaxed p-3 bg-[#151921] rounded-xl border border-white/[0.05] select-all shadow-inner">
                      {selectedNetwork.address}
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedNetwork.address);
                        alert('Wallet Address Copied!');
                      }}
                      className="text-[9px] font-black text-pink-500 uppercase tracking-widest border border-pink-500/20 px-6 py-2.5 rounded-full hover:bg-pink-500 hover:text-white transition-all active:scale-95"
                    >
                      Copy Wallet
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Submit Proof Of Payment</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="proof-upload"
                    />
                    <label 
                      htmlFor="proof-upload"
                      className="w-full flex flex-col items-center justify-center bg-[#0b0e11] border border-dashed border-white/[0.1] rounded-2xl p-6 cursor-pointer hover:border-pink-500 transition-all"
                    >
                      {proofFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                          <span className="text-green-500 font-black text-[9px] uppercase truncate max-w-[200px]">{proofFile.name}</span>
                        </div>
                      ) : (
                        <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Select Screenshot</span>
                      )}
                    </label>
                  </div>

                  <div className="p-4 bg-pink-500/5 rounded-2xl border border-pink-500/10">
                    <p className="text-pink-500 font-black text-[9px] text-center uppercase italic">
                       LICENSE KEY WILL BE SENT TO YOUR GMAIL AFTER VERIFICATION.
                    </p>
                  </div>

                  <button 
                    onClick={handlePaymentSubmit}
                    disabled={isSubmitting || !proofFile}
                    className="w-full py-5 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-900 disabled:text-slate-800 text-white font-black rounded-2xl transition-all shadow-xl shadow-pink-600/30 uppercase tracking-widest italic text-sm"
                  >
                    {isSubmitting ? 'VERIFYING...' : 'BUY PLAN'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
