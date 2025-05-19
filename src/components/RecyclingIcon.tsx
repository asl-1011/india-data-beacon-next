
import React from 'react';

export interface RecyclingIconProps {
  className?: string;
}

export const RecyclingIcon: React.FC<RecyclingIconProps> = ({ className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.786 1.786 0 0 0 1.696-2.338l-2.381-7.065a1.783 1.783 0 0 0-1.695-1.097H3.175a1.786 1.786 0 0 0-1.696 2.338l2.38 7.065A1.783 1.783 0 0 0 5.556 19H7" />
      <path d="m7 19 3-6" />
      <path d="M12.5 13h4.5l2 6" />
      <path d="M16 5h5.185a1.83 1.83 0 0 1 1.57.881 1.785 1.785 0 0 1 .004 1.784l-1.368 2.835" />
      <path d="M14 5H9.814a1.786 1.786 0 0 0-1.696 2.338l.932 2.765" />
      <path d="m16 5-4 9" />
      <path d="m11.5 14-2 5" />
    </svg>
  );
};
