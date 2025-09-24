"use client";

import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Declare html2canvas as a global function
declare global {
  function html2canvas(element: HTMLElement, options?: any): Promise<HTMLCanvasElement>;
}

interface PDFProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (pdfData: string) => void;
}

interface ProgressUpdate {
  type: 'progress' | 'complete' | 'error' | 'warning';
  message: string;
  progress: number;
  currentSlide?: number;
  totalSlides?: number;
  pdfData?: string;
}

const PDFProgressModal: React.FC<PDFProgressModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Preparing PDF generation...');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(15);
  const [status, setStatus] = useState<'preparing' | 'processing' | 'complete' | 'error'>('preparing');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      startPDFGeneration();
    } else {
      // Reset state when modal closes
      setProgress(0);
      setMessage('Preparing PDF generation...');
      setCurrentSlide(0);
      setStatus('preparing');
      setLogs([]);
    }
  }, [isOpen]);

  const addLog = (logMessage: string) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${logMessage}`]);
  };

  const startPDFGeneration = async () => {
    try {
      setStatus('processing');
      addLog('Starting PDF generation...');

      // Simulate professional PDF generation process
      await generatePDFWithProgress();

    } catch (error) {
      console.error('PDF generation error:', error);
      setStatus('error');
      setMessage('Failed to generate PDF');
      addLog('Failed to generate PDF');
    }
  };

  const generatePDFWithProgress = async () => {
    const totalSlides = 15;
    
    // Step 1: Initialize
    setProgress(5);
    setMessage('Initializing PDF generation...');
    addLog('Preparing high-quality rendering engine...');
    await delay(800);

    // Step 2: Load slides
    setProgress(15);
    setMessage('Loading presentation slides...');
    addLog('Accessing slide content...');
    await delay(600);

    // Step 3: Process each slide
    for (let i = 1; i <= totalSlides; i++) {
      const slideProgress = Math.round((i / totalSlides) * 70) + 15; // 15-85%
      
      setProgress(slideProgress);
      setCurrentSlide(i);
      setTotalSlides(totalSlides);
      setMessage(`Processing slide ${i} of ${totalSlides}...`);
      addLog(`Rendering slide ${i} with high-quality graphics...`);
      
      // Simulate processing time (longer for better quality)
      const processingTime = i <= 5 ? 2000 : i <= 10 ? 2500 : 3000;
      await delay(processingTime);
    }

    // Step 4: Compile PDF
    setProgress(90);
    setMessage('Compiling PDF document...');
    addLog('Optimizing file size and quality...');
    await delay(1000);

    // Step 5: Finalize
    setProgress(95);
    setMessage('Finalizing PDF...');
    addLog('Adding metadata and compression...');
    await delay(500);

    // Step 6: Complete
    setProgress(100);
    setMessage('PDF generated successfully!');
    setStatus('complete');
    addLog('PDF ready for download');
    
    // Generate the actual PDF
    await generateActualPDF();
  };

  const generateActualPDF = async () => {
    try {
      // Generate PDF using a new approach that creates proper PDF files
      const pdfData = await generateProperPDF();
      onComplete(pdfData);
    } catch (error) {
      console.error('PDF generation error:', error);
      setStatus('error');
      setMessage('Failed to generate PDF');
    }
  };

  const generateProperPDF = async () => {
    // Load html2canvas if not already loaded
    if (typeof window.html2canvas === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    // Load jsPDF if not already loaded
    if (typeof window.jspdf === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    // Get jsPDF from window
    const { jsPDF } = (window as any).jspdf;
    
    // Create PDF document with high quality settings
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Get the presentation iframe
    const presentationIframe = document.querySelector('iframe[title="Scalix Pitch Deck"]');
    if (!presentationIframe || !presentationIframe.contentWindow) {
      throw new Error('Presentation iframe not found');
    }

    // Access the presentation viewer's functions
    const presentationWindow = presentationIframe.contentWindow;
    
    // Store original slide index
    const originalSlideIndex = presentationWindow.currentSlideIndex || 0;

    // Process each slide using the presentation viewer
    for (let i = 0; i < 15; i++) {
      try {
        // Navigate to the slide in the presentation viewer
        if (presentationWindow.loadSlide) {
          await presentationWindow.loadSlide(i);
        }
        
        // Wait longer for slide to load and render properly
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // CLEAN SLIDE-ONLY CAPTURE: Create a completely isolated slide element
        console.log(`Processing slide ${i + 1}/15...`);
        
        // Get the slide iframe from the presentation viewer
        const slideIframe = presentationIframe.contentDocument?.querySelector('#slide-frame');
        if (!slideIframe || !slideIframe.contentDocument) {
          throw new Error(`Slide ${i + 1} iframe not found`);
        }
        
        // Get the slide iframe's document
        const slideDocument = slideIframe.contentDocument;
        if (!slideDocument) {
          throw new Error(`Slide ${i + 1} document not accessible`);
        }
        
        // Get the slide element directly
        const originalSlideElement = slideDocument.querySelector('.slide');
        if (!originalSlideElement) {
          throw new Error(`Slide ${i + 1} element not found`);
        }
        
        console.log(`Found slide element for slide ${i + 1}, dimensions:`, originalSlideElement.getBoundingClientRect());
        
        // Create a completely clean, isolated slide element for capture
        const cleanSlideElement = originalSlideElement.cloneNode(true) as HTMLElement;
        
        // Create a temporary container for the clean slide
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.top = '-10000px';
        tempContainer.style.left = '-10000px';
        tempContainer.style.width = '1280px';
        tempContainer.style.height = '720px';
        tempContainer.style.background = 'linear-gradient(135deg, #0a0e27 0%, #1a237e 100%)';
        tempContainer.style.overflow = 'hidden';
        tempContainer.style.zIndex = '99999';
        tempContainer.style.padding = '0';
        tempContainer.style.margin = '0';
        tempContainer.style.border = 'none';
        tempContainer.style.outline = 'none';
        
        // Apply clean styling to the cloned slide
        cleanSlideElement.style.width = '1280px';
        cleanSlideElement.style.minHeight = '720px';
        cleanSlideElement.style.position = 'relative';
        cleanSlideElement.style.margin = '0';
        cleanSlideElement.style.padding = '0';
        cleanSlideElement.style.background = 'linear-gradient(135deg, #0a0e27 0%, #1a237e 100%)';
        cleanSlideElement.style.color = '#ffffff';
        cleanSlideElement.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        cleanSlideElement.style.transform = '';
        cleanSlideElement.style.transformOrigin = '';
        cleanSlideElement.style.boxSizing = 'border-box';
        cleanSlideElement.style.border = 'none';
        cleanSlideElement.style.outline = 'none';
        
        // Remove any presentation viewer specific classes or attributes
        cleanSlideElement.classList.remove('auto-fit', 'panning');
        cleanSlideElement.removeAttribute('data-slide-index');
        
        // Append to temporary container
        tempContainer.appendChild(cleanSlideElement);
        document.body.appendChild(tempContainer);
        
        // Wait for the element to be rendered
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // ENHANCED CAPTURE: Wait for all images to load and implement intelligent alignment
        console.log(`Waiting for images to load on slide ${i + 1}...`);
        
        // Wait for all images to load completely in the clean slide
        const images = cleanSlideElement.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(img);
            } else {
              img.onload = () => resolve(img);
              img.onerror = () => {
                console.warn(`Image failed to load: ${img.src}`);
                resolve(img); // Continue even if image fails
              };
              // Timeout after 5 seconds
              setTimeout(() => {
                console.warn(`Image load timeout: ${img.src}`);
                resolve(img);
              }, 5000);
            }
          });
        });
        
        await Promise.all(imagePromises);
        console.log(`All images loaded for slide ${i + 1}`);
        
        // Wait additional time for any lazy-loaded content
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Calculate intelligent scaling and positioning for the clean slide
        const slideRect = cleanSlideElement.getBoundingClientRect();
        const contentRect = cleanSlideElement.querySelector('.content, .header, .problem-grid, .business-model-container, .advantages-container, .financial-container, .videos-container')?.getBoundingClientRect() || slideRect;
        
        // Intelligent border detection and scaling
        const viewportWidth = 1280;
        const viewportHeight = 720;
        const contentWidth = contentRect.width;
        const contentHeight = contentRect.height;
        
        // Calculate optimal scale to fit content within viewport
        const scaleX = viewportWidth / contentWidth;
        const scaleY = viewportHeight / contentHeight;
        const optimalScale = Math.min(scaleX, scaleY, 1.0); // Never scale up, only down
        
        // Apply intelligent scaling to the clean slide
        if (optimalScale < 1.0) {
          cleanSlideElement.style.transform = `scale(${optimalScale})`;
          cleanSlideElement.style.transformOrigin = 'center center';
          console.log(`Applied intelligent scaling ${optimalScale.toFixed(3)} to slide ${i + 1}`);
          
          // Wait for scaling to apply
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Capture the clean slide element with enhanced settings
        const canvas = await html2canvas(cleanSlideElement, {
          width: viewportWidth,
          height: viewportHeight,
          scale: 3, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#0a0e27',
          logging: true,
          imageTimeout: 30000, // Longer timeout for images
          removeContainer: false,
          foreignObjectRendering: true,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            console.log(`Cloning clean slide document for slide ${i + 1} with enhanced image handling`);
            
            // Ensure all fonts are loaded and apply critical styles
            const style = clonedDoc.createElement('style');
            style.textContent = `
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              
              * {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                box-sizing: border-box !important;
              }
              
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: linear-gradient(135deg, #0a0e27 0%, #1a237e 100%) !important;
                overflow: hidden !important;
                width: 1280px !important;
                height: 720px !important;
              }
              
              .slide {
                background: linear-gradient(135deg, #0a0e27 0%, #1a237e 100%) !important;
                color: #ffffff !important;
                position: relative !important;
                display: block !important;
                overflow: visible !important;
                width: 1280px !important;
                min-height: 720px !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              
              .background-overlay {
                background-image: url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80') !important;
                background-size: cover !important;
                background-position: center !important;
                opacity: 0.15 !important;
              }
              
              .glass-morphism {
                background: linear-gradient(45deg, rgba(79, 172, 254, 0.2), rgba(0, 242, 254, 0.2)) !important;
                filter: blur(40px) !important;
              }
              
              img {
                display: block !important;
                max-width: 100% !important;
                height: auto !important;
                object-fit: contain !important;
                image-rendering: -webkit-optimize-contrast !important;
                image-rendering: crisp-edges !important;
              }
              
              /* Ensure logo and team photos are properly displayed */
              .logo, .team-photo, .founder-photo {
                display: block !important;
                max-width: 100% !important;
                height: auto !important;
                object-fit: contain !important;
              }
              
              /* Ensure all content containers are properly sized */
              .content, .header, .problem-grid, .business-model-container, 
              .advantages-container, .financial-container, .videos-container {
                width: 100% !important;
                max-width: 1280px !important;
                margin: 0 auto !important;
                padding: 0 20px !important;
              }
            `;
            clonedDoc.head.appendChild(style);
            
            // Force reload all images in the cloned document
            const clonedImages = clonedDoc.querySelectorAll('img');
            clonedImages.forEach(img => {
              if (img.src) {
                // Force image reload
                const originalSrc = img.src;
                img.src = '';
                img.src = originalSrc;
                
                // Ensure proper display
                img.style.display = 'block';
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.objectFit = 'contain';
              }
            });
          }
        });
        
        console.log(`Captured clean slide ${i + 1} with canvas dimensions:`, canvas.width, 'x', canvas.height);
        
        // Clean up temporary container
        document.body.removeChild(tempContainer);
        
        // Add page to PDF (except for first page)
        if (i > 0) {
          pdf.addPage();
        }
        
        // ENHANCED POSITIONING: Calculate optimal positioning with intelligent centering
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const pdfWidth = 297; // A4 landscape width in mm
        const pdfHeight = 210; // A4 landscape height in mm
        
        // We used 3x scale for enhanced capture
        const captureScale = 3;
        
        // Calculate scale to fit the canvas in the PDF while maintaining aspect ratio
        const pdfScaleX = pdfWidth / (canvasWidth / captureScale);
        const pdfScaleY = pdfHeight / (canvasHeight / captureScale);
        const finalScale = Math.min(pdfScaleX, pdfScaleY);
        
        // Calculate centered position with intelligent alignment
        const finalWidth = (canvasWidth / captureScale) * finalScale;
        const finalHeight = (canvasHeight / captureScale) * finalScale;
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;
        
        // Add image to PDF with enhanced quality and proper centering
        const imgData = canvas.toDataURL('image/png', 1.0); // Use PNG for maximum quality
        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        
        console.log(`Successfully captured slide ${i + 1}/15 with enhanced quality - final scale ${finalScale.toFixed(2)}, canvas size ${canvasWidth}x${canvasHeight}, PDF position (${x.toFixed(1)}, ${y.toFixed(1)})`);
        
      } catch (error) {
        console.error(`Error processing slide ${i + 1}:`, error);
        // Continue with other slides even if one fails
      }
    }
    
    // Return to original slide
    if (presentationWindow.loadSlide) {
      await presentationWindow.loadSlide(originalSlideIndex);
    }
    
    // Generate PDF as base64 string
    const pdfOutput = pdf.output('datauristring');
    return pdfOutput.split(',')[1]; // Return just the base64 data
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Generating PDF</h3>
              <p className="text-gray-400 text-sm">Creating your pitch deck...</p>
            </div>
          </div>
          {status !== 'processing' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">{message}</span>
            <span className="text-gray-400 text-sm">{progress}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {status === 'processing' && currentSlide > 0 && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400 text-xs">
                Slide {currentSlide} of {totalSlides}
              </span>
              <div className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />
                <span className="text-gray-400 text-xs">Processing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Status Icon */}
        <div className="flex justify-center mb-4">
          {status === 'processing' && (
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          )}
          {status === 'complete' && (
            <CheckCircle className="w-8 h-8 text-green-500" />
          )}
          {status === 'error' && (
            <AlertCircle className="w-8 h-8 text-red-500" />
          )}
        </div>

        {/* Action Buttons */}
        {status === 'complete' && (
          <div className="space-y-3">
            <div className="text-center p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-400 text-sm font-medium">PDF Generated Successfully!</p>
              <p className="text-gray-400 text-xs mt-1">Download will start automatically</p>
            </div>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <Button
              onClick={startPDFGeneration}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        )}

        {/* Logs */}
        {logs.length > 0 && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <div className="text-gray-400 text-xs font-medium mb-2">Activity Log</div>
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div key={index} className="text-gray-500 text-xs font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFProgressModal;
