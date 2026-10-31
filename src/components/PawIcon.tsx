import React from 'react';

interface PawIconProps {
  className?: string;
  size?: number;
}

export const PawIcon: React.FC<PawIconProps> = ({ className = 'w-5 h-5 text-current', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main pad */}
      <path d="M12 10.5C9.5 10.5 7.5 12.8 7.5 15.5C7.5 18 9.3 20 12 20C14.7 20 16.5 18 16.5 15.5C16.5 12.8 14.5 10.5 12 10.5Z" />
      {/* Outer left toe */}
      <circle cx="5" cy="11.5" r="2.2" />
      {/* Inner left toe */}
      <circle cx="8.5" cy="6.8" r="2.2" />
      {/* Inner right toe */}
      <circle cx="15.5" cy="6.8" r="2.2" />
      {/* Outer right toe */}
      <circle cx="19" cy="11.5" r="2.2" />
    </svg>
  );
};
