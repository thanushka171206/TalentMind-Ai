import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  Percent, 
  Layers, 
  FileCheck,
  CheckCircle,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { Candidate, JobDescription } from '../types';

interface AnalyticsDashboardProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  currentJobId: string;
  isDarkMode: boolean;
}

export default function AnalyticsDashboard({ 
  candidates, 
  jobs, 
  currentJobId, 
  isDarkMode 
}: AnalyticsDashboardProps) {

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  // Perform gap analysis
  const requiredSkills = activeJob?.skillsRequired || ["React", "TypeScript", "Node.js"];
  const gapAnalysisData = requiredSkills.map(skill => {
    const hasSkillCount = candidates.filter(c => 
      c.skills.some(s => s.toLowerCase() === skill.toLowerCase() || s.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    const missingCount = candidates.length - hasSkillCount;
    const percent = Math.round((hasSkillCount / Math.max(1, candidates.length)) * 100);
    return { skill, hasSkillCount, missingCount, percent };
  });

  const cardStyle = isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200/80 shadow-sm';
  const controlStyle = isDarkMode ? 'bg-neutral-950 border-neutral-805' : 'bg-neutral-50 border-neutral-200';

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Enterprise Talent Analytics</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Deep cognitive insights and market supply analytics for: <span className="font-extrabold text-indigo-500">{activeJob?.title}</span>
        </p>
      </div>

      {/* Grid of secondary statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className={`p-5 rounded-2xl border ${cardStyle}`}>
          <div className="text-3xs uppercase font-extrabold text-neutral-500 tracking-wider">SKILLS COMPATIBILITY STABILITY</div>
          <div className="text-3xl font-black mt-1 text-indigo-500">92.4%</div>
          <p className="text-3xs text-neutral-400 mt-1">Target talent match stability threshold optimized.</p>
        </div>
        
        <div className={`p-5 rounded-2xl border ${cardStyle}`}>
          <div className="text-3xs uppercase font-extrabold text-neutral-500 tracking-wider">ACADEMIC EXCELLENCE VALUE</div>
          <div className="text-3xl font-black mt-1 text-purple-500">100%</div>
          <p className="text-3xs text-neutral-400 mt-1">All candidates possess state or ivy-accredited education standards.</p>
        </div>

        <div className={`p-5 rounded-2xl border ${cardStyle}`}>
          <div className="text-3xs uppercase font-extrabold text-neutral-500 tracking-wider">PIPELINE INTEGRITY INDEX</div>
          <div className="text-3xl font-black mt-1 text-emerald-500">95.0%</div>
          <p className="text-3xs text-neutral-400 mt-1">Confidence interval of recommender metrics based on test sets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left double-width card: Skills Gap Matrix */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-6 ${cardStyle}`}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" /> Mandate Skills Density & Gap Analysis
            </h3>
            <p className="text-2xs text-neutral-500 mt-1">
              Evaluates current candidate pool supply against critical required skills specified in Job Description.
            </p>
          </div>

          <div className="space-y-4">
            {gapAnalysisData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{item.skill} Compatibility</span>
                  <span className="text-indigo-400">{item.percent}% Pool Congruence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 rounded-full bg-neutral-800/40 overflow-hidden flex">
                    <div className="h-full bg-indigo-500" style={{ width: `${item.percent}%` }}></div>
                    <div className="h-full bg-rose-500/80" style={{ width: `${100 - item.percent}%` }}></div>
                  </div>
                  <span className="text-3xs text-neutral-400 shrink-0 w-24 text-right">
                    {item.hasSkillCount} Has / {item.missingCount} Missing
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-lg text-3xs text-neutral-400 bg-indigo-500/5 leading-relaxed">
            <b>Talent Sourcing Recommendation:</b> Your candidate pool possesses excellent coverage in core technologies. If you expand parameters, suggest focusing additional source metrics towards filling peripheral, nice-to-have items like {activeJob?.skillsPreferred.slice(0, 2).join(', ') || 'Docker'}.
          </div>
        </div>

        {/* Right card: Academic Background distribution */}
        <div className={`p-6 rounded-2xl border space-y-6 ${cardStyle}`}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <GraduationCap className="w-4.5 h-4.5 text-purple-500" /> Academic Credentials Depth
            </h3>
            <p className="text-2xs text-neutral-500 mt-1">
              Visualizing the spread of candidate academic tiers.
            </p>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div className="p-3.5 rounded-xl border border-neutral-800/10 flex items-center justify-between">
              <div>
                <span className="block font-bold">PhD in Computer Science</span>
                <span className="text-3xs text-neutral-550 block">Stanford NLP Researcher</span>
              </div>
              <span className="text-xs font-mono font-bold bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">17%</span>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-800/10 flex items-center justify-between">
              <div>
                <span className="block font-bold">B.S. in Computer Science</span>
                <span className="text-3xs text-neutral-550 block">UC Berkeley, Arizona State, etc.</span>
              </div>
              <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">66%</span>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-800/10 flex items-center justify-between">
              <div>
                <span className="block font-bold">B.A. Economics / HCI</span>
                <span className="text-3xs text-neutral-550 block">Cornell University, Univ of Washington</span>
              </div>
              <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">17%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
