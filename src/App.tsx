/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CertificatePage } from './components/CertificatePage';
import { FinalSubmissionModulePage } from './components/FinalSubmissionModulePage';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { ModulesSubmissionPage } from './components/ModulesSubmissionPage';
import { UserDetailsPage } from './components/UserDetailsPage';
import { INITIAL_MODULES } from './data/initialModules';
import {
  CertificateRecord,
  ModuleData,
  StepKey,
  UploadedDoc,
  UserAuth,
  UserDetails,
} from './types';
import {
  createSampleFile,
  generateCertificateNumber,
  generateVerificationHash,
} from './utils/fileHelpers';
import particleWaveBg from './assets/images/digital_particle_wave_1787815790151.jpg';

const STORAGE_KEY_AUTH = 'tn_ai_workshop_auth';
const STORAGE_KEY_MODULES = 'tn_ai_workshop_modules';
const STORAGE_KEY_FINAL_DOC = 'tn_ai_workshop_final_doc';
const STORAGE_KEY_STEP = 'tn_ai_workshop_step';
const STORAGE_KEY_DETAILS = 'tn_ai_workshop_user_details';
const STORAGE_KEY_CERT = 'tn_ai_workshop_certificate';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepKey>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEP);
      if (saved) {
        if (saved === 'final_review') return 'final_module';
        return saved as StepKey;
      }
    } catch {}
    return 'login';
  });

  const [userAuth, setUserAuth] = useState<UserAuth | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const [modules, setModules] = useState<ModuleData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MODULES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return INITIAL_MODULES.map((initMod) => {
            const existing = parsed.find((p) => p.id === initMod.id);
            return {
              ...initMod,
              uploadedFile: existing?.uploadedFile || undefined,
            };
          });
        }
      }
    } catch {}
    return INITIAL_MODULES;
  });

  const [finalDocument, setFinalDocument] = useState<UploadedDoc | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FINAL_DOC);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const [userDetails, setUserDetails] = useState<UserDetails | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DETAILS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const [certificate, setCertificate] = useState<CertificateRecord | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERT);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  // Local storage synchronization
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STEP, currentStep);
    } catch {}
  }, [currentStep]);

  useEffect(() => {
    try {
      if (userAuth) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(userAuth));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch {}
  }, [userAuth]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MODULES, JSON.stringify(modules));
    } catch {}
  }, [modules]);

  useEffect(() => {
    try {
      if (finalDocument) {
        localStorage.setItem(STORAGE_KEY_FINAL_DOC, JSON.stringify(finalDocument));
      } else {
        localStorage.removeItem(STORAGE_KEY_FINAL_DOC);
      }
    } catch {}
  }, [finalDocument]);

  useEffect(() => {
    try {
      if (userDetails) {
        localStorage.setItem(STORAGE_KEY_DETAILS, JSON.stringify(userDetails));
      } else {
        localStorage.removeItem(STORAGE_KEY_DETAILS);
      }
    } catch {}
  }, [userDetails]);

  useEffect(() => {
    try {
      if (certificate) {
        localStorage.setItem(STORAGE_KEY_CERT, JSON.stringify(certificate));
      } else {
        localStorage.removeItem(STORAGE_KEY_CERT);
      }
    } catch {}
  }, [certificate]);

  // Handlers
  const handleLogin = (auth: UserAuth) => {
    setUserAuth(auth);
    setCurrentStep('modules_submission');
  };

  const handleFileUpload = (moduleId: number, file: UploadedDoc) => {
    setModules((prev) =>
      prev.map((mod) => (mod.id === moduleId ? { ...mod, uploadedFile: file } : mod))
    );
  };

  const handleFileRemove = (moduleId: number) => {
    setModules((prev) =>
      prev.map((mod) => (mod.id === moduleId ? { ...mod, uploadedFile: undefined } : mod))
    );
  };

  const handleAutoFillAll = () => {
    setModules((prev) =>
      prev.map((mod) => ({
        ...mod,
        uploadedFile: createSampleFile(mod.id, mod.recommendedType),
      }))
    );
  };

  const handleClearAll = () => {
    setModules(INITIAL_MODULES);
  };

  const handleUploadFinalDoc = (doc: UploadedDoc) => {
    setFinalDocument(doc);
  };

  const handleRemoveFinalDoc = () => {
    setFinalDocument(null);
  };

  const handleProceedToFinalModule = () => {
    setCurrentStep('final_module');
  };

  const handleBackToModules = () => {
    setCurrentStep('modules_submission');
  };

  const handleProceedToUserDetails = () => {
    setCurrentStep('user_details');
  };

  const handleBackToFinalModule = () => {
    setCurrentStep('final_module');
  };

  const handleGenerateCertificate = (details: UserDetails) => {
    setUserDetails(details);
    const completedCount = modules.filter((m) => !!m.uploadedFile).length;
    const nameCode = details.name.split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '') || 'TN';
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const hashChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randomHash = Array.from({ length: 5 }, () => hashChars[Math.floor(Math.random() * hashChars.length)]).join('');

    const certRecord: CertificateRecord = {
      id: 'CERT-' + nameCode + '-2026-' + randomSuffix,
      certificateNumber: `CERT-${nameCode}-2026-${randomSuffix}`,
      recipientName: details.name,
      email: details.email,
      designation: details.designation,
      department: details.department,
      issuedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      totalModules: modules.length,
      completedModules: completedCount || modules.length,
      verificationHash: `VERIF-${nameCode}-${randomHash}`,
      signatureAuthority: 'Thiru . Vishu Mahajan I.A.S',
      authorityTitle: 'Authorized Signatory',
    };

    setCertificate(certRecord);
    setCurrentStep('certificate');
  };

  const handleStartOver = () => {
    setUserAuth(null);
    setModules(INITIAL_MODULES);
    setFinalDocument(null);
    setUserDetails(null);
    setCertificate(null);
    setCurrentStep('login');
    try {
      localStorage.clear();
    } catch {}
  };

  const completedCount = modules.filter((m) => !!m.uploadedFile).length;
  const totalCount = modules.length;

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col text-slate-900 selection:bg-teal-500/20 selection:text-teal-900 relative">
      {/* Luminous 3D Particle Wave Theme Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print" aria-hidden="true">
        <img
          src={particleWaveBg}
          alt=""
          className="w-full h-full object-cover object-center fixed inset-0 filter brightness-[1.0] contrast-[1.05]"
        />
        {/* Soft atmospheric tint overlay to preserve perfect card contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/15 via-transparent to-slate-900/20 backdrop-blur-[0.5px]" />
      </div>

      {/* Top Application Header (Visible once logged in inside workspace) */}
      {userAuth && (
        <Header
          currentStep={currentStep}
          userAuth={userAuth}
          completedCount={completedCount}
          totalCount={totalCount}
          onLogout={handleStartOver}
        />
      )}

      {/* Main Content Body with Animated Transitions */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <LoginPage onLogin={handleLogin} />
            </motion.div>
          )}

          {currentStep === 'modules_submission' && userAuth && (
            <motion.div
              key="modules_submission"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ModulesSubmissionPage
                modules={modules}
                userAuth={userAuth}
                onFileUpload={handleFileUpload}
                onFileRemove={handleFileRemove}
                onAutoFillAll={handleAutoFillAll}
                onClearAll={handleClearAll}
                onProceedToFinalModule={handleProceedToFinalModule}
              />
            </motion.div>
          )}

          {currentStep === 'final_module' && userAuth && (
            <motion.div
              key="final_module"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <FinalSubmissionModulePage
                userAuth={userAuth}
                finalDocument={finalDocument}
                onUploadFinalDoc={handleUploadFinalDoc}
                onRemoveFinalDoc={handleRemoveFinalDoc}
                onNavigateBack={handleBackToModules}
                onProceedToProfile={handleProceedToUserDetails}
              />
            </motion.div>
          )}

          {currentStep === 'user_details' && userAuth && (
            <motion.div
              key="user_details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <UserDetailsPage
                userAuth={userAuth}
                initialDetails={userDetails || undefined}
                completedCount={completedCount}
                totalCount={totalCount}
                onBackToFinalModule={handleBackToFinalModule}
                onGenerateCertificate={handleGenerateCertificate}
              />
            </motion.div>
          )}

          {currentStep === 'certificate' && certificate && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <CertificatePage
                certificate={certificate}
                modules={modules}
                onStartOver={handleStartOver}
                onEditDetails={() => setCurrentStep('user_details')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Footer (hidden during print and on login page) */}
      {currentStep !== 'login' && (
        <footer className="no-print border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-4 text-center text-xs text-slate-500 relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5 justify-center">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
              AI Workshop Submission &amp; Certification Portal
            </span>
            <span className="text-[11px] text-slate-500">
              Accepts Word (.docx), PDF (.pdf), and PowerPoint (.pptx)
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
