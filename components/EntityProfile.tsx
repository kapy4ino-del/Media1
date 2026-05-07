import React from 'react';
import { Author, Publication } from '../types';
import { Building2, User, Globe, AlertOctagon } from 'lucide-react';

interface EntityProfileProps {
  publisher: Publication;
  author: Author;
}

const EntityProfile: React.FC<EntityProfileProps> = ({ publisher, author }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Publisher Column */}
      <div className="bg-military-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4" /> Publisher Intelligence
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{publisher.name}</h2>
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${
            publisher.reliability === 'High' ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400' : 
            publisher.reliability === 'Low' ? 'bg-red-900/30 border-red-500/50 text-red-400' : 'bg-amber-900/30 border-amber-500/50 text-amber-400'
          }`}>
            Reliability: {publisher.reliability}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <InfoRow label="Leaning" value={publisher.leaning} />
          <InfoRow label="Ownership" value={publisher.ownership.model} />
          
          <div className="mt-4 p-3 bg-military-900/50 rounded border border-slate-700/50">
            <p className="text-slate-300 leading-relaxed text-xs">
              {publisher.analysis}
            </p>
          </div>
          
          {publisher.conflictOfInterest && (
             <div className="mt-2 p-2 bg-red-950/30 border border-red-900/50 rounded flex gap-2 items-start">
               <AlertOctagon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
               <p className="text-red-300 text-xs font-mono">{publisher.conflictOfInterest}</p>
             </div>
          )}
        </div>
      </div>

      {/* Author Column */}
      <div className="bg-military-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <User className="w-4 h-4" /> Author Profile
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{author.name}</h2>
            <p className="text-xs text-slate-400 font-mono">{author.role}</p>
          </div>
          {author.is_agency && (
             <span className="px-2 py-1 rounded text-xs font-bold uppercase bg-blue-900/30 border border-blue-500/50 text-blue-400">
               Agency Wire
             </span>
          )}
        </div>

        <div className="space-y-3 text-sm">
           <InfoRow label="Location" value={author.location_based || "Unknown"} icon={<Globe className="w-3 h-3" />} />
           <InfoRow label="Expertise" value={author.expertise || "Generalist"} />
           
           <div className="mt-4 p-3 bg-military-900/50 rounded border border-slate-700/50">
             <h4 className="text-xs font-bold text-slate-500 mb-1 uppercase">Background Check</h4>
             <div className="flex flex-wrap gap-2 mb-2">
                {author.past_experience.map((exp, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full">{exp}</span>
                ))}
             </div>
             <p className="text-slate-300 leading-relaxed text-xs">
               {author.analysis}
             </p>
           </div>

           {author.conflictOfInterest && author.conflictOfInterest !== "None" && (
             <div className="mt-2 p-2 bg-red-950/30 border border-red-900/50 rounded flex gap-2 items-start">
               <AlertOctagon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
               <p className="text-red-300 text-xs font-mono">{author.conflictOfInterest}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string, value: string, icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex justify-between border-b border-slate-700/50 pb-1">
    <span className="text-slate-500 flex items-center gap-1">{icon}{label}</span>
    <span className="text-slate-200 font-medium text-right">{value}</span>
  </div>
);

export default EntityProfile;
