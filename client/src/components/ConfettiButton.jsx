import React from 'react';
import confetti from 'canvas-confetti';

export const ConfettiButton = ({ children, className = '', onClick, ...props }) => {
  const triggerConfetti = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 50,
      spread: 60,
      colors: ['#D97706', '#BE123C', '#0284C7', '#059669', '#F59E0B']
    });

    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={triggerConfetti}
      className={`btn-primary select-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
