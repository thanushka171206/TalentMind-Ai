import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingIcon, 
  ShieldCheck, 
  Key, 
  Bell, 
  Sparkles, 
  Database,
  Building2,
  Lock,
  Smartphone
} from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User | null;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Settings({ user, isDarkMode, onToggleTheme }: SettingsProps) {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [mfaSuccessMsg, setMfaSuccessMsg] = useState('');
  const [jwtToken, setJwtToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXJlYy00MTIiLCJuYW1lIjoiTWFyY3VzIFZhbmNlIiwiY29tcGFueSI6IlRhbGVudE1pbmQgQUkiLCJleHAiOjE3NzA5NzU2MDB9.s16xZ4_N013zZfK98Opx-Ff8_t20_v92348');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySlack, setNotifySlack] = useState(false);
  
  const handleToggleMfa = () => {
    setMfaEnabled(!mfaEnabled);
    setMfaSuccessMsg(
      !mfaEnabled 
        ? 'MFA prompt initialized: scan the authentication barcode sent to your corporate directory.' 
        : 'MFA protection disabled for this developer session.'
    );
    setTimeout(() => setMfaSuccessMsg(''), 4000);
  };

  const handleGenerateToken = () => {
    // Generate fresh simulated JWT
    setJwtToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyXzEwNyIsIm5hbWUiOiI${btoa(user?.name || 'Recruiter')}\",\"exp\":${Math.round(Date.now()/1000 + 3600*24*7)}}.${Math.random().toString(36).substring(2, 15)}`);
  };

  const cardStyle = isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-250 shadow-sm';
  const controlStyle = isDarkMode ? 'bg-neutral-950 border-neutral-805 text-neutral-200' : 'bg-neutral-50 border-neutral-200 text-neutral-800';

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Workspace Settings</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Configure security, notification preferences, integration webhook tokens, and grading standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Security and Credentials Block */}
        <div className={`p-6 rounded-2xl border space-y-6 ${cardStyle}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-500" /> Security & JWT Authentication
          </h2>

          {/* MFA Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold block mb-0.5">Multi-Factor Authentication (MFA)</span>
                <span className="text-3xs text-neutral-500 block max-w-xs">
                  Enforces secondary authentication check for secure recruiter workflows.
                </span>
              </div>
              <button
                id="toggle-mfa-btn"
                onClick={handleToggleMfa}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  mfaEnabled ? 'bg-indigo-600' : 'bg-neutral-800'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  mfaEnabled ? 'right-1' : 'left-1'
                }`}></span>
              </button>
            </div>

            {mfaSuccessMsg && (
              <div className="p-2 text-3xs border border-indigo-500/15 bg-indigo-500/5 text-indigo-400 rounded-lg">
                {mfaSuccessMsg}
              </div>
            )}
          </div>

          {/* JWT Token display */}
          <div className="space-y-2 border-t border-neutral-800/10 pt-4">
            <label className="block text-3xs font-extrabold uppercase tracking-widest text-neutral-400">ACTIVE SESSION JWT TOKEN</label>
            <p className="text-3xs text-neutral-500 leading-normal mb-2">
              Used to sign REST sessions securely behind the Express.js proxy.
            </p>
            <div className="flex gap-2">
              <input
                id="jwt-token-display"
                type="text"
                readOnly
                value={jwtToken}
                className="w-full text-3xs font-mono font-medium p-2.5 rounded-lg border border-neutral-850 bg-neutral-950 text-neutral-400 focus:outline-none"
              />
              <button
                id="regenerate-jwt-btn"
                onClick={handleGenerateToken}
                className="px-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-bold rounded-lg border border-neutral-700 text-3xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Refresh JWT Token
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Preference and Metadata Block */}
        <div className={`p-6 rounded-2xl border space-y-6 ${cardStyle}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-500" /> Recruiter Preferences & Notifications
          </h2>

          <div className="space-y-4">
            {/* Dark mode option toggle repeat */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold block mb-0.5">Global Visual Styling Mode</span>
                <span className="text-3xs text-neutral-500 block">Switch styling standards applied broad app.</span>
              </div>
              <button
                id="settings-theme-toggle"
                onClick={onToggleTheme}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-white rounded-lg text-3xs font-bold cursor-pointer transition-colors"
              >
                {isDarkMode ? 'Toggle Light Screen' : 'Toggle Dark Screen'}
              </button>
            </div>

            {/* Email Notification */}
            <div className="flex items-center justify-between border-t border-neutral-800/10 pt-4">
              <div>
                <span className="text-xs font-bold block mb-0.5">Email Alerts On Ingestion</span>
                <span className="text-3xs text-neutral-500 block">Notify me immediately when candidate completes upload files.</span>
              </div>
              <button
                id="toggle-email-btn"
                onClick={() => setNotifyEmail(!notifyEmail)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifyEmail ? 'bg-indigo-600' : 'bg-neutral-800'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                  notifyEmail ? 'right-1' : 'left-1'
                }`}></span>
              </button>
            </div>

            {/* Slack Integration and Database status mockup */}
            <div className="flex items-center justify-between border-t border-neutral-800/10 pt-4">
              <div>
                <span className="text-xs font-bold block mb-0.5">Candidate Database Status</span>
                <span className="text-3xs text-neutral-500 block">Dynamic cloud in-memory repository healthy.</span>
              </div>
              <span className="px-2 py-0.5 rounded text-2xs font-extrabold bg-emerald-500/10 text-emerald-400 font-mono">
                ● Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
