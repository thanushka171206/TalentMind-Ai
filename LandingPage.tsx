import { motion } from 'motion/react';
import { ArrowRight, Bot, Zap, Shield, Search, Award, CheckCircle, BarChart3, HelpCircle } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onDirectAccess?: () => void;
  isDarkMode: boolean;
}

export default function LandingPage({ onStart, onDirectAccess, isDarkMode }: LandingPageProps) {
  const containerBg = isDarkMode 
    ? 'bg-neutral-950 text-neutral-100 min-h-screen selection:bg-indigo-500 selection:text-white' 
    : 'bg-neutral-50 text-neutral-900 min-h-screen selection:bg-indigo-600 selection:text-white';

  const cardBg = isDarkMode 
    ? 'bg-neutral-900/60 border-neutral-800/80' 
    : 'bg-white border-neutral-200/80';

  return (
    <div className={`${containerBg} transition-colors duration-300 relative overflow-hidden font-sans`}>
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute -top-30 -right-30 w-120 h-110 rounded-full blur-[120px] opacity-40 transition-colors duration-500 ${
          isDarkMode ? 'bg-indigo-900' : 'bg-indigo-200'
        }`}></div>
        <div className={`absolute bottom-20 -left-20 w-110 h-100 rounded-full blur-[140px] opacity-30 transition-colors duration-500 ${
          isDarkMode ? 'bg-violet-900' : 'bg-violet-200'
        }`}></div>
      </div>

      {/* Header Bar */}
      <header className="relative z-10 border-b border-neutral-800/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
            TM
          </div>
          <span className="font-sans font-bold text-xl tracking-tight">
            TalentMind <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            id="landing-signin-btn"
            onClick={onStart}
            className="text-sm font-medium hover:opacity-80 transition-opacity cursor-pointer px-4 py-2 rounded-lg"
          >
            Sign In
          </button>
          <button
            id="landing-launch-btn"
            onClick={onDirectAccess || onStart}
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            Launch Prototype <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>
 
      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold mb-8 backdrop-blur"
        >
          <Bot className="w-3.5 h-3.5" /> Next-Generation AI Candidate Alignment Engine
        </motion.div>
 
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-sans font-extrabold tracking-tight max-w-4xl mx-auto leading-none mb-6"
        >
          Rank Candidates Like{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent italic">
            An Expert Recruiter
          </span>
        </motion.h1>
 
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Traditional ATS matches keywords. <b>TalentMind AI</b> understands complete profiles semantically, evaluating career progression, skills density, and project relevance.
        </motion.p>
 
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            id="hero-start-btn"
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-md font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign In Corporate <ArrowRight className="w-5 h-5" />
          </button>
          {onDirectAccess && (
            <button
              id="hero-direct-btn"
              onClick={onDirectAccess}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-md font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              Direct Sandbox Demo
            </button>
          )}
          <a
            href="#features-sec"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl text-md font-semibold border ${
              isDarkMode ? 'border-neutral-800 hover:bg-neutral-900' : 'border-neutral-200 hover:bg-neutral-100'
            } transition-colors flex items-center justify-center gap-1.5 cursor-pointer`}
          >
            Learn How It Works
          </a>
        </motion.div>

        {/* Dynamic Display Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`max-w-5xl mx-auto rounded-2xl border ${
            isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-white/60'
          } p-4 shadow-2xl backdrop-blur-md relative`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800/10 pb-4 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
              <span className="text-xs text-neutral-500 font-mono ml-2">talentmind-ai-preview.web.app</span>
            </div>
            <div className={`px-2 py-0.5 rounded text-xs font-mono border ${
              isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
            }`}>
              Target Accuracy: 88%+
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className={`p-4 rounded-xl border ${cardBg}`}>
              <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest block mb-1">Step 1</span>
              <h4 className="font-bold text-sm mb-2">Configure Job Mandate</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Provide title and requirements. AI extracts required skills, soft competencies, and experience parameters.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${cardBg}`}>
              <span className="text-xs font-semibold text-purple-500 uppercase tracking-widest block mb-1">Step 2</span>
              <h4 className="font-bold text-sm mb-2">Ingest & Evaluate</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Parsed resumes generate deep vector embeddings. Evaluate education, swap history patterns, and growth indicators.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${cardBg}`}>
              <span className="text-xs font-semibold text-violet-500 uppercase tracking-widest block mb-1">Step 3</span>
              <h4 className="font-bold text-sm mb-2">Explainable Scoring</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Get candidates ranked with breakdown lists. Discover transparent reasons stating exactly &quot;Why this candidate&quot;.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features-sec" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-neutral-800/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Core System Highlights</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Our multi-dimensional scoring pipeline mirrors the instincts of recruitment executives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className={`p-6 rounded-2xl border ${cardBg} transition-all hover:translate-y-[-4px]`}>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5 border border-indigo-500/10">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Semantic Understanding</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Bounces keywords aside. Leverages advanced LLM inference to comprehend related industry fields, tool variations, and alternative skill phrasing.
            </p>
          </div>
          {/* Feature 2 */}
          <div className={`p-6 rounded-2xl border ${cardBg} transition-all hover:translate-y-[-4px]`}>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 border border-purple-500/10">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Explainable Recruiter logic</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Provides detailed summaries about talent alignment, experience progressions, and behavioral aspects for every single candidate score.
            </p>
          </div>
          {/* Feature 3 */}
          <div className={`p-6 rounded-2xl border ${cardBg} transition-all hover:translate-y-[-4px]`}>
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center mb-5 border border-violet-500/10">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Side-by-side Comparisons</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Review candidates side-by-side across their core technical matches, professional timeline longevity, and behavioral matches effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-8 border-t border-neutral-800/10 text-center text-xs text-neutral-500">
        &copy; 2026 TalentMind AI. Investor-Ready Recruitment Platform Prototype. Proudly powered by Google Gemini 3.5.
      </footer>
    </div>
  );
}
