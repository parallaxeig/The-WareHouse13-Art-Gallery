import React, { useState, useEffect, useRef } from 'react';
import ImageDiagnosticTool from './ImageDiagnosticTool';
import Button from './Button';
import './DevTools.css';

interface DevToolsProps {
  defaultVisible?: boolean;
}

const DevTools: React.FC<DevToolsProps> = ({ defaultVisible = false }) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [isMinimized, setIsMinimized] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  // Focus management
  useEffect(() => {
    if (isVisible && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isVisible]);

  const tabs = [
    { id: 'diagnostics', label: 'Image Diagnostics', icon: '🔍' },
    { id: 'performance', label: 'Performance', icon: '⚡', disabled: true },
    { id: 'accessibility', label: 'Accessibility', icon: '♿', disabled: true },
  ];

  return (
    <>
      {/* Toggle Button */}
      <div className="dev-tools-toggle">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          leftIcon="🛠️"
          aria-label={isVisible ? 'Close developer tools' : 'Open developer tools'}
          className="dev-tools-toggle__button"
        >
          Dev Tools
        </Button>
      </div>

      {/* Backdrop */}
      {isVisible && (
        <div 
          className="dev-tools-backdrop"
          onClick={() => setIsVisible(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Panel */}
      {isVisible && (
        <div 
          ref={panelRef}
          className={`dev-tools-panel ${isMinimized ? 'dev-tools-panel--minimized' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dev-tools-title"
          tabIndex={-1}
        >
          <header className="dev-tools-header">
            <h2 id="dev-tools-title" className="dev-tools-title">
              <span className="dev-tools-title-icon" aria-hidden="true">🛠️</span>
              Development Tools
            </h2>
            <div className="dev-tools-header-actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                leftIcon={isMinimized ? '🔼' : '🔽'}
                aria-label={isMinimized ? 'Expand panel' : 'Minimize panel'}
              >
                {isMinimized ? 'Expand' : 'Minimize'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                leftIcon="✕"
                aria-label="Close developer tools"
              >
                Close
              </Button>
            </div>
          </header>

          {!isMinimized && (
            <>
              <nav className="dev-tools-tabs" role="tablist" aria-label="Developer tool tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`dev-tools-tab ${activeTab === tab.id ? 'dev-tools-tab--active' : ''}`}
                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                    disabled={tab.disabled}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`dev-tools-panel-${tab.id}`}
                    aria-disabled={tab.disabled}
                  >
                    <span className="dev-tools-tab-icon" aria-hidden="true">
                      {tab.icon}
                    </span>
                    <span className="dev-tools-tab-label">{tab.label}</span>
                    {tab.disabled && (
                      <span className="dev-tools-tab-badge">Soon</span>
                    )}
                  </button>
                ))}
              </nav>

              <main className="dev-tools-content">
                <div
                  id="dev-tools-panel-diagnostics"
                  className={`dev-tools-tab-panel ${activeTab === 'diagnostics' ? 'dev-tools-tab-panel--active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="tab-diagnostics"
                  hidden={activeTab !== 'diagnostics'}
                >
                  <ImageDiagnosticTool autoScan={false} />
                </div>

                <div
                  id="dev-tools-panel-performance"
                  className={`dev-tools-tab-panel ${activeTab === 'performance' ? 'dev-tools-tab-panel--active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="tab-performance"
                  hidden={activeTab !== 'performance'}
                >
                  <div className="dev-tools-placeholder">
                    <div className="dev-tools-placeholder-icon">⚡</div>
                    <h3>Performance Tools</h3>
                    <p>Performance monitoring and optimization tools coming soon!</p>
                  </div>
                </div>

                <div
                  id="dev-tools-panel-accessibility"
                  className={`dev-tools-tab-panel ${activeTab === 'accessibility' ? 'dev-tools-tab-panel--active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="tab-accessibility"
                  hidden={activeTab !== 'accessibility'}
                >
                  <div className="dev-tools-placeholder">
                    <div className="dev-tools-placeholder-icon">♿</div>
                    <h3>Accessibility Checker</h3>
                    <p>Accessibility auditing and testing tools coming soon!</p>
                  </div>
                </div>
              </main>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DevTools;
