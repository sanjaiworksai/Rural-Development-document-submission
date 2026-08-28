import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  ArrowLeft,
  Award,
  Check,
  Copy,
  Download,
  Image as ImageIcon,
  Loader2,
  LogOut,
  MessageSquareHeart,
  ExternalLink,
  Paintbrush,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { CertificateRecord, ModuleData } from '../types';
import logoImg from '../assets/logo.png';
import sealImg from '../assets/seal.png';
import { CertificateBorder, BorderStyle } from './CertificateBorder';

interface CertificatePageProps {
  certificate: CertificateRecord;
  modules: ModuleData[];
  onStartOver: () => void;
  onEditDetails: () => void;
}

export const CertificatePage: React.FC<CertificatePageProps> = ({
  certificate,
  modules,
  onStartOver,
  onEditDetails,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('ornate-gold');

  const certRef = useRef<HTMLDivElement>(null);

  // Trigger celebratory confetti on certificate view
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D98214', '#0284C7', '#166534', '#BE123C', '#FBBF24'],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCertId = () => {
    navigator.clipboard.writeText(certificate.certificateNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // High-fidelity full-bleed image data capture helper
  const getCertificateImageData = async (): Promise<string> => {
    if (!certRef.current) throw new Error('Certificate element not found');
    const element = certRef.current;

    // Ensure all internal images (logo, seal) are loaded
    const imgElements = element.getElementsByTagName('img');
    await Promise.all(
      Array.from(imgElements).map((imgNode) => {
        const img = imgNode as HTMLImageElement;
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    const CERT_WIDTH = 842;
    const CERT_HEIGHT = 595;

    // 1. Primary engine: html-to-image with explicit pixel geometry
    try {
      const dataUrl = await toPng(element, {
        width: CERT_WIDTH,
        height: CERT_HEIGHT,
        canvasWidth: CERT_WIDTH * 2,
        canvasHeight: CERT_HEIGHT * 2,
        pixelRatio: 2,
        backgroundColor: '#FFFDF9',
        cacheBust: true,
        skipFonts: true,
        style: {
          transform: 'none',
          transformOrigin: 'top left',
          margin: '0',
          width: `${CERT_WIDTH}px`,
          height: `${CERT_HEIGHT}px`,
          minWidth: `${CERT_WIDTH}px`,
          maxWidth: `${CERT_WIDTH}px`,
          minHeight: `${CERT_HEIGHT}px`,
          maxHeight: `${CERT_HEIGHT}px`,
          boxSizing: 'border-box',
          position: 'static',
        },
      });

      if (dataUrl && dataUrl.length > 5000) {
        return dataUrl;
      }
    } catch (err) {
      console.warn('html-to-image primary capture failed, falling back to html2canvas:', err);
    }

    // 2. High-precision fallback engine: html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      width: CERT_WIDTH,
      height: CERT_HEIGHT,
      windowWidth: CERT_WIDTH + 50,
      windowHeight: CERT_HEIGHT + 50,
      backgroundColor: '#FFFDF9',
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedElem = clonedDoc.getElementById('official-completion-certificate');
        if (clonedElem) {
          clonedElem.style.transform = 'none';
          clonedElem.style.margin = '0';
          clonedElem.style.width = `${CERT_WIDTH}px`;
          clonedElem.style.height = `${CERT_HEIGHT}px`;
          clonedElem.style.minWidth = `${CERT_WIDTH}px`;
          clonedElem.style.maxWidth = `${CERT_WIDTH}px`;
        }
      },
    });

    return canvas.toDataURL('image/png', 1.0);
  };

  // Direct PDF Download Handler (Exact full A4 Landscape without cropping)
  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    setIsDownloadingPdf(true);
    try {
      const imgData = await getCertificateImageData();

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 297; // mm
      const pdfHeight = 210; // mm

      // Full-bleed placement matching standard A4 dimensions perfectly
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      const filename = `AI_Workshop_Certificate_${certificate.recipientName.replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);

      setDownloadSuccess('Complete A4 Certificate Downloaded (PDF)!');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Direct PNG Image Download Handler
  const handleDownloadPng = async () => {
    if (!certRef.current) return;
    setIsDownloadingPng(true);
    try {
      const image = await getCertificateImageData();

      const link = document.createElement('a');
      link.href = image;
      link.download = `AI_Workshop_Certificate_${certificate.recipientName.replace(/\s+/g, '_')}.png`;
      link.click();

      setDownloadSuccess('Full Resolution Certificate (PNG) Downloaded!');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error('Error generating PNG:', err);
    } finally {
      setIsDownloadingPng(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Action Toolbar with Module Card Signature Design (Hidden on print) */}
      <div className="no-print relative rounded-3xl border border-cyan-200/90 hover:border-cyan-300 bg-gradient-to-b from-white via-cyan-50/30 to-teal-50/20 backdrop-blur-xl shadow-xl shadow-cyan-900/10 overflow-hidden transition-all">
        {/* Top Gradient Accent Bar matching module card */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" />

        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-700/20">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    Official AI Workshop Certificate
                  </h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Verified Credential
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Certificate Ref:{' '}
                  <span className="font-mono font-semibold text-slate-800">
                    {certificate.certificateNumber}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons & Style Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Border Design Selector */}
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 border border-cyan-200/90 text-xs shadow-2xs">
                <Paintbrush className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-semibold text-slate-700">Border:</span>
                <select
                  id="select-border-style"
                  value={borderStyle}
                  onChange={(e) => setBorderStyle(e.target.value as BorderStyle)}
                  className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer text-xs"
                >
                  <option value="ornate-gold">👑 Ornate Royal Gold</option>
                  <option value="guilloche-security">🛡️ Guilloché Security</option>
                  <option value="imperial-navy">🏛️ Imperial Navy &amp; Gold</option>
                  <option value="modern-luxury">✨ Modern Luxury</option>
                </select>
              </div>

              {downloadSuccess && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 shadow-2xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>{downloadSuccess}</span>
                </span>
              )}

              {/* Copy ID */}
              <button
                id="btn-copy-cert-id"
                type="button"
                onClick={handleCopyCertId}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white/90 hover:bg-white border border-cyan-200/80 transition-colors shadow-2xs cursor-pointer"
                title="Copy certificate verification ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied ID' : 'Copy ID'}</span>
              </button>

              {/* Edit Profile Info */}
              <button
                id="btn-edit-details"
                type="button"
                onClick={onEditDetails}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white/90 hover:bg-white border border-cyan-200/80 transition-colors shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                <span>Edit Details</span>
              </button>

              {/* FEEDBACK FORM BUTTON */}
              <a
                id="btn-certificate-feedback-form"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeT0bBfGqkgmNOb8tUylUunhqOO-ebdmOt2BnVppsuaxRsswg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-950 bg-gradient-to-r from-indigo-100 to-sky-100 hover:from-indigo-200 hover:to-sky-200 border border-indigo-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                title="Fill in workshop feedback form"
              >
                <MessageSquareHeart className="w-3.5 h-3.5 text-indigo-600" />
                <span>Feedback Form</span>
                <ExternalLink className="w-3 h-3 text-indigo-500" />
              </a>

              {/* DOWNLOAD CERTIFICATE PDF BUTTON */}
              <button
                id="btn-download-certificate-pdf"
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 hover:via-emerald-700 hover:to-cyan-700 shadow-md shadow-teal-600/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
              >
                {isDownloadingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download Certificate (PDF)'}</span>
              </button>

              {/* DOWNLOAD CERTIFICATE IMAGE BUTTON */}
              <button
                id="btn-download-certificate-png"
                type="button"
                onClick={handleDownloadPng}
                disabled={isDownloadingPng}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white/90 hover:bg-white border border-cyan-200/80 transition-colors shadow-2xs cursor-pointer disabled:opacity-75"
                title="Download high-resolution image"
              >
                {isDownloadingPng ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ImageIcon className="w-3.5 h-3.5 text-teal-600" />
                )}
                <span>PNG</span>
              </button>

              {/* Print Certificate */}
              <button
                id="btn-print-certificate"
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white/90 hover:bg-white border border-cyan-200/80 transition-colors shadow-2xs cursor-pointer"
                title="Print or Save as PDF via Browser"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print</span>
              </button>

              {/* Exit Session / Start New */}
              <button
                id="btn-start-over"
                type="button"
                onClick={onStartOver}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-white/60 transition-colors cursor-pointer"
                title="Exit session and return to login"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EXACT CERTIFICATE CONTAINER MATCHING A4 SIZE SHEET (297mm x 210mm) */}
      <div className="print-only-container w-full overflow-x-auto py-2 flex justify-center">
        <div
          ref={certRef}
          id="official-completion-certificate"
          className="certificate-card w-[842px] h-[595px] min-w-[842px] max-w-[842px] bg-[#FFFDF9] rounded-xl shadow-xl px-10 py-6 relative text-slate-900 selection:bg-amber-100 overflow-hidden mx-auto flex flex-col justify-between"
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {/* Professional Unique Multi-tier Certificate Border & Security Filigree */}
          <CertificateBorder style={borderStyle} />

          {/* TOP SECTION: EMBLEM, HEADER & TITLE */}
          <div className="relative z-10 text-center space-y-1">
            {/* EMBLEM LOGO & PROGRAM */}
            <div className="space-y-0.5">
              <div className="flex justify-center">
                <img
                  src={logoImg}
                  alt="State Emblem Logo"
                  className="h-14 w-auto object-contain select-none drop-shadow-2xs"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-800 tracking-[0.2em] uppercase">
                  AI WORKSHOP PROGRAM
                </p>
              </div>
            </div>

            {/* CERTIFICATE OF COMPLETION TITLE */}
            <div className="space-y-0.5">
              <h1 className="text-2xl font-serif font-black text-slate-900 tracking-wide uppercase leading-tight">
                CERTIFICATE OF COMPLETION
              </h1>
              <p className="text-[9.5px] font-semibold text-slate-500 tracking-[0.24em] uppercase">
                OFFICIAL VERIFIED CERTIFICATION
              </p>
            </div>

            {/* PRESENTATION TEXT */}
            <div>
              <p className="font-serif italic text-slate-600 text-xs">
                This is to certify that
              </p>
            </div>
          </div>

          {/* RECIPIENT NAME & DESIGNATION */}
          <div className="relative z-10 text-center space-y-0.5">
            <h2 className="text-2xl font-serif font-bold text-slate-950 tracking-tight">
              {certificate.recipientName}
            </h2>
            <div className="w-56 h-[1.5px] bg-[#D98214] mx-auto" />
            <p className="text-xs font-bold text-slate-800 tracking-wide pt-0.5">
              {certificate.designation} • {certificate.department}
            </p>
          </div>

          {/* BODY CITATION PARAGRAPH */}
          <div className="relative z-10 max-w-xl mx-auto px-2 text-center">
            <p className="text-[10.5px] text-slate-700 leading-relaxed font-sans">
              has successfully compiled, submitted, and completed all {modules.length} core statutory and technical modules. All submissions and practical exercises have been verified with complete technical compliance:
            </p>
          </div>

          {/* MODULES 3-COLUMN MATRIX MATCHING OFFICIAL SPEC */}
          <div className="relative z-10 max-w-xl mx-auto w-full">
            <div className="grid grid-cols-3 gap-1.5 text-left">
              {modules.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-[#F4F9FD] border border-[#CCE4F5] rounded-md px-2 py-1 flex items-center justify-between gap-1 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E07A1F] shrink-0" />
                    <span className="text-[9.5px] font-semibold text-slate-800 truncate">
                      {mod.title}
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-[#0284C7] tracking-wider shrink-0 uppercase">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER SECTION: LEFT (ID) - CENTER (OFFICIAL SEAL) - RIGHT (SIGNATORY) */}
          <div className="relative z-10 grid grid-cols-3 gap-3 items-end max-w-2xl mx-auto w-full text-left">
            {/* LEFT COLUMN: CERTIFICATE ID & VERIFICATION */}
            <div className="space-y-0.5 text-left pl-1">
              <p className="text-[9px] font-bold text-slate-900 tracking-wider">
                CERTIFICATE ID:
              </p>
              <p className="text-[11px] font-bold font-mono text-slate-900">
                {certificate.certificateNumber}
              </p>
              <p className="text-[9px] text-slate-600">
                Issue Date: {certificate.issuedDate}
              </p>
              <p className="text-[9px] font-mono text-slate-600 truncate">
                Verification Hash: {certificate.verificationHash}
              </p>
              <div className="pt-0.5">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#E8F8F0] border border-[#B7ECC8] rounded text-[8.5px] font-bold text-[#166534]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                  <span>Authenticated &amp; Digitally Certified</span>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: OFFICIAL RED CRIMSON STAMP SEAL IMAGE */}
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={sealImg}
                alt="Official Seal"
                className="h-16 w-auto object-contain select-none drop-shadow-2xs"
              />
              <p className="text-[9px] font-bold text-slate-900 uppercase tracking-wider mt-0.5">
                OFFICIAL SEAL
              </p>
              <p className="text-[8px] text-slate-500">
                Authenticated Record
              </p>
            </div>

            {/* RIGHT COLUMN: AUTHORIZED SIGNATORY */}
            <div className="text-right space-y-0.5 pr-1">
              <div className="font-serif italic text-xl text-slate-800 h-6 flex items-center justify-end font-bold">
                Vishu Mahajan
              </div>
              <div className="w-36 h-px bg-slate-400 ml-auto mr-0 mt-0.5 mb-1" />
              <p className="text-[10.5px] font-bold text-slate-900">
                Thiru . Vishu Mahajan I.A.S
              </p>
              <p className="text-[9px] text-slate-500 italic">
                Authorized Signatory
              </p>
            </div>
          </div>

          {/* BOTTOM MICRO-DISCLAIMER */}
          <div className="relative z-10 pt-0.5">
            <p className="text-[8px] text-slate-400 font-sans tracking-normal text-center">
              This is a digitally generated and cryptographically verifiable certificate issued upon successful completion of all {modules.length} modules.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM FEEDBACK BANNER (Hidden on print) */}
      <div className="no-print relative rounded-3xl border border-indigo-200/90 bg-gradient-to-r from-indigo-50/80 via-sky-50/70 to-teal-50/60 backdrop-blur-xl shadow-md p-5 sm:p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                <MessageSquareHeart className="w-3.5 h-3.5 text-indigo-600" />
                <span>Workshop Feedback</span>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Share Your Workshop Experience
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Please take a moment to provide your valuable feedback on the AI workshop modules and sessions.
            </p>
          </div>

          <a
            id="btn-bottom-feedback-form"
            href="https://docs.google.com/forms/d/e/1FAIpQLSeT0bBfGqkgmNOb8tUylUunhqOO-ebdmOt2BnVppsuaxRsswg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg cursor-pointer shrink-0"
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>Open Feedback Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
