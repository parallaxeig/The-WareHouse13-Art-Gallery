import React from 'react';
import './Button.css';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  ...rest
}) => {
  const sizeClass = `button--${size}`;
  const variantClass = `button--${variant}`;
  const widthClass = fullWidth ? 'button--full-width' : '';

  return (
    <button
      className={`button ${sizeClass} ${variantClass} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      title={title}
      {...rest}
    >
      {leftIcon && <span className="button__icon button__icon--left">{leftIcon}</span>}
      {children && <span className="button__text">{children}</span>}
      {rightIcon && <span className="button__icon button__icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
