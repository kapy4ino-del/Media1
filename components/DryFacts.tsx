import React from 'react';
import { DryFact } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface DryFactsProps {
  facts: DryFact[];
}

const DryFacts: React.FC<DryFactsProps> = ({ facts }) => {
  return (
    <div className="bg-military-800 border border-slate-700 rounded-lg p-6 h-full">
      <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2 mb-4 uppercase tracking-wider">
        <CheckCircle2 className="w-5 h-5" />
        Verified Dry Facts
      </h3>
      <div className="space-y-4">
        {facts.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-start group">
            <span className="font-mono text-emerald-500/50 text-sm mt-0.5">0{idx + 1}</span>
            <div>
              <p className="text-slate-200 text-sm font-medium leading-relaxed">
                {item.fact}
              </p>
              <div className="flex gap-2 mt-1 text-xs text-slate-500">
                <span className="uppercase font-bold tracking-wider">Source:</span> {item.source}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DryFacts;
