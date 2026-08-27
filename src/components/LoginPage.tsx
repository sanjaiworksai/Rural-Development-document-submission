import React, { useState } from 'react';
import { ArrowRight, Bot, Mail, ShieldCheck, Sparkles, User } from 'lucide-react';
import { UserAuth } from '../types';

interface LoginPageProps {
  onLogin: (auth: UserAuth) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please provide a valid email format (e.g. yourname@example.com).');
      return;
    }

    if (!trimmedName) {
      setError('Please enter your full name for the certificate.');
      return;
    }

    setError(null);
    onLogin({ name: trimmedName, email: trimmedEmail });
  };

  const handleQuickDemo = () => {
    setName('John Doe');
    setEmail('john.doe@example.com');
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-6 sm:py-10 relative z-10">
      {/* Top Header Section as in reference image with Robo Icon on Top */}
      <div className="text-center space-y-3 mb-7 max-w-xl mx-auto flex flex-col items-center">
        {/* Robot Icon on Top of the AI-Workshop Submission Portal title */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-teal-500/25 ring-4 ring-teal-100/80 mb-1">
          <Bot className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#0B192C] tracking-tight leading-tight">
          AI-Workshop Submission<br className="hidden sm:inline" /> portal
        </h1>
      </div>

      {/* Main Login Card matching reference image */}
      <div className="w-full max-w-[460px] mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-900/10 p-6 sm:p-8 relative">
          {/* Card Top Row Header */}
          <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm tracking-wider uppercase">
              <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
              <span>SIGN IN WITH YOUR EMAIL</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span>User Login</span>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field 1: YOUR EMAIL ADDRESS * */}
            <div>
              <label
                htmlFor="input-user-email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                YOUR EMAIL ADDRESS <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="input-user-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  className="block w-full pl-11 pr-4 py-3.5 text-sm bg-slate-50/60 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Field 2: YOUR FULL NAME (FOR CERTIFICATE) */}
            <div>
              <label
                htmlFor="input-user-name"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                YOUR FULL NAME (FOR CERTIFICATE) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="input-user-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="block w-full pl-11 pr-4 py-3.5 text-sm bg-slate-50/60 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 focus:bg-white transition-all"
                />
              </div>
              <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
                Sign in with your email to submit documents and generate certificates under your name.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="btn-login-submit"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm sm:text-base font-bold text-white bg-[#64748B] hover:bg-[#475569] active:scale-[0.99] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </button>
            </div>

            {/* Quick Demo Pre-fill */}
            <div className="text-center pt-1">
              <button
                id="btn-login-demo-prefill"
                type="button"
                onClick={handleQuickDemo}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-cyan-500" />
                <span>Auto-fill sample participant</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

