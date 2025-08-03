import React, { useState, useEffect } from 'react';
import { useImageDiagnostics } from '../hooks/useImageDiagnostics';
import Button from './Button';
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
  const [options, setOptions] = useState({
    timeout: 10000,
    checkDimensions: true,
    maxFileSize: 5 * 1024 * 1024
  });

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
        const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
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
      .split('\n')
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
      alert('Report copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy report:', err);
    }
  };

  useEffect(() => {
    if (autoScan) {
      handleScanPage();
    }
  }, [autoScan]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`image-diagnostic-tool ${className}`}>
      <div className="diagnostic-header">
        <h2>🔍 Image Diagnostic Tool</h2>
        <p>Identify and troubleshoot image loading issues</p>
      </div>

      <div className="diagnostic-controls">
        <div className="control-group">
          <Button 
            variant="primary" 
            onClick={handleScanPage}
            disabled={isRunning}
          >
            {isRunning ? 'Scanning...' : 'Scan Current Page'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced Options
          </Button>
        </div>

        {showAdvanced && (
          <div className="advanced-options">
            <div className="option-group">
              <label>
                Timeout (ms):
                <input
                  type="number"
                  value={options.timeout}
                  onChange={(e) => setOptions({...options, timeout: parseInt(e.target.value)})}
                />
              </label>
              
              <label>
                Max File Size (MB):
                <input
                  type="number"
                  value={options.maxFileSize / 1024 / 1024}
                  onChange={(e) => setOptions({...options, maxFileSize: parseFloat(e.target.value) * 1024 * 1024})}
                />
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={options.checkDimensions}
                  onChange={(e) => setOptions({...options, checkDimensions: e.target.checked})}
                />
                Check Dimensions
              </label>
            </div>
          </div>
        )}

        <div className="custom-urls">
          <label>Custom URLs (one per line):</label>
          <textarea
            value={customUrls}
            onChange={(e) => setCustomUrls(e.target.value)}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.png"
            rows={4}
          />
          <Button 
            variant="secondary" 
            onClick={handleScanCustomUrls}
            disabled={isRunning || !customUrls.trim()}
          >
            Scan Custom URLs
          </Button>
        </div>
      </div>

      {error && (
        <div className="diagnostic-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="diagnostic-results">
          <div className="results-header">
            <h3>Diagnostic Results</h3>
            <div className="results-actions">
              <Button variant="outline" size="small" onClick={handleCopyReport}>
                Copy Report
              </Button>
              <Button variant="outline" size="small" onClick={handleDownloadReport}>
                Download Report
              </Button>
              <Button variant="outline" size="small" onClick={clearResults}>
                Clear Results
              </Button>
            </div>
          </div>

          <div className="results-summary">
            <div className="summary-stats">
              <span className="stat success">
                ✅ {results.filter(r => r.status === 'success').length} Success
              </span>
              <span className="stat warning">
                ⚠️ {results.filter(r => r.status === 'warning').length} Warnings
              </span>
              <span className="stat error">
                ❌ {results.filter(r => r.status === 'error').length} Errors
              </span>
            </div>
          </div>

          <div className="results-list">
            {results.map((result, index) => (
              <div 
                key={index} 
                className={`result-item ${result.status}`}
                style={{ borderLeftColor: getStatusColor(result.status) }}
              >
                <div className="result-header">
                  <span className="result-status" style={{ color: getStatusColor(result.status) }}>
                    {result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <span className="result-url">{result.url}</span>
                </div>
                
                <div className="result-details">
                  {result.loadTime && (
                    <span className="detail">Load: {result.loadTime.toFixed(0)}ms</span>
                  )}
                  {result.dimensions && (
                    <span className="detail">
                      Size: {result.dimensions.width}×{result.dimensions.height}
                    </span>
                  )}
                  {result.fileSize && (
                    <span className="detail">
                      ~{(result.fileSize / 1024).toFixed(1)}KB
                    </span>
                  )}
                </div>

                {result.issues.length > 0 && (
                  <div className="result-issues">
                    <strong>Issues:</strong>
                    <ul>
                      {result.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions.length > 0 && (
                  <div className="result-suggestions">
                    <strong>Suggestions:</strong>
                    <ul>
                      {result.suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDiagnosticTool;
