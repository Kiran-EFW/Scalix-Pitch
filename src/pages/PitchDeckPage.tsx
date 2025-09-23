"use client";

import React, { useState } from "react";
import PitchDeckForm from "@/components/PitchDeckForm";
import PitchDeckContent from "@/components/PitchDeckContent";
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

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pitch Deck</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; color: #333; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1, h2, h3 { color: #0056b3; }
        .slide { margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .slide:last-child { border-bottom: none; }
        .button { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px; }
        .button:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="slide">
            <h1>Slide 1: Introduction</h1>
            <p>Welcome to our pitch deck. We are excited to share our vision with you.</p>
        </div>
        <div class="slide">
            <h2>Slide 2: Problem</h2>
            <p>Many businesses struggle with inefficient data management and lack of actionable insights.</p>
        </div>
        <div class="slide">
            <h2>Slide 3: Solution</h2>
            <p>Our platform provides an all-in-one solution for data aggregation, analysis, and visualization, empowering businesses to make informed decisions.</p>
            <ul>
                <li>Real-time data dashboards</li>
                <li>AI-powered analytics</li>
                <li>Customizable reporting</li>
            </ul>
        </div>
        <div class="slide">
            <h2>Slide 4: Market Opportunity</h2>
            <p>The global data analytics market is projected to reach $X billion by Y year, with a CAGR of Z%.</p>
        </div>
        <div class="slide">
            <h2>Slide 5: Business Model</h2>
            <p>We offer a subscription-based model with tiered pricing, catering to small businesses and large enterprises alike.</p>
        </div>
        <div class="slide">
            <h2>Slide 6: Team</h2>
            <p>Our team comprises experienced professionals in data science, software engineering, and business development.</p>
        </div>
        <div class="slide">
            <h2>Slide 7: Financial Projections</h2>
            <p>We project significant revenue growth over the next five years, reaching profitability by year 3.</p>
        </div>
        <div class="slide">
            <h2>Slide 8: Call to Action</h2>
            <p>Join us in revolutionizing data intelligence. Invest in our future.</p>
            <a href="#" class="button">Contact Us</a>
        </div>
    </div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pitch-deck.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess("Pitch deck downloaded!");
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {!hasAccess ? (
        <PitchDeckForm onAccessGranted={handleAccessGranted} />
      ) : (
        <div className="w-full max-w-4xl">
          <div className="flex justify-end space-x-2 mb-4">
            <Button onClick={handleDownload} variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShareLink}>
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareEmail}>
                  Share via Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <PitchDeckContent />
        </div>
      )}
    </div>
  );
};

export default PitchDeckPage;