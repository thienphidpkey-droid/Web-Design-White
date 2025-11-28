import React, { useState } from 'react';

interface NeuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const NeuButton: React.FC<NeuButtonProps> = ({ children, onClick, className = '', type = 'button', variant = 'primary' }) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "px-8 py-3 rounded-2xl font-semibold transition-all duration-200 ease-in-out flex items-center justify-center gap-2 select-none";
  
  const variantClasses = variant === 'primary' 
    ? "text-blue-600" 
    : "text-gray-600";

  const shadowClasses = isPressed
    ? "shadow-neu-pressed translate-y-[2px]"
    : "shadow-neu hover:-translate-y-[2px]";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${shadowClasses} bg-neu-base ${className}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NeuButton;