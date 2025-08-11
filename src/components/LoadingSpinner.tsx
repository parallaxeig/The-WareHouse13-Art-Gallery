import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  return (
    <div 
      className={`fluent-loading-spinner fluent-loading-spinner--${size} fluent-loading-spinner--${color} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg className="fluent-loading-spinner__svg" viewBox="0 0 24 24">
        <circle
          className="fluent-loading-spinner__circle"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
