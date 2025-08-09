import { useState, useCallback } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

interface DiagnosticResult {
  url: string;
  status: 'success' | 'warning' | 'error';
  loadTime?: number;
  dimensions?: ImageDimensions;
  fileSize?: number;
  issues: string[];
  suggestions: string[];
}

interface DiagnosticOptions {
  timeout: number;
  checkDimensions: boolean;
  maxFileSize: number;
}

export function useImageDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkImage = useCallback(async (url: string, options: DiagnosticOptions): Promise<DiagnosticResult> => {
    const result: DiagnosticResult = {
      url,
      status: 'success',
      issues: [],
      suggestions: []
    };

    try {
      const startTime = performance.now();

      // Create a promise that rejects after the timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), options.timeout);
      });

      // Create a promise that resolves when the image loads
      const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));

        img.src = url;
      });

      // Race the promises
      const img = await Promise.race([imagePromise, timeoutPromise]) as HTMLImageElement;

      const loadTime = performance.now() - startTime;
      result.loadTime = loadTime;

      // Check load time
      if (loadTime > 1000) {
        result.status = 'warning';
        result.issues.push(`Slow loading time (${loadTime.toFixed(0)}ms)`);
        result.suggestions.push('Consider optimizing or compressing this image');
      }

      // Check dimensions if requested
      if (options.checkDimensions) {
        result.dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight
        };

        // Check for oversized images
        const displayWidth = img.width;
        const displayHeight = img.height;

        if (img.naturalWidth > displayWidth * 2 || img.naturalHeight > displayHeight * 2) {
          result.status = 'warning';
          result.issues.push(`Image dimensions (${img.naturalWidth}×${img.naturalHeight}) are much larger than display size`);
          result.suggestions.push('Resize image to better match display dimensions');
        }

        // Check for extremely large dimensions
        if (img.naturalWidth > 3000 || img.naturalHeight > 3000) {
          result.status = 'warning';
          result.issues.push('Image has extremely large dimensions');
          result.suggestions.push('Consider using a smaller image size');
        }
      }

      // Estimate file size using fetch if possible
      try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');

        if (contentLength) {
          const size = parseInt(contentLength, 10);
          result.fileSize = size;

          if (size > options.maxFileSize) {
            result.status = 'warning';
            result.issues.push(`Large file size (${(size / 1024).toFixed(1)}KB)`);
            result.suggestions.push('Compress this image to reduce file size');
          }
        }
      } catch (err) {
        // If we can't get the file size, just continue
        console.warn('Could not determine file size for', url);
      }

    } catch (err) {
      result.status = 'error';

      if (err instanceof Error) {
        if (err.message === 'Timeout') {
          result.issues.push(`Image timed out after ${options.timeout}ms`);
        } else {
          result.issues.push(`Failed to load: ${err.message}`);
        }
      } else {
        result.issues.push('Unknown error loading image');
      }

      result.suggestions.push('Check if the image URL is correct');
      result.suggestions.push('Verify the server is responding properly');
    }

    return result;
  }, []);

  const runDiagnostics = useCallback(async (urls: string[], options: DiagnosticOptions) => {
    if (isRunning) return;

    setIsRunning(true);
    setError(null);

    try {
      const diagnosticResults: DiagnosticResult[] = [];

      // Process images in batches to avoid overwhelming the browser
      const batchSize = 5;
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(url => checkImage(url, options))
        );
        diagnosticResults.push(...batchResults);

        // Update results as we go for better UX
        setResults(prev => [...prev, ...batchResults]);
      }

      setResults(diagnosticResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, checkImage]);

  const generateReport = useCallback(() => {
    if (results.length === 0) return 'No diagnostic results available.';
    
    const timestamp = new Date().toISOString();
    const summary = {
      success: results.filter(r => r.status === 'success').length,
      warning: results.filter(r => r.status === 'warning').length,
      error: results.filter(r => r.status === 'error').length,
    };

    let report = `# Image Diagnostic Report\n`;
    report += `Generated: ${timestamp}\n\n`;
    report += `## Summary\n`;
    report += `- Total Images: ${results.length}\n`;
    report += `- Success: ${summary.success}\n`;
    report += `- Warnings: ${summary.warning}\n`;
    report += `- Errors: ${summary.error}\n\n`;

    report += `## Detailed Results\n\n`;

    results.forEach((result, index) => {
      report += `### ${index + 1}. ${result.url}\n`;
      report += `Status: ${result.status.toUpperCase()}\n`;
      
      if (result.loadTime) {
        report += `Load Time: ${result.loadTime.toFixed(0)}ms\n`;
      }
      
      if (result.dimensions) {
        report += `Dimensions: ${result.dimensions.width}×${result.dimensions.height}\n`;
      }
      
      if (result.fileSize) {
        report += `File Size: ~${(result.fileSize / 1024).toFixed(1)}KB\n`;
      }
      
      if (result.issues.length > 0) {
        report += `\nIssues:\n`;
        result.issues.forEach(issue => {
          report += `- ${issue}\n`;
        });
      }
      
      if (result.suggestions.length > 0) {
        report += `\nSuggestions:\n`;
        result.suggestions.forEach(suggestion => {
          report += `- ${suggestion}\n`;
        });
      }
      
      report += `\n---\n\n`;
    });

    return report;
  }, [results]);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isRunning,
    error,
    runDiagnostics,
    generateReport,
    clearResults
  };
}
