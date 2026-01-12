
import React from 'react';

interface JsonViewerProps {
  data: any;
  isLoading?: boolean;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, isLoading }) => {
  const jsonString = JSON.stringify(data, null, 2);

  // Simple pseudo-highlighting
  const highlighted = jsonString
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'text-blue-400'; // numbers
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-indigo-300'; // key
        } else {
          cls = 'text-emerald-400'; // string
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-orange-400';
      } else if (/null/.test(match)) {
        cls = 'text-rose-400';
      }
      return `<span class="${cls}">${match}</span>`;
    });

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-400 text-sm font-medium">Fetching Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <span className="text-xs text-slate-400 font-mono">response.json</span>
      </div>
      <div className="p-6 overflow-auto max-h-[600px] font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <pre 
          className="whitespace-pre-wrap break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
};

export default JsonViewer;
