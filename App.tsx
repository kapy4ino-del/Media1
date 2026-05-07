import React, { useState } from 'react';
import { analyzeArticle, MODEL_ID } from './services/geminiService';
import { AnalysisResult } from './types';
import InputSection from './components/InputSection';
import ScoreCard from './components/ScoreCard';
import DeepDive from './components/DeepDive';
import { ShieldAlert, Terminal, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (content: string, isUrl: boolean, mimeType?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeArticle(content, isUrl, mimeType);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during forensic analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-military-900 pb-20">
      
      {/* Header */}
      <header className="bg-military-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-military-accent/10 p-2 rounded border border-military-accent/20">
              <ShieldAlert className="w-6 h-6 text-military-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">NEWS INSIGHT <span className="text-military-accent">V3.1</span></h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Forensic Evaluation Engine</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-600 font-mono">
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded border border-slate-700/50">
                <Cpu className="w-3 h-3 text-emerald-500" />
                <span className="text-slate-400">MODEL:</span>
                <span className="text-emerald-400 font-bold">{MODEL_ID}</span>
             </div>
             <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                <span>SYSTEM READY</span>
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Demand Evidence. Trust Logic.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Process news content through our military-grade scrutiny engine. We identify adversarial incentives, author credibility gaps, and rhetorical manipulation.
          </p>
        </div>

        <InputSection onAnalyze={handleAnalyze} loading={loading} />

        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded text-red-200 text-center font-mono">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
            
            {/* Top Section: Score Card */}
            <ScoreCard data={result?.v2_scorecard} />

            {/* Deep Dive Dashboard (Replaces Facts, Entity, Critical Details) */}
            <DeepDive 
              report={result} 
              sources={[]} 
            />

          </div>
        )}
      </main>
    </div>
  );
};

export default App;