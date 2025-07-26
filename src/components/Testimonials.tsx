import React from 'react';
import TestimonialCard from './TestimonialCard';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Artist',
      avatar: '/placeholder.svg?height=60&width=60',
      content: 'The VR gallery experience is absolutely mind-blowing! Seeing my artwork displayed in 3D space gives it a whole new dimension. The minting process was seamless too.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'NFT Collector',
      avatar: '/placeholder.svg?height=60&width=60',
      content: 'I love how easy it is to browse and purchase NFTs in the AR mode. The wallet integration with my One Key hardware wallet works flawlessly. Highly recommended!'
    },
    {
      name: 'Elena Volkov',
      role: 'Gallery Curator',
      avatar: '/placeholder.svg?height=60&width=60',
      content: 'This platform revolutionizes how we experience digital art. The ability to create immersive exhibitions in VR has opened up incredible possibilities for our artists.'
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Our Community Says</h2>
          <p className="testimonials-subtitle">
            Join thousands of artists and collectors who are already experiencing the future of digital art
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
              content={testimonial.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
