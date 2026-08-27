import React from 'react';
import { CERTIFICATE_LOGO_CONFIG } from '../config/logoConfig';
import { Award, Bot, Sparkles } from 'lucide-react';

interface CertificateLogoProps {
  className?: string;
  maxHeight?: number;
}

export const CertificateLogo: React.FC<CertificateLogoProps> = ({
  className = '',
  maxHeight,
}) => {
  const height = maxHeight || CERTIFICATE_LOGO_CONFIG.height;

  // If a manual logo source is configured in src/config/logoConfig.ts
  if (CERTIFICATE_LOGO_CONFIG.src && CERTIFICATE_LOGO_CONFIG.src.trim() !== '') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={CERTIFICATE_LOGO_CONFIG.src}
          alt={CERTIFICATE_LOGO_CONFIG.alt || 'Organization Logo'}
          style={{
            maxHeight: `${height}px`,
            maxWidth: `${CERTIFICATE_LOGO_CONFIG.maxWidth}px`,
          }}
          className="object-contain transition-all"
        />
      </div>
    );
  }

  // Default elegant insignia if no custom logo string has been entered in code yet
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-600 to-indigo-700 text-white flex items-center justify-center shadow-md p-3 mb-1">
        <Bot className="w-9 h-9 text-amber-100" />
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 uppercase tracking-widest mt-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        <span>AI Workshop Center of Excellence</span>
      </div>
    </div>
  );
};
