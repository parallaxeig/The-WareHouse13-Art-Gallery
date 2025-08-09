import React, { useState, useEffect, useRef } from 'react';
import { useImageDiagnostics } from '../hooks/useImageDiagnostics';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import './ImageDiagnosticTool.css';

interface ImageDiagnosticToolProps {
  autoScan?: boolean;
  className?: string;
}

const ImageDiagnosticTool: React.FC<ImageDiagnosticToolProps> = ({ 
  autoScan = false, 
  className = '' 
}) => {
  const [customUrls, setCustomUrls] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [options, setOptions] = useState({
    timeout: 10000,
    checkDimensions: true,
    maxFileSize: 5 * 1024 * 1024
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { results, isRunning, error, runDiagnostics, generateReport, clearResults } = useImageDiagnostics();

  // Extract image URLs from the current page
  const extractImageUrls = (): string[] => {
    const images = document.querySelectorAll('img');
    const urls: string[] = [];
    
    images.forEach(img => {
      if (img.src && !urls.includes(img.src)) {
        urls.push(img.src);
      }
    });

    // Add background images from CSS
    const elementsWithBg = document.querySelectorAll('*');
    elementsWithBg.forEach(el => {
      const bgImage = window.getComputedStyle(el).backgroundImage;
      if (bgImage && bgImage !== 'none') {
        const urlMatch = bgImage.match(/url\\(['\"]?([^'\"]+)['\"]?\\)/);
        if (urlMatch && urlMatch[1] && !urls.includes(urlMatch[1])) {
          urls.push(urlMatch[1]);
        }
      }
    });

    return urls;
  };

  const handleScanPage = async () => {
    const urls = extractImageUrls();
    await runDiagnostics(urls, options);
  };

  const handleScanCustomUrls = async () => {
    const urls = customUrls
      .split('\\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    await runDiagnostics(urls, options);
  };

  const handleDownloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-diagnostic-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyReport = async () => {
    const report = generateReport();
    try {
      await navigator.clipboard.writeText(report);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy report:', err);
    }
  };

  useEffect(() => {
    if (autoScan) {
      handleScanPage();
    }
  }, [autoScan]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'var(--color-success-500)';
      case 'warning': return 'var(--color-warning-500)';
      case 'error': return 'var(--color-error-500)';
      default: return 'var(--color-secondary-500)';
    }
  };

  return (
    <div className={`diagnostic-tool ${className}`} role="main">
      <header className="diagnostic-tool__header">
        <h2 className="diagnostic-tool__title">
          <span className="diagnostic-tool__icon" aria-hidden="true">🔍</span>
          Image Diagnostic Tool
        </h2>
        <p className="diagnostic-tool__description">
          Identify and troubleshoot image loading issues across your application
        </p>
      </header>

      <section className="diagnostic-tool__controls" aria-label="Diagnostic Controls">
        <div className="diagnostic-tool__primary-actions">
          <Button 
            variant="primary" 
            size="md"
            onClick={handleScanPage}
            disabled={isRunning}
            loading={isRunning}
            leftIcon={!isRunning ? '🔍' : undefined}
            aria-describedby="scan-page-help"
          >
            {isRunning ? 'Scanning Page...' : 'Scan Current Page'}
          </Button>
          
          <Button 
            variant="outline" 
            size="md"
            onClick={() => setShowAdvanced(!showAdvanced)}
            rightIcon={showAdvanced ? '▲' : '▼'}
            aria-expanded={showAdvanced}
            aria-controls="advanced-options"
          >
            Advanced Options
          </Button>
        </div>

        <div id="scan-page-help" className="diagnostic-tool__help-text">
          Scans all images on the current page including background images
        </div>

        {showAdvanced && (
          <div 
            id="advanced-options" 
            className="diagnostic-tool__advanced animate-fade-in"
            role="region"
            aria-label="Advanced Options"
          >
            <h3 className="diagnostic-tool__section-title">Advanced Configuration</h3>
            <div className="diagnostic-tool__option-grid">
              <div className="diagnostic-tool__option">
                <label htmlFor="timeout-input" className="diagnostic-tool__label">
                  Timeout (milliseconds)
                </label>
                <input
                  id="timeout-input"
                  type="number"
                  min="1000"
                  max="30000"
                  step="1000"
                  value={options.timeout}
                  onChange={(e) => setOptions({...options, timeout: parseInt(e.target.value)})}
                  className="diagnostic-tool__input"
                  aria-describedby="timeout-help"
                />
                <div id="timeout-help" className="diagnostic-tool__input-help">
                  Maximum time to wait for image loading
                </div>
              </div>
              
              <div className="diagnostic-tool__option">
                <label htmlFor="filesize-input" className="diagnostic-tool__label">
                  Max File Size (MB)
                </label>
                <input
                  id="filesize-input"
                  type="number"
                  min="0.1"
                  max="50"
                  step="0.5"
                  value={options.maxFileSize / 1024 / 1024}
                  onChange={(e) => setOptions({...options, maxFileSize: parseFloat(e.target.value) * 1024 * 1024})}
                  className="diagnostic-tool__input"
                  aria-describedby="filesize-help"
                />
                <div id="filesize-help" className="diagnostic-tool__input-help">
                  Flag images larger than this size
                </div>
              </div>
              
              <div className="diagnostic-tool__option diagnostic-tool__option--checkbox">
                <label htmlFor="dimensions-check" className="diagnostic-tool__checkbox-label">
                  <input
                    id="dimensions-check"
                    type="checkbox"
                    checked={options.checkDimensions}
                    onChange={(e) => setOptions({...options, checkDimensions: e.target.checked})}
                    className="diagnostic-tool__checkbox"
                  />
                  <span className="diagnostic-tool__checkbox-text">
                    Check Image Dimensions
                  </span>
                </label>
                <div className="diagnostic-tool__input-help">
                  Analyze image dimensions and display properties
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="diagnostic-tool__custom-urls">
          <label htmlFor="custom-urls-textarea" className="diagnostic-tool__label">
            Custom URLs
          </label>
          <textarea
            id="custom-urls-textarea"
            ref={textareaRef}
            value={customUrls}
            onChange={(e) => setCustomUrls(e.target.value)}
            placeholder="Enter image URLs, one per line:\\nhttps://example.com/image1.jpg\\nhttps://example.com/image2.png"
            rows={4}
            className="diagnostic-tool__textarea"
            aria-describedby="custom-urls-help"
          />
          <div id="custom-urls-help" className="diagnostic-tool__input-help">
            Enter one URL per line to test specific images
          </div>
          <Button 
            variant="secondary" 
            size="md"
            onClick={handleScanCustomUrls}
            disabled={isRunning || !customUrls.trim()}
            loading={isRunning}
            leftIcon={!isRunning ? '🔗' : undefined}
            className="diagnostic-tool__scan-custom-btn"
          >
            {isRunning ? 'Scanning URLs...' : 'Scan Custom URLs'}
          </Button>
        </div>
      </section>

      {error && (
        <div className="diagnostic-tool__error" role="alert">
          <span className="diagnostic-tool__error-icon" aria-hidden="true">⚠️</span>
          <div>
            <strong>Error occurred:</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {isRunning && (
        <div className="diagnostic-tool__loading" role="status" aria-live="polite">
          <LoadingSpinner size="lg" />
          <span>Analyzing images...</span>
        </div>
      )}

      {results.length > 0 && (
        <section className="diagnostic-tool__results animate-fade-in" aria-label="Diagnostic Results">
          <header className="diagnostic-tool__results-header">
            <h3 className="diagnostic-tool__results-title">Diagnostic Results</h3>
            <div className="diagnostic-tool__results-actions">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopyReport}
                leftIcon={copySuccess ? '✅' : '📋'}
                aria-label={copySuccess ? 'Report copied' : 'Copy report to clipboard'}
              >
                {copySuccess ? 'Copied!' : 'Copy Report'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDownloadReport}
                leftIcon="💾"
                aria-label="Download report as text file"
              >
                Download
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearResults}
                leftIcon="🗑️"
                aria-label="Clear all results"
              >
                Clear
              </Button>
            </div>
          </header>

          <div className="diagnostic-tool__summary">
            <div className="diagnostic-tool__stats" role="region" aria-label="Results Summary">
              <div className="diagnostic-tool__stat diagnostic-tool__stat--success">
                <span className="diagnostic-tool__stat-icon" aria-hidden="true">✅</span>
                <span className="diagnostic-tool__stat-count">
                  {results.filter(r => r.status === 'success').length}
                </span>
                <span className="diagnostic-tool__stat-label">Success</span>
              </div>
              <div className="diagnostic-tool__stat diagnostic-tool__stat--warning">
                <span className="diagnostic-tool__stat-icon" aria-hidden="true">⚠️</span>
                <span className="diagnostic-tool__stat-count">
                  {results.filter(r => r.status === 'warning').length}
                </span>
                <span className="diagnostic-tool__stat-label">Warnings</span>
              </div>
              <div className="diagnostic-tool__stat diagnostic-tool__stat--error">
                <span className="diagnostic-tool__stat-icon" aria-hidden="true">❌</span>
                <span className="diagnostic-tool__stat-count">
                  {results.filter(r => r.status === 'error').length}
                </span>
                <span className="diagnostic-tool__stat-label">Errors</span>
              </div>
            </div>
          </div>

          <div className="diagnostic-tool__results-list">
            {results.map((result, index) => (
              <article 
                key={index} 
                className={`diagnostic-tool__result-item diagnostic-tool__result-item--${result.status}`}
              >
                <header className="diagnostic-tool__result-header">
                  <span 
                    className="diagnostic-tool__result-status"
                    style={{ color: getStatusColor(result.status) }}
                    aria-label={`Status: ${result.status}`}
                  >
                    {getStatusIcon(result.status)}
                  </span>
                  <span className="diagnostic-tool__result-url" title={result.url}>
                    {result.url}
                  </span>
                </header>
                
                <div className="diagnostic-tool__result-details">
                  {result.loadTime && (
                    <span className="diagnostic-tool__result-detail">
                      Load: {result.loadTime.toFixed(0)}ms
                    </span>
                  )}
                  {result.dimensions && (
                    <span className="diagnostic-tool__result-detail">
                      Size: {result.dimensions.width}×{result.dimensions.height}
                    </span>
                  )}
                  {result.fileSize && (
                    <span className="diagnostic-tool__result-detail">
                      ~{(result.fileSize / 1024).toFixed(1)}KB
                    </span>
                  )}
                </div>

                {result.issues.length > 0 && (
                  <div className="diagnostic-tool__result-section">
                    <h4 className="diagnostic-tool__result-section-title">Issues Found</h4>
                    <ul className="diagnostic-tool__result-list">
                      {result.issues.map((issue, i) => (
                        <li key={i} className="diagnostic-tool__result-list-item diagnostic-tool__result-list-item--issue">
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions.length > 0 && (
                  <div className="diagnostic-tool__result-section">
                    <h4 className="diagnostic-tool__result-section-title">Suggestions</h4>
                    <ul className="diagnostic-tool__result-list">
                      {result.suggestions.map((suggestion, i) => (
                        <li key={i} className="diagnostic-tool__result-list-item diagnostic-tool__result-list-item--suggestion">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ImageDiagnosticTool;
