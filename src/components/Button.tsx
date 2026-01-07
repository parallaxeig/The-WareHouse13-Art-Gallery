import React from 'react';
import './Button.css';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  ariaLabel?: string;
  title?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  ariaLabel,
  title,
  loading = false,
  ...rest
}) => {
  const baseClass = 'fluent-button';
  const sizeClass = `fluent-button--${size}`;
  const variantClass = `fluent-button--${variant}`;
  const widthClass = fullWidth ? 'fluent-button--full-width' : '';
  const loadingClass = loading ? 'fluent-button--loading' : '';

  return (
    <button
      className={`${baseClass} ${sizeClass} ${variantClass} ${widthClass} ${loadingClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      title={title}
      {...rest}
    >
      {loading && <span className="fluent-button__spinner" aria-hidden="true">Checking...</span>}
      {!loading && leftIcon && <span className="fluent-button__icon fluent-button__icon--left">{leftIcon}</span>}
      <span className="fluent-button__text">{loading ? 'Please wait' : children}</span>
      {!loading && rightIcon && <span className="fluent-button__icon fluent-button__icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
