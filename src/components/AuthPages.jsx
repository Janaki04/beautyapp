import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthPages() {
  const navigate=useNavigate()
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser) {
      setLoggedInUser(JSON.parse(sessionUser));
    }
  }, []);

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score += 25;
    if (pass.length >= 10) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9!@#$%^&*]/.test(pass)) score += 25;
    setPasswordStrength(score);
  };

  const handleSignupPasswordChange = (e) => {
    const val = e.target.value;
    setSignupData({ ...signupData, password: val });
    calculateStrength(val);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');



    if (loginData.email && loginData.password) {
      const sessionData = { email: loginData.email, password: loginData.password };
      sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
      setLoggedInUser(sessionData);
      
      window.dispatchEvent(new Event('storage'));
      navigate("/")
    } else {
      setError('Invalid email or password. Please try again or sign up.');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, password, confirmPassword } = signupData;

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const existingUsers = JSON.parse(sessionStorage.getItem('users')) || [];
    const userExists = existingUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
      setError('An account with this email already exists.');
      return;
    }

    const newUser = { name, email, password };
    existingUsers.push(newUser);
    sessionStorage.setItem('users', JSON.stringify(existingUsers));

    const sessionData = { name, email };
    sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
    setLoggedInUser(sessionData);
      navigate("/")
    setSignupData({ name: '', email: '', password: '', confirmPassword: '' });

    window.dispatchEvent(new Event('storage'));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    setLoggedInUser(null);
    setSuccess('');
    setError('');

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D282A8] via-[#8E507D] to-[#D282A8] flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#D282A8]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#71305D]/10 rounded-full blur-3xl animate-pulse pointer-events-none delay-1000" />

      <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-[#D282A8]/20 shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-2xl">
        
        {loggedInUser ? (
          <div className="p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            <div className="relative w-20 h-20 mx-auto group cursor-pointer">
              <div className="absolute inset-0 bg-[#71305D]/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
              <div className="relative w-20 h-20 bg-[#FAF4F7] text-[#71305D] rounded-full flex items-center justify-center border-2 border-[#D282A8]/30 group-hover:scale-105 transition-transform duration-300">
                <User className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4F7] text-[#71305D] text-[10px] font-bold uppercase tracking-widest border border-[#D282A8]/30">
                <Sparkles className="w-3 h-3 text-[#D282A8]" /> Session Active
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#71305D]">
                Welcome back, {loggedInUser.name}!
              </h2>
              <p className="text-xs text-[#8E507D]">{loggedInUser.email}</p>
            </div>

            <div className="bg-[#FAF4F7]/80 p-4 rounded-2xl border border-[#D282A8]/20 text-xs text-[#71305D] space-y-1 text-left transition-all hover:border-[#D282A8]/50">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Session Persistence Active
              </p>
              <p className="text-[#8E507D]">
                Your account info is stored in <code className="font-mono text-[#71305D]">sessionStorage</code>. Refreshing this tab keeps your session intact.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3.5 bg-[#71305D] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] active:scale-[0.98] transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <div className="relative flex border-b border-[#D282A8]/20 bg-[#FAF4F7]/60">
              <button
                onClick={() => handleTabChange('login')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer relative ${
                  activeTab === 'login' ? 'text-[#71305D]' : 'text-[#8E507D]/70 hover:text-[#71305D]'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer relative ${
                  activeTab === 'signup' ? 'text-[#71305D]' : 'text-[#8E507D]/70 hover:text-[#71305D]'
                }`}
              >
                Sign Up
              </button>

              <div
                className={`absolute bottom-0 h-0.5 bg-[#71305D] w-1/2 transition-transform duration-300 ease-out ${
                  activeTab === 'signup' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {error && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}

              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#71305D] flex">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5 transition-colors group-focus-within:text-[#71305D]" />
                      <input
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF4F7]/50 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50 focus:bg-white focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#71305D] flex">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5 transition-colors group-focus-within:text-[#71305D]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#FAF4F7]/50 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50 focus:bg-white focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-[#8E507D] hover:text-[#71305D] active:scale-90 transition-all cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-[#71305D] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] active:scale-[0.98] transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Log In 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

              {activeTab === 'signup' && (
                <form onSubmit={handleSignupSubmit} className="space-y-4 animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#71305D] block">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5 transition-colors group-focus-within:text-[#71305D]" />
                      <input
                        type="text"
                        required
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF4F7]/50 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50 focus:bg-white focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#71305D] block">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5 transition-colors group-focus-within:text-[#71305D]" />
                      <input
                        type="email"
                        required
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF4F7]/50 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50 focus:bg-white focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#71305D] block">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5 transition-colors group-focus-within:text-[#71305D]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signupData.password}
                        onChange={handleSignupPasswordChange}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#FAF4F7]/50 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50 focus:bg-white focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-[#8E507D] hover:text-[#71305D] active:scale-90 transition-all cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {signupData.password.length > 0 && (
                      <div className="pt-1.5 space-y-1 animate-in fade-in duration-200">
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              passwordStrength <= 25
                                ? 'bg-rose-500'
                                : passwordStrength <= 50
                                ? 'bg-amber-500'
                                : passwordStrength <= 75
                                ? 'bg-blue-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-[#8E507D] text-right font-medium">
                          {passwordStrength <= 25 && 'Weak'}
                          {passwordStrength === 50 && 'Moderate'}
                          {passwordStrength === 75 && 'Strong'}
                          {passwordStrength === 100 && 'Very Strong'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#71305D] block">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <Lock className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5 transition-colors group-focus-within:text-[#71305D]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF4F7]/50 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50 focus:bg-white focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-[#71305D] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] active:scale-[0.98] transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Create Account 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}