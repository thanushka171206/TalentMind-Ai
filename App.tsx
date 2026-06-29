import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import JobUpload from './components/JobUpload';
import CandidatePool from './components/CandidatePool';
import CandidateRanking from './components/CandidateRanking';
import CandidateComparison from './components/CandidateComparison';
import AiInsights from './components/AiInsights';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { User, JobDescription, Candidate } from './types';

// Fallback collections to safely mount first turn
import { mockJobs, mockCandidates } from './mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'register' | 'main'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Data State
  const [jobs, setJobs] = useState<JobDescription[]>(mockJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [currentJobId, setCurrentJobId] = useState<string>('job-1');
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [syncStatus, setSyncStatus] = useState('Operating in Local Cache Mode');

  // Load and synchronize data from the server
  useEffect(() => {
    async function syncDatabase() {
      try {
        const jobsResp = await fetch('/api/jobs');
        const jobsData = await jobsResp.json();
        if (jobsData.success && Array.isArray(jobsData.jobs) && jobsData.jobs.length > 0) {
          setJobs(jobsData.jobs);
          if (jobsData.jobs[0]) {
            setCurrentJobId(jobsData.jobs[0].id);
          }
        }

        const candidatesResp = await fetch('/api/candidates');
        const candidatesData = await candidatesResp.json();
        if (candidatesData.success && Array.isArray(candidatesData.candidates)) {
          setCandidates(candidatesData.candidates);
        }
        setSyncStatus('Workspace synchronized with live API database');
      } catch (err) {
        console.warn("Express server unavailable or starting up, using local high-fidelity database fallback.", err);
        setSyncStatus('Local Cache Mode (Server Fallback Active)');
      }
    }
    
    if (currentPage === 'main') {
      syncDatabase();
    }
  }, [currentPage]);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginComplete = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('main');
  };

  const handleRegisterComplete = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('main');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleJobAdded = (newJob: JobDescription) => {
    setJobs(prev => [...prev, newJob]);
    setCurrentJobId(newJob.id);
  };

  const handleCandidateAdded = (newCand: Candidate) => {
    setCandidates(prev => [...prev, newCand]);
  };

  const handleCompareSelect = (id: string) => {
    setSelectedCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert("Maximum 3 profiles can be compared simultaneously inside the matrix.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleClearCompare = () => {
    setSelectedCompareIds([]);
  };

  // Triggers real-time LLM re-ranking across the active pool
  const handleRefreshRankings = async (jobId: string) => {
    try {
      const response = await fetch('/api/rank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId })
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.candidates)) {
        // Update ranked candidates scores
        setCandidates(data.candidates);
      } else {
        alert(data.error || 'Cognitive re-ranking encountered error.');
      }
    } catch (err: any) {
      alert('Network rank trigger error: ' + err.message);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'Applied' | 'Shortlisted' | 'Rejected') => {
    // Update local state is immediate and secure
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c));

    try {
      await fetch(`/api/candidates/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn("Could not save status update to express server offline.", err);
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    // Update local state is immediate and secure
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, notes } : c));

    try {
      await fetch(`/api/candidates/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
    } catch (err) {
      console.warn("Could not save notes update to express server offline.", err);
    }
  };

  const handleScheduleInterview = async (id: string, interviewSlot: string) => {
    // Update local state is immediate and secure
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, interviewSlot } : c));

    try {
      await fetch(`/api/candidates/${id}/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interviewSlot })
      });
    } catch (err) {
      console.warn("Could not save interview slot details to server offline.", err);
    }
  };

  // Render sub-tab content matching active Tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview 
            candidates={candidates} 
            jobs={jobs} 
            currentJobId={currentJobId}
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
            }}
            isDarkMode={isDarkMode}
          />
        );
      case 'jobs':
        return (
          <JobUpload 
            onJobAdded={handleJobAdded} 
            jobs={jobs} 
            activeJobId={currentJobId} 
            onSelectJob={(id) => setCurrentJobId(id)}
            isDarkMode={isDarkMode}
          />
        );
      case 'candidates':
        return (
          <CandidatePool 
            candidates={candidates} 
            onCandidateAdded={handleCandidateAdded} 
            isDarkMode={isDarkMode}
            onScheduleInterview={handleScheduleInterview}
          />
        );
      case 'rankings':
        return (
          <CandidateRanking 
            candidates={candidates} 
            jobs={jobs} 
            currentJobId={currentJobId} 
            onUpdateStatus={handleUpdateStatus} 
            onCompareSelect={handleCompareSelect}
            selectedCompareIds={selectedCompareIds}
            isDarkMode={isDarkMode}
            onRefreshRankings={handleRefreshRankings}
            onUpdateNotes={handleUpdateNotes}
            onScheduleInterview={handleScheduleInterview}
          />
        );
      case 'compare':
      case 'insights': 
        return (
          <AiInsights 
            candidates={candidates} 
            jobs={jobs} 
            currentJobId={currentJobId} 
            isDarkMode={isDarkMode}
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard 
            candidates={candidates} 
            jobs={jobs} 
            currentJobId={currentJobId} 
            isDarkMode={isDarkMode}
          />
        );
      case 'reports':
        return (
          <Reports 
            candidates={candidates} 
            jobs={jobs} 
            currentJobId={currentJobId} 
            isDarkMode={isDarkMode}
          />
        );
      case 'settings':
        return (
          <Settings 
            user={currentUser} 
            isDarkMode={isDarkMode} 
            onToggleTheme={handleToggleTheme}
          />
        );
      default:
        return (
          <div className="p-6 text-center text-xs text-neutral-450">
            Requested module configuration in progress...
          </div>
        );
    }
  };

  // Landing Page Routing Flow
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onStart={() => setCurrentPage('login')} 
        onDirectAccess={() => {
          // Auto-login placeholder user for direct access ease
          setCurrentUser({
            id: 'user-rec-demo',
            name: 'Monika Nanduri (Guest)',
            email: 'monikananduri3@gmail.com',
            companyName: 'TalentMind Enterprise',
            role: 'Recruiter'
          });
          setCurrentPage('main');
        }}
        isDarkMode={isDarkMode} 
      />
    );
  }

  // Authentication: Login Page Routing Flow
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLogin={handleLoginComplete} 
        onNavigateToRegister={() => setCurrentPage('register')}
        onNavigateToLanding={() => setCurrentPage('landing')}
        onDirectAccess={() => {
          // Auto-login placeholder user for direct access ease
          setCurrentUser({
            id: 'user-rec-demo',
            name: 'Monika Nanduri (Guest)',
            email: 'monikananduri3@gmail.com',
            companyName: 'TalentMind Enterprise',
            role: 'Recruiter'
          });
          setCurrentPage('main');
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // Authentication: Register Page Routing Flow
  if (currentPage === 'register') {
    return (
      <RegisterPage 
        onRegisterComplete={handleRegisterComplete} 
        onNavigateToLogin={() => setCurrentPage('login')}
        onNavigateToLanding={() => setCurrentPage('landing')}
        isDarkMode={isDarkMode}
      />
    );
  }

  const workspaceBg = isDarkMode 
    ? 'glass-bg-dark text-slate-100' 
    : 'glass-bg-light text-slate-900';

  const currentJobTitle = jobs.find(j => j.id === currentJobId)?.title || "General Pool";

  // Main Workspace Layout
  return (
    <div className={`min-h-screen flex transition-colors duration-300 font-sans ${workspaceBg}`}>
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={currentUser} 
        onLogout={handleLogout} 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleToggleTheme}
        currentJobTitle={currentJobTitle}
        onNavigateToPage={(page) => setCurrentPage(page)}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-y-auto relative h-screen">
        {/* Top Status Web-Integrations Indicator */}
        <div className={`px-8 py-2.5 border-b text-[9px] font-mono font-bold tracking-widest uppercase flex justify-between items-center ${
          isDarkMode ? 'bg-black/15 border-white/10 text-slate-400' : 'bg-white/30 border-black/5 text-slate-500'
        } backdrop-blur-md`}>
          <span>PLATFORM INSTANCE: TALENTMIND_CORE_VM_LIVE</span>
          <div className="flex items-center gap-2">
            <span>DATABASE STATUS: {syncStatus}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
        </div>

        {/* Dynamic Context Tabs */}
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          {/* Sub Navigation for Comparative Grid if Compare list contains items */}
          {selectedCompareIds.length > 0 && (
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                isDarkMode ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-300 shadow' : 'bg-indigo-50 border-indigo-150 text-indigo-700'
              }`}
            >
              <div className="text-2xs font-bold leading-normal flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500 flex animate-pulse"></span>
                <span><b>Comparison active:</b> You selected {selectedCompareIds.length} candidate profiles to examine side-by-side.</span>
              </div>
              <div className="flex gap-2">
                <button
                  id="tab-open-compare-btn"
                  onClick={() => setActiveTab('compare-tab-custom')} 
                  className="px-3 py-1 text-2xs bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-400 font-extrabold text-white rounded-lg transition-colors cursor-pointer"
                >
                  Inspect Matrix Now
                </button>
                <button
                  id="abort-compare-all"
                  onClick={handleClearCompare} 
                  className={`px-3 py-1 text-2xs rounded-lg transition-colors font-bold cursor-pointer border ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Clear Selection
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'compare-tab-custom' ? (
            <CandidateComparison 
              candidates={candidates} 
              jobs={jobs} 
              currentJobId={currentJobId} 
              selectedCompareIds={selectedCompareIds} 
              onCompareSelect={handleCompareSelect}
              onClearCompare={handleClearCompare}
              isDarkMode={isDarkMode}
            />
          ) : (
            renderTabContent()
          )}
        </div>
      </main>
    </div>
  );
}
