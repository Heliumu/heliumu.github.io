
import React from 'react';
import { TICKER_DATA } from '../constants';

const Ticker: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 text-white overflow-hidden py-1.5 whitespace-nowrap relative border-b border-slate-800">
      <div className="flex animate-marquee hover:pause gap-8 px-4">
        {[...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs font-medium">
            <span className="text-slate-400 font-bold">{item.symbol}</span>
            <span>{item.price}</span>
            <span className={item.up ? 'text-emerald-400' : 'text-rose-400'}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
