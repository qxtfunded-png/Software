
import React, { useState } from 'react';
import { GET_LK } from '../constants';
import BrandLogo from './BrandLogo';

interface LicenseGateProps {
  onSuccess: () => void;
  onBack: () => void;
  ip?: string;
}

const LicenseGate: React.FC<LicenseGateProps> = ({ onSuccess, onBack, ip }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (!key.trim()) return;
    setIsVerifying(true);
    setError(false);
    
    setTimeout(() => {
      if (key === GET_LK()) {
        onSuccess();
      } else {
        setError(true);
        setIsVerifying(false);
      }
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#0b0e11] text-slate-200">
      <div className="w-full max-w-[380px] p-8 bg-[#151921] border border-white/5 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-fadeIn relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-pink-500 blur-md opacity-30"></div>

        <div className="flex justify-center mb-8 pt-4">
           <BrandLogo className="w-16 h-16 drop-shadow-[0_0_20px_rgba(153,27,27,0.3)]" />
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">Access Portal</h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase opacity-50 italic">Deployment v2.0 Final</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="ENTER LICENSE KEY"
                className={`w-full bg-[#0b0e11] border ${error ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-5 text-pink-500 placeholder:text-slate-800 focus:outline-none focus:border-pink-500/50 transition-all font-mono text-xl text-center font-black tracking-[0.1em] uppercase shadow-inner`}
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                <p className="text-red-500 text-[9px] font-black text-center uppercase tracking-[0.1em]">Verification Failure: Invalid Key</p>
              </div>
            )}
          </div>

          <div className="bg-[#0b0e11]/80 p-5 rounded-2xl border border-white/5 space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-slate-600 uppercase tracking-widest">Network Node</span>
              <span className="text-pink-500 font-bold">{ip || 'Detecting...'}</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono border-t border-white/5 pt-3">
              <span className="text-slate-600 uppercase tracking-widest">Protocol</span>
              <span className="text-green-500 font-bold uppercase italic tracking-tighter">Secured v2</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2 pb-4">
            <button
              onClick={handleVerify}
              disabled={isVerifying || !key.trim()}
              className="w-full py-5 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-900 disabled:text-slate-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-pink-600/30 active:scale-95 flex items-center justify-center uppercase tracking-widest italic text-xs"
            >
              {isVerifying ? (
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  VALIDATING...
                </span>
              ) : 'LOGIN TERMINAL'}
            </button>
            <button
              onClick={onBack}
              className="text-slate-700 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.5em] text-center"
            >
              ← Terminate Session
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-slate-800 text-[9px] font-black uppercase tracking-[0.4em] text-center max-w-[280px] leading-relaxed opacity-40 italic">
        Encrypted Signal Infrastructure <br/>
        All Sessions Are Logged
      </div>
    </div>
  );
};

export default LicenseGate;
