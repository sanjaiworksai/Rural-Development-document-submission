import React, { useRef, useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileCode2,
  FileDown,
  FileSpreadsheet,
  FileText,
  Presentation,
  RefreshCw,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { DocType, ModuleData, UploadedDoc } from '../types';
import { createSampleFile, detectDocType, formatFileSize, generateDocId } from '../utils/fileHelpers';
import { DEFAULT_MODULE_THEME, MODULE_THEMES } from '../config/moduleThemes';

interface ModuleCardProps {
  module: ModuleData;
  onFileUpload: (moduleId: number, file: UploadedDoc) => void;
  onFileRemove: (moduleId: number) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onFileUpload,
  onFileRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isCompleted = !!module.uploadedFile;
  const theme = MODULE_THEMES[module.id] || DEFAULT_MODULE_THEME;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const docType = detectDocType(file.name, file.type);
    const uploadedDoc: UploadedDoc = {
      id: generateDocId(),
      name: file.name,
      size: file.size,
      type: docType,
      rawMimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
    };

    onFileUpload(module.id, uploadedDoc);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const docType = detectDocType(file.name, file.type);
    const uploadedDoc: UploadedDoc = {
      id: generateDocId(),
      name: file.name,
      size: file.size,
      type: docType,
      rawMimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString(),
    };

    onFileUpload(module.id, uploadedDoc);
  };

  const handleUseSample = () => {
    const sample = createSampleFile(module.id, module.recommendedType);
    onFileUpload(module.id, sample);
  };

  const renderDocIcon = (type: DocType) => {
    switch (type) {
      case 'word':
        return (
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
        );
      case 'pdf':
        return (
          <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <FileCode2 className="w-5 h-5" />
          </div>
        );
      case 'powerpoint':
        return (
          <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <Presentation className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        );
    }
  };

  const getBadgeForType = (type: DocType) => {
    switch (type) {
      case 'word':
        return (
          <span
            key="word"
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200"
          >
            Word (.docx)
          </span>
        );
      case 'pdf':
        return (
          <span
            key="pdf"
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200"
          >
            PDF (.pdf)
          </span>
        );
      case 'powerpoint':
        return (
          <span
            key="powerpoint"
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200"
          >
            PowerPoint (.pptx)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={`module-card-${module.id}`}
      className={`relative rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg ${
        isCompleted
          ? `border-emerald-300/90 ring-1 ring-emerald-200/60 ${theme.completedCardBgGradient}`
          : `${theme.borderColor} ${theme.hoverBorderColor} ${theme.glowColor} ${theme.cardBgGradient}`
      }`}
    >
      {/* Top Gradient Accent Bar matching theme */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${isCompleted ? 'from-emerald-400 via-teal-400 to-emerald-500' : theme.topAccentBar}`} />

      {/* Top Header Section */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg tracking-wider shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : `${theme.badgeBg} ${theme.badgeText}`
              }`}
            >
              {module.code}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${theme.categoryBg} ${theme.categoryText} ${theme.categoryBorder}`}>
              {module.category}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submitted</span>
            </span>
          ) : (
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${theme.categoryBg} ${theme.accentText} ${theme.categoryBorder}`}>
              Pending
            </span>
          )}
        </div>

        {/* Title and description */}
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
          {module.title}
        </h4>
        <p className={`text-xs font-semibold mt-0.5 mb-2 line-clamp-1 ${theme.accentText}`}>
          {module.subtitle}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[32px]">
          {module.description}
        </p>

        {/* Accepted Formats Tag List */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-medium text-slate-400">Accepted:</span>
          {module.acceptedTypes.map((type) => getBadgeForType(type))}
        </div>

        {/* Downloadable Reference Documents (if provided for module) */}
        {module.resourceDocs && module.resourceDocs.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <FileDown className="w-3.5 h-3.5 text-teal-600" />
                <span>Reference Documents</span>
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                {module.resourceDocs.length} {module.resourceDocs.length === 1 ? 'Document' : 'Documents'} Available
              </span>
            </div>

            <div className="space-y-1.5">
              {module.resourceDocs.map((doc, idx) => {
                const isPdf = doc.type === 'pdf';
                const isExcel = doc.type === 'excel';
                const isWord = doc.type === 'word';

                const badgeLabel = isPdf ? 'PDF' : isExcel ? 'XLSX' : isWord ? 'DOCX' : 'PPTX';
                const badgeBg = isPdf
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : isExcel
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : isWord
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-orange-100 text-orange-700 border border-orange-200';

                const btnGradient = isPdf
                  ? 'from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-600/20'
                  : isExcel
                  ? 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20'
                  : isWord
                  ? 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/20'
                  : 'from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-orange-600/20';

                const btnLabel = isPdf
                  ? 'Download PDF'
                  : isExcel
                  ? 'Download Excel'
                  : isWord
                  ? 'Download Word'
                  : 'Download PPT';

                return (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-teal-200 hover:bg-teal-50/20 transition-all"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-lg ${badgeBg} flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs`}>
                        {badgeLabel}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate" title={doc.title}>
                          {doc.title}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {doc.filename}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0 self-end sm:self-auto">
                      <a
                        id={`btn-download-resource-${module.id}-${idx}`}
                        href={doc.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${btnGradient} shadow-2xs transition-all cursor-pointer`}
                        title={`Download ${doc.title}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{btnLabel}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        onChange={handleFileChange}
        className="hidden"
        id={`file-input-${module.id}`}
      />

      {/* Bottom Section: Upload Area or Uploaded File Details */}
      <div className="p-4 sm:p-5 pt-0">
        {isCompleted && module.uploadedFile ? (
          /* Uploaded File Display State */
          <div className="bg-white/90 backdrop-blur-xs border border-emerald-200/80 rounded-xl p-3 space-y-2.5 shadow-2xs">
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex items-start gap-2.5 overflow-hidden">
                {renderDocIcon(module.uploadedFile.type)}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate" title={module.uploadedFile.name}>
                    {module.uploadedFile.name}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>{formatFileSize(module.uploadedFile.size)}</span>
                    <span>•</span>
                    <span className="uppercase font-medium text-slate-600">{module.uploadedFile.type}</span>
                  </p>
                </div>
              </div>

              <button
                id={`btn-remove-file-${module.id}`}
                type="button"
                onClick={() => onFileRemove(module.id)}
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Remove uploaded document"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
              <span className="text-slate-400 truncate text-[10px]">
                Uploaded {module.uploadedFile.uploadedAt}
              </span>
              <button
                id={`btn-replace-file-${module.id}`}
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`${theme.accentText} hover:underline font-semibold flex items-center gap-1 cursor-pointer`}
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Replace</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Upload Dropzone State */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-3.5 text-center transition-all ${
              isDragging
                ? 'border-cyan-500 bg-cyan-50/70 scale-[0.99]'
                : `border-slate-200 hover:${theme.hoverBorderColor} bg-white/70 hover:bg-white`
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className={`w-8 h-8 rounded-lg ${theme.iconBg} border border-slate-200/60 shadow-2xs flex items-center justify-center`}>
                <Upload className={`w-4 h-4 ${theme.iconColor}`} />
              </div>

              <div className="space-y-0.5">
                <button
                  id={`btn-upload-direct-${module.id}`}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${theme.buttonGradient} ${theme.buttonHoverGradient} transition-all shadow-xs hover:shadow-sm cursor-pointer`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                <p className="text-[10px] text-slate-400 mt-1">or drag and drop Word / PDF / PPT</p>
              </div>

              {/* One-click sample file utility */}
              <button
                id={`btn-sample-module-${module.id}`}
                type="button"
                onClick={handleUseSample}
                className={`inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:${theme.accentText} hover:bg-white px-2 py-0.5 rounded transition-all cursor-pointer`}
              >
                <Sparkles className={`w-3 h-3 ${theme.iconColor}`} />
                <span>Insert Sample {module.recommendedType.toUpperCase()}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
