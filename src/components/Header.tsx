import React from 'react';
import { Award, Bot, CheckCircle2, FileCheck, Layers, LogOut, User } from 'lucide-react';
import { StepKey, UserAuth } from '../types';

interface HeaderProps {
  currentStep: StepKey;
  userAuth: UserAuth | null;
  completedCount: number;
  totalCount: number;
  onLogout: () => void;
  onNavigateStep?: (step: StepKey) => void;
}

const getStepsConfig = (totalCount: number): { key: StepKey; label: string; icon: React.ComponentType<{ className?: string }> }[] => [
  { key: 'login', label: '1. Participant Login', icon: User },
  { key: 'modules_submission', label: `2. ${totalCount} AI Modules`, icon: Layers },
  { key: 'final_module', label: '3. Final Submission Module', icon: FileCheck },
  { key: 'user_details', label: '4. Profile Details', icon: User },
  { key: 'certificate', label: '5. Certificate', icon: Award },
];

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  userAuth,
  completedCount,
  totalCount,
  onLogout,
}) => {
  const stepsConfig = getStepsConfig(totalCount);
  const currentStepIndex = stepsConfig.findIndex((s) => s.key === currentStep);

  return (
    <header className="no-print sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-teal-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 ring-2 ring-teal-100">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  AI Workshop Submission Portal
                </h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs">
                  AI Certification
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Document Submission &amp; Official Certification Portal
              </p>
            </div>
          </div>

          {/* User Status and Navigation Indicator */}
          {userAuth && (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 border border-teal-200/80 text-xs text-slate-700 shadow-2xs">
                <span className="font-semibold text-slate-900">{userAuth.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 truncate max-w-[150px]">{userAuth.email}</span>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {completedCount}/{totalCount} Completed
                </span>
              </div>

              {/* Logout / Exit Session Button */}
              <button
                id="btn-header-logout"
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                title="Exit Session or Switch Participant"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Session</span>
              </button>
            </div>
          )}
        </div>

        {/* Multi-Step Tracker Bar */}
        {userAuth && (
          <div className="py-2.5 border-t border-teal-100/60 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-[640px] gap-2">
              {stepsConfig.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-950 font-semibold border border-teal-200/90 shadow-2xs'
                        : isCompleted
                        ? 'text-emerald-700 font-medium'
                        : 'text-slate-400 font-normal'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold shadow-xs'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3 h-3" />}
                    </div>
                    <span className="text-xs whitespace-nowrap">{step.label}</span>
                    {idx < stepsConfig.length - 1 && (
                      <div className="w-4 h-0.5 bg-teal-200/70 ml-1 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
