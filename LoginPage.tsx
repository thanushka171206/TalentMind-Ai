import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, Mail, Compass, HelpCircle, Sun, Moon } from 'lucide-react';
import { User, RoleType } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
  onNavigateToLanding?: () => void;
  onDirectAccess?: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function LoginPage({ 
  onLogin, 
  onNavigateToRegister, 
  onNavigateToLanding, 
  onDirectAccess, 
  isDarkMode, 
  onToggleTheme 
}: LoginPageProps) {
  const [email, setEmail] = useState('recruiter@talentmind.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGoogleAccountChooser, setShowGoogleAccountChooser] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    // Simulate short network delay for SaaS fidelity
    setTimeout(() => {
      setLoading(false);
      onLogin({
        id: 'user-rec-1',
        name: 'Monika Nanduri',
        email,
        companyName: 'TalentMind Enterprise',
        role: 'Recruiter'
      });
    }, 850);
  };

  const handleSocialLogin = (platform: string) => {
    if (platform === 'Google') {
      setShowGoogleAccountChooser(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        id: 'user-rec-social',
        name: 'Monika Nanduri',
        email: `${platform.toLowerCase()}user@talentmind.ai`,
        companyName: 'TalentMind Enterprise',
        role: 'Recruiter'
      });
    }, 800);
  };

  // Modern styling properties
  const containerStyle = isDarkMode
    ? 'glass-bg-dark text-slate-100 min-h-screen'
    : 'glass-bg-light text-slate-900 min-h-screen';

  const boxStyle = isDarkMode
    ? 'glass-panel-dark'
    : 'glass-panel-light';

  return (
    <div className={`${containerStyle} transition-colors duration-300 min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans`}>
      {/* Dynamic Ambient Blur Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-120 h-120 rounded-full blur-[140px] opacity-35 transition-colors duration-500 ${
          isDarkMode ? 'bg-indigo-950' : 'bg-indigo-150'
        }`}></div>
        <div className={`absolute -bottom-40 -right-40 w-120 h-120 rounded-full blur-[140px] opacity-35 transition-colors duration-500 ${
          isDarkMode ? 'bg-violet-950' : 'bg-violet-150'
        }`}></div>
      </div>

      {/* Floating Theme Toggle in Login */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <button
          id="login-theme-toggle"
          onClick={onToggleTheme}
          className={`p-2.5 rounded-xl border ${
            isDarkMode ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-yellow-400' : 'bg-white border-neutral-200 hover:bg-neutral-100 text-indigo-600'
          } shadow-sm transition-all focus:outline-none cursor-pointer`}
          title="Toggle Screen Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-between items-center mb-6 px-1">
          {onNavigateToLanding && (
            <button
              id="back-to-landing-top-btn"
              type="button"
              onClick={onNavigateToLanding}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-indigo-500 transition-all bg-transparent border-0 cursor-pointer font-semibold"
            >
              ← Go back to Land Page
            </button>
          )}
          {onDirectAccess && (
            <button
              id="direct-bypass-top-btn"
              type="button"
              onClick={onDirectAccess}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-all bg-transparent border-0 cursor-pointer decoration-indigo-400 decoration-dotted hover:underline"
            >
              Sandbox Dashboard →
            </button>
          )}
        </div>

        <div className="flex justify-center mb-6 gap-2 items-center">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-500/20">
            TM
          </div>
          <span className="font-sans font-bold text-2xl tracking-tight">
            TalentMind <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AI</span>
          </span>
        </div>

        {/* Glassmorphic Login Container */}
        <div className={`rounded-2xl border backdrop-blur-xl p-8 shadow-2xl ${boxStyle}`}>
          {showGoogleAccountChooser ? (
            <div>
              <div className="mb-6 text-center">
                {/* Google Icon Wrapper */}
                <div className="flex justify-center mb-4">
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-white/10' : 'bg-black/[0.04]'
                  }`}>
                    <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.245C18.425 1.22 15.617 0 12.24 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c6.923 0 11.522-4.873 11.522-11.727 0-.789-.084-1.39-.188-1.988H12.24z"/>
                    </svg>
                  </div>
                </div>
                <h2 className="text-lg font-bold tracking-tight">Sign in with Google</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Choose a Google account to continue to TalentMind workspace.
                </p>
              </div>

              <div className="space-y-3">
                {/* Account Monika Nanduri */}
                <button
                  id="google-monika-btn"
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      onLogin({
                        id: 'user-rec-1',
                        name: 'Monika Nanduri',
                        email: 'monikananduri3@gmail.com',
                        companyName: 'TalentMind Enterprise',
                        role: 'Recruiter'
                      });
                    }, 850);
                  }}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                      : 'bg-black/[0.02] border-black/5 hover:bg-black/[0.05] text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                      MN
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Monika Nanduri</h4>
                      <span className="text-2xs opacity-75 block font-mono">monikananduri3@gmail.com</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Ready</span>
                  </div>
                </button>

                {/* Simulated alternative choice */}
                <button
                  type="button"
                  onClick={() => alert('Demo sandbox sandbox mode constraint: Only the pre-validated developer ID is enabled for automatic Workspace provision.')}
                  className={`w-full p-4 rounded-xl border flex items-center gap-3 text-left transition-all cursor-not-allowed opacity-60 ${
                    isDarkMode 
                      ? 'bg-neutral-900/40 border-white/5 hover:bg-white/5 text-slate-400' 
                      : 'bg-neutral-50 border-neutral-100 hover:bg-black/[0.02] text-slate-500'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full border border-dashed border-slate-500 flex items-center justify-center text-lg text-slate-500">
                    +
                  </div>
                  <div>
                    <h4 className="font-medium text-xs">Use another account</h4>
                    <span className="text-3xs opacity-60">Provision credentials manually</span>
                  </div>
                </button>
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-neutral-800/20 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowGoogleAccountChooser(false)}
                  className="text-xs font-bold text-indigo-500 hover:underline transition-colors cursor-pointer"
                >
                  Back to normal login options
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold tracking-tight">Sign in to your Workspace</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Access candidate rankings, metrics, and cognitive evaluation pipelines.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-xs rounded-lg border bg-rose-500/5 border-rose-500/20 text-rose-400 font-medium">
                    {error}
                  </div>
                )}

                {/* Email field */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-80" htmlFor="email">
                    WORK EMAIL
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full block pl-9 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        isDarkMode ? 'glass-input-dark' : 'glass-input-light'
                      }`}
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold opacity-80" htmlFor="password">
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => alert(`Password assistance prompt: If you forgot your password in this test sandbox, you can simply press log in or fill in any sequence to gain access.`)}
                      className="text-xs text-indigo-500 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full block pl-9 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        isDarkMode ? 'glass-input-dark' : 'glass-input-light'
                      }`}
                      placeholder="Enter secure password"
                      required
                    />
                    <button
                      type="button"
                      id="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Toggle */}
                <div className="flex items-center">
                  <label className="relative flex items-center gap-2 cursor-pointer select-none text-xs">
                    <input
                      id="remember-me-cb"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-neutral-300 pointer-events-auto h-4 w-4 bg-transparent text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="opacity-80 font-medium">Remember my session info</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  id="signin-submit-btn"
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-98 transition-all font-semibold text-white text-sm shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50`}
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </button>
              </form>

              {/* Social Divider */}
              <div className="my-6 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800/10"></div></div>
                <span className={`relative px-3 text-2xs uppercase tracking-wider font-semibold ${isDarkMode ? 'bg-neutral-900/60' : 'bg-white'}`}>
                  Or continue with OAuth
                </span>
              </div>

              {/* Social OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="google-oauth-btn"
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                    isDarkMode ? 'border-neutral-800 hover:bg-neutral-800' : 'border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.245C18.425 1.22 15.617 0 12.24 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c6.923 0 11.522-4.873 11.522-11.727 0-.789-.084-1.39-.188-1.988H12.24z"/>
                  </svg>
                  Google
                </button>
                <button
                  id="github-oauth-btn"
                  type="button"
                  onClick={() => handleSocialLogin('GitHub')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                    isDarkMode ? 'border-neutral-800 hover:bg-neutral-800' : 'border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47712 2 2 6.47715 2 12C2 16.42 4.865 20.17 8.835 21.5C9.335 21.58 9.5 21.28 9.5 21.02C9.5 20.78 9.49 19.92 9.49 19.06C7 19.5 6.33 18.58 6.13 18.02C6.01 17.72 5.51 16.81 5.07 16.56C4.7 16.36 4.17 15.87 5.06 15.85C5.9 15.83 6.5 16.61 6.7 16.93C7.66 18.55 9.19 18.09 9.8 17.81C9.9 17.11 10.18 16.64 10.49 16.37C8.09 16.1 5.58 15.17 5.58 11.03C5.58 9.85 6 8.88 6.69 8.12C6.58 7.85 6.2 6.45 6.8 4.56C6.8 4.56 7.71 4.27 9.78 5.67C10.65 5.43 11.57 5.31 12.49 5.31C13.41 5.31 14.33 5.43 15.2 5.67C17.27 4.26 18.18 4.56 18.18 4.56C18.78 6.45 18.4 7.85 18.29 8.12C18.98 8.88 19.4 9.84 19.4 11.03C19.4 15.18 16.88 16.1 14.47 16.37C14.86 16.71 15.2 17.37 15.2 18.39C15.2 19.86 15.19 21.04 15.19 21.4C15.19 21.68 15.36 22 15.87 21.9C19.84 20.58 22.71 16.82 22.71 12.4C22.71 6.47715 18.24 2 12.71 2H12Z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Prompt to register */}
              <div className="mt-6 text-center text-xs">
                <span className="text-neutral-400">New to TalentMind? </span>
                <button
                  id="signup-nav-btn"
                  onClick={onNavigateToRegister}
                  className="font-bold text-indigo-500 hover:underline cursor-pointer"
                >
                  Create recruiter workspace
                </button>
              </div>
            </>
          )}
        </div>

        {/* Demo Assistant Guidance Info Tooltip */}
        <div className={`mt-4 p-3 rounded-lg border text-2xs ${
          isDarkMode ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400' : 'bg-indigo-50/50 border-indigo-100 text-neutral-600'
        } flex items-start gap-2.5`}>
          <Compass className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <b>Sandbox Mode active:</b> You can submit the standard credentials directly to inspect the enterprise recruitment dashboard immediately.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
