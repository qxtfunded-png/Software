
import React, { useState, useEffect } from 'react';

const LiveUsers: React.FC = () => {
  const [users, setUsers] = useState(305);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => {
        // Natural fluctuation between 290 and 420
        const change = Math.floor(Math.random() * 7) - 3;
        const next = prev + change;
        return next < 290 ? 295 : next > 420 ? 410 : next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fadeIn pointer-events-none">
      <div className="bg-[#151921]/90 backdrop-blur-2xl border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-l-4 border-l-pink-500">
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
          <div className="absolute w-4 h-4 bg-green-500/30 rounded-full animate-ping"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-white tabular-nums italic">
              {users}
            </span>
            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">
              Online
            </span>
          </div>
          <span className="text-[7px] text-pink-500 font-black uppercase tracking-[0.2em] mt-0.5">
            Institutional Node 01
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveUsers;
