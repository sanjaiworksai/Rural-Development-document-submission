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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Final Module</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Step 4 of 5:</span>
          <span className="text-xs font-bold text-slate-900">Certificate Profile Details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Form Fields (Name, Designation, Department ONLY) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-semibold mb-2 border border-teal-200/80">
              <FileBadge2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Official Certificate Credential Details</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Participant Profile Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter your full name, designation, and department exactly as they should be printed on the official AI Workshop completion certificate.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor="input-cert-name"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Full Name (Certificate Recipient) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="input-cert-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. K. Ananthapadmanabhan"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/80 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
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
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <input
                  id="input-cert-designation"
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Assistant Professor (AI & DS)"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/80 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                />
              </div>

              {/* Quick suggestions for Designation */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Quick Select:</span>
                {DESIGNATION_SUGGESTIONS.slice(0, 3).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDesignation(item)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors cursor-pointer"
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
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  id="input-cert-department"
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Department of Artificial Intelligence & Data Science"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/80 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
                />
              </div>

              {/* Quick suggestions for Department */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Quick Select:</span>
                {DEPARTMENT_SUGGESTIONS.slice(0, 2).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDepartment(item)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors cursor-pointer"
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

        {/* Right: Live Certificate Preview Snapshot */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-6 border border-slate-800 shadow-lg shadow-slate-900/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] uppercase tracking-wider font-bold text-teal-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Live Certificate Preview</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">{completedCount}/{totalCount} Modules Verified</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-3">
              <div className="flex justify-center mb-1">
                <TamilNaduEmblem size={44} />
              </div>

              <div className="text-center">
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-300">
                  AI Workshop Completion Certificate
                </div>
                <div className="text-lg font-bold text-white font-serif mt-1">
                  {name || 'Participant Full Name'}
                </div>
              </div>

              <div className="border-t border-slate-700/80 pt-2 text-center text-xs space-y-0.5">
                <div className="text-teal-300 font-semibold">{designation || 'Designation'}</div>
                <div className="text-slate-300 text-[11px]">{department || 'Department'}</div>
              </div>

              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{totalCount} Modules Complete</span>
                </span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-3">
              Direct high-resolution PDF and PNG certificate downloads available upon generation.
            </p>
          </div>

          <div className="bg-teal-50/80 border border-teal-200/80 rounded-xl p-4 text-xs text-teal-950 space-y-1">
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
