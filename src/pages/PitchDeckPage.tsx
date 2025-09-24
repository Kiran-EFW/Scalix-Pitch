"use client";

import React, { useState } from "react";
import PitchDeckForm from "@/components/PitchDeckForm";
import PDFProgressModal from "@/components/PDFProgressModal";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PitchDeckPage = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  const handleDownload = () => {
    setShowPDFModal(true);
  };

  const handlePDFComplete = (pdfData: string) => {
    try {
      const fileName = `Scalix-World-Pitch-Deck-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Method 1: Try blob download (most reliable)
      try {
        const byteCharacters = atob(pdfData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
        
        showSuccess("PDF downloaded successfully!");
        setShowPDFModal(false);
        return;
      } catch (blobError) {
        console.warn('Blob download failed, trying data URL method:', blobError);
      }
      
      // Method 2: Fallback to data URL
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfData}`;
      link.download = fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showSuccess("PDF downloaded successfully!");
      setShowPDFModal(false);
      
    } catch (error) {
      console.error('Download error:', error);
      showError("Failed to download PDF. Please try again.");
    }
  };

  const handlePDFModalClose = () => {
    setShowPDFModal(false);
  };

  const handleShareLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => showSuccess("Link copied to clipboard!"))
      .catch(() => showError("Failed to copy link."));
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Check out our Pitch Deck!");
    const body = encodeURIComponent(`I thought you might be interested in our pitch deck: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0a0e27] to-[#1a237e]">
      {!hasAccess ? (
        <PitchDeckForm onAccessGranted={handleAccessGranted} />
      ) : (
        <div className="w-full h-screen flex flex-col">
          {/* Header with controls */}
          <div className="flex justify-between items-center p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center gap-4">
              <img
                src="https://z-cdn-media.chatglm.cn/files/a6735ff9-1e2b-4cba-b0a3-2e4e50a5af33_logo.png.png?auth_key=1790171439-d2f879595c5640b2bd9030d45fc9b9d6-0-793df07e36ebfc08f202946421960f09"
                alt="Scalix World Logo"
                className="w-8 h-auto"
              />
              <div>
                <h1 className="text-white font-semibold">Scalix World Pitch Deck</h1>
                <p className="text-gray-400 text-sm">Desktop-First AI Development Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-medium px-6 py-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                <Download className="mr-2 h-4 w-4 relative z-10" /> 
                <span className="relative z-10">Download PDF</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-white/20">
                  <DropdownMenuItem onClick={handleShareLink} className="text-white hover:bg-white/10">
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShareEmail} className="text-white hover:bg-white/10">
                    Share via Email
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Pitch Deck Iframe */}
          <div className="flex-1">
                     <iframe
                       src="/presentation-viewer.html"
                       className="w-full h-full border-0"
                       title="Scalix Pitch Deck"
                     />
          </div>
        </div>
      )}

      {/* PDF Progress Modal */}
      <PDFProgressModal
        isOpen={showPDFModal}
        onClose={handlePDFModalClose}
        onComplete={handlePDFComplete}
      />
    </div>
  );
};

export default PitchDeckPage;