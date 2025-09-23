"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PitchDeckContent = () => {
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

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);
  const [styleToRender, setStyleToRender] = useState('');

  useEffect(() => {
    // Extract style content from the HTML string
    const styleContentMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
    if (styleContentMatch) {
      setStyleToRender(styleContentMatch[1]);
    }

    // Extract content within the <body> tags
    const bodyContentMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/i);
    const contentToParse = bodyContentMatch ? bodyContentMatch[1] : htmlContent;

    // Create a temporary div to parse the HTML and extract slides
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentToParse;
    const extractedSlides = Array.from(tempDiv.querySelectorAll('.slide')).map(
      (slide) => slide.outerHTML
    );
    setSlides(extractedSlides.length > 0 ? extractedSlides : [contentToParse]); // Fallback if no .slide found
  }, [htmlContent]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 1));
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="pitch-deck-container p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Render the extracted styles */}
      {styleToRender && <style dangerouslySetInnerHTML={{ __html: styleToRender }} />}

      {slides.length > 0 ? (
        <>
          <div className="relative min-h-[400px] flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex] }} />
          </div>
          <div className="flex justify-between items-center mt-6">
            <Button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span>
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
            <Button onClick={goToNextSlide} disabled={currentSlideIndex === slides.length - 1} variant="outline">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading pitch deck...</p>
      )}
    </div>
  );
};

export default PitchDeckContent;