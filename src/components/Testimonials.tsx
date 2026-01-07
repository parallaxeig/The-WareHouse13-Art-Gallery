import React from 'react';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Artist',
      avatar: '/avatar-1.png',
      content: 'The VR gallery experience is absolutely mind-blowing! Seeing my artwork displayed in a virtual space gives it a whole new dimension. Sales have increased 300% since joining.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'NFT Collector',
      avatar: '/avatar-2.png',
      content: 'Finally, a platform that makes NFT collecting feel like visiting a real art gallery. The AR preview feature helped me choose the perfect pieces for my collection.',
      rating: 5
    },
    {
      name: 'Elena Vasquez',
      role: 'Gallery Curator',
      avatar: 'https://ui-avatars.com/api/?name=Elena+Vasquez&background=0078d4&color=fff',
      content: 'As a traditional gallery curator, I was skeptical about digital art. This platform changed my perspective completely. The curation tools are professional-grade.',
      rating: 5
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__container">
        <header className="testimonials__header">
          <h2 className="testimonials__title">Loved by Artists & Collectors</h2>
          <p className="testimonials__subtitle">
            Join thousands of creators and collectors who have transformed their digital art experience
          </p>
        </header>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className="testimonials__item" style={{ animationDelay: `${index * 0.2}s` }}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
