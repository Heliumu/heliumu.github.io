import React, { useState, useMemo } from 'react';
import { API_ENDPOINTS } from '../constants';
import { ApiEndpoint } from '../types';
import JsonViewer from './JsonViewer';
import { useTranslation } from './LanguageContext';

const ApiExplorer: React.FC = () => {
  const { t } = useTranslation();
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [openHelp, setOpenHelp] = useState<Record<string, boolean>>({});

  // Initialize defaults when endpoint changes
  React.useEffect(() => {
    const defaults: Record<string, any> = {};
    selectedEndpoint.parameters.forEach(p => {
      defaults[p.name] = p.default ?? (p.type === 'boolean' ? false : '');
    });
    setFieldValues(defaults);
    setData(null);
    setIsLoading(false);
    setOpenHelp({});
  }, [selectedEndpoint]);

  const constructedUrl = useMemo(() => {
    let url = selectedEndpoint.path;
    const queryParams: string[] = [];

    selectedEndpoint.parameters.forEach(p => {
      const val = fieldValues[p.name];
      if (p.in === 'path') {
        url = url.replace(`{${p.name}}`, encodeURIComponent(val || `{${p.name}}`));
      } else if (p.in === 'query' && val !== undefined && val !== '') {
        queryParams.push(`${p.name}=${encodeURIComponent(val)}`);
      }
    });

    const base = url.startsWith('http') ? '' : 'https://api.aitrados.com';
    const fullUrl = `${base}${url}`;
    return queryParams.length > 0 ? `${fullUrl}?${queryParams.join('&')}` : fullUrl;
  }, [selectedEndpoint, fieldValues]);

  const fetchMockData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const results = selectedEndpoint.summary.includes('Bars')
      ? Array.from({ length: 5 }).map((_, i) => ({
        t: new Date(Date.now() - i * 86400000).toISOString(),
        o: (450 + Math.random() * 50).toFixed(2),
        h: (500 + Math.random() * 50).toFixed(2),
        l: (400 + Math.random() * 50).toFixed(2),
        c: (450 + Math.random() * 50).toFixed(2),
        v: Math.floor(Math.random() * 1000000)
      }))
      : { info: 'Details for your request', timestamp: new Date().toISOString() };

    setData({
      status: 'success',
      endpoint: selectedEndpoint.summary,
      parameters: fieldValues,
      results,
      request_id: Math.random().toString(36).substring(7)
    });
    setIsLoading(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(constructedUrl);
    alert('URL Copied!');
  };

  const handleCopyResponse = () => {
    if (!data) { alert('No response to copy'); return; }
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('Response copied to clipboard');
  };

  const toggleHelp = (name: string) => {
    setOpenHelp(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section className="py-20 bg-white" id="explorer">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Side: Controls */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{t('explorer.title')}</h2>
              <p className="text-slate-500 text-sm">{t('explorer.subtitle')}</p>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">
                {t('explorer.selectEndpoint')}
              </label>
              <select
                value={selectedEndpoint.id}
                onChange={(e) => setSelectedEndpoint(API_ENDPOINTS.find(ap => ap.id === e.target.value)!)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:border-indigo-500 focus:outline-none transition-all"
              >
                {API_ENDPOINTS.map(ep => (
                  <option key={ep.id} value={ep.id}>{ep.summary}</option>
                ))}
              </select>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('explorer.params')}</h3>
              <div className="space-y-5">
                {selectedEndpoint.parameters.map(p => (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        {p.name}
                        {p.required && <span className="text-rose-500 text-[10px]">*</span>}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${p.in === 'path' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                          {p.in.toUpperCase()}
                        </span>
                        <button title="Help" onClick={() => toggleHelp(p.name)} className="text-xs px-2 py-1 rounded hover:bg-slate-100">!</button>
                      </div>
                    </div>

                    {openHelp[p.name] && (
                      <div className="bg-white border rounded p-2 text-xs text-slate-600">
                        {p.tip || 'No additional help available.'}
                        {p.help_url && (
                          <div className="mt-2"><a className="text-indigo-600 underline" href={p.help_url} target="_blank" rel="noreferrer">Open docs</a></div>
                        )}
                      </div>
                    )}

                    {p.type === 'enum' ? (
                      <select
                        value={fieldValues[p.name] || ''}
                        onChange={(e) => setFieldValues({ ...fieldValues, [p.name]: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:border-indigo-500 focus:outline-none transition-all"
                      >
                        {p.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : p.type === 'boolean' ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setFieldValues({ ...fieldValues, [p.name]: !fieldValues[p.name] })}
                          className={`w-10 h-5 rounded-full transition-all relative ${fieldValues[p.name] ? 'bg-indigo-600' : 'bg-slate-300'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${fieldValues[p.name] ? 'right-1' : 'left-1'}`} />
                        </button>
                        <span className="text-xs text-slate-500">{fieldValues[p.name] ? 'True' : 'False'}</span>
                      </div>
                    ) : (
                      <input
                        type={p.type === 'integer' ? 'number' : (p.type.includes('date') ? 'text' : 'text')}
                        value={fieldValues[p.name] || ''}
                        onChange={(e) => setFieldValues({ ...fieldValues, [p.name]: e.target.value })}
                        placeholder={p.type}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-300"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={fetchMockData}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Run Request
              </button>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="lg:w-2/3 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('explorer.endpointUrl')}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleCopyUrl} className="text-[10px] font-bold text-indigo-600 hover:underline">Copy URL</button>
                <button onClick={handleCopyResponse} className="text-[10px] font-bold text-indigo-600 hover:underline">Copy Response</button>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-indigo-400 overflow-x-auto whitespace-nowrap scrollbar-none">
              <span className="text-slate-500">GET</span> {constructedUrl}
            </div>

            <JsonViewer data={data} isLoading={isLoading} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ApiExplorer;
