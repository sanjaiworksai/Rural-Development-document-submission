import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  FileBadge2,
  Image as ImageIcon,
  Sparkles,
  User,
} from 'lucide-react';
import { UserAuth, UserDetails } from '../types';
import { TamilNaduEmblem } from './TamilNaduEmblem';

interface UserDetailsPageProps {
  userAuth: UserAuth;
  initialDetails?: Partial<UserDetails>;
  completedCount: number;
  totalCount: number;
  onBackToFinalModule: () => void;
  onGenerateCertificate: (details: UserDetails) => void;
}

const DESIGNATION_SUGGESTIONS = [
  'VAO',
  'Revenue Inspector',
  'Deputy Tahsildar',
  'Assistant Section Officer',
  'Assistant Director',
  'Senior AI / ML Engineer',
  'Assistant Professor (AI & DS)',
];

const DEPARTMENT_SUGGESTIONS = [
  'Revenue & Disaster Management',
  'Rural Development & Panchayat Raj',
  'Higher Education Department',
  'School Education Department',
  'Department of Information Technology',
  'Department of Artificial Intelligence & Data Science',
];

export const UserDetailsPage: React.FC<UserDetailsPageProps> = ({
  userAuth,
  initialDetails,
  completedCount,
  totalCount,
  onBackToFinalModule,
  onGenerateCertificate,
}) => {
  const [name, setName] = useState(initialDetails?.name || userAuth.name || '');
  const [email] = useState(initialDetails?.email || userAuth.email || '');
  const [designation, setDesignation] = useState(
    initialDetails?.designation || 'VAO'
  );
  const [department, setDepartment] = useState(
    initialDetails?.department || 'Revenue & Disaster Management'
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please provide the recipient full name.');
      return;
    }
    if (!designation.trim()) {
      setError('Please enter your professional designation.');
      return;
    }
    if (!department.trim()) {
      setError('Please enter your department.');
      return;
    }

    setError(null);
    onGenerateCertificate({
      name: name.trim(),
      email: email.trim(),
      designation: designation.trim(),
      department: department.trim(),
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-final-module"
          type="button"
          onClick={onBackToFinalModule}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Back to Final Module</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50/90 text-teal-800 border border-teal-200/80 flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Step 4 of 5: Profile Details</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Form Fields with Signature Module Card Design */}
        <div className="lg:col-span-7 relative rounded-3xl border border-teal-200/90 hover:border-teal-300 bg-gradient-to-b from-white via-teal-50/30 to-cyan-50/20 backdrop-blur-xl shadow-xl shadow-teal-900/10 overflow-hidden transition-all">
          {/* Top Gradient Accent Bar matching module card */}
          <div className="h-2 w-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500" />

          <div className="p-6 sm:p-8">
            {/* Top Row Badges matching Module Card */}
            <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200/70">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg tracking-wider text-white bg-gradient-to-r from-teal-600 to-emerald-600 shadow-xs">
                  PROF-01
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md border bg-teal-50/90 text-teal-800 border-teal-200/70">
                  Recipient Identity
                </span>
              </div>

              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verification Ready</span>
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                Participant Profile Details
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-teal-700 mt-0.5">
                Official AI Workshop Certificate Issuance
              </p>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Please enter your full name, designation, and department exactly as they should be printed on the official AI Workshop completion certificate.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Full Name */}
              <div>
                <label
                  htmlFor="input-cert-name"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Full Name (Certificate Recipient) <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 text-teal-600" />
                  </div>
                  <input
                    id="input-cert-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. K. Ananthapadmanabhan"
                    className="block w-full pl-10 pr-3 py-2.5 text-sm bg-white/90 border border-teal-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/15 focus:border-teal-600 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* 2. Designation */}
              <div>
                <label
                  htmlFor="input-cert-designation"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Designation / Position <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                  </div>
                  <input
                    id="input-cert-designation"
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Assistant Professor (AI & DS)"
                    className="block w-full pl-10 pr-3 py-2.5 text-sm bg-white/90 border border-teal-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/15 focus:border-teal-600 transition-all shadow-2xs"
                  />
                </div>

                {/* Quick suggestions for Designation */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Quick Select:</span>
                  {DESIGNATION_SUGGESTIONS.slice(0, 3).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDesignation(item)}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-teal-200/80 text-teal-900 hover:bg-teal-50 transition-colors shadow-2xs cursor-pointer font-medium"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Department */}
              <div>
                <label
                  htmlFor="input-cert-department"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <input
                    id="input-cert-department"
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Department of Artificial Intelligence & Data Science"
                    className="block w-full pl-10 pr-3 py-2.5 text-sm bg-white/90 border border-teal-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/15 focus:border-teal-600 transition-all shadow-2xs"
                  />
                </div>

                {/* Quick suggestions for Department */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Quick Select:</span>
                  {DEPARTMENT_SUGGESTIONS.slice(0, 2).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDepartment(item)}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-teal-200/80 text-teal-900 hover:bg-teal-50 transition-colors shadow-2xs cursor-pointer font-medium"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Action Button */}
              <div className="pt-3">
                <button
                  id="btn-issue-certificate"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:via-emerald-700 hover:to-cyan-700 shadow-md shadow-teal-600/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  <Award className="w-5 h-5" />
                  <span>Issue & Generate AI Workshop Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Live Certificate Preview Snapshot with matching module card styling */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl border border-cyan-200/90 hover:border-cyan-300 bg-gradient-to-b from-white via-cyan-50/30 to-teal-50/20 backdrop-blur-xl shadow-xl shadow-cyan-900/10 overflow-hidden transition-all">
            {/* Top Gradient Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg tracking-wider text-white bg-gradient-to-r from-cyan-600 to-teal-600 shadow-xs">
                    PREVIEW
                  </span>
                  <span className="text-[11px] font-semibold text-teal-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-teal-600" />
                    <span>Live Credential Preview</span>
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {completedCount}/{totalCount} Verified
                </span>
              </div>

              <div className="p-4 bg-white/95 rounded-2xl border border-cyan-200/80 shadow-sm space-y-3">
                <div className="flex justify-center mb-1">
                  <TamilNaduEmblem size={44} />
                </div>

                <div className="text-center">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    AI Workshop Completion Certificate
                  </div>
                  <div className="text-lg font-bold text-slate-900 font-serif mt-1">
                    {name || 'Participant Full Name'}
                  </div>
                </div>

                <div className="border-t border-slate-200/80 pt-2 text-center text-xs space-y-0.5">
                  <div className="text-teal-700 font-semibold">{designation || 'Designation'}</div>
                  <div className="text-slate-500 text-[11px]">{department || 'Department'}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{totalCount} Modules Complete</span>
                  </span>
                  <span>Date: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 text-center mt-3">
                Direct high-resolution PDF and PNG certificate downloads available upon generation.
              </p>
            </div>
          </div>

          <div className="bg-teal-50/90 border border-teal-200/90 rounded-2xl p-4 text-xs text-teal-950 space-y-1 shadow-2xs">
            <div className="font-bold flex items-center gap-1.5 text-teal-900">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Official Verification Stamp</span>
            </div>
            <p className="text-teal-800 leading-relaxed">
              Your certificate will feature an immutable cryptographic checksum hash and digital authority signatures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
