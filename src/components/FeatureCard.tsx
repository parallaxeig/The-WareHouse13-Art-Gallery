import React from 'react';
import './FeatureCard.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`fluent-feature-card ${className}`}>
      <div className="fluent-feature-card__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="fluent-feature-card__title fluent-text-subtitle-2">
        {title}
      </h3>
      <p className="fluent-feature-card__description fluent-text-body-1">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
