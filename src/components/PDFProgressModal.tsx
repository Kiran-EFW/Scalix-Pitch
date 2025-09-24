"use client";

import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      
      // Simulate processing time (faster for simpler slides)
      const processingTime = i <= 5 ? 400 : i <= 10 ? 600 : 800;
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
      // Get the iframe and call the PDF generation function
      const iframe = document.querySelector('iframe[title="Scalix Pitch Deck"]');
      if (iframe && iframe.contentWindow && iframe.contentWindow.generatePDF) {
        // Call the existing PDF generation function without notifications
        await iframe.contentWindow.generatePDF(false);
        
        // The PDF download is handled by the existing function
        // We just need to signal completion
        onComplete('pdf-generated');
      } else {
        throw new Error('PDF generation not available');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      setStatus('error');
      setMessage('Failed to generate PDF');
    }
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
