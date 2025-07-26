import React from 'react';
import './TestimonialCard.css';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, avatar, content }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <p className="testimonial-text">"{content}"</p>
      </div>
      <div className="testimonial-author">
        <img src={avatar} alt={`${name} avatar`} className="testimonial-avatar" />
        <div className="testimonial-info">
          <h4 className="testimonial-name">{name}</h4>
          <p className="testimonial-role">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
