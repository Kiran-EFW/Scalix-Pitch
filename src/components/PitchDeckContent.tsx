"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PitchDeckContent = () => {
  // The HTML content with Tailwind CSS classes applied
  const htmlContent = `
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h1 class="text-blue-700 text-3xl font-bold mb-4">Slide 1: Introduction</h1>
        <p class="text-lg text-gray-800">Welcome to our pitch deck. We are excited to share our vision with you.</p>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 2: Problem</h2>
        <p class="text-gray-800">Many businesses struggle with inefficient data management and lack of actionable insights.</p>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 3: Solution</h2>
        <p class="text-gray-800">Our platform provides an all-in-one solution for data aggregation, analysis, and visualization, empowering businesses to make informed decisions.</p>
        <ul class="list-disc list-inside mt-4 space-y-1 text-gray-800">
            <li>Real-time data dashboards</li>
            <li>AI-powered analytics</li>
            <li>Customizable reporting</li>
        </ul>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 4: Market Opportunity</h2>
        <p class="text-gray-800">The global data analytics market is projected to reach $X billion by Y year, with a CAGR of Z%.</p>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 5: Business Model</h2>
        <p class="text-gray-800">We offer a subscription-based model with tiered pricing, catering to small businesses and large enterprises alike.</p>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 6: Team</h2>
        <p class="text-gray-800">Our team comprises experienced professionals in data science, software engineering, and business development.</p>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 7: Financial Projections</h2>
        <p class="text-gray-800">We project significant revenue growth over the next five years, reaching profitability by year 3.</p>
    </div>
    <div class="slide mb-10 pb-5 border-b border-gray-200">
        <h2 class="text-blue-700 text-2xl font-bold mb-3">Slide 8: Call to Action</h2>
        <p class="text-gray-800">Join us in revolutionizing data intelligence. Invest in our future.</p>
        <a href="#" class="inline-block bg-blue-600 text-white px-5 py-2.5 text-center no-underline rounded-md hover:bg-blue-700 mt-4">Contact Us</a>
    </div>
  `;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    // Create a temporary div to parse the HTML and extract slides
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const extractedSlides = Array.from(tempDiv.querySelectorAll('.slide')).map(
      (slide) => slide.outerHTML
    );
    setSlides(extractedSlides.length > 0 ? extractedSlides : [htmlContent]); // Fallback if no .slide found
  }, [htmlContent]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.min(prevIndex + 1, slides.length - 1));
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="pitch-deck-container p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
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