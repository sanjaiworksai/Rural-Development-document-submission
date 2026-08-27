import React from 'react';

export type BorderStyle = 'ornate-gold' | 'guilloche-security' | 'imperial-navy' | 'modern-luxury';

interface CertificateBorderProps {
  style?: BorderStyle;
}

export const CertificateBorder: React.FC<CertificateBorderProps> = ({
  style = 'ornate-gold',
}) => {
  if (style === 'guilloche-security') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {/* Security Green & Gold Frame */}
        <div className="absolute inset-0 border-[10px] sm:border-[12px] border-[#065F46]" />
        <div className="absolute inset-[10px] sm:inset-[12px] border-2 border-[#D97706]" />
        <div className="absolute inset-[14px] sm:inset-[16px] border border-[#10B981]/50" />
        <div className="absolute inset-[18px] sm:inset-[20px] border-2 border-[#047857]" />

        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 707"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="secGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <g id="security-corner">
              {/* Concentric Guilloché Arcs */}
              <circle cx="28" cy="28" r="24" stroke="#D97706" strokeWidth="1.5" fill="#ECFDF5" />
              <circle cx="28" cy="28" r="18" stroke="#047857" strokeWidth="1" strokeDasharray="3 2" />
              <circle cx="28" cy="28" r="12" stroke="#D97706" strokeWidth="1.2" />
              <circle cx="28" cy="28" r="6" fill="#047857" />
              <circle cx="28" cy="28" r="2.5" fill="#FEF08A" />
              {/* Corner Rays */}
              <path d="M 28 52 L 28 85 M 52 28 L 85 28" stroke="#D97706" strokeWidth="1.5" />
              <path d="M 24 52 L 24 95 M 52 24 L 95 24" stroke="#047857" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          </defs>

          <use href="#security-corner" />
          <g transform="translate(1000, 0) scale(-1, 1)"><use href="#security-corner" /></g>
          <g transform="translate(0, 700) scale(1, -1)"><use href="#security-corner" /></g>
          <g transform="translate(1000, 700) scale(-1, -1)"><use href="#security-corner" /></g>

          {/* Micro-guilloche wave perimeter lines */}
          <line x1="100" y1="20" x2="900" y2="20" stroke="#D97706" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
          <line x1="100" y1="680" x2="900" y2="680" stroke="#D97706" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
          <line x1="20" y1="100" x2="20" y2="600" stroke="#D97706" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
          <line x1="980" y1="100" x2="980" y2="600" stroke="#D97706" strokeWidth="1.5" strokeDasharray="6 3 2 3" />
        </svg>
      </div>
    );
  }

  if (style === 'imperial-navy') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {/* Deep Navy outer boundary */}
        <div className="absolute inset-0 border-[10px] sm:border-[12px] border-[#0F172A]" />
        <div className="absolute inset-[10px] sm:inset-[12px] border-2 border-[#D97706]" />
        <div className="absolute inset-[14px] sm:inset-[16px] border border-[#FDE68A]" />
        <div className="absolute inset-[18px] sm:inset-[20px] border-2 border-[#0F172A]/80" />

        {/* Corner Brackets */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 707" fill="none">
          <defs>
            <g id="navy-corner">
              <path d="M 28 75 L 28 28 L 75 28" stroke="#D97706" strokeWidth="3" />
              <path d="M 34 65 L 34 34 L 65 34" stroke="#0F172A" strokeWidth="2" />
              <polygon points="28,28 38,20 48,28 38,36" fill="#D97706" />
              <circle cx="28" cy="28" r="4" fill="#D97706" />
              <circle cx="28" cy="28" r="2" fill="#FEF08A" />
              <circle cx="75" cy="28" r="3.5" fill="#D97706" />
              <circle cx="28" cy="75" r="3.5" fill="#D97706" />
            </g>
          </defs>
          <use href="#navy-corner" />
          <g transform="translate(1000, 0) scale(-1, 1)"><use href="#navy-corner" /></g>
          <g transform="translate(0, 707) scale(1, -1)"><use href="#navy-corner" /></g>
          <g transform="translate(1000, 707) scale(-1, -1)"><use href="#navy-corner" /></g>
        </svg>
      </div>
    );
  }

  if (style === 'modern-luxury') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {/* Sleek Chamfered Gold Frame */}
        <div className="absolute inset-2 border-2 border-[#D98214]" />
        <div className="absolute inset-4 border border-[#B45309]/60" />
        <div className="absolute inset-5 border border-[#FDE68A]/80" />

        {/* 4 Corner Geometric Chamfers */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 707" fill="none">
          <defs>
            <g id="luxury-corner">
              <path d="M 18 55 L 55 18" stroke="#D98214" strokeWidth="3.5" />
              <polygon points="28,28 38,18 28,8 18,18" fill="#D98214" />
              <circle cx="55" cy="18" r="3" fill="#D98214" />
              <circle cx="18" cy="55" r="3" fill="#D98214" />
            </g>
          </defs>
          <use href="#luxury-corner" />
          <g transform="translate(1000, 0) scale(-1, 1)"><use href="#luxury-corner" /></g>
          <g transform="translate(0, 707) scale(1, -1)"><use href="#luxury-corner" /></g>
          <g transform="translate(1000, 707) scale(-1, -1)"><use href="#luxury-corner" /></g>
        </svg>
      </div>
    );
  }

  // DEFAULT / PRIMARY: ORNATE ROYAL GOLD (Prestigious Classical Multi-tiered Guilloché Border)
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {/* Outer Rich Gold Frame Band with Gradient Appearance */}
      <div className="absolute inset-0 border-[8px] sm:border-[10px] border-[#B45309] shadow-inner" />
      
      {/* Secondary Polished Gold Inset Line */}
      <div className="absolute inset-[8px] sm:inset-[10px] border-[2px] border-[#F59E0B]" />
      
      {/* Middle White/Parchment Spacer Channel */}
      <div className="absolute inset-[12px] sm:inset-[14px] border-[1px] border-[#D97706]/40" />

      {/* Inner Intricate Gold Border with Filigree Margins */}
      <div className="absolute inset-[16px] sm:inset-[18px] border-[2px] border-[#B45309]" />
      <div className="absolute inset-[19px] sm:inset-[21px] border-[1px] border-[#FDE68A] border-dashed" />

      {/* SVG Vector Corner Ornaments & Guilloché Filigree (Scale-independent and ultra-sharp in PDF/PNG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 707"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          
          {/* Reusable Ornate Corner Motif */}
          <g id="ornate-corner">
            {/* Corner Decorative Ribbon Scrolls */}
            <path
              d="M 28 28 C 28 65, 45 80, 85 85 C 60 75, 55 55, 65 35 C 45 45, 35 35, 28 28 Z"
              fill="url(#goldGrad1)"
              opacity="0.85"
            />
            <path
              d="M 28 28 C 65 28, 80 45, 85 85 C 75 60, 55 55, 35 65 C 45 45, 35 35, 28 28 Z"
              fill="url(#goldGrad1)"
              opacity="0.85"
            />
            
            {/* Corner Arabesque Loops */}
            <path
              d="M 28 28 Q 55 55 82 28 Q 55 55 28 82 Q 55 55 28 28"
              stroke="#B45309"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 36 36 Q 55 55 74 36 Q 55 55 36 74 Q 55 55 36 36"
              stroke="#F59E0B"
              strokeWidth="1.2"
              fill="none"
            />
            
            {/* Corner Medallion Stud */}
            <circle cx="34" cy="34" r="8" fill="url(#goldGrad1)" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="34" cy="34" r="4.5" fill="#78350F" />
            <circle cx="34" cy="34" r="2" fill="#FEF08A" />

            {/* Accent Florets */}
            <circle cx="92" cy="28" r="3.5" fill="#D97706" />
            <circle cx="92" cy="28" r="1.5" fill="#FEF08A" />
            <circle cx="28" cy="92" r="3.5" fill="#D97706" />
            <circle cx="28" cy="92" r="1.5" fill="#FEF08A" />

            {/* Corner Inset Accent Lines */}
            <line x1="28" y1="92" x2="28" y2="120" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="92" y1="28" x2="120" y2="28" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>

          {/* Top/Bottom Center Crest Ornament */}
          <g id="center-crest">
            <path
              d="M -30 0 C -15 -8, -10 -15, 0 -18 C 10 -15, 15 -8, 30 0 C 15 4, 8 10, 0 14 C -8 10, -15 4, -30 0 Z"
              fill="url(#goldGrad1)"
              stroke="#78350F"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="3" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="-16" cy="0" r="2" fill="#D97706" />
            <circle cx="16" cy="0" r="2" fill="#D97706" />
          </g>
        </defs>

        {/* TOP-LEFT CORNER */}
        <use href="#ornate-corner" />

        {/* TOP-RIGHT CORNER */}
        <g transform="translate(1000, 0) scale(-1, 1)">
          <use href="#ornate-corner" />
        </g>

        {/* BOTTOM-LEFT CORNER */}
        <g transform="translate(0, 707) scale(1, -1)">
          <use href="#ornate-corner" />
        </g>

        {/* BOTTOM-RIGHT CORNER */}
        <g transform="translate(1000, 707) scale(-1, -1)">
          <use href="#ornate-corner" />
        </g>

        {/* TOP CENTER ORNAMENT */}
        <g transform="translate(500, 24)">
          <use href="#center-crest" />
        </g>

        {/* BOTTOM CENTER ORNAMENT */}
        <g transform="translate(500, 683) rotate(180)">
          <use href="#center-crest" />
        </g>

        {/* LEFT CENTER ACCENT */}
        <g transform="translate(24, 353.5) rotate(90)">
          <use href="#center-crest" />
        </g>

        {/* RIGHT CENTER ACCENT */}
        <g transform="translate(976, 353.5) rotate(-90)">
          <use href="#center-crest" />
        </g>

        {/* SUBTLE SECURITY WATERMARK ROSETTE (Central fine line pattern, ultra low opacity) */}
        <g transform="translate(500, 353.5)" opacity="0.04" stroke="#B45309" strokeWidth="1" fill="none">
          <circle cx="0" cy="0" r="180" />
          <circle cx="0" cy="0" r="150" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="120" />
          <circle cx="0" cy="0" r="90" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="60" />
          {[0, 15, 30, 45, 60, 75].map((deg) => (
            <rect
              key={deg}
              x="-110"
              y="-110"
              width="220"
              height="220"
              rx="15"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
