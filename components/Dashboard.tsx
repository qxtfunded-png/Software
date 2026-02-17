import React, { useState, useEffect, useMemo, useRef } from 'react';
import { OTC_PAIRS } from '../constants';
import { TradingPair } from '../types';
import BrandLogo from './BrandLogo';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const Dashboard: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [selectedPair, setSelectedPair] = useState<TradingPair>(OTC_PAIRS[0]);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showPairSelector, setShowPairSelector] = useState(false);
  
  const lastMinuteHandled = useRef<number>(-1);
  const visibleCount = 12; 

  const generateRealisticCandle = (prevClose: number) => {
    const open = prevClose;
    // Body size: 4.0 to 14.0 for "Lmbi" look, random direction with slight volatility
    const direction = Math.random() > 0.5 ? 1 : -1;
    const bodySize = (Math.random() * 10 + 4) * direction;
    const close = open + bodySize;
    // Wicks: realistic extension beyond body
    const high = Math.max(open, close) + (Math.random() * 5);
    const low = Math.min(open, close) - (Math.random() * 5);
    return { open, close, high, low };
  };

  useEffect(() => {
    // Initial history generation
    let basePrice = selectedPair.price;
    const initialCandles: Candle[] = [];
    let lastPrice = basePrice;

    for (let i = 0; i < 50; i++) {
      const c = generateRealisticCandle(lastPrice);
      initialCandles.push({
        time: Date.now() - (50 - i) * 60000,
        ...c
      });
      lastPrice = c.close;
    }
    setCandles(initialCandles);
    lastMinuteHandled.current = new Date().getMinutes();

    const mainLoop = setInterval(() => {
      const now = new Date();
      const currentSecond = now.getSeconds();
      const currentMinute = now.getMinutes();
      
      // Update countdown timer
      setTimeLeft(59 - currentSecond);

      setCandles(prev => {
        if (prev.length === 0) return prev;
        const currentCandles = [...prev];
        const lastIndex = currentCandles.length - 1;
        const last = { ...currentCandles[lastIndex] };

        // Check if a new minute has started
        if (currentMinute !== lastMinuteHandled.current && currentSecond === 0) {
          lastMinuteHandled.current = currentMinute;
          // Start a new candle based on the final close of the previous one
          const nextData = generateRealisticCandle(last.close);
          const newCandle = {
            time: Date.now(),
            ...nextData
          };
          return [...currentCandles.slice(1), newCandle];
        }

        // Live market movement for the active candle
        // Small random fluctuations to mimic real liquidity
        const tick = (Math.random() - 0.5) * 1.2;
        last.close += tick;
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        
        currentCandles[lastIndex] = last;
        return currentCandles;
      });
    }, 250); // High frequency tick for smooth 8K feel

    return () => clearInterval(mainLoop);
  }, [selectedPair]);

  const visibleCandles = useMemo(() => candles.slice(-visibleCount), [candles]);

  // Robust Vertical Centering logic - keeps the last candle centered
  const { minVal, maxVal, rangeVal } = useMemo(() => {
    if (visibleCandles.length === 0) return { minVal: 0, maxVal: 1, rangeVal: 1 };
    const values = visibleCandles.flatMap(c => [c.low, c.high]);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    
    // Center based on the last candle's current price
    const lastPrice = visibleCandles[visibleCandles.length - 1].close;
    const mid = lastPrice;
    
    // Dynamic span based on volatility but with a minimum floor
    const rawSpan = rawMax - rawMin;
    const span = Math.max(rawSpan * 1.6, 25); 
    
    return {
      minVal: mid - span / 2,
      maxVal: mid + span / 2,
      rangeVal: span || 1
    };
  }, [visibleCandles]);

  const scaleY = (val: number) => 100 - ((val - minVal) / rangeVal) * 100;

  const renderCandle = (candle: Candle, index: number) => {
    const isGreen = candle.close >= candle.open;
    const color = isGreen ? '#22c55e' : '#ef4444';
    const xPos = (index / visibleCount) * 100;
    // Professional thick candles
    const candleWidth = (1 / visibleCount) * 100 * 0.90; 
    
    return (
      <g key={index} style={{ shapeRendering: 'crispEdges' }}>
        <line 
          x1={`${xPos + candleWidth/2}%`} 
          y1={`${scaleY(candle.high)}%`} 
          x2={`${xPos + candleWidth/2}%`} 
          y2={`${scaleY(candle.low)}%`} 
          stroke={color} 
          strokeWidth="1.5" 
        />
        <rect 
          x={`${xPos}%`} 
          y={`${scaleY(Math.max(candle.open, candle.close))}%`} 
          width={`${candleWidth}%`} 
          height={`${Math.max(1.5, Math.abs(scaleY(candle.open) - scaleY(candle.close)))}%`} 
          fill={color} 
          rx="0.5"
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b0e11] text-white overflow-hidden font-sans select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#151921] border-b border-white/5 z-30">
         <div className="flex items-center gap-3">
            <BrandLogo className="w-9 h-9" />
            <div className="flex flex-col">
               <span className="text-xs font-black uppercase italic tracking-tighter">Finorix Update</span>
               <span className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">V2 FINAL STABLE</span>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-[9px] font-black uppercase text-green-500 tracking-wider">M1 Live Chart</span>
         </div>
      </div>

      {/* Asset Switcher */}
      <div className="px-5 pt-4 pb-2 z-30">
         <div 
           onClick={() => setShowPairSelector(true)}
           className="bg-[#151921] rounded-2xl p-4 flex items-center justify-between border border-white/5 active:scale-95 transition-all cursor-pointer shadow-lg"
         >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-[#0b0e11] rounded-xl flex items-center justify-center border border-white/10">
                  <BrandLogo className="w-6 h-6" />
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-tight">{selectedPair.symbol}</span>
                  <span className="text-[8px] text-slate-500 font-mono tracking-widest uppercase">OTC Server Node 01</span>
               </div>
            </div>
            <div className="text-pink-500 text-[10px] font-black tracking-widest uppercase">Switch Asset ▼</div>
         </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative mx-4 my-2 rounded-2xl bg-[#0b0e11] border border-white/5 overflow-hidden">
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%">
               {Array.from({ length: 16 }).map((_, i) => (
                 <line key={i} x1="0" y1={`${i * 6.25}%`} x2="100%" y2={`${i * 6.25}%`} stroke="#ffffff" strokeWidth="1" />
               ))}
               {Array.from({ length: 16 }).map((_, i) => (
                 <line key={i} x1={`${i * 6.25}%`} y1="0" x2={`${i * 6.25}%`} y2="100%" stroke="#ffffff" strokeWidth="1" />
               ))}
            </svg>
         </div>

         {/* Centered Candles */}
         <div className="absolute inset-0 flex items-center justify-center p-6">
            <svg width="100%" height="75%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
               {visibleCandles.map((c, i) => renderCandle(c, i))}
            </svg>
         </div>
      </div>

      {/* Controls */}
      <div className="bg-[#151921] px-6 py-6 flex flex-col items-center gap-5 z-30 border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
         <div className="text-center">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mb-1 block">Candle Expiration</span>
            <div className="text-4xl font-mono font-black text-pink-500 tabular-nums drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
               {timeLeft}<span className="text-lg">s</span>
            </div>
         </div>

         <div className="w-full flex justify-between items-center max-w-xs">
            <button onClick={onExit} className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-red-500 text-lg active:scale-90 transition-all">
               ⏻
            </button>
            <div className="flex flex-col items-center text-center">
               <span className="text-[14px] font-black text-white italic uppercase tracking-tighter leading-none">1 Candle Ahead</span>
               <span className="text-[8px] text-slate-600 font-black uppercase tracking-[0.2em] mt-1">SureShort Engine v2.0</span>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-pink-600 border border-pink-400 flex items-center justify-center text-white text-lg active:scale-90 transition-all shadow-lg">
               ⚡
            </button>
         </div>

         <div className="text-green-500 text-[9px] font-black uppercase tracking-[0.3em] italic animate-pulse">
            Institutional Accuracy: 98.4%
         </div>
      </div>

      {/* Market Selector Modal */}
      {showPairSelector && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-end animate-fadeIn">
           <div className="w-full bg-[#151921] rounded-t-[2.5rem] p-6 max-h-[75vh] overflow-y-auto custom-scrollbar border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black uppercase italic tracking-tighter">Select Market</h3>
                 <button onClick={() => setShowPairSelector(false)} className="text-pink-500 text-xs font-black uppercase tracking-widest">Close</button>
              </div>
              <div className="grid grid-cols-1 gap-2 pb-10">
                 {OTC_PAIRS.map(pair => (
                   <div 
                     key={pair.symbol} 
                     onClick={() => { setSelectedPair(pair); setShowPairSelector(false); }}
                     className="bg-[#0b0e11] p-4 rounded-2xl border border-white/5 flex justify-between items-center active:scale-[0.98] transition-all hover:border-pink-500/20"
                   >
                     <div className="flex items-center gap-4">
                        <div className="text-white font-black text-sm italic">{pair.symbol}</div>
                        <div className="text-[8px] bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">OTC</div>
                     </div>
                     <div className="text-green-500 font-black text-[10px] italic">98% Payout</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;