import React from 'react';
import { CriticalAnalysis } from '../types';
import { AlertTriangle, XCircle, EyeOff, BrainCircuit } from 'lucide-react';

interface CriticalDetailsProps {
  data: CriticalAnalysis;
}

const CriticalDetails: React.FC<CriticalDetailsProps> = ({ data }) => {
  return (
    <div className="bg-military-800 border border-slate-700 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-6 border-b border-slate-700 pb-2">
        <BrainCircuit className="w-5 h-5 text-military-accent" />
        Critical Analysis & Logic Check
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Logical Fallacies */}
        <div>
          <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Detected Fallacies
          </h4>
          {data.logicalFallacies.length > 0 ? (
            <ul className="space-y-2">
              {data.logicalFallacies.map((fallacy, idx) => (
                <li key={idx} className="bg-amber-900/10 border border-amber-900/30 text-amber-200/80 px-3 py-2 rounded text-sm font-mono">
                  {fallacy}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic text-sm">No major logical fallacies detected.</p>
          )}
        </div>

        {/* Omissions */}
        <div>
          <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <EyeOff className="w-4 h-4" /> Strategic Omissions
          </h4>
           {data.omissions.length > 0 ? (
            <ul className="space-y-2">
              {data.omissions.map((omission, idx) => (
                <li key={idx} className="bg-red-900/10 border border-red-900/30 text-red-200/80 px-3 py-2 rounded text-sm">
                  {omission}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic text-sm">No critical context omissions detected.</p>
          )}
        </div>
      </div>

      {/* Claims & Rebuttals */}
      <div className="mt-8">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
          <XCircle className="w-4 h-4" /> Disputed Claims Analysis
        </h4>
        <div className="space-y-4">
          {data.claimsAnalysis.map((claim, idx) => (
            <div key={idx} className="bg-military-900 border border-slate-700 rounded p-4">
              <div className="flex gap-4">
                 <div className="w-1 bg-red-500 rounded-full h-auto"></div>
                 <div className="flex-1">
                    <p className="text-white font-medium mb-2">"{claim.claim}"</p>
                    <div className="bg-slate-800/50 p-3 rounded text-sm text-slate-300">
                      <span className="text-emerald-400 font-bold uppercase text-xs block mb-1">Evidence-Based Rebuttal:</span>
                      {claim.rebuttal}
                      <div className="mt-2 text-xs text-slate-500 flex justify-between">
                         <span>Source: {claim.rebuttalSource}</span>
                         {claim.rebuttalSourceUrl && (
                           <a href={claim.rebuttalSourceUrl} target="_blank" rel="noopener noreferrer" className="text-military-accent hover:underline">Verify Source &rarr;</a>
                         )}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
          {data.claimsAnalysis.length === 0 && (
             <p className="text-slate-500 italic text-center py-4">No specific claims required rebuttal in this analysis.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default CriticalDetails;
