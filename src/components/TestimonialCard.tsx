import React from 'react';
import './TestimonialCard.css';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, avatar, content, rating }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__header">
        <img src={avatar} alt={name} className="testimonial-card__avatar" />
        <div className="testimonial-card__info">
          <span className="testimonial-card__name">{name}</span>
          <span className="testimonial-card__role">{role}</span>
        </div>
      </div>

      <div className="testimonial-card__rating" aria-label={`${rating} out of 5 stars`}>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>

      <p className="testimonial-card__content">"{content}"</p>
    </div>
  );
};

export default TestimonialCard;
