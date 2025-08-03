export interface ImageDiagnosticResult {
  url: string;
  status: 'success' | 'error' | 'warning';
  issues: string[];
  suggestions: string[];
  loadTime?: number;
  fileSize?: number;
  dimensions?: { width: number; height: number };
  format?: string;
}

export interface DiagnosticOptions {
  timeout?: number;
  checkDimensions?: boolean;
  allowedFormats?: string[];
  maxFileSize?: number; // in bytes
}

export class ImageDiagnostics {
  private static readonly DEFAULT_OPTIONS: DiagnosticOptions = {
    timeout: 10000,
    checkDimensions: true,
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
    maxFileSize: 5 * 1024 * 1024 // 5MB
  };

  static async checkImage(url: string, options: DiagnosticOptions = {}): Promise<ImageDiagnosticResult> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    const result: ImageDiagnosticResult = {
      url,
      status: 'success',
      issues: [],
      suggestions: []
    };

    const startTime = performance.now();

    try {
      // Check if URL is valid
      if (!this.isValidUrl(url)) {
        result.status = 'error';
        result.issues.push('Invalid URL format');
        result.suggestions.push('Check URL syntax and ensure it starts with http:// or https://');
        return result;
      }

      // Check file extension
      const extension = this.getFileExtension(url);
      if (extension && !opts.allowedFormats!.includes(extension.toLowerCase())) {
        result.status = 'warning';
        result.issues.push(`Unsupported file format: ${extension}`);
        result.suggestions.push(`Use supported formats: ${opts.allowedFormats!.join(', ')}`);
      }

      // Load image and perform checks
      const imageData = await this.loadImageWithTimeout(url, opts.timeout!);
      result.loadTime = performance.now() - startTime;

      if (imageData.error) {
        result.status = 'error';
        result.issues.push(imageData.error);
        result.suggestions.push(...this.getSuggestionsForError(imageData.error));
        return result;
      }

      if (imageData.image) {
        // Check dimensions
        if (opts.checkDimensions) {
          result.dimensions = {
            width: imageData.image.naturalWidth,
            height: imageData.image.naturalHeight
          };

          if (result.dimensions.width === 0 || result.dimensions.height === 0) {
            result.status = 'error';
            result.issues.push('Image has invalid dimensions (0x0)');
            result.suggestions.push('Check if the image file is corrupted or empty');
          }
        }

        // Estimate file size (approximate)
        if (opts.maxFileSize) {
          const estimatedSize = this.estimateImageSize(imageData.image);
          result.fileSize = estimatedSize;

          if (estimatedSize > opts.maxFileSize) {
            result.status = 'warning';
            result.issues.push(`Large file size: ~${(estimatedSize / 1024 / 1024).toFixed(2)}MB`);
            result.suggestions.push('Consider optimizing image size for better performance');
          }
        }

        result.format = extension || 'unknown';
      }

      // Check load time
      if (result.loadTime && result.loadTime > 3000) {
        result.status = result.status === 'error' ? 'error' : 'warning';
        result.issues.push(`Slow loading time: ${result.loadTime.toFixed(0)}ms`);
        result.suggestions.push('Consider optimizing image or using a CDN');
      }

    } catch (error) {
      result.status = 'error';
      result.issues.push(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      result.suggestions.push('Check browser console for more details');
    }

    return result;
  }

  private static isValidUrl(url: string): boolean {
    try {
      new URL(url, window.location.origin);
      return true;
    } catch {
      return false;
    }
  }

  private static getFileExtension(url: string): string | null {
    try {
      const pathname = new URL(url, window.location.origin).pathname;
      const match = pathname.match(/\.([^.]+)$/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }

  private static loadImageWithTimeout(url: string, timeout: number): Promise<{ image?: HTMLImageElement; error?: string }> {
    return new Promise((resolve) => {
      const img = new Image();
      let timeoutId: NodeJS.Timeout;

      const cleanup = () => {
        clearTimeout(timeoutId);
        img.onload = null;
        img.onerror = null;
      };

      img.onload = () => {
        cleanup();
        resolve({ image: img });
      };

      img.onerror = () => {
        cleanup();
        resolve({ error: 'Failed to load image' });
      };

      timeoutId = setTimeout(() => {
        cleanup();
        resolve({ error: 'Image load timeout' });
      }, timeout);

      // Set crossOrigin to handle CORS issues
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  }

  private static estimateImageSize(img: HTMLImageElement): number {
    // Rough estimation based on dimensions and assumed compression
    const pixels = img.naturalWidth * img.naturalHeight;
    return Math.round(pixels * 0.5); // Assume ~0.5 bytes per pixel for compressed images
  }

  private static getSuggestionsForError(error: string): string[] {
    const suggestions: string[] = [];

    if (error.includes('Failed to load')) {
      suggestions.push('Check if the image URL is accessible');
      suggestions.push('Verify the image exists on the server');
      suggestions.push('Check for CORS issues if loading from external domain');
      suggestions.push('Ensure proper file permissions on the server');
    }

    if (error.includes('timeout')) {
      suggestions.push('Check network connection');
      suggestions.push('Verify server response time');
      suggestions.push('Consider using a CDN for faster delivery');
    }

    if (error.includes('CORS')) {
      suggestions.push('Configure proper CORS headers on the server');
      suggestions.push('Use a proxy server if needed');
    }

    return suggestions;
  }

  static async checkMultipleImages(urls: string[], options?: DiagnosticOptions): Promise<ImageDiagnosticResult[]> {
    const promises = urls.map(url => this.checkImage(url, options));
    return Promise.all(promises);
  }

  static generateReport(results: ImageDiagnosticResult[]): string {
    const totalImages = results.length;
    const successCount = results.filter(r => r.status === 'success').length;
    const warningCount = results.filter(r => r.status === 'warning').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    let report = `\n=== IMAGE DIAGNOSTIC REPORT ===\n`;
    report += `Total Images: ${totalImages}\n`;
    report += `✅ Success: ${successCount}\n`;
    report += `⚠️  Warnings: ${warningCount}\n`;
    report += `❌ Errors: ${errorCount}\n\n`;

    results.forEach((result, index) => {
      const statusIcon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
      report += `${index + 1}. ${statusIcon} ${result.url}\n`;
      
      if (result.loadTime) {
        report += `   Load Time: ${result.loadTime.toFixed(0)}ms\n`;
      }
      
      if (result.dimensions) {
        report += `   Dimensions: ${result.dimensions.width}x${result.dimensions.height}\n`;
      }
      
      if (result.fileSize) {
        report += `   Est. Size: ${(result.fileSize / 1024).toFixed(1)}KB\n`;
      }

      if (result.issues.length > 0) {
        report += `   Issues:\n`;
        result.issues.forEach(issue => {
          report += `     - ${issue}\n`;
        });
      }

      if (result.suggestions.length > 0) {
        report += `   Suggestions:\n`;
        result.suggestions.forEach(suggestion => {
          report += `     • ${suggestion}\n`;
        });
      }
      
      report += '\n';
    });

    return report;
  }
}
