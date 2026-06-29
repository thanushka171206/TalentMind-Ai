import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, User as UserIcon, Building2, Lock, ArrowLeft, Users } from 'lucide-react';
import { User, RoleType } from '../types';

interface RegisterPageProps {
  onRegisterComplete: (user: User) => void;
  onNavigateToLogin: () => void;
  onNavigateToLanding?: () => void;
  isDarkMode: boolean;
}

export default function RegisterPage({ 
  onRegisterComplete, 
  onNavigateToLogin, 
  onNavigateToLanding, 
  isDarkMode 
}: RegisterPageProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<RoleType>('Recruiter');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !companyName || !email || !password || !confirmPassword) {
      setError('Please fill in all requested fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegisterComplete({
        id: `user-rec-${Date.now()}`,
        name: fullName,
        email,
        companyName,
        role
      });
    }, 900);
  };

  const containerStyle = isDarkMode
    ? 'glass-bg-dark text-slate-100 min-h-screen'
    : 'glass-bg-light text-slate-900 min-h-screen';

  const boxStyle = isDarkMode
    ? 'glass-panel-dark'
    : 'glass-panel-light';

  return (
    <div className={`${containerStyle} transition-colors duration-300 min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans`}>
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-120 h-120 rounded-full blur-[140px] opacity-25 ${
          isDarkMode ? 'bg-indigo-950' : 'bg-indigo-150'
        }`}></div>
        <div className={`absolute -bottom-40 -right-40 w-120 h-120 rounded-full blur-[140px] opacity-25 ${
          isDarkMode ? 'bg-violet-950' : 'bg-violet-150'
        }`}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex justify-between items-center mb-4 px-1">
          <button
            id="back-to-login"
            type="button"
            onClick={onNavigateToLogin}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-indigo-500 bg-transparent border-0 cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Login
          </button>
          {onNavigateToLanding && (
            <button
              id="back-to-landing-reg"
              type="button"
              onClick={onNavigateToLanding}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-indigo-500 bg-transparent border-0 cursor-pointer"
            >
              ← Back to Landing Home
            </button>
          )}
        </div>

        <div className={`rounded-2xl border backdrop-blur-xl p-8 shadow-2xl ${boxStyle}`}>
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Create workspace</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Establish an enterprise workspace environment for TalentMind.
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
              TM
            </div>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs rounded-lg border bg-rose-500/5 border-rose-500/20 text-rose-400 font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-80" htmlFor="reg-name">
                  FULL NAME
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                    <UserIcon className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full block pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                      isDarkMode 
                        ? 'bg-neutral-950 border-neutral-800 focus:border-indigo-500' 
                        : 'bg-neutral-50 border-neutral-200 focus:border-indigo-500'
                    }`}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-80" htmlFor="reg-company">
                  COMPANY NAME
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`w-full block pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                      isDarkMode 
                        ? 'bg-neutral-950 border-neutral-800 focus:border-indigo-500' 
                        : 'bg-neutral-50 border-neutral-200 focus:border-indigo-500'
                    }`}
                    placeholder="Acme Corp"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-80" htmlFor="reg-email">
                WORK EMAIL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full block pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    isDarkMode 
                      ? 'bg-neutral-950 border-neutral-800 focus:border-indigo-500' 
                      : 'bg-neutral-50 border-neutral-200 focus:border-indigo-500'
                  }`}
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Role selection row */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-80">
                WHICH ROLE DEPICTS YOUR FOCUS?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Recruiter', 'HR Manager', 'Hiring Team'] as RoleType[]).map((r) => (
                  <button
                    key={r}
                    id={`role-btn-${r.replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-1 text-2xs font-semibold rounded-lg border transition-all text-center flex items-center justify-center gap-1.5 capitalize cursor-pointer ${
                      role === r
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : isDarkMode
                          ? 'bg-neutral-950 border-neutral-850 hover:bg-neutral-900 text-neutral-300'
                          : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 hidden sm:block" />
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-80" htmlFor="reg-pass">
                  PASSWORD
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-pass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full block pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                      isDarkMode 
                        ? 'bg-neutral-950 border-neutral-800 focus:border-indigo-500' 
                        : 'bg-neutral-50 border-neutral-200 focus:border-indigo-500'
                    }`}
                    placeholder="6+ symbols"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-80" htmlFor="reg-confirm">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="reg-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full block pl-9 pr-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                      isDarkMode 
                        ? 'bg-neutral-950 border-neutral-800 focus:border-indigo-500' 
                        : 'bg-neutral-50 border-neutral-200 focus:border-indigo-500'
                    }`}
                    placeholder="Verify password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* MFA Notice Placeholder */}
            <div className={`p-3 rounded-lg text-2xs border ${
              isDarkMode ? 'bg-indigo-500/5 border-indigo-500/10 text-neutral-400' : 'bg-indigo-50 border-indigo-150 text-neutral-700'
            }`}>
              <span className="font-bold text-indigo-500 block mb-0.5">Multi-Factor Authentication (MFA) Enabled:</span>
              On live production workspaces, setup prompts authenticator configurations automatically linked with corporate directory endpoints.
            </div>

            {/* Register Submit Button */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-98 transition-all font-semibold text-white text-sm shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              ) : (
                'Create Workspace'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-400">
            Already have a corporate workspace?{' '}
            <button
              id="switch-to-login"
              onClick={onNavigateToLogin}
              className="font-bold text-indigo-500 hover:underline cursor-pointer bg-transparent border-0"
            >
              Log in instead
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
