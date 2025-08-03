import { useState, useEffect, useCallback } from 'react';
import { ImageDiagnostics, ImageDiagnosticResult, DiagnosticOptions } from '../utils/imageDiagnostics';

export interface UseImageDiagnosticsReturn {
  results: ImageDiagnosticResult[];
  isRunning: boolean;
  error: string | null;
  runDiagnostics: (urls: string[], options?: DiagnosticOptions) => Promise<void>;
  generateReport: () => string;
  clearResults: () => void;
}

export const useImageDiagnostics = (): UseImageDiagnosticsReturn => {
  const [results, setResults] = useState<ImageDiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostics = useCallback(async (urls: string[], options?: DiagnosticOptions) => {
    if (urls.length === 0) {
      setError('No URLs provided for diagnostics');
      return;
    }

    setIsRunning(true);
    setError(null);
    setResults([]);

    try {
      const diagnosticResults = await ImageDiagnostics.checkMultipleImages(urls, options);
      setResults(diagnosticResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  }, []);

  const generateReport = useCallback(() => {
    return ImageDiagnostics.generateReport(results);
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
};
