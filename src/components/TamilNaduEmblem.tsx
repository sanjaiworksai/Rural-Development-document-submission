import React, { useState } from 'react';
import logoImg from '../assets/logo.png';

interface TamilNaduEmblemProps {
  className?: string;
  size?: number;
}

export const TamilNaduEmblem: React.FC<TamilNaduEmblemProps> = ({
  className = '',
  size = 72,
}) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError && logoImg) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="Tamil Nadu State Emblem Logo"
          style={{ height: `${size}px`, maxHeight: `${size}px`, width: 'auto' }}
          className="object-contain select-none drop-shadow-xs"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs select-none"
      >
        <circle cx="80" cy="80" r="77" fill="#047857" stroke="#D97706" strokeWidth="3" />
        <circle cx="80" cy="80" r="73" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="80" cy="80" r="69" fill="#065F46" stroke="#CA8A04" strokeWidth="1.5" />
        <path id="tn-emblem-top-arc" d="M 26 80 A 54 54 0 0 1 134 80" fill="none" />
        <text className="font-bold fill-amber-100 font-serif" fontSize="10" letterSpacing="0.06em">
          <textPath href="#tn-emblem-top-arc" startOffset="50%" textAnchor="middle">
            தமிழ்நாடு அரசு
          </textPath>
        </text>
        <path id="tn-emblem-bottom-arc" d="M 134 82 A 54 54 0 0 1 26 82" fill="none" />
        <text className="font-bold fill-amber-200 font-sans" fontSize="6.5" letterSpacing="0.04em">
          <textPath href="#tn-emblem-bottom-arc" startOffset="50%" textAnchor="middle">
            வாய்மையே வெல்லும் • GOVT. OF TAMIL NADU
          </textPath>
        </text>
        <circle cx="80" cy="78" r="45" fill="#FFFDF7" stroke="#D97706" strokeWidth="1.5" />
        <rect x="55" y="93" width="50" height="13" rx="1.5" fill="#78350F" stroke="#B45309" strokeWidth="0.8" />
        <path d="M 74 106 L 74 97 C 74 94 86 94 86 97 L 86 106 Z" fill="#451A03" />
        <polygon points="58,93 102,93 98,83 62,83" fill="#92400E" stroke="#B45309" strokeWidth="0.8" />
        <polygon points="64,83 96,83 92,73 68,73" fill="#B45309" stroke="#92400E" strokeWidth="0.8" />
        <polygon points="69,73 91,73 87,65 73,65" fill="#D97706" stroke="#92400E" strokeWidth="0.8" />
        <path d="M 74 65 L 80 57 L 86 65 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="0.6" />
        <circle cx="80" cy="56" r="1.6" fill="#FBBF24" stroke="#78350F" strokeWidth="0.5" />
      </svg>
    </div>
  );
};
