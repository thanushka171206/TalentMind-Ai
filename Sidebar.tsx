import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  BarChart4, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  UserCheck
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentJobTitle?: string;
  onNavigateToPage?: (page: 'landing' | 'login' | 'register' | 'main') => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  user, 
  onLogout, 
  isDarkMode, 
  onToggleTheme,
  currentJobTitle,
  onNavigateToPage
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Job Descriptions', icon: Briefcase },
    { id: 'candidates', label: 'AI Resume Analyzer', icon: FileText },
    { id: 'rankings', label: 'Rankings', icon: UserCheck },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: BarChart4 },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const sidebarBg = isDarkMode 
    ? 'bg-black/25 border-white/[0.08] text-slate-100 backdrop-blur-xl' 
    : 'bg-white/45 border-white/60 text-slate-900 backdrop-blur-xl';

  return (
    <aside className={`w-64 border-r flex flex-col shrink-0 transition-colors duration-300 font-sans ${sidebarBg}`}>
      {/* Brand logo */}
      <div className="p-6 border-b border-white/15 flex items-center justify-between">
        <button
          id="sidebar-logo-home-btn"
          type="button"
          onClick={() => onNavigateToPage?.('landing')}
          className="flex items-center gap-2 hover:opacity-85 transition-opacity text-left bg-transparent border-0 p-0 cursor-pointer focus:outline-none w-full"
          title="Return to Presentation Landing Page"
        >
          <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-display font-bold text-lg tracking-tight uppercase whitespace-nowrap">
            TalentMind <span className="text-emerald-400 font-extrabold">AI</span>
          </span>
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-bold text-slate-400 uppercase px-3 tracking-widest mb-2 font-display">
          Core Navigation
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          let btnClass = `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left `;
          if (isActive) {
            btnClass += isDarkMode 
              ? 'bg-white/10 border border-white/10 text-white shadow-lg backdrop-blur-md' 
              : 'bg-emerald-500/10 border border-emerald-500/20 font-semibold text-emerald-700 shadow-sm';
          } else {
            btnClass += isDarkMode 
              ? 'text-slate-400 hover:bg-white/5 hover:text-white' 
              : 'text-slate-600 hover:bg-neutral-800/5 hover:text-neutral-900';
          }

          return (
            <button
              id={`sidebar-tab-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={btnClass}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} />
              {item.label}
              {item.id === 'rankings' && currentJobTitle && (
                <span className="ml-auto text-2xs px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 max-w-20 truncate">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme Quick toggle & Profile Card */}
      <div className="p-4 border-t border-white/10 space-y-4">
        {/* Toggle Theme inline */}
        <button
          id="sidebar-theme-toggle"
          onClick={onToggleTheme}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer border ${
            isDarkMode 
              ? 'border-white/10 bg-white/5 hover:bg-white/10 text-yellow-400' 
              : 'border-black/10 bg-black/5 hover:bg-black/10 text-emerald-600'
          }`}
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            <span>{isDarkMode ? 'Light Screen Mode' : 'Dark Screen Mode'}</span>
          </div>
          <span className="text-[9px] opacity-60 font-mono">Toggle</span>
        </button>

        {/* Recruiter Details Card */}
        {user && (
          <div className={`p-3 rounded-xl border flex flex-col gap-2 ${
            isDarkMode ? 'bg-white/5 border-white/10 text-slate-350' : 'bg-black/5 border-black/5 text-slate-700'
          }`}>
            <div className="flex items-center gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" 
                alt="Profile Avatar" 
                className="w-8 h-8 rounded-full border border-white/10 object-cover" 
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold truncate leading-tight">{user.name}</div>
                <div className="text-[10px] opacity-60 truncate capitalize">{user.role}  {user.companyName ? `@ ${user.companyName.split(' ')[0]}` : ''}</div>
              </div>
            </div>

            <button
              id="sidebar-logout-btn"
              onClick={onLogout}
              className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                isDarkMode 
                  ? 'bg-neutral-900 border border-white/10 hover:bg-rose-950/20 hover:border-rose-900/40 hover:text-rose-400' 
                  : 'bg-white border border-neutral-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out Session
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
