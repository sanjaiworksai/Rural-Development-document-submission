import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  FileCheck,
  FileSpreadsheet,
  FileText,
  FileUp,
  HelpCircle,
  Info,
  Presentation,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UploadCloud,
} from 'lucide-react';
import { DocType, UploadedDoc, UserAuth } from '../types';
import {
  createSampleFinalProjectFile,
  detectDocType,
  formatFileSize,
  generateDocId,
} from '../utils/fileHelpers';

interface FinalSubmissionModulePageProps {
  userAuth: UserAuth;
  finalDocument?: UploadedDoc | null;
  onUploadFinalDoc: (doc: UploadedDoc) => void;
  onRemoveFinalDoc: () => void;
  onNavigateBack: () => void;
  onProceedToProfile: () => void;
}

export const FinalSubmissionModulePage: React.FC<FinalSubmissionModulePageProps> = ({
  userAuth,
  finalDocument,
  onUploadFinalDoc,
  onRemoveFinalDoc,
  onNavigateBack,
  onProceedToProfile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const getDocIcon = (type?: DocType) => {
    switch (type) {
      case 'word':
        return <FileText className="w-8 h-8 text-blue-600" />;
      case 'pdf':
        return <FileCheck className="w-8 h-8 text-red-600" />;
      case 'powerpoint':
        return <Presentation className="w-8 h-8 text-orange-600" />;
      default:
        return <FileSpreadsheet className="w-8 h-8 text-indigo-600" />;
    }
  };

  const handleProcessFile = (file: File) => {
    const detectedType = detectDocType(file.name, file.type);
    const newDoc: UploadedDoc = {
      id: generateDocId(),
      name: file.name,
      size: file.size,
      type: detectedType,
      rawMimeType: file.type || 'application/octet-stream',
      uploadedAt:
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ', ' +
        new Date().toLocaleDateString(),
    };
    onUploadFinalDoc(newDoc);
    setValidationError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleAutoFillSample = (type: DocType = 'pdf') => {
    const sample = createSampleFinalProjectFile(type);
    onUploadFinalDoc(sample);
    setValidationError(null);
  };

  const handleProceedClick = () => {
    if (!finalDocument) {
      setValidationError('Please upload your final submission document before proceeding.');
      return;
    }
    setValidationError(null);
    onProceedToProfile();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          id="btn-final-module-back"
          onClick={onNavigateBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white/90 hover:bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Back to Modules</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50/90 text-teal-800 border border-teal-200/80 flex items-center gap-1.5 shadow-2xs">
            <Bot className="w-3.5 h-3.5 text-teal-600" />
            <span>Final Module Submission</span>
          </span>
        </div>
      </div>

      {/* Main Container Card: Dedicated Final Submission Module with Module Card Signature Design */}
      <div className="relative rounded-3xl border border-teal-200/90 hover:border-teal-300 bg-gradient-to-b from-white via-teal-50/30 to-cyan-50/20 backdrop-blur-xl shadow-xl shadow-teal-900/10 overflow-hidden transition-all">
        {/* Top Gradient Accent Bar matching module card */}
        <div className="h-2 w-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500" />

        {/* Top Header Section styled exactly like Module Cards */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-200/70">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg tracking-wider text-white bg-gradient-to-r from-teal-600 to-emerald-600 shadow-xs">
                MOD-FINAL
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md border bg-teal-50/90 text-teal-800 border-teal-200/70">
                Capstone Dossier
              </span>
            </div>

            {finalDocument ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Document Ready</span>
              </span>
            ) : (
              <span className="text-xs font-medium px-3 py-1 rounded-full border bg-teal-50 text-teal-700 border-teal-200">
                Final Upload Pending
              </span>
            )}
          </div>

          {/* Title and descriptions */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Final Capstone Submission Module
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-teal-700 mt-0.5">
            Comprehensive Project Dossier &amp; Certificate Eligibility
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
            Upload your completed capstone document (Word, PDF, or PowerPoint) below. Once submitted, you can proceed directly to enter your profile details for certificate issuance.
          </p>

          {/* Accepted Formats Tag List */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200/60">
            <span className="text-xs font-medium text-slate-400">Accepted Formats:</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              <FileText className="w-3.5 h-3.5" />
              <span>Word (.docx, .doc)</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
              <FileCheck className="w-3.5 h-3.5" />
              <span>PDF (.pdf)</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
              <Presentation className="w-3.5 h-3.5" />
              <span>PowerPoint (.pptx, .ppt)</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Validation Notice if user tries to proceed without doc */}
          {validationError && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{validationError}</span>
              </div>
              <button
                onClick={() => handleAutoFillSample('pdf')}
                className="text-xs font-bold text-teal-800 underline hover:text-teal-950 shrink-0 cursor-pointer"
              >
                Use Sample PDF
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            id="final-module-file-input"
            type="file"
            accept=".docx,.doc,.pdf,.pptx,.ppt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Document Upload / Presentation Section */}
          {!finalDocument ? (
            /* Upload Dropzone State */
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-teal-500 bg-teal-50/80 scale-[1.01]'
                    : 'border-slate-300 bg-slate-50/70 hover:border-teal-500 hover:bg-teal-50/40'
                }`}
              >
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white text-teal-700 mx-auto flex items-center justify-center shadow-xs border border-teal-200/80">
                    <UploadCloud className="w-8 h-8 text-teal-600" />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Upload Document
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Drag and drop your file here, or click to browse from your device.
                    </p>
                  </div>

                  {/* Accepted Types Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50/90 px-2.5 py-1 rounded-lg border border-blue-200/80">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Word (.docx, .doc)</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50/90 px-2.5 py-1 rounded-lg border border-red-200/80">
                      <FileCheck className="w-3.5 h-3.5 text-red-600" />
                      <span>PDF (.pdf)</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50/90 px-2.5 py-1 rounded-lg border border-amber-200/80">
                      <Presentation className="w-3.5 h-3.5 text-amber-600" />
                      <span>PowerPoint (.pptx, .ppt)</span>
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-md shadow-teal-700/20 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Select Final Document</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Sample Demo Options */}
              <div className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Need a sample file for demonstration?</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleAutoFillSample('pdf')}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 transition-colors shadow-2xs cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-red-600" />
                    <span>Auto-Sample PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAutoFillSample('word')}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 transition-colors shadow-2xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Auto-Sample Word</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Uploaded Document Details Card */
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-teal-50/70 via-slate-50/80 to-white rounded-2xl border-2 border-teal-300/80 p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-teal-200/60">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-teal-200 flex items-center justify-center shadow-xs">
                      {getDocIcon(finalDocument.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/90 px-2 py-0.5 rounded border border-teal-200">
                          Final Submission Document
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {finalDocument.id}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 truncate max-w-md">
                        {finalDocument.name}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Document Verified &amp; Ready</span>
                  </div>
                </div>

                {/* Metadata & Properties */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">
                      Format
                    </span>
                    <span className="font-bold text-slate-800 uppercase mt-0.5 block">
                      {finalDocument.type}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">
                      File Size
                    </span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {formatFileSize(finalDocument.size)}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">
                      Uploaded At
                    </span>
                    <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                      {finalDocument.uploadedAt}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">
                      Compliance Status
                    </span>
                    <span className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Compliant</span>
                    </span>
                  </div>
                </div>

                {/* File Action Controls (Replace / Remove) */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/90 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Replace Document</span>
                  </button>

                  <button
                    type="button"
                    onClick={onRemoveFinalDoc}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action to proceed to Profile Details */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-800">
                Participant: <span className="text-teal-800 font-bold">{userAuth.name}</span> ({userAuth.email})
              </p>
              <p>
                {finalDocument
                  ? 'Final document submitted successfully. Click below to enter your profile details.'
                  : 'Submit your final document to proceed to profile details.'}
              </p>
            </div>

            <button
              id="btn-final-module-proceed-profile"
              onClick={handleProceedClick}
              className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer ${
                finalDocument
                  ? 'text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-500 hover:via-emerald-500 hover:to-cyan-500 hover:shadow-lg shadow-teal-700/20'
                  : 'text-slate-400 bg-slate-200/80 border border-slate-300/80 cursor-not-allowed'
              }`}
            >
              <span>Confirm &amp; Enter Profile Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

