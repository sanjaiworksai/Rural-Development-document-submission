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

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#0B192C] tracking-tight leading-tight">
          <span className="whitespace-nowrap">AI-Workshop Submission</span> Portal
        </h1>
      </div>

      {/* Main Login Card styled with the exact signature Module Card design */}
      <div className="w-full max-w-[480px] mx-auto">
        <div className="relative rounded-3xl border border-cyan-200/90 hover:border-cyan-300 bg-gradient-to-b from-white via-cyan-50/30 to-teal-50/20 backdrop-blur-xl shadow-xl shadow-cyan-900/10 overflow-hidden transition-all">
          {/* Top Gradient Accent Bar matching module card */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" />

          <div className="p-6 sm:p-8">
            {/* Card Top Row Header with Module-style Badges */}
            <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200/70">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg tracking-wider text-white bg-gradient-to-r from-cyan-600 to-teal-600 shadow-xs">
                  AUTH-01
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md border bg-cyan-50/90 text-cyan-800 border-cyan-200/70">
                  Portal Login
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 text-xs font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>Sign In Required</span>
              </div>
            </div>

            {/* Subtitle Header */}
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                Sign In With Your Email
              </h3>
              <p className="text-xs font-semibold text-teal-700 mt-0.5">
                Participant Verification &amp; Document Submission
              </p>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Enter your official details to access the AI workshop modules and generate accredited completion certificates.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: YOUR EMAIL ADDRESS * */}
              <div>
                <label
                  htmlFor="input-user-email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  YOUR EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-teal-600" />
                  </div>
                  <input
                    id="input-user-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@example.com"
                    className="block w-full pl-10 pr-4 py-3 text-sm bg-white/90 border border-cyan-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/15 focus:border-cyan-500 focus:bg-white transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Field 2: YOUR FULL NAME (FOR CERTIFICATE) */}
              <div>
                <label
                  htmlFor="input-user-name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  YOUR FULL NAME (FOR CERTIFICATE) <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 text-teal-600" />
                  </div>
                  <input
                    id="input-user-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="block w-full pl-10 pr-4 py-3 text-sm bg-white/90 border border-cyan-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/15 focus:border-cyan-500 focus:bg-white transition-all shadow-2xs"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                  This exact name will be engraved on your verified completion certificate.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="btn-login-submit"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-700 hover:via-teal-700 hover:to-emerald-700 active:scale-[0.99] shadow-md shadow-cyan-600/20 hover:shadow-lg hover:shadow-cyan-600/30 transition-all cursor-pointer"
                >
                  <span>Enter Workspace</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200" />
                </button>
              </div>

              {/* Quick Demo Pre-fill */}
              <div className="text-center pt-1">
                <button
                  id="btn-login-demo-prefill"
                  type="button"
                  onClick={handleQuickDemo}
                  className="text-xs text-slate-500 hover:text-teal-700 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Auto-fill sample participant</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

