import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  Trash2, 
  ChevronDown, 
  ThumbsUp, 
  ThumbsDown, 
  GitCompare, 
  Download, 
  CheckCircle,
  HelpCircle,
  Clock,
  Briefcase,
  MapPin,
  GraduationCap,
  Award,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Candidate, JobDescription } from '../types';

interface CandidateRankingProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  currentJobId: string;
  onUpdateStatus: (id: string, status: 'Applied' | 'Shortlisted' | 'Rejected') => void;
  onCompareSelect: (id: string) => void;
  selectedCompareIds: string[];
  isDarkMode: boolean;
  onRefreshRankings: (jobId: string) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => void;
  onScheduleInterview: (id: string, interviewSlot: string) => void;
}

export default function CandidateRanking({
  candidates,
  jobs,
  currentJobId,
  onUpdateStatus,
  onCompareSelect,
  selectedCompareIds,
  isDarkMode,
  onRefreshRankings,
  onUpdateNotes,
  onScheduleInterview
}: CandidateRankingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  
  // Scheduling states in CandidateRanking
  const [schedulingDate, setSchedulingDate] = useState<number>(18);
  const [schedulingHour, setSchedulingHour] = useState<string>("10:30 AM");
  const [bookingForCandId, setBookingForCandId] = useState<string | null>(null);
  
  // States for advanced filters
  const [minExp, setMinExp] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedNotice, setSelectedNotice] = useState('');
  const [isAiRankingActive, setIsAiRankingActive] = useState(false);

  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  // Helper: Get Candidate score and description for active job
  const getCandData = (c: Candidate) => {
    const scoreObj = c.scoresByJob[currentJobId] || {
      skillMatch: 70,
      experienceMatch: 65,
      careerGrowth: 70,
      education: 75,
      behavioralSignals: 70,
      projectRelevance: 65,
      culturalFit: 70,
      finalScore: 70
    };
    const explanation = c.aiExplanationsByJob[currentJobId] || 
      `${c.name} is scored at ${scoreObj.finalScore}% pending active AI-powered re-ranking for this mandate.`;
    return { scoreObj, explanation };
  };

  // Extract all unique skills & locations across the candidate pool for filter listing
  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills)));
  const allLocations = Array.from(new Set(candidates.map(c => c.location)));

  // Filter candidates
  const filteredCandidates = candidates.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchExp = c.experienceYears >= minExp;
    const matchSkill = selectedSkill ? c.skills.includes(selectedSkill) : true;
    const matchLoc = selectedLocation ? c.location === selectedLocation : true;
    const matchNotice = selectedNotice ? c.noticePeriod.toLowerCase().includes(selectedNotice.toLowerCase()) : true;

    return matchSearch && matchExp && matchSkill && matchLoc && matchNotice;
  });

  // Sort candidates by active job final score descending
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const scoreA = getCandData(a).scoreObj.finalScore;
    const scoreB = getCandData(b).scoreObj.finalScore;
    return scoreB - scoreA;
  });

  // Trigger active LLM re-ranking
  const handleTriggerAiRanking = async () => {
    setIsAiRankingActive(true);
    try {
      await onRefreshRankings(currentJobId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiRankingActive(false);
    }
  };

  // Export ranking table as CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Rank,Candidate ID,Candidate Name,Title,Score,Status,AI Explanation\n";

    sortedCandidates.forEach((c, index) => {
      const { scoreObj, explanation } = getCandData(c);
      const row = [
        index + 1,
        c.id,
        `"${c.name}"`,
        `"${c.title}"`,
        `${scoreObj.finalScore}%`,
        c.status,
        `"${explanation.replace(/"/g, '""')}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TalentMind_Rankings_${activeJob?.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export standard simple plain-text PDF file content mock download
  const handleExportPDF = () => {
    let reportText = `TALENTMIND AI REPORT: CANDIDATE RANKINGS\n`;
    reportText += `MANDATE: ${activeJob?.title}\n`;
    reportText += `DATE: ${new Date().toLocaleDateString()}\n\n`;
    reportText += `========================================================\n\n`;

    sortedCandidates.forEach((c, idx) => {
      const { scoreObj, explanation } = getCandData(c);
      reportText += `RANK ${idx + 1}: ${c.name} (${c.title})\n`;
      reportText += `Match Suitability Level: ${scoreObj.finalScore}%\n`;
      reportText += `Reasoning: ${explanation}\n`;
      reportText += `--------------------------------------------------------\n\n`;
    });

    const blob = new Blob([reportText], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `TalentMind_Report_${activeJob?.title.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  // Theme support styles
  const cardStyle = isDarkMode ? 'glass-panel-dark' : 'glass-panel-light';
  const controlStyle = isDarkMode ? 'glass-input-dark' : 'glass-input-light';

  return (
    <div className="space-y-6 font-sans">
      {/* Header with quick CTA buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Candidate Rankings</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Analyzing pool against: <span className="font-extrabold text-indigo-500">{activeJob?.title} {activeJob?.location ? `(${activeJob.location})` : ''}</span>
          </p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            id="export-csv-btn"
            onClick={handleExportCSV}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              isDarkMode ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            id="export-pdf-btn"
            onClick={handleExportPDF}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              isDarkMode ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export PDF Report
          </button>
          <button
            id="trigger-re-rank-btn"
            onClick={handleTriggerAiRanking}
            disabled={isAiRankingActive}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" /> {isAiRankingActive ? 'Recalculating...' : 'Trigger AI Re-Rank'}
          </button>
        </div>
      </div>

      {/* Main search and collapsible filter bar */}
      <div className={`p-4 rounded-xl border ${cardStyle} space-y-4`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 inset-y-0 my-auto" />
            <input
              id="candidates-search-bar"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, engineering title, or core competencies..."
              className={`w-full block pl-10 pr-4 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-indigo-500 transition-all ${
                isDarkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            />
          </div>
          <button
            id="toggle-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              showFilters 
                ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20' 
                : isDarkMode 
                  ? 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-300' 
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            <Filter className="w-4 h-4" /> Filters {minExp > 0 || selectedSkill || selectedLocation || selectedNotice ? '(Active)' : ''}
          </button>
        </div>

        {/* Collapsible filters fields */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-neutral-800/10 pt-4 text-xs overflow-hidden"
            >
              {/* Exp filter */}
              <div>
                <label className="block text-2xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Min Exp (Years)</label>
                <input
                  id="filter-min-exp"
                  type="number"
                  min="0"
                  value={minExp || ''}
                  onChange={(e) => setMinExp(Number(e.target.value))}
                  className={`w-full block p-2 rounded-lg border focus:outline-none ${controlStyle}`}
                  placeholder="e.g. 5"
                />
              </div>

              {/* Skills filter */}
              <div>
                <label className="block text-2xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Target Skill</label>
                <select
                  id="filter-skill"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className={`w-full block p-2 rounded-lg border focus:outline-none ${controlStyle}`}
                >
                  <option value="">Any Skill</option>
                  {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Location filter */}
              <div>
                <label className="block text-2xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Applicant Location</label>
                <select
                  id="filter-location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`w-full block p-2 rounded-lg border focus:outline-none ${controlStyle}`}
                >
                  <option value="">Any Location</option>
                  {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-2xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Notice constraints</label>
                <select
                  id="filter-notice"
                  value={selectedNotice}
                  onChange={(e) => setSelectedNotice(e.target.value)}
                  className={`w-full block p-2 rounded-lg border focus:outline-none ${controlStyle}`}
                >
                  <option value="">Any notice period</option>
                  <option value="Immediate">Immediate Only</option>
                  <option value="30 Days">30 Days Max</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Re-ranking skeletal loader representation */}
      {isAiRankingActive && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/5 animate-pulse text-xs text-indigo-400 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
            <span>Evaluating candidate resume files semantically against <b>&quot;{activeJob?.title}&quot;</b>. Executing re-ranking algorithm...</span>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className={`p-6 rounded-xl border animate-pulse ${cardStyle} h-40 flex flex-col justify-between`}>
              <div className="flex justify-between">
                <div className="w-1/3 h-5 bg-neutral-800 rounded"></div>
                <div className="w-12 h-6 bg-neutral-800 rounded"></div>
              </div>
              <div className="w-2/3 h-3 bg-neutral-800 rounded mt-3"></div>
              <div className="w-full h-8 bg-neutral-800 rounded-lg mt-6"></div>
            </div>
          ))}
        </div>
      )}

      {/* Main candidate catalog cards list */}
      {!isAiRankingActive && (
        <div className="space-y-4">
          {sortedCandidates.length === 0 ? (
            <div className={`p-12 text-center border-2 border-dashed rounded-2xl ${
              isDarkMode ? 'border-neutral-800 text-neutral-400' : 'border-neutral-250 text-neutral-500'
            }`}>
              <AlertCircle className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
              <h3 className="font-bold text-md mb-1">No Matching Candidates Found</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                No profiles align with your current filters or searching parameters. Try adjusting filters or upload new candidate files.
              </p>
            </div>
          ) : (
            sortedCandidates.map((c, index) => {
              const { scoreObj, explanation } = getCandData(c);
              const isSelectedForCompare = selectedCompareIds.includes(c.id);

              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={c.id}
                  id={`cand-card-${c.id}`}
                  className={`p-6 rounded-2xl border transition-all ${cardStyle} ${
                    isSelectedForCompare ? 'ring-2 ring-indigo-600/60' : 'hover:border-indigo-500/20'
                  }`}
                >
                  <div className="flex flex-col xl:flex-row gap-6">
                    {/* Left block - candidate baseline */}
                    <div className="xl:w-80 space-y-4 shrink-0">
                      <div className="flex gap-4 items-start">
                        <img 
                          src={c.avatar} 
                          alt={c.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-neutral-700 bg-neutral-800" 
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-neutral-500 font-mono text-xs">#{index + 1}</span>
                            <h3 className="font-extrabold text-md truncate">{c.name}</h3>
                          </div>
                          <p className="text-xs text-indigo-500 font-bold truncate mt-0.5">{c.title}</p>
                          <span className="text-3xs uppercase font-semibold text-neutral-500">Exp: {c.experienceYears} Years</span>
                        </div>
                      </div>

                      {/* Technical skill tags */}
                      <div className="flex flex-wrap gap-1">
                        {c.skills.slice(0, 5).map((skill, idx) => (
                          <span key={idx} className={`text-3xs px-2 py-0.5 rounded font-semibold font-mono ${
                            activeJob?.skillsRequired.includes(skill)
                              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                              : 'bg-neutral-800/20 text-neutral-400'
                          }`}>
                            {skill}
                          </span>
                        ))}
                        {c.skills.length > 5 && (
                          <span className="text-3xs px-1 py-0.5 rounded bg-neutral-800/10 text-neutral-400">
                            +{c.skills.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Meta links info */}
                      <div className="space-y-1.5 text-3xs text-neutral-400 font-medium">
                        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-neutral-500" /> {c.location}</div>
                        <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-neutral-500" /> Notice: {c.noticePeriod}</div>
                        {c.education && c.education[0] && (
                          <div className="flex items-center gap-2 truncate">
                            <GraduationCap className="w-3.5 h-3.5 text-neutral-500" /> {c.education[0].degree}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Middle block - score distribution details */}
                    <div className="flex-1 space-y-4">
                      {/* Overall Suitability Indicator bar */}
                      <div className="flex items-center justify-between border-b border-neutral-800/10 pb-3">
                        <span className="text-2xs font-extrabold uppercase tracking-widest text-neutral-400">Match score components</span>
                        <div className="flex items-center gap-2">
                          <span className="text-3xs font-mono text-neutral-450 uppercase">Weighted score:</span>
                          <span className={`text-xl font-black px-2.5 py-0.5 rounded-lg ${
                            scoreObj.finalScore >= 90 ? 'bg-indigo-600 text-white' : scoreObj.finalScore >= 80 ? 'bg-purple-600 text-white' : 'bg-neutral-800/30 text-neutral-400'
                          }`}>
                            {scoreObj.finalScore}%
                          </span>
                        </div>
                      </div>

                      {/* Six dimensional mini progress widgets */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-3xs">
                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-neutral-400">Skill alignment (30%)</span>
                            <span className="font-bold text-indigo-400">{scoreObj.skillMatch}%</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-800/40 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${scoreObj.skillMatch}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-neutral-400">Experience Match (20%)</span>
                            <span className="font-bold text-purple-400">{scoreObj.experienceMatch}%</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-800/40 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${scoreObj.experienceMatch}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-neutral-400">Career Velocity (10%)</span>
                            <span className="font-bold text-violet-400">{scoreObj.careerGrowth}%</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-800/40 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500" style={{ width: `${scoreObj.careerGrowth}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-neutral-400">Academic value (10%)</span>
                            <span className="font-bold text-blue-400">{scoreObj.education}%</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-800/40 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${scoreObj.education}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-neutral-400">Behavioral indicators (15%)</span>
                            <span className="font-bold text-emerald-400">{scoreObj.behavioralSignals}%</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-800/40 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${scoreObj.behavioralSignals}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-neutral-400">Project match state (10%)</span>
                            <span className="font-bold text-orange-400">{scoreObj.projectRelevance}%</span>
                          </div>
                          <div className="w-full h-1 bg-neutral-800/40 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ width: `${scoreObj.projectRelevance}%` }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Explainable AI Commentary */}
                      <div className={`p-3.5 rounded-lg border leading-relaxed text-xs relative overflow-hidden ${
                        isDarkMode ? 'bg-neutral-950/40 border-neutral-805 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                      }`}>
                        <span className="font-extrabold uppercase text-3xs text-neutral-400 tracking-wider flex items-center gap-1.5 mb-1 bg-indigo-500/5 px-2 py-0.5 rounded w-fit">
                          <Sparkles className="w-3 h-3 text-indigo-500" /> Explainable AI Alignment Summary:
                        </span>
                        <span>{explanation}</span>
                      </div>

                      {/* Recruiter Private Notes Section */}
                      <div className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                        isDarkMode ? 'bg-neutral-950/20 border-neutral-805/80 text-neutral-300' : 'bg-neutral-50/50 border-neutral-200 text-neutral-700'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold uppercase text-[10px] text-neutral-450 tracking-wider flex items-center gap-1.5 px-1 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Recruiter Notes (Private & Sourced):
                          </span>
                        </div>
                        {isEditingNotes === c.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              id={`cand-${c.id}-notes-input`}
                              className={`flex-1 text-xs px-2.5 py-1.5 rounded-lg border focus:outline-none focus:border-indigo-500 ${
                                isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-neutral-250 text-neutral-800'
                              }`}
                              placeholder="e.g. Exceptional skills. Salary expectations within budget."
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              autoFocus
                            />
                            <button
                              id={`cand-${c.id}-notes-save`}
                              onClick={() => {
                                onUpdateNotes(c.id, tempNotes);
                                setIsEditingNotes(null);
                              }}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-xs cursor-pointer transition-colors"
                            >
                              Save
                            </button>
                            <button
                              id={`cand-${c.id}-notes-cancel`}
                              onClick={() => setIsEditingNotes(null)}
                              className={`px-3 py-1 border rounded text-xs cursor-pointer transition-colors ${
                                isDarkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                              }`}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start gap-4">
                            <p className={`italic ${c.notes ? 'text-neutral-200' : 'text-neutral-500'}`}>
                              {c.notes || "No private notes added yet. Useful for pre-screening comments, interview reminders, or salary expectations."}
                            </p>
                            <button
                              id={`cand-${c.id}-notes-edit-btn`}
                              onClick={() => {
                                setIsEditingNotes(c.id);
                                setTempNotes(c.notes || '');
                              }}
                              className="text-indigo-400 hover:text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider underline cursor-pointer hover:no-underline shrink-0"
                            >
                              {c.notes ? 'Edit' : '+ Add Note'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Interactive Calendar Scheduler Section */}
                      <div className={`p-3.5 rounded-lg border text-xs space-y-3.5 ${
                        isDarkMode ? 'bg-neutral-950/20 border-neutral-805/80 text-neutral-300' : 'bg-neutral-50/50 border-neutral-200 text-neutral-705'
                      }`}>
                        <div className="flex justify-between items-center pb-1 border-b border-neutral-800/10">
                          <span className="font-extrabold uppercase text-[10px] text-neutral-450 tracking-wider flex items-center gap-1.5 px-1 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Schedule Interview Slot:
                          </span>
                          {c.interviewSlot && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-extrabold flex items-center gap-1 animate-pulse">
                              <Calendar className="w-2.5 h-2.5" /> Scheduled
                            </span>
                          )}
                        </div>

                        {c.interviewSlot && bookingForCandId !== c.id ? (
                          <div className={`p-2.5 rounded-lg border flex items-center justify-between gap-4 ${
                            isDarkMode ? 'bg-emerald-500/5' + ' border-emerald-500/20' : 'bg-emerald-500/[0.02] border-emerald-500/10'
                          }`}>
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase font-bold text-neutral-500">Confirmed Interview Date/Time:</span>
                              <div className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-neutral-850'}`}>
                                {c.interviewSlot}
                              </div>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setBookingForCandId(c.id);
                                  const dateMatch = c.interviewSlot?.match(/June (\d+)/);
                                  if (dateMatch) setSchedulingDate(parseInt(dateMatch[1], 10));
                                  const hourMatch = c.interviewSlot?.match(/at (.+)$/);
                                  if (hourMatch) setSchedulingHour(hourMatch[1]);
                                }}
                                className="px-2 py-1 text-[9px] font-bold tracking-wider uppercase rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                              >
                                Change
                              </button>
                              <button
                                type="button"
                                onClick={() => onScheduleInterview(c.id, '')}
                                className={`px-2 py-1 text-[9px] font-bold tracking-wider uppercase rounded border cursor-pointer ${
                                  isDarkMode ? 'border-neutral-805 hover:border-neutral-700 text-rose-400' : 'border-neutral-200 hover:bg-neutral-100 text-rose-650'
                                }`}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {/* Calendar selection block */}
                            <div className="p-2 border border-neutral-800/10 rounded bg-neutral-900/10">
                              <div className="flex items-center justify-between mb-2 pb-1 border-b border-neutral-800/10">
                                <span className="font-semibold text-neutral-450 text-[10px]">June 2026</span>
                                <span className="font-mono text-neutral-500 text-[9px] font-bold">M-F Only</span>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-neutral-500 mb-1 uppercase font-mono text-neutral-400">
                                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span className="text-neutral-600">Sa</span><span className="text-neutral-600">Su</span>
                              </div>
                              <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: 30 }, (_, i) => {
                                  const dayNum = i + 1;
                                  const isWeekend = (i % 7 === 5 || i % 7 === 6);
                                  const isSelected = schedulingDate === dayNum;

                                  return (
                                    <button
                                      key={dayNum}
                                      type="button"
                                      disabled={isWeekend}
                                      onClick={() => setSchedulingDate(dayNum)}
                                      className={`aspect-square text-[10px] flex items-center justify-center rounded-md font-mono ${
                                        isWeekend 
                                          ? 'opacity-20 cursor-not-allowed text-neutral-600 font-normal'
                                          : isSelected
                                            ? 'bg-indigo-600 text-white font-extrabold focus:outline-none shadow-sm'
                                            : 'hover:bg-neutral-800/40 text-neutral-300 font-semibold cursor-pointer'
                                      }`}
                                    >
                                      {dayNum}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Time Slots */}
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-indigo-400" /> June {schedulingDate} Availability:
                              </span>
                              <div className="grid grid-cols-5 gap-1">
                                {["09:00 AM", "10:30 AM", "01:05 PM", "02:30 PM", "04:00 PM"].map((t) => {
                                  const isSelected = schedulingHour === t;
                                  return (
                                    <button
                                      key={t}
                                      type="button"
                                      onClick={() => setSchedulingHour(t)}
                                      className={`py-1 text-[9px] text-center rounded-md font-mono transition-colors duration-100 ${
                                        isSelected 
                                          ? 'bg-purple-600 text-white font-extrabold'
                                          : 'bg-neutral-800/30 hover:bg-neutral-800/60 border border-neutral-800/10 text-neutral-300 cursor-pointer'
                                      }`}
                                    >
                                      {t}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Actions button */}
                            <div className="flex gap-1.5 font-mono">
                              <button
                                type="button"
                                onClick={() => {
                                  onScheduleInterview(c.id, `June ${schedulingDate}, 2026 at ${schedulingHour}`);
                                  setBookingForCandId(null);
                                }}
                                className="flex-1 py-1.5 text-[10px] font-extrabold uppercase tracking-wide rounded bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95 transition-transform"
                              >
                                Save Interview Slot
                              </button>
                              {c.interviewSlot && (
                                <button
                                  type="button"
                                  onClick={() => setBookingForCandId(null)}
                                  className={`px-3 py-1.5 text-[10px] font-bold rounded border cursor-pointer ${
                                    isDarkMode ? 'border-neutral-805 hover:bg-neutral-800 text-neutral-450' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-600'
                                  }`}
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right block - Candidate controls details */}
                    <div className="xl:w-44 flex xl:flex-col justify-end xl:justify-center gap-2 shrink-0 border-t xl:border-t-0 xl:border-l border-neutral-800/10 pt-4 xl:pt-0 xl:pl-6">
                      <button
                        id={`cand-${c.id}-shortlist-btn`}
                        onClick={() => onUpdateStatus(c.id, 'Shortlisted')}
                        className={`py-2 px-3 text-2xs rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full ${
                          c.status === 'Shortlisted'
                            ? 'bg-emerald-600 text-white'
                            : isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> Shortlist
                      </button>
                      
                      <button
                        id={`cand-${c.id}-reject-btn`}
                        onClick={() => onUpdateStatus(c.id, 'Rejected')}
                        className={`py-2 px-3 text-2xs rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full ${
                          c.status === 'Rejected'
                            ? 'bg-rose-600 text-white'
                            : isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" /> Reject
                      </button>

                      <button
                        id={`cand-${c.id}-compare-add`}
                        onClick={() => onCompareSelect(c.id)}
                        className={`py-2 px-3 text-2xs rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer w-full border ${
                          isSelectedForCompare
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow shadow-indigo-550/15'
                            : isDarkMode ? 'bg-transparent border-neutral-800 hover:bg-neutral-800 text-neutral-300' : 'bg-transparent border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                        }`}
                      >
                        <GitCompare className="w-3.5 h-3.5" /> 
                        {isSelectedForCompare ? 'Selected' : 'Compare Candidate'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
