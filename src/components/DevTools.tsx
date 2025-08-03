import React, { useState } from 'react';
import ImageDiagnosticTool from './ImageDiagnosticTool';
import Button from './Button';
import './DevTools.css';

const DevTools: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnostics');

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      <div className="dev-tools-toggle">
        <Button
          variant="outline"
          size="small"
          onClick={() => setIsVisible(!isVisible)}
        >
          🛠️ Dev Tools
        </Button>
      </div>

      {isVisible && (
        <div className="dev-tools-panel">
          <div className="dev-tools-header">
            <h3>Development Tools</h3>
            <Button
              variant="outline"
              size="small"
              onClick={() => setIsVisible(false)}
            >
              ✕
            </Button>
          </div>

          <div className="dev-tools-tabs">
            <button
              className={`tab ${activeTab === 'diagnostics' ? 'active' : ''}`}
              onClick={() => setActiveTab('diagnostics')}
            >
              Image Diagnostics
            </button>
            {/* Add more tabs here for other dev tools */}
          </div>

          <div className="dev-tools-content">
            {activeTab === 'diagnostics' && (
              <ImageDiagnosticTool autoScan={false} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DevTools;
