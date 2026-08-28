import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { ModuleData, UploadedDoc, UserAuth } from '../types';
import { createSampleFile } from '../utils/fileHelpers';
import { ModuleCard } from './ModuleCard';

interface ModulesSubmissionPageProps {
  modules: ModuleData[];
  userAuth: UserAuth;
  onFileUpload: (moduleId: number, file: UploadedDoc) => void;
  onFileRemove: (moduleId: number) => void;
  onAutoFillAll: () => void;
  onClearAll: () => void;
  onProceedToFinalModule: () => void;
}

export const ModulesSubmissionPage: React.FC<ModulesSubmissionPageProps> = ({
  modules,
  userAuth,
  onFileUpload,
  onFileRemove,
  onAutoFillAll,
  onClearAll,
  onProceedToFinalModule,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showWarningModal, setShowWarningModal] = useState(false);

  const completedCount = modules.filter((m) => !!m.uploadedFile).length;
  const totalCount = modules.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isAllCompleted = completedCount === totalCount;

  const filteredModules = modules.filter((m) => {
    if (filter === 'completed') return !!m.uploadedFile;
    if (filter === 'pending') return !m.uploadedFile;
    return true;
  });

  const handleNextClick = () => {
    if (!isAllCompleted) {
      setShowWarningModal(true);
    } else {
      onProceedToFinalModule();
    }
  };

  const handleFillRemainingAndProceed = () => {
    modules.forEach((mod) => {
      if (!mod.uploadedFile) {
        onFileUpload(mod.id, createSampleFile(mod.id, mod.recommendedType));
      }
    });
    setShowWarningModal(false);
    onProceedToFinalModule();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Banner & Instructions with Signature Module Card Design */}
      <div className="relative rounded-3xl border border-teal-200/90 hover:border-teal-300 bg-gradient-to-b from-white via-teal-50/30 to-cyan-50/20 backdrop-blur-xl shadow-xl shadow-teal-900/10 overflow-hidden transition-all">
        {/* Top Gradient Accent Bar matching module card */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" />

        <div className="p-5 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-900 border border-teal-200/80 shadow-2xs">
                  <Bot className="w-3.5 h-3.5 text-teal-600" />
                  <span>AI Workshop Submissions</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Participant: {userAuth.name}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Document Submission Grid
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Upload your Word (.docx), PDF (.pdf), or PowerPoint (.pptx) files directly into each module. After submitting, move to the final submission module.
              </p>
            </div>

            {/* Quick Actions & Utilities */}
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  id="btn-autofill-all-modules"
                  type="button"
                  onClick={onAutoFillAll}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-950 bg-white/90 hover:bg-white border border-teal-200/90 hover:border-teal-300 transition-all shadow-2xs cursor-pointer"
                  title={`Quickly fill all ${totalCount} modules with verified AI workshop sample documents`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Auto-Upload All {totalCount} AI Demo Files</span>
                </button>

                {completedCount > 0 && (
                  <button
                    id="btn-clear-all-modules"
                    type="button"
                    onClick={onClearAll}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-red-600 bg-white/80 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer shadow-2xs"
                    title="Reset all uploads"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              {/* Prompt Link Button below Auto-Upload */}
              <a
                id="btn-prompt-drive-link"
                href="https://drive.google.com/drive/folders/12pidfynGWKGIBY9CV8mKFwdma32MCH9p"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-indigo-950 bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/80 transition-all shadow-2xs cursor-pointer hover:shadow-xs"
                title="Open Google Drive Prompt Folder"
              >
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                <span>Prompt</span>
              </a>
            </div>
          </div>

          {/* Global Progress Bar */}
          <div className="mt-5 pt-4 border-t border-teal-100/70 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-teal-600" />
                <span>Submission Progress:</span>
                <strong className="text-slate-900">{completedCount} of {totalCount} Modules Complete</strong>
              </span>
              <span className="font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/80">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Primary Toolbar CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md border border-teal-200/80 p-1 rounded-2xl w-fit shadow-2xs">
          <button
            id="tab-filter-all"
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-teal-50/60'
            }`}
          >
            All Modules ({totalCount})
          </button>
          <button
            id="tab-filter-pending"
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'pending'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-teal-50/60'
            }`}
          >
            Pending ({totalCount - completedCount})
          </button>
          <button
            id="tab-filter-completed"
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-teal-50/60'
            }`}
          >
            Submitted ({completedCount})
          </button>
        </div>

        {/* Primary Proceed CTA in toolbar */}
        <button
          id="btn-proceed-top-review"
          type="button"
          onClick={handleNextClick}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
            isAllCompleted
              ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-teal-600/20'
              : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20'
          }`}
        >
          <span>Proceed to Final Submission Module</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3-COLUMN GRID AS REQUESTED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onFileUpload={onFileUpload}
            onFileRemove={onFileRemove}
          />
        ))}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-30 bg-slate-900/95 text-white p-4 rounded-2xl shadow-xl shadow-slate-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
            isAllCompleted ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-400/40' : 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-400/40'
          }`}>
            {isAllCompleted ? <CheckCircle2 className="w-6 h-6" /> : `${completedCount}/${totalCount}`}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">
              {isAllCompleted
                ? `All ${totalCount} AI Modules Ready for Final Submission`
                : `${completedCount} of ${totalCount} AI Modules Uploaded`}
            </p>
            <p className="text-[11px] text-slate-400">
              {isAllCompleted
                ? 'Click Proceed to view the final submission module.'
                : 'Upload remaining files or use auto-fill demo to proceed.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-bottom-proceed-review"
            type="button"
            onClick={handleNextClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 transition-all shadow-sm cursor-pointer"
          >
            <span>Proceed to Final Module</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>

      {/* Incomplete Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pending Module Submissions ({totalCount - completedCount} Left)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                You have currently submitted {completedCount} out of {totalCount} modules. You can auto-upload the remaining demo files, continue with current uploads, or go back to upload manually.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-semibold text-slate-800">
                <span>Modules Uploaded:</span>
                <span>{completedCount} / {totalCount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Remaining:</span>
                <span>{totalCount - completedCount} modules</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                id="btn-modal-autofill-proceed"
                type="button"
                onClick={handleFillRemainingAndProceed}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-teal-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Upload Remaining &amp; Proceed</span>
              </button>

              <button
                id="btn-modal-proceed-as-is"
                type="button"
                onClick={() => {
                  setShowWarningModal(false);
                  onProceedToFinalModule();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Proceed with Current Submissions
              </button>

              <button
                id="btn-modal-cancel"
                type="button"
                onClick={() => setShowWarningModal(false)}
                className="w-full py-2 px-4 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Go Back &amp; Upload Manually
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
