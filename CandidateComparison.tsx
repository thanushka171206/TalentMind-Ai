import React from 'react';
import { motion } from 'motion/react';
import { 
  GitCompare, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Clock, 
  CheckCircle, 
  X,
  AlertCircle,
  Download
} from 'lucide-react';
import { Candidate, JobDescription } from '../types';

interface CandidateComparisonProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  currentJobId: string;
  selectedCompareIds: string[];
  onCompareSelect: (id: string) => void;
  onClearCompare: () => void;
  isDarkMode: boolean;
}

export default function CandidateComparison({
  candidates,
  jobs,
  currentJobId,
  selectedCompareIds,
  onCompareSelect,
  onClearCompare,
  isDarkMode
}: CandidateComparisonProps) {

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];
  const comparedCandidates = candidates.filter(c => selectedCompareIds.includes(c.id));

  const getCandScore = (c: Candidate) => {
    return c.scoresByJob[currentJobId]?.finalScore || 70;
  };

  const handleExportCSV = () => {
    if (comparedCandidates.length === 0) return;

    const escapeCSV = (val: string) => {
      const escaped = val.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const headers = [
      "Candidate ID",
      "Name",
      "Email",
      "Title",
      "Total Score (%)",
      "Technical Fit (%)",
      "Experience Fitness (%)",
      "Project Congruence (%)",
      "Behavioral Score (%)",
      "Education Score (%)",
      "Career Growth Score (%)",
      "Years of Experience",
      "Notice Period",
      "Skills",
      "Education Detail",
      "Certifications",
      "Recruiter Private Notes"
    ];

    const rows = comparedCandidates.map(c => {
      const score = getCandScore(c);
      const scoreObj = c.scoresByJob[currentJobId] || {
        skillMatch: 70,
        experienceMatch: 70,
        careerGrowth: 70,
        education: 70,
        behavioralSignals: 70,
        projectRelevance: 70,
        culturalFit: 70
      };

      const skillsFormatted = c.skills.join(', ');
      const educationFormatted = c.education.map(edu => `${edu.degree} at ${edu.institution} (${edu.year})`).join('; ');
      const certsFormatted = (c.certifications || []).join(', ');
      const notesFormatted = c.notes || '';

      return [
        c.id,
        c.name,
        c.email,
        c.title,
        score,
        scoreObj.skillMatch,
        scoreObj.experienceMatch,
        scoreObj.projectRelevance,
        scoreObj.behavioralSignals,
        scoreObj.education || 70,
        scoreObj.careerGrowth || 70,
        c.experienceYears,
        c.noticePeriod,
        skillsFormatted,
        educationFormatted,
        certsFormatted,
        notesFormatted
      ].map(val => escapeCSV(String(val)));
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `candidate_comparison_${activeJob?.title.toLowerCase().replace(/\s+/g, '_') || 'export'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardStyle = isDarkMode ? 'glass-panel-dark' : 'glass-panel-light';
  const headerStyle = isDarkMode ? 'border-white/5' : 'border-black/5';

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Side-by-Side Comparison</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Comparing candidate attributes against: <span className="font-extrabold text-indigo-500">{activeJob?.title}</span>
          </p>
        </div>
        {comparedCandidates.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              id="export-comparison-btn"
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors shadow-sm shadow-indigo-600/10 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Reset Matrix / CSV Export
            </button>
            <button
              id="clear-comparison-btn"
              onClick={onClearCompare}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer hover:opacity-85 transition-opacity ${
                isDarkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-200' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}
            >
              Clear Selected
            </button>
          </div>
        )}
      </div>

      {/* Empty State: Prompt quick select */}
      {comparedCandidates.length === 0 ? (
        <div className={`p-12 text-center border-2 border-dashed rounded-2xl ${
          isDarkMode ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'
        }`}>
          <GitCompare className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
          <h3 className="font-bold text-md mb-1">No profiles selected for comparison</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Select candidates below or check them in the Candidate Rankings tab to load them side-by-side.
          </p>

          <div className="mt-8 max-w-xl mx-auto space-y-3">
            <h4 className="text-xs font-semibold text-neutral-500 text-center uppercase tracking-widest pl-2">Quick Compare Candidates Selector</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {candidates.map((c) => (
                <button
                  id={`quick-add-compare-${c.id}`}
                  key={c.id}
                  onClick={() => onCompareSelect(c.id)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                    isDarkMode 
                      ? 'bg-neutral-950/60 border-neutral-850 hover:bg-neutral-800/60' 
                      : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <div className="font-bold truncate">{c.name}</div>
                  <div className="text-3xs text-neutral-500 truncate mt-0.5">{c.title}</div>
                  <div className="text-3xs font-black text-indigo-500 mt-1">Score: {getCandScore(c)}%</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Side by side grid scroll wrapper */
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px] grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparedCandidates.map((c, idx) => {
              const score = getCandScore(c);
              const scoreObj = c.scoresByJob[currentJobId] || {
                skillMatch: 70,
                experienceMatch: 70,
                careerGrowth: 70,
                education: 70,
                behavioralSignals: 70,
                projectRelevance: 70,
                culturalFit: 70
              };

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  key={c.id}
                  id={`compare-col-${c.id}`}
                  className={`p-6 rounded-2xl border flex flex-col relative overflow-hidden ${cardStyle}`}
                >
                  {/* Remove column button */}
                  <button
                    id={`remove-compare-${c.id}`}
                    onClick={() => onCompareSelect(c.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-800/10 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Profile Header */}
                  <div className="text-center pb-6 border-b border-neutral-800/10 mb-6 mt-2">
                    <img 
                      src={c.avatar} 
                      alt={c.name} 
                      className="w-16 h-16 rounded-full object-cover border border-neutral-700 bg-neutral-800 mx-auto mb-3 shadow" 
                    />
                    <h3 className="font-extrabold text-md">{c.name}</h3>
                    <p className="text-xs text-indigo-500 font-bold mt-1 line-clamp-1">{c.title}</p>
                    <div className="inline-block mt-3 px-3 py-1 font-black text-lg rounded-xl bg-indigo-500/10 text-indigo-400">
                      Score: {score}%
                    </div>
                  </div>

                  {/* Comparison Parameters */}
                  <div className="space-y-6 flex-1 text-xs">
                    {/* Experience section */}
                    <div>
                      <span className="text-3xs uppercase tracking-widest font-extrabold text-neutral-500 mb-2 block flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" /> Career Experience Period
                      </span>
                      <div className="font-bold text-neutral-300">
                        {c.experienceYears} Years Total
                      </div>
                      <div className="text-neutral-500 mt-1 italic text-2xs">
                        Notice timeframe: {c.noticePeriod}
                      </div>
                    </div>

                    {/* Competency Skills list */}
                    <div>
                      <span className="text-3xs uppercase tracking-widest font-extrabold text-neutral-500 mb-2 block flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-neutral-400" /> Professional Skills Depth
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {c.skills.map((s, idx) => (
                          <span key={idx} className="text-3xs px-2 py-0.5 rounded font-mono font-bold bg-neutral-800/30 text-neutral-400 border border-neutral-800/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education block */}
                    <div>
                      <span className="text-3xs uppercase tracking-widest font-extrabold text-neutral-500 mb-2 block flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-neutral-400" /> Academic Background
                      </span>
                      {c.education.map((edu, idx) => (
                        <div key={idx} className="leading-tight mt-1">
                          <div className="font-extrabold text-neutral-300">{edu.degree}</div>
                          <div className="text-3xs text-neutral-500">{edu.institution} ({edu.year})</div>
                        </div>
                      ))}
                    </div>

                    {/* Certifications block */}
                    {c.certifications && c.certifications.length > 0 && (
                      <div>
                        <span className="text-3xs uppercase tracking-widest font-extrabold text-neutral-500 mb-2 block">
                          CERTIFICATIONS
                        </span>
                        <div className="space-y-1">
                          {c.certifications.map((cert, idx) => (
                            <div key={idx} className="text-2xs text-neutral-400 font-medium">• {cert}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Scoring match indicators metrics */}
                    <div>
                      <span className="text-3xs uppercase tracking-widest font-extrabold text-neutral-500 mb-3 block flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Match Score Dimensions
                      </span>
                      <div className="space-y-2.5 text-3xs">
                        <div>
                          <div className="flex justify-between font-bold mb-0.5">
                            <span>Technical Fit</span>
                            <span>{scoreObj.skillMatch}%</span>
                          </div>
                          <div className="h-1 w-full bg-neutral-800 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scoreObj.skillMatch}%` }}></div></div>
                        </div>

                        <div>
                          <div className="flex justify-between font-bold mb-0.5">
                            <span>Experience Fitness</span>
                            <span>{scoreObj.experienceMatch}%</span>
                          </div>
                          <div className="h-1 w-full bg-neutral-800 rounded-full"><div className="h-full bg-purple-500 rounded-full" style={{ width: `${scoreObj.experienceMatch}%` }}></div></div>
                        </div>

                        <div>
                          <div className="flex justify-between font-bold mb-0.5">
                            <span>Project Congruence</span>
                            <span>{scoreObj.projectRelevance}%</span>
                          </div>
                          <div className="h-1 w-full bg-neutral-800 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scoreObj.projectRelevance}%` }}></div></div>
                        </div>

                        <div>
                          <div className="flex justify-between font-bold mb-0.5">
                            <span>Behavioral / Soft Score</span>
                            <span>{scoreObj.behavioralSignals}%</span>
                          </div>
                          <div className="h-1 w-full bg-neutral-800 rounded-full"><div className="h-full bg-orange-400 rounded-full" style={{ width: `${scoreObj.behavioralSignals}%` }}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add candidate selectors helper */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/10">
                    <button
                      id={`compare-remove-cta-${c.id}`}
                      onClick={() => onCompareSelect(c.id)}
                      className="w-full py-2 bg-neutral-800/5 hover:bg-rose-500/10 hover:text-rose-400 border border-neutral-800/10 rounded-lg text-2xs font-extrabold transition-colors text-center cursor-pointer"
                    >
                      Dismount from Matrix
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Quick action col representation if space permits */}
            {comparedCandidates.length < 3 && (
              <div className={`p-6 rounded-2xl border border-dashed flex flex-col justify-center items-center text-center ${
                isDarkMode ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-400'
              }`}>
                <GitCompare className="w-8 h-8 opacity-40 mb-3" />
                <h4 className="font-bold text-xs mb-1">Add Another Candidate</h4>
                <p className="text-3xs text-neutral-500 leading-normal max-w-32 mb-4">
                  Compare up to 3 candidates simultaneously.
                </p>

                <div className="space-y-1.5 w-full">
                  {candidates.filter(cand => !selectedCompareIds.includes(cand.id)).slice(0, 2).map((rem) => (
                    <button
                      id={`compare-add-slot-${rem.id}`}
                      key={rem.id}
                      onClick={() => onCompareSelect(rem.id)}
                      className="w-full py-1.5 px-3 bg-neutral-800/20 hover:bg-indigo-600/10 hover:text-indigo-400 rounded-lg text-3xs font-extrabold transition-colors text-center cursor-pointer"
                    >
                      + Mount {rem.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
