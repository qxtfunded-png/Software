
import React from 'react';

const ExitScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 px-4 space-y-8 animate-fadeIn">
      <div className="w-24 h-24 bg-pink-600/10 border border-pink-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)]">
         <div className="w-12 h-12 bg-pink-600 rounded-full animate-ping opacity-20"></div>
         <div className="absolute text-pink-500 text-4xl">👋</div>
      </div>
      
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
          Session Terminated
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-md">
          We are happy to see you again soon. Your settings and data have been safely archived.
        </p>
      </div>
      
      <div className="pt-8 flex gap-4">
         <button 
           onClick={() => window.location.reload()}
           className="px-8 py-3 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl hover:text-white hover:border-pink-500 transition-all text-sm font-bold"
         >
           RE-ENTER SYSTEM
         </button>
      </div>

      <p className="text-[10px] font-mono text-slate-600 absolute bottom-12 uppercase tracking-widest">
        Finorix Protocol Version 2.0.26 Final Stable
      </p>
    </div>
  );
};

export default ExitScreen;
