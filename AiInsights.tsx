import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  HelpCircle, 
  BrainCircuit, 
  Search, 
  TrendingUp, 
  GitCompare, 
  Zap, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import { Candidate, JobDescription } from '../types';

interface AiInsightsProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  currentJobId: string;
  isDarkMode: boolean;
}

export default function AiInsights({ candidates, jobs, currentJobId, isDarkMode }: AiInsightsProps) {
  
  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  const getCandData = (c: Candidate) => {
    const scoreObj = c.scoresByJob[currentJobId] || { finalScore: 70 };
    const explanation = c.aiExplanationsByJob[currentJobId] || "Local matching processed.";
    return { scoreObj, explanation };
  };

  // Sort candidates by score
  const sortedCandidates = [...candidates].sort((a,b) => {
    return getCandData(b).scoreObj.finalScore - getCandData(a).scoreObj.finalScore;
  });

  const cardStyle = isDarkMode ? 'glass-panel-dark' : 'glass-panel-light';

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Explainable AI Insights</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Algorithmic alignment explanations and cognitive reasoning audits for: <span className="font-extrabold text-indigo-500">{activeJob?.title}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Algorithmic parameters info */}
        <div className={`p-6 rounded-2xl border space-y-6 lg:col-span-1 h-fit ${cardStyle}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-500" /> Scoring Parameters Weighting
          </h2>

          <p className="text-2xs text-neutral-500 leading-relaxed">
            TalentMind AI scoring is comprised of 6 discrete weighted core metrics (optimized with expert recruiter weights).
          </p>

          <div className="space-y-3.5 text-xs">
            <div className={`flex items-center justify-between pointer-events-none p-3.5 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <span className="font-bold">Skill Alignment</span>
              <span className="text-emerald-400 font-mono font-bold">30% Weight</span>
            </div>

            <div className={`flex items-center justify-between pointer-events-none p-3.5 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <span className="font-bold">Experience Match</span>
              <span className="text-purple-400 font-mono font-bold">20% Weight</span>
            </div>

            <div className={`flex items-center justify-between pointer-events-none p-3.5 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <span className="font-bold">Behavioral Trait Index</span>
              <span className="text-violet-400 font-mono font-bold">15% Weight</span>
            </div>

            <div className={`flex items-center justify-between pointer-events-none p-3.5 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <span className="font-bold">Academic Fit</span>
              <span className="text-blue-400 font-mono font-bold">10% Weight</span>
            </div>

            <div className={`flex items-center justify-between pointer-events-none p-3.5 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <span className="font-bold">Project Relevance</span>
              <span className="text-emerald-400 font-mono font-bold">10% Weight</span>
            </div>

            <div className={`flex items-center justify-between pointer-events-none p-3.5 rounded-xl border ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              <span className="font-bold">Career growth rate</span>
              <span className="text-orange-400 font-mono font-bold">10% Weight</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Core insights feed per candidate */}
        <div className={`p-6 rounded-2xl border space-y-6 lg:col-span-2 ${cardStyle}`}>
          <div className="border-b border-neutral-850 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" /> Cognitive Alignment Reasoning Feed
            </h2>
            <p className="text-3xs text-neutral-500 mt-1">
              Provides direct, human-readable explanations on candidate scores.
            </p>
          </div>

          <div className="space-y-6">
            {sortedCandidates.map((c, idx) => {
              const { scoreObj, explanation } = getCandData(c);
              return (
                <div key={c.id} className="p-5 rounded-2xl border border-neutral-800/10 space-y-3 relative group hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={c.avatar} 
                        alt={c.name} 
                        className="w-10 h-10 rounded-xl object-cover shrink-0 border border-neutral-800" 
                      />
                      <div>
                        <h4 className="font-extrabold text-sm">{c.name}</h4>
                        <span className="text-3xs text-indigo-400 font-bold">{c.title}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-3xs text-neutral-500 block uppercase font-bold tracking-wider font-mono">Rank #{idx + 1}</span>
                      <span className="text-sm font-bold text-indigo-400 font-mono">{scoreObj.finalScore}% Overall Match</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl text-xs font-semibold leading-relaxed ${
                    isDarkMode ? 'bg-neutral-950/40 text-neutral-350' : 'bg-neutral-50 text-neutral-800'
                  }`}>
                    {explanation}
                  </div>

                  {/* Recommendation action pills */}
                  <div className="flex items-center gap-2.5 text-3xs font-extrabold uppercase font-mono tracking-widest pl-1 pt-1 text-neutral-450">
                    <span>RECOMMENDED ACTION:</span>
                    {scoreObj.finalScore >= 88 ? (
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> FAST-TRACK SHORTLIST
                      </span>
                    ) : scoreObj.finalScore >= 80 ? (
                      <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" /> SCHEDULE COGNITIVE SCREEN
                      </span>
                    ) : (
                      <span className="text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> HOLD FOR LATERAL MANDATES
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
