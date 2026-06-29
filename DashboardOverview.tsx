import { motion } from 'motion/react';
import { 
  Users, 
  CheckSquare, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Layers, 
  UserPlus, 
  FolderGit, 
  ArrowRight,
  PieChart,
  Grid
} from 'lucide-react';
import { Candidate, JobDescription } from '../types';

interface DashboardOverviewProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  currentJobId: string;
  onNavigateToTab: (tab: string) => void;
  isDarkMode: boolean;
}

export default function DashboardOverview({ 
  candidates, 
  jobs, 
  currentJobId, 
  onNavigateToTab, 
  isDarkMode 
}: DashboardOverviewProps) {
  
  // Calculate metric values dynamically based on pool
  const totalCands = candidates.length;
  const shortlistedCands = candidates.filter(c => c.status === 'Shortlisted').length;
  const averageMatchScore = Math.round(
    candidates.reduce((sum, c) => {
      const scoreObj = c.scoresByJob[currentJobId];
      return sum + (scoreObj ? scoreObj.finalScore : 70);
    }, 0) / Math.max(1, totalCands)
  );

  const cardStyle = isDarkMode
    ? 'glass-panel-dark'
    : 'glass-panel-light';

  const subTextStyle = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  // Static funnel steps representing our AI-powered stage
  const funnelSteps = [
    { label: 'Ingested Resumes', value: totalCands, percent: 100, color: 'bg-indigo-600' },
    { label: 'Semantic Screened (80%+)', value: candidates.filter(c => {
      const score = c.scoresByJob[currentJobId]?.finalScore || 70;
      return score >= 80;
    }).length, percent: 75, color: 'bg-purple-600' },
    { label: 'Shortlisted Partners', value: shortlistedCands, percent: 45, color: 'bg-violet-600' },
    { label: 'Hiring Team Review', value: Math.max(1, Math.round(shortlistedCands * 0.6)), percent: 20, color: 'bg-emerald-600' }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Recruitment Dashboard</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Real-time candidate alignment scoring analytics. Currently tracked job mandate: {' '}
            <span className="font-bold text-indigo-500">
              {jobs.find(j => j.id === currentJobId)?.title || "General Pipeline"}
            </span>
          </p>
        </div>
        <button
          id="dashboard-evaluate-quick"
          onClick={() => onNavigateToTab('rankings')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/10 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          Run AI Re-ranking <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Key Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Candidates */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-30 transition-all hover:border-indigo-500/30 ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Candidates</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500"><Users className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black">{totalCands}</div>
            <div className="text-3xs text-emerald-500 font-bold mt-1">● Ingested Pool active</div>
          </div>
        </div>

        {/* Shortlisted Candidates */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-30 transition-all hover:border-violet-500/30 ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Shortlisted</span>
            <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-500"><CheckSquare className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black">{shortlistedCands}</div>
            <div className="text-3xs text-indigo-400 font-bold mt-1">
              {Math.round((shortlistedCands / Math.max(1, totalCands)) * 100)}% Conversion rate
            </div>
          </div>
        </div>

        {/* Average Match Score */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-30 transition-all hover:border-purple-500/30 ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Average Match</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500"><Sparkles className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black">{averageMatchScore}%</div>
            <div className="text-3xs text-purple-400 font-bold mt-1">Target Alignment: 88%+</div>
          </div>
        </div>

        {/* Hiring Trends */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-30 transition-all hover:border-blue-500/30 ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Hiring Trends</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-md font-bold">Optimal Speed</div>
            <div className="text-3xs text-blue-400 font-bold mt-1">Inflow +14% overall</div>
          </div>
        </div>

        {/* Diversity Analytics */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-30 transition-all hover:border-orange-500/30 ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Diversity index</span>
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400"><Layers className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black">94.8%</div>
            <div className="text-3xs text-neutral-500 font-bold mt-1">Skill-guided vetting</div>
          </div>
        </div>

        {/* Time Saved */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-30 transition-all hover:border-emerald-500/30 ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Time Saved</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500"><Clock className="w-4 h-4" /></div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black">42.5 hrs</div>
            <div className="text-3xs text-emerald-400 font-bold mt-1">4.5x faster screenings</div>
          </div>
        </div>
      </div>

      {/* Grid of Custom Animated SVG Bento-Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Candidate Suitability Distribution */}
        <div className={`p-6 rounded-2xl border ${cardStyle}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 inline-flex items-center gap-1.5">
            <Grid className="w-4 h-4 text-indigo-500" /> Candidate Score Distributions
          </h3>
          <p className="text-2xs text-neutral-500 mb-4">
            Breakdown showing candidates suitability scores for the current pipeline.
          </p>

          <div className="space-y-4">
            {candidates.map((c, idx) => {
              const score = c.scoresByJob[currentJobId]?.finalScore || 70;
              const barColor = score >= 90 ? 'from-indigo-600 to-purple-500' : score >= 80 ? 'from-purple-500 to-violet-500' : 'from-neutral-500 to-neutral-400';
              return (
                <div key={c.id}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold">{c.name} ({c.title})</span>
                    <span className="font-bold text-indigo-500">{score}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${barColor}`}
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Skill Match Density Analysis Graph */}
        <div className={`p-6 rounded-2xl border ${cardStyle}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" /> Key Technical Skills Density
          </h3>
          <p className="text-2xs text-neutral-500 mb-4">
            Identifies aggregate skills count among active applicants.
          </p>

          <div className="h-44 relative flex items-end gap-3 pt-6 border-b border-neutral-800/10">
            {[
              { skill: 'React', count: 4, height: 'h-40', color: 'bg-indigo-600' },
              { skill: 'TypeScript', count: 3, height: 'h-32', color: 'bg-indigo-500' },
              { skill: 'Node.js', count: 3, height: 'h-32', color: 'bg-purple-600' },
              { skill: 'Python', count: 2, height: 'h-24', color: 'bg-purple-500' },
              { skill: 'Tailwind CSS', count: 3, height: 'h-32', color: 'bg-violet-600' },
              { skill: 'Postgres', count: 2, height: 'h-24', color: 'bg-violet-500' },
              { skill: 'Product Roadmap', count: 1, height: 'h-12', color: 'bg-indigo-300' }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer relative">
                <div className="text-3xs text-neutral-500 opacity-0 group-hover:opacity-100 absolute -top-5 transition-opacity bg-neutral-900 text-white font-mono px-1.5 py-0.5 rounded">
                  {item.count} items
                </div>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: idx * 0.05 }}
                  className={`w-full rounded-t-lg origin-bottom transition-all group-hover:brightness-110 ${item.height} ${item.color}`}
                ></motion.div>
                <span className="text-3xs h-6 text-center truncate w-full text-neutral-400 font-semibold">{item.skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: AI Screening Funnel Stages */}
        <div className={`p-6 rounded-2xl border ${cardStyle}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 inline-flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-violet-500" /> Cognitive Recruitment Funnel
          </h3>
          <p className="text-2xs text-neutral-500 mb-6">
            Tracking automated stage transitions based on current job requirements.
          </p>

          <div className="space-y-4">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-40 text-xs font-semibold text-neutral-400 truncate">{step.label}</div>
                <div className="flex-1 h-6 relative bg-neutral-800/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${step.percent}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${step.color} opacity-85 flex items-center pl-4 text-2xs text-white font-bold tracking-tight`}
                  >
                    {step.percent}%
                  </motion.div>
                </div>
                <div className="text-xs font-bold w-12 text-right">{step.value} Cands</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Candidate Work Experience Years Spread */}
        <div className={`p-6 rounded-2xl border ${cardStyle}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-500" /> Staff Longevity & Seniority
          </h3>
          <p className="text-2xs text-neutral-500 mb-6">
            Evaluation of professional years depth amongst applicants.
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/[0.02] border-black/5'}`}>
              <span className="text-3xs font-semibold text-neutral-400 uppercase tracking-wider block">Lead/Principal (8+ yrs)</span>
              <span className="text-2xl font-black text-indigo-400 block mt-1">2</span>
              <span className="text-3xs text-slate-400">Sarah Jenkins, Aris Thorne</span>
            </div>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/[0.02] border-black/5'}`}>
              <span className="text-3xs font-semibold text-neutral-400 uppercase tracking-wider block">Mid-Senior (4-7 yrs)</span>
              <span className="text-2xl font-black text-purple-400 block mt-1">2</span>
              <span className="text-3xs text-slate-400">Alex Chen, Marcus Vance</span>
            </div>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/[0.02] border-black/5'}`}>
              <span className="text-3xs font-semibold text-neutral-400 uppercase tracking-wider block">Junior-Mid (&lt;4 yrs)</span>
              <span className="text-2xl font-black text-rose-400 block mt-1">2</span>
              <span className="text-3xs text-slate-400">Priya Sharma, Elena Rostova</span>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-lg border text-3xs text-neutral-400 border-neutral-800/10 bg-indigo-500/5 leading-relaxed">
            <b>Pipeline analysis:</b> This workspace offers a strong spread centering Senior professionals ready to fulfill robust technical tasks on product architecture.
          </div>
        </div>
      </div>
    </div>
  );
}
