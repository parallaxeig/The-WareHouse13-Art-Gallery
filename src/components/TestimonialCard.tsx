import React from 'react';
import './TestimonialCard.css';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  content,
  rating
}) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__content">
        <div className="testimonial-card__rating" aria-label={`${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`testimonial-card__star ${i < rating ? 'testimonial-card__star--filled' : ''}`}
              aria-hidden="true"
            >
              ⭐
            </span>
          ))}
        </div>
        <blockquote className="testimonial-card__quote">
          "{content}"
        </blockquote>
      </div>
      
      <footer className="testimonial-card__author">
        <img
          src={avatar}
          alt={`${name}'s profile picture`}
          className="testimonial-card__avatar"
        />
        <div className="testimonial-card__info">
          <cite className="testimonial-card__name">{name}</cite>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </footer>
    </div>
  );
};

export default TestimonialCard;
