import React from 'react';

interface VerifiedBadgeProps {
  size?: number;
  className?: string;
}

/**
 * Authentic Instagram Verified Badge
 * Features the iconic 8-scallop rosette starburst in Instagram blue (#0095F6)
 * with the signature white checkmark in the center.
 */
export const InstagramVerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  size = 18, 
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 inline-block align-middle select-none ${className}`}
      aria-label="Doğrulanmış Mavi Tık"
    >
      <title>Doğrulanmış Profil / Kadir Ezel</title>
      {/* Sleek, thin circular Instagram blue badge */}
      <circle cx="12" cy="12" r="10" fill="#0095F6" />
      {/* Thin, elegant, delicate white checkmark */}
      <polyline
        points="7.8 12.3 10.6 15.1 16.5 9.2"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
