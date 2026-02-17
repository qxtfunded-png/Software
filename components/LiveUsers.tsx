import React, { useState, useEffect } from 'react';

const LiveUsers: React.FC = () => {
  const [users, setUsers] = useState(305);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => {
        // Fluctuates naturally around 300-400
        const change = Math.floor(Math.random() * 8) - 4;
        const next = prev + change;
        return next < 285 ? 290 : next > 420 ? 415 : next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fadeIn pointer-events-none">
      <div className="bg-[#151921]/90 backdrop-blur-2xl border border-white/10 px-5 py-3 rounded-[1.5rem] flex items-center gap-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] group">
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]"></div>
          <div className="absolute w-5 h-5 bg-green-500/30 rounded-full animate-ping"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-white tabular-nums leading-none italic">
              {users}
            </span>
            <span className="text-[10px] font-black text-white/50 uppercase tracking-tighter leading-none">
              Online
            </span>
          </div>
          <span className="text-[7px] text-green-500 font-black uppercase tracking-[0.3em] mt-1.5">
            LIVE SIGNAL NODE
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveUsers;