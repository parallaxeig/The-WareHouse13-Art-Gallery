import React from 'react';
import './Community.css';

const Community: React.FC = () => {
    return (
        <section className="community-section" id="community">
            <div className="community-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>

            <div className="community-container">
                <h2 className="community-title">Join Our Creative Universe</h2>
                <p className="community-description">
                    Be part of a vibrant community of digital artists, collectors, and enthusiasts.
                    Share your work, get feedback, and collaborate on exciting projects in the metaverse.
                </p>

                <div className="community-actions">
                    <button className="community-btn-discord">
                        <span>🚀</span> Join Discord Community
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Community;
