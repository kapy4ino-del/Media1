import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AnalysisResult, ModuleScore } from '../types';
import { Shield, AlertTriangle, UserCheck, BookOpen } from 'lucide-react';

interface ScoreCardProps {
  data: AnalysisResult['v2_scorecard'] | undefined;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { total_score, grade, color_code, module_1, module_2, module_3 } = data;

  // Default empty module if missing
  const safeModule1 = module_1 || { score: 0, reasoning: [], flags: [] };
  const safeModule2 = module_2 || { score: 0, reasoning: [], flags: [] };
  const safeModule3 = module_3 || { score: 0, reasoning: [], flags: [] };

  // Determine colors based on grade/score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const mainColor = getScoreColor(total_score);

  const gaugeData = [
    { name: 'Score', value: total_score },
    { name: 'Remaining', value: 100 - total_score },
  ];

  return (
    <div className="bg-military-800 border border-slate-700 rounded-lg p-6 shadow-xl">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Main Score Gauge */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={180}
                endAngle={0}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={mainColor} />
                <Cell fill="#334155" /> 
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8">
            <span className="text-4xl font-bold font-mono text-white">{total_score}</span>
            <span className="text-sm text-slate-400 font-mono uppercase tracking-widest">Grade {grade}</span>
          </div>
          <div className={`absolute bottom-8 left-0 right-0 text-center font-bold tracking-widest uppercase ${
            color_code === 'Green' ? 'text-green-500' : color_code === 'Amber' ? 'text-amber-500' : 'text-red-500'
          }`}>
            {color_code} STATUS
          </div>
        </div>

        {/* Module Breakdown */}
        <div className="flex-1 w-full space-y-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">
            <Shield className="w-5 h-5 text-military-accent" />
            Forensic Breakdown
          </h3>
          
          <ModuleBar 
            icon={<BookOpen className="w-4 h-4" />} 
            label="Module 1: Article Analysis" 
            subLabel="Weight: 60%"
            score={safeModule1.score} 
            max={100}
            flags={safeModule1.flags}
          />
          <ModuleBar 
            icon={<BookOpen className="w-4 h-4" />} 
            label="Module 2: Publisher Profile" 
            subLabel="Weight: 25%"
            score={safeModule2.score} 
            max={100}
            flags={safeModule2.flags}
          />
          <ModuleBar 
            icon={<UserCheck className="w-4 h-4" />} 
            label="Module 3: Author Profile" 
            subLabel="Weight: 15%"
            score={safeModule3.score} 
            max={100}
            flags={safeModule3.flags}
          />
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700">
         <p className="text-slate-300 italic text-sm border-l-4 border-military-accent pl-4">
           "{data.summary_analysis}"
         </p>
      </div>
    </div>
  );
};

const ModuleBar: React.FC<{ icon: React.ReactNode, label: string, subLabel: string, score: number, max: number, flags: string[] }> = ({ icon, label, subLabel, score, max, flags }) => {
  const width = Math.min(100, Math.max(0, (score / max) * 100));
  const colorClass = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-1">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          {icon}
          <span>{label}</span>
          <span className="text-xs text-slate-500 ml-2">({subLabel})</span>
        </div>
        <span className="font-mono text-sm font-bold text-white">{score}/100</span>
      </div>
      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${width}%` }}></div>
      </div>
      {flags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {flags.map((flag, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-red-400 bg-red-900/20 px-1.5 py-0.5 rounded border border-red-900/50">
              <AlertTriangle className="w-3 h-3" /> {flag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScoreCard;