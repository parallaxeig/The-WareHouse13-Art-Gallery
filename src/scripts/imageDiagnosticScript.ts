import { ImageDiagnostics } from '../utils/imageDiagnostics';

// Standalone script for running image diagnostics
export const runImageDiagnostics = async () => {
  console.log('🔍 Starting Image Diagnostic Scan...\n');

  // Common image URLs used in the project
  const projectImageUrls = [
    '/placeholder.svg?height=500&width=600',
    '/placeholder.svg?height=60&width=60',
    // Add your actual image URLs here
  ];

  // Extract images from current page if running in browser
  const pageImages: string[] = [];
  if (typeof document !== 'undefined') {
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
      if (img.src && !pageImages.includes(img.src)) {
        pageImages.push(img.src);
      }
    });
  }

  const allUrls = [...new Set([...projectImageUrls, ...pageImages])];
  
  if (allUrls.length === 0) {
    console.log('❌ No image URLs found to test');
    return;
  }

  console.log(`Found ${allUrls.length} images to test:\n`);
  allUrls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  console.log('\n');

  try {
    const results = await ImageDiagnostics.checkMultipleImages(allUrls, {
      timeout: 10000,
      checkDimensions: true,
      maxFileSize: 5 * 1024 * 1024
    });

    const report = ImageDiagnostics.generateReport(results);
    console.log(report);

    // Summary
    const errors = results.filter(r => r.status === 'error');
    const warnings = results.filter(r => r.status === 'warning');
    
    if (errors.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES FOUND:');
      errors.forEach(error => {
        console.log(`❌ ${error.url}`);
        error.issues.forEach(issue => console.log(`   - ${issue}`));
      });
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      warnings.forEach(warning => {
        console.log(`⚠️  ${warning.url}`);
        warning.issues.forEach(issue => console.log(`   - ${issue}`));
      });
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log('\n✅ All images loaded successfully!');
    }

  } catch (error) {
    console.error('❌ Diagnostic scan failed:', error);
  }
};

// Auto-run if this script is executed directly
if (typeof window !== 'undefined' && window.location) {
  // Browser environment - can be called manually
  (window as any).runImageDiagnostics = runImageDiagnostics;
  console.log('Image diagnostics available. Run: runImageDiagnostics()');
}
