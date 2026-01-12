import React from 'react';

const Quickstart: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl border">
      <h2 className="text-2xl font-bold mb-4">AiTrados Dataset API Overview</h2>
      <p className="text-sm text-slate-600 mb-4">aitrados-dataset-api is the official Python client for the AiTrados data platform, specifically designed for AI quantitative trading/training. Our API helps you easily integrate Pure price ohlc multi-symbol,multi-timeframe technical analysis with real-time news and economic events.</p>

      <h3 className="text-lg font-semibold mt-4">Info</h3>
      <p className="text-sm text-slate-500">Complete documentation is available at https://github.com/aitrados/aitrados-api</p>
      <p className="text-sm text-slate-500">Installation</p>
      <pre className="bg-slate-100 p-3 rounded mt-2">pip install aitrados-api</pre>

      <h3 className="text-lg font-semibold mt-4">Get EXAMPLES</h3>
      <p className="text-sm text-slate-500">https://github.com/aitrados/aitrados-api/tree/main/examples</p>

      <h3 className="text-lg font-semibold mt-4">Register for Free Access</h3>
      <p className="text-sm text-slate-500">Register at AiTrados website https://www.aitrados.com/ to get your API secret key (Free).</p>
    </div>
  );
};

export default Quickstart;

