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
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#0b0e11] text-slate-200 antialiased overflow-hidden">
      <div className="w-full max-w-[380px] p-10 bg-[#151921] border border-white/5 rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.95)] animate-fadeIn relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
           <div className="p-5 bg-[#151921] border border-white/10 rounded-[2.5rem] shadow-2xl">
              <BrandLogo className="w-14 h-14 drop-shadow-[0_0_20px_rgba(153,27,27,0.4)]" />
           </div>
        </div>
        
        <div className="text-center mt-8 mb-10">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-3">Node Access</h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase opacity-50">Authorized Entry Only</p>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="PASTE LICENSE KEY"
                className={`w-full bg-[#0b0e11] border ${error ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]' : 'border-white/10'} rounded-3xl px-6 py-6 text-pink-500 placeholder:text-slate-900 focus:outline-none focus:border-pink-500/70 transition-all font-mono text-2xl text-center font-black tracking-[0.2em] uppercase shadow-inner`}
              />
              <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${isVerifying ? 'opacity-100' : 'opacity-0'} border-2 border-pink-500/20 blur-sm`}></div>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-2xl animate-shake">
                <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-[0.2em]">
                  Security Alert: Key Validation Failed
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#0b0e11]/60 p-6 rounded-[2rem] border border-white/5 space-y-4 shadow-inner">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-600 uppercase tracking-widest">Network ID</span>
              <span className="text-pink-500 font-black">{ip || 'Resolving...'}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-4">
              <span className="text-slate-600 uppercase tracking-widest">System Protocol</span>
              <span className="text-green-500 font-black uppercase tracking-tighter italic">V2 Encrypted</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-2">
            <button
              onClick={handleVerify}
              disabled={isVerifying || !key.trim()}
              className="w-full py-6 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-900/50 disabled:text-slate-700 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-pink-600/40 active:scale-95 flex items-center justify-center uppercase tracking-widest italic text-sm"
            >
              {isVerifying ? (
                <span className="flex items-center gap-4">
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : 'Open Terminal'}
            </button>
            <button
              onClick={onBack}
              className="text-slate-700 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.6em] text-center"
            >
              ← Terminate Session
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-14 text-slate-800 text-[10px] font-black uppercase tracking-[0.4em] text-center max-w-[300px] leading-relaxed opacity-40 italic">
        Secured Node Infrastructure <br/>
        Institutional Use Only
      </div>
    </div>
  );
};

export default LicenseGate;