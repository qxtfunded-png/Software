
import React from 'react';
import { AppState } from '../types';

interface LandingPageProps {
  onNavigate: (step: AppState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-[#0b0e11] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-16 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-6 mb-4">
             <div className="w-16 h-1 w-12 bg-pink-600 rounded-full"></div>
             <div className="text-pink-500 font-black text-xs uppercase tracking-[0.5em]">SYSTEM STABLE</div>
             <div className="w-16 h-1 w-12 bg-pink-600 rounded-full"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.9]">
            Finorix <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Update 2026</span>
          </h1>
          
          <p className="text-slate-500 text-sm md:text-lg font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto italic">
            Institutional Grade Binary Options Prediction Algorithm
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl">
          <button
            onClick={() => onNavigate(AppState.LICENSE_CHECK)}
            className="flex-1 group relative bg-[#151921] border border-slate-800 px-10 py-6 rounded-[2rem] transition-all duration-300 hover:border-pink-500 shadow-2xl overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/5 transition-all"></div>
            <div className="relative flex flex-col items-center gap-2">
               <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Authorized Entry</span>
               <span className="text-lg font-black text-white uppercase italic group-hover:text-pink-500 transition-colors">Enter Licence Key</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate(AppState.GET_SUBSCRIPTION)}
            className="flex-1 group relative bg-pink-600 px-10 py-6 rounded-[2rem] transition-all duration-300 shadow-[0_10px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_60px_rgba(236,72,153,0.4)] overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
            <div className="relative flex flex-col items-center gap-2">
               <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">New Deployment</span>
               <span className="text-lg font-black text-white uppercase italic tracking-wider">Get Subscription</span>
            </div>
          </button>
        </div>

        <div className="flex gap-12 text-[10px] font-black text-slate-700 uppercase tracking-widest border-t border-slate-900 pt-10 w-full justify-center">
           <div className="flex items-center gap-2">
              <span className="text-pink-600">●</span> 24/7 LIVE SUPPORT
           </div>
           <div className="flex items-center gap-2">
              <span className="text-pink-600">●</span> 98.4% SIGNAL ACCURACY
           </div>
           <div className="flex items-center gap-2">
              <span className="text-pink-600">●</span> SECURE PAYMENT GATEWAY
           </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-slate-800 tracking-[1em] uppercase">
        Encrypted Portal | Build 2.0.26
      </div>
    </div>
  );
};

export default LandingPage;
