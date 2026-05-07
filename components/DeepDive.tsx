import React, { useState } from 'react';
import { AnalysisReport, GroundingSource } from '../types';
import { Network, FileText, CheckCircle2, AlertOctagon, Activity, ExternalLink, Users, TowerControl, Shield, ShieldAlert, UserCheck, Scale, SearchX, RefreshCw, AlertTriangle, EyeOff, XCircle, Cpu } from 'lucide-react';

interface Props {
  report: AnalysisReport;
  sources: GroundingSource[];
  searchEntryPoint?: string;
  isPrinting?: boolean;
}

const DeepDive: React.FC<Props> = ({ report, sources, searchEntryPoint, isPrinting = false }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'network' | 'evidence' | 'factcheck' | 'critique' | 'people'>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'people', label: 'Key Figures', icon: UserCheck },
    { id: 'evidence', label: 'Evidence', icon: FileText },
    { id: 'factcheck', label: 'Fact Check', icon: CheckCircle2 },
    { id: 'critique', label: 'Critique', icon: AlertOctagon },
  ];

  return (
    <div className="mt-8 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
      {!isPrinting && (
        <div className="flex border-b border-slate-700/50 overflow-x-auto">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-800/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
            >
                <tab.icon className="w-4 h-4" />
                {tab.label}
            </button>
            ))}
        </div>
      )}

      <div className="p-6 space-y-8">
        {(activeTab === 'dashboard' || isPrinting) && (
          <div className="animate-in fade-in duration-300">
             {isPrinting && <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><Activity className="w-5 h-5"/> Dashboard</h2>}
             
             {/* DRY FACTS SECTION - Enhanced Visibility */}
             {report.dryFacts && report.dryFacts.length > 0 && (
              <div className="col-span-full mb-8 bg-slate-900/80 p-6 rounded-2xl border border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h3 className="text-blue-400 font-bold mb-6 flex items-center gap-3 uppercase tracking-wider text-sm border-b border-blue-500/20 pb-3">
                  <CheckCircle2 className="w-5 h-5" /> Undisputed Facts (The Baseline)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {report.dryFacts.map((fact, i) => (
                    <div key={i} className="flex items-start gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                      <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/20">{i+1}</div>
                      <div>
                        <p className="text-slate-100 text-sm font-medium leading-relaxed">{fact.fact}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-900 px-2 py-1 rounded border border-slate-700 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {fact.context}
                          </span>
                          <span className="text-[10px] font-bold text-blue-400 uppercase bg-blue-950/30 px-2 py-1 rounded border border-blue-900/50 flex items-center gap-1">
                            <Shield className="w-3 h-3" /> {fact.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
             )}

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Key Insights - Prominent Display */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-1 rounded-2xl shadow-lg relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="bg-slate-900/90 p-6 rounded-xl h-full relative z-10">
                        <h3 className="text-cyan-400 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm border-b border-cyan-900/50 pb-3">
                            <Activity className="w-4 h-4" /> Strategic Assessment
                        </h3>
                        <ul className="space-y-3">
                            {report.summary?.keyPoints?.map((pt, i) => (
                            <li key={i} className="flex gap-4 text-sm text-slate-300 bg-slate-800/40 p-3 rounded-lg border-l-2 border-cyan-500 hover:bg-slate-800/60 transition-colors">
                                <span className="text-cyan-500 font-bold text-lg leading-none mt-0.5">›</span> 
                                <span className="leading-relaxed font-medium">{pt}</span>
                            </li>
                            )) || <li className="text-slate-500 italic">No key points available.</li>}
                        </ul>
                    </div>
                </div>

                {/* Metrics Column */}
                <div className="space-y-6">
                  {/* Emotional Tone Card */}
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden shadow-lg">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity className="w-32 h-32 text-slate-500" />
                      </div>
                      <h3 className="text-slate-400 font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                          <Activity className="w-3 h-3" /> Emotional Intensity
                      </h3>
                      
                      <div className="relative z-10">
                          <div className="flex items-baseline justify-between mb-2">
                              <span className={`text-5xl font-black font-mono tracking-tighter ${
                                  (report.summary?.emotionalTone?.score || 0) > 70 ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500' : 
                                  (report.summary?.emotionalTone?.score || 0) > 40 ? 'text-blue-400' : 'text-slate-400'
                              }`}>
                                  {report.summary?.emotionalTone?.score || 0}%
                              </span>
                              <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">Saturation</span>
                          </div>
                          
                          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-4 border border-slate-700">
                              <div 
                              className={`h-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                                  (report.summary?.emotionalTone?.score || 0) > 70 ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 
                                  (report.summary?.emotionalTone?.score || 0) > 40 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-slate-500'
                              }`}
                              style={{ width: `${report.summary?.emotionalTone?.score || 0}%` }}
                              />
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/50 pt-3 italic">
                            "{report.summary?.emotionalTone?.analysis || "No analysis available."}"
                          </p>
                      </div>
                  </div>

                  {/* AI Probability Card */}
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-5 ${
                          report.summary?.aiGenerated?.status === 'High' ? 'bg-red-500' :
                          report.summary?.aiGenerated?.status === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                      
                      <h3 className="text-slate-400 font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2 relative z-10">
                          <Cpu className="w-3 h-3" /> AI Probability
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4 relative z-10">
                          <span className={`text-2xl font-black uppercase tracking-tight ${
                              report.summary?.aiGenerated?.status === 'High' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]' :
                              report.summary?.aiGenerated?.status === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                              {report.summary?.aiGenerated?.status || "Unknown"}
                          </span>
                          <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border flex items-center gap-1 ${
                              report.summary?.aiGenerated?.status === 'High' ? 'bg-red-950/40 border-red-500/30 text-red-400' :
                              'bg-slate-800 border-slate-700 text-slate-500'
                          }`}>
                              <Shield className="w-3 h-3" /> Detector
                          </div>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/50 pt-3 relative z-10">
                        {report.summary?.aiGenerated?.analysis || "No analysis available."}
                      </p>
                  </div>
                </div>
            </div>
          </div>
        )}

        {(activeTab === 'network' || isPrinting) && (
          <div className="animate-in fade-in duration-300 space-y-6">
             {isPrinting && <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><Network className="w-5 h-5"/> Network Analysis</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Publisher Profile */}
              <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 relative overflow-hidden group shadow-lg">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TowerControl className="w-32 h-32 text-indigo-500" />
                 </div>
                 <h3 className="text-lg font-bold text-indigo-400 mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
                    <TowerControl className="w-4 h-4" /> Publisher Profile
                 </h3>
                 <div className="space-y-5 relative z-10">
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                        <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Entity Name</span>
                        <div className="text-xl font-bold text-slate-100">{report.publication.name}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <DataItem label="Owner" value={report.network.publisher.owner} />
                        <DataItem label="Parent Company" value={report.network.publisher.parentCompany} />
                    </div>
                    
                    <DataItem label="Business Model" value={report.publication.ownership.model} />
                    
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-2">
                            <Network className="w-3 h-3" /> Known Affiliations
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {report.network.publisher.affiliations.map((tag, i) => (
                                <span key={i} className="px-2.5 py-1 bg-indigo-900/20 text-indigo-300 text-xs font-medium rounded border border-indigo-500/20">{tag}</span>
                            ))}
                        </div>
                    </div>
                 </div>
              </div>

              {/* FORENSIC AUTHOR INTELLIGENCE CARD */}
              <div className="space-y-6">
                {(report.authors && report.authors.length > 0 ? report.authors : [report.author]).map((auth, index) => {
                    const hasConflict = auth.conflictOfInterest && auth.conflictOfInterest !== "None" && auth.conflictOfInterest !== "N/A" && !auth.conflictOfInterest.toLowerCase().includes("none detected");
                    const isAgency = auth.is_agency;
                    
                    let badgeColor = "bg-slate-700 text-slate-300 border-slate-600";
                    let badgeLabel = auth.role || "Journalist";
                    if (isAgency) {
                        badgeColor = "bg-blue-500/20 text-blue-400 border-blue-500/30";
                        badgeLabel = "Wire Service";
                    } else if (badgeLabel.toLowerCase().includes("contributor") || badgeLabel.toLowerCase().includes("freelance")) {
                        badgeColor = "bg-amber-500/20 text-amber-400 border-amber-500/30";
                        badgeLabel = "Contributor";
                    } else {
                         badgeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
                    }

                    return (
                    <div key={index} className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Activity className="w-32 h-32" />
                        </div>

                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start mb-6 relative z-10">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-100">{auth.name}</h3>
                                    {hasConflict && (
                                        <div className="animate-pulse" title="Intelligence Alert">
                                            <ShieldAlert className="w-5 h-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                     <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                                        {badgeLabel}
                                    </span>
                                    {report.network.authors?.[index]?.status && (
                                        <span className="text-[10px] font-mono text-slate-500">
                                            [{report.network.authors[index].status}]
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            {/* Individual Scorecard */}
                            {auth.scorecard && (
                                <div className="mt-4 md:mt-0 flex items-center gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400 uppercase tracking-wider">Credibility Score</div>
                                        <div className={`text-2xl font-bold font-mono ${
                                            auth.scorecard.color_code === 'Green' ? 'text-emerald-400' : 
                                            auth.scorecard.color_code === 'Amber' ? 'text-amber-400' : 'text-red-400'
                                        }`}>
                                            {auth.scorecard.total_score}/100
                                        </div>
                                    </div>
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-bold text-lg ${
                                        auth.scorecard.grade === 'A' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' :
                                        auth.scorecard.grade === 'B' ? 'border-emerald-500/70 text-emerald-400/90 bg-emerald-500/10' :
                                        auth.scorecard.grade === 'C' ? 'border-amber-500 text-amber-400 bg-amber-500/10' :
                                        auth.scorecard.grade === 'D' ? 'border-orange-500 text-orange-400 bg-orange-500/10' :
                                        'border-red-500 text-red-400 bg-red-500/10'
                                    }`}>
                                        {auth.scorecard.grade}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* INTELLIGENCE ALERT: Conflict of Interest */}
                        {hasConflict && (
                             <div className="mb-6 bg-red-950/30 border-l-4 border-red-500 p-4 rounded-r-lg relative z-10">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                    <RefreshCw className="w-4 h-4" /> Revolving Door / Conflict Alert
                                </h4>
                                <p className="text-sm text-red-100/90 font-medium leading-relaxed pl-6">
                                    {auth.conflictOfInterest}
                                </p>
                            </div>
                        )}

                        {/* NEW: DOSSIER GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                        <TowerControl className="w-3 h-3 text-cyan-500" /> Station / Beat
                                    </span>
                                    {auth.location_based && (
                                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-900">
                                            {auth.location_based}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-200 font-medium">{auth.expertise || "General Assignment"}</p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                                    <Users className="w-3 h-3 text-violet-500" />
                                    <span className="text-xs font-bold text-slate-400 uppercase">Background Dossier</span>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto max-h-[160px] pr-2 space-y-4">
                                    {/* Past Experience Section */}
                                    {auth.past_experience && auth.past_experience.length > 0 && (
                                        <div>
                                            <h5 className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">Past Experience</h5>
                                            <ul className="space-y-1.5">
                                                {auth.past_experience.map((exp, i) => (
                                                    <li key={`exp-${i}`} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-800/30 p-1.5 rounded border border-slate-800/50">
                                                        <span className="text-slate-500 text-[10px] mt-0.5 uppercase tracking-wider min-w-[30px]">PREV</span>
                                                        <span className="leading-tight">{exp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Affiliations Section */}
                                    {auth.affiliations && auth.affiliations.length > 0 && (
                                        <div>
                                            <h5 className="text-[10px] font-bold text-violet-500/70 uppercase mb-1.5">Affiliations</h5>
                                            <ul className="space-y-1.5">
                                                {auth.affiliations.map((aff, i) => (
                                                    <li key={`aff-${i}`} className="text-xs text-violet-200 flex items-start gap-2 bg-violet-900/10 p-1.5 rounded border border-violet-900/20">
                                                        <span className="text-violet-500 mt-0.5">●</span>
                                                        <span className="leading-tight">{aff}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {(!auth.past_experience?.length && !auth.affiliations?.length) && (
                                         <p className="text-xs text-slate-500 italic text-center py-4">No major affiliations or past experience found in public records.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Digital Footprint (Intercepted Comms Style) */}
                        {auth.socialMediaPosts && auth.socialMediaPosts.length > 0 && (
                            <div className="relative z-10 border-t border-slate-700/50 pt-4">
                                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-3">
                                    <Activity className="w-3 h-3" /> Recent Digital Activity
                                </span>
                                <div className="space-y-2">
                                    {auth.socialMediaPosts.slice(0, 3).map((post, i) => (
                                        <div key={i} className="text-xs font-mono bg-slate-950/50 p-3 rounded border border-slate-800 text-slate-400 flex gap-3">
                                             <span className="text-cyan-600 flex-shrink-0">[{post.platform.toUpperCase()}]</span>
                                             <span className="line-clamp-2">"{post.content}"</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )})}
              </div>
            </div>
          </div>
        )}
                {(activeTab === 'evidence' || isPrinting) && (
            <div className="animate-in fade-in duration-300 space-y-6">
                 {isPrinting && <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><FileText className="w-5 h-5"/> Evidence</h2>}
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 shadow-lg">
                        <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-cyan-400" /> Sourcing Analysis
                        </h3>
                        
                        {/* Visual Ratio Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-xs uppercase font-bold text-slate-500 mb-2">
                                <span>Named Sources ({report.sourcing.namedSources})</span>
                                <span>Anonymous ({report.sourcing.anonymousSources})</span>
                            </div>
                            <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                                <div 
                                    className="h-full bg-cyan-500" 
                                    style={{ width: `${(report.sourcing.namedSources / (report.sourcing.namedSources + report.sourcing.anonymousSources || 1)) * 100}%` }}
                                ></div>
                                <div 
                                    className="h-full bg-amber-500" 
                                    style={{ width: `${(report.sourcing.anonymousSources / (report.sourcing.namedSources + report.sourcing.anonymousSources || 1)) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-950/50 p-4 rounded-lg text-center border border-slate-800">
                                <span className="block text-3xl font-black text-slate-100">{report.sourcing.namedSources}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Named Sources</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-lg text-center border border-slate-800">
                                <span className="block text-3xl font-black text-amber-500">{report.sourcing.anonymousSources}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Anonymous Sources</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-lg text-center border border-slate-800">
                                <span className={`block text-3xl font-black ${report.sourcing.isSingleSourced ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {report.sourcing.isSingleSourced ? 'YES' : 'NO'}
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Single Sourced?</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4 bg-slate-800/30 p-4 rounded border-l-2 border-slate-600">
                            {report.sourcing.analysis}
                        </p>
                        {report.sourcing.isSingleSourced && (
                             <div className="p-4 bg-red-950/30 border border-red-500/30 rounded-lg flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-red-400 text-sm uppercase tracking-wide block mb-1">Critical Risk Analysis</strong>
                                    <span className="text-red-200/80 text-sm">{report.sourcing.singleSourceAnalysis}</span>
                                </div>
                             </div>
                        )}
                    </div>
                    
                    {report.evidence.artifacts && report.evidence.artifacts.length > 0 && (
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 shadow-lg">
                            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-emerald-400" /> Verified Artifacts
                            </h3>
                            <div className="space-y-3">
                                {report.evidence.artifacts.map((art, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${
                                                art.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                            }`}>
                                                {art.status === 'Verified' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-200">{art.description}</div>
                                                <div className="text-xs text-slate-500 font-mono mt-0.5">{art.type}</div>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${
                                            art.status === 'Verified' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'
                                        }`}>
                                            {art.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {(activeTab === 'factcheck' || isPrinting) && (
             <div className="animate-in fade-in duration-300 space-y-6">
                {isPrinting && <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Fact Check</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`bg-slate-900/80 p-6 rounded-xl border-l-4 shadow-lg ${
                        report.factuality.factCheck.status === 'Factual' ? 'border-emerald-500 border-y border-r border-slate-700/50' : 'border-red-500 border-y border-r border-slate-700/50'
                    }`}>
                        <h3 className="text-slate-300 font-bold mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                            <SearchX className="w-4 h-4" /> Fact Check Analysis
                        </h3>
                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${
                                report.factuality.factCheck.status === 'Factual' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                                {report.factuality.factCheck.status}
                            </span>
                            <p className="text-sm text-slate-300 leading-relaxed">{report.factuality.factCheck.analysis}</p>
                        </div>
                    </div>
                    <div className={`bg-slate-900/80 p-6 rounded-xl border-l-4 shadow-lg ${
                        report.factuality.mediaVerification.status === 'Verified' ? 'border-emerald-500 border-y border-r border-slate-700/50' : 'border-amber-500 border-y border-r border-slate-700/50'
                    }`}>
                        <h3 className="text-slate-300 font-bold mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Media Verification
                        </h3>
                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${
                                report.factuality.mediaVerification.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                                {report.factuality.mediaVerification.status}
                            </span>
                            <p className="text-sm text-slate-300 leading-relaxed">{report.factuality.mediaVerification.analysis}</p>
                        </div>
                    </div>
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 col-span-full shadow-lg">
                        <h3 className="text-slate-300 font-bold mb-6 uppercase text-xs tracking-wider flex items-center gap-2">
                            <Scale className="w-4 h-4" /> Corroboration Score
                        </h3>
                         <div className="flex items-center gap-6 mb-4">
                             <div className="flex-1 bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
                                 <div 
                                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                                    style={{width: `${report.factuality.corroboration.score}%`}}
                                 ></div>
                             </div>
                             <span className="font-mono text-3xl font-bold text-emerald-400">{report.factuality.corroboration.score}/100</span>
                         </div>
                         <p className="text-sm text-slate-400 italic border-t border-slate-700/50 pt-4">"{report.factuality.corroboration.analysis}"</p>
                    </div>
                </div>
            </div>
        )}

        {(activeTab === 'critique' || isPrinting) && (
            <div className="animate-in fade-in duration-300 space-y-6">
                {isPrinting && <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><AlertOctagon className="w-5 h-5"/> Critical Analysis</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logical Fallacies */}
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 shadow-lg">
                        <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-2">
                            <AlertTriangle className="w-4 h-4" /> Detected Fallacies
                        </h4>
                        {report.criticalAnalysis.logicalFallacies.length > 0 ? (
                            <div className="grid gap-3">
                            {report.criticalAnalysis.logicalFallacies.map((fallacy, idx) => (
                                <div key={idx} className="bg-amber-950/30 border-l-4 border-amber-500 p-3 rounded-r-lg">
                                    <span className="text-amber-200/90 text-sm font-medium block">{fallacy}</span>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                                <CheckCircle2 className="w-8 h-8 mb-2 opacity-50" />
                                <p className="text-sm italic">No major logical fallacies detected.</p>
                            </div>
                        )}
                    </div>

                    {/* Omissions */}
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 shadow-lg">
                        <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-red-500/20 pb-2">
                            <EyeOff className="w-4 h-4" /> Strategic Omissions
                        </h4>
                        {report.criticalAnalysis.omissions.length > 0 ? (
                            <div className="grid gap-3">
                            {report.criticalAnalysis.omissions.map((omission, idx) => (
                                <div key={idx} className="bg-red-950/30 border-l-4 border-red-500 p-3 rounded-r-lg">
                                    <span className="text-red-200/90 text-sm font-medium block">{omission}</span>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                                <CheckCircle2 className="w-8 h-8 mb-2 opacity-50" />
                                <p className="text-sm italic">No critical context omissions detected.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Claims & Rebuttals */}
                <div className="mt-8 bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 shadow-lg">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" /> Disputed Claims Analysis
                    </h4>
                    <div className="space-y-4">
                    {report.criticalAnalysis.claimsAnalysis.map((claim, idx) => (
                        <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-lg p-5 hover:border-slate-600 transition-colors">
                        <div className="flex gap-5">
                            <div className="w-1.5 bg-red-500 rounded-full h-auto flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="mb-3">
                                    <span className="text-xs font-bold text-red-400 uppercase mb-1 block">The Claim</span>
                                    <p className="text-white font-medium text-lg leading-snug">"{claim.claim}"</p>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-lg"></div>
                                    <span className="text-emerald-400 font-bold uppercase text-xs block mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> Evidence-Based Rebuttal
                                    </span>
                                    <p className="text-slate-300 text-sm leading-relaxed">{claim.rebuttal}</p>
                                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
                                        <span className="font-mono">SOURCE: {claim.rebuttalSource}</span>
                                        {claim.rebuttalSourceUrl && (
                                        <a href={claim.rebuttalSourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold">
                                            VERIFY <ExternalLink className="w-3 h-3" />
                                        </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    {report.criticalAnalysis.claimsAnalysis.length === 0 && (
                        <p className="text-slate-500 italic text-center py-4">No specific claims required rebuttal in this analysis.</p>
                    )}
                    </div>
                </div>
            </div>
        )}

        {(activeTab === 'people' || isPrinting) && (
            <div className="animate-in fade-in duration-300 space-y-6">
                {isPrinting && <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center gap-2"><Users className="w-5 h-5"/> Key Figures</h2>}
                {report.keyPeople ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50">
                            <h3 className="text-slate-300 font-bold mb-4 uppercase text-xs tracking-wider">Related to Publication</h3>
                            <div className="space-y-4">
                                {report.keyPeople.publicationRelated.length > 0 ? report.keyPeople.publicationRelated.map((p, i) => (
                                    <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-slate-200 font-bold">{p.name}</div>
                                                {p.role && <div className="text-xs text-slate-500 uppercase">{p.role}</div>}
                                            </div>
                                            <div className={`px-2 py-1 rounded text-xs font-bold border ${
                                                p.scorecard.grade === 'A' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                                p.scorecard.grade === 'B' ? 'bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20' :
                                                p.scorecard.grade === 'C' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                'bg-red-500/10 text-red-400 border-red-500/30'
                                            }`}>
                                                Grade {p.scorecard.grade}
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs text-slate-400 italic border-l-2 border-slate-700 pl-2">
                                            "{p.scorecard.summary_analysis}"
                                        </div>

                                        {p.scorecard.flags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {p.scorecard.flags.map((flag, idx) => (
                                                    <span key={idx} className="text-[10px] uppercase font-bold text-red-400 bg-red-900/20 px-1.5 py-0.5 rounded border border-red-900/50 flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" /> {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )) : <p className="text-slate-500 italic text-sm">None identified.</p>}
                            </div>
                        </div>
                        <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50">
                            <h3 className="text-slate-300 font-bold mb-4 uppercase text-xs tracking-wider">Mentioned in Article</h3>
                             <div className="space-y-4">
                                {report.keyPeople.articleRelated.length > 0 ? report.keyPeople.articleRelated.map((p, i) => (
                                    <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex flex-col gap-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-slate-200 font-bold">{p.name}</div>
                                                {p.role && <div className="text-xs text-slate-500 uppercase">{p.role}</div>}
                                            </div>
                                            <div className={`px-2 py-1 rounded text-xs font-bold border ${
                                                p.scorecard.grade === 'A' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                                p.scorecard.grade === 'B' ? 'bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20' :
                                                p.scorecard.grade === 'C' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                'bg-red-500/10 text-red-400 border-red-500/30'
                                            }`}>
                                                Grade {p.scorecard.grade}
                                            </div>
                                        </div>
                                        
                                        <div className="text-xs text-slate-400 italic border-l-2 border-slate-700 pl-2">
                                            "{p.scorecard.summary_analysis}"
                                        </div>

                                        {p.scorecard.flags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {p.scorecard.flags.map((flag, idx) => (
                                                    <span key={idx} className="text-[10px] uppercase font-bold text-red-400 bg-red-900/20 px-1.5 py-0.5 rounded border border-red-900/50 flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" /> {flag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )) : <p className="text-slate-500 italic text-sm">None identified.</p>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-500 italic">No key people data available.</p>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

const DataItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
        <p className="text-sm text-slate-200 font-medium">{value}</p>
    </div>
);

export default DeepDive;