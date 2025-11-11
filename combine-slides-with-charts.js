import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slidesDir = path.join(__dirname, 'public', 'slides-updated');
const outputPath = path.join(__dirname, 'public', 'combined-slides-for-pdf.html');

// Collect all styles and scripts
let allStyles = [];
let allScripts = [];
let slideContents = [];

const totalSlides = 16;

// Process each slide
for (let i = 1; i <= totalSlides; i++) {
    const slidePath = path.join(slidesDir, `slide-${i}.html`);
    if (fs.existsSync(slidePath)) {
        const slideContent = fs.readFileSync(slidePath, 'utf-8');
        
        // Extract styles
        const styleMatches = slideContent.match(/<style>([\s\S]*?)<\/style>/gi);
        if (styleMatches) {
            styleMatches.forEach((styleMatch) => {
                const styleContent = styleMatch.replace(/<\/?style>/gi, '').trim();
                if (styleContent && !allStyles.includes(styleContent)) {
                    allStyles.push(styleContent);
                }
            });
        }
        
        // Extract scripts (especially chart initialization)
        const scriptMatches = slideContent.match(/<script>([\s\S]*?)<\/script>/gi);
        if (scriptMatches) {
            scriptMatches.forEach((scriptMatch) => {
                const scriptContent = scriptMatch.replace(/<\/?script>/gi, '').trim();
                if (scriptContent && (scriptContent.includes('Chart') || scriptContent.includes('getContext'))) {
                    // Wrap in IIFE to avoid conflicts and ensure it runs after DOM is ready
                    allScripts.push({
                        slide: i,
                        code: scriptContent
                    });
                }
            });
        }
        
        // Extract slide content (remove head, styles, scripts)
        let slideContentOnly = slideContent;
        slideContentOnly = slideContentOnly.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '');
        slideContentOnly = slideContentOnly.replace(/<\/body>[\s\S]*?<\/html>/i, '');
        slideContentOnly = slideContentOnly.replace(/<style>[\s\S]*?<\/style>/gi, '');
        slideContentOnly = slideContentOnly.replace(/<script>[\s\S]*?<\/script>/gi, '');
        
        slideContents.push(slideContentOnly);
    }
}

// Build chart initialization code
let chartInitCode = '';
if (allScripts.length > 0) {
    chartInitCode = allScripts.map(s => {
        // Remove DOMContentLoaded wrapper if present
        let code = s.code;
        code = code.replace(/document\.addEventListener\(['"]DOMContentLoaded['"],\s*function\(\)\s*\{/g, '');
        code = code.replace(/\}\s*\)\s*;?\s*$/m, '');
        // Escape backticks and template literals
        code = code.replace(/`/g, '\\`').replace(/\${/g, '\\${');
        return `// Chart script from slide ${s.slide}\n                (function() {\n                    try {\n                        ${code}\n                    } catch(e) {\n                        console.error('Error initializing chart from slide ${s.slide}:', e);\n                    }\n                })();`;
    }).join('\n\n                ');
} else {
    chartInitCode = '// No chart scripts found';
}

// Build the combined HTML
let combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scalix Pitch Deck - PDF Export</title>
    <!-- External Resources -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>
        /* Print-specific styles */
        @media print {
            @page {
                size: 1280px 720px;
                margin: 0;
            }
            .slide-page {
                page-break-after: always;
                page-break-inside: avoid;
                width: 1280px;
                min-height: 720px;
                height: auto;
                overflow: visible;
                position: relative;
            }
            .slide-page:last-child {
                page-break-after: auto;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
        }
        
        /* Base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 20px;
            background: #0a0e27;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: 'Inter', sans-serif;
            color: #ffffff;
            overflow-y: auto;
            overflow-x: hidden;
            display: block;
            min-height: 100vh;
        }
        
        .slide-page {
            width: 1280px;
            min-height: 720px;
            height: auto;
            margin: 0 auto 40px auto;
            position: relative;
            overflow: visible;
            background: #0a0e27;
            display: block;
            page-break-after: always;
            flex: none;
        }
        
        @media screen {
            .slide-page {
                margin-bottom: 40px;
                border: 1px solid rgba(255,255,255,0.1);
                display: block;
            }
        }
        
        /* Ensure slide content can expand */
        .slide-page .slide {
            min-height: 720px;
            height: auto;
            overflow: visible;
        }
        
        .loading-indicator {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            z-index: 99999;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        
        @media print {
            .loading-indicator {
                display: none !important;
            }
        }
        
        /* All slide styles */
        ${allStyles.join('\n\n        /* Slide Style Separator */\n        ')}
        
        /* Override body styles to allow vertical scrolling */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0a0e27;
            color: #ffffff;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            display: block !important;
            justify-content: unset !important;
            align-items: unset !important;
            min-height: auto !important;
        }
        
        .slide {
            width: 1280px;
            min-height: 720px;
            height: auto;
            position: relative;
            overflow: visible;
            background: linear-gradient(135deg, #0a0e27 0%, #1a237e 100%);
        }
    </style>
    <script>
        // Enhanced resource loading detection
        let resourcesLoaded = false;
        let fontsLoaded = false;
        let imagesLoaded = false;
        let chartsReady = false;
        
        // Function to initialize all charts
        function initializeCharts() {
            if (typeof Chart === 'undefined') {
                console.log('Chart.js not loaded yet, retrying...');
                setTimeout(initializeCharts, 500);
                return;
            }
            
            console.log('Initializing charts...');
            Chart.defaults.responsive = true;
            Chart.defaults.maintainAspectRatio = false;
            
            // Execute all chart scripts - wrap each in try-catch and ensure DOM is ready
            try {
                ${chartInitCode}
            } catch(e) {
                console.error('Error initializing charts:', e);
            }
            
            setTimeout(() => {
                chartsReady = true;
                checkAllResources();
            }, 2000);
        }
        
        window.addEventListener('load', function() {
            console.log('Page loaded, initializing...');
            
            // Wait for fonts
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => {
                    console.log('Fonts loaded');
                    fontsLoaded = true;
                    checkAllResources();
                });
            } else {
                setTimeout(() => {
                    fontsLoaded = true;
                    checkAllResources();
                }, 2000);
            }
            
            // Wait for images
            const images = document.querySelectorAll('img');
            if (images.length === 0) {
                imagesLoaded = true;
                checkAllResources();
            } else {
                let loaded = 0;
                images.forEach(img => {
                    if (img.complete) {
                        loaded++;
                    } else {
                        img.addEventListener('load', () => {
                            loaded++;
                            if (loaded === images.length) {
                                console.log('All images loaded');
                                imagesLoaded = true;
                                checkAllResources();
                            }
                        });
                        img.addEventListener('error', () => {
                            loaded++;
                            if (loaded === images.length) {
                                imagesLoaded = true;
                                checkAllResources();
                            }
                        });
                    }
                });
                if (loaded === images.length) {
                    imagesLoaded = true;
                    checkAllResources();
                }
            }
            
            // Initialize charts after a delay to ensure Chart.js is loaded
            setTimeout(() => {
                initializeCharts();
            }, 2000);
        });
        
        function checkAllResources() {
            if (fontsLoaded && imagesLoaded && chartsReady && !resourcesLoaded) {
                resourcesLoaded = true;
                const indicator = document.querySelector('.loading-indicator');
                if (indicator) {
                    indicator.innerHTML = '✅ Ready! PDF generation can proceed';
                    indicator.style.background = 'rgba(0,200,0,0.9)';
                    setTimeout(() => {
                        indicator.style.display = 'none';
                    }, 2000);
                }
                console.log('All resources loaded and ready for PDF export');
            }
        }
    </script>
</head>
<body>
    <div class="loading-indicator">
        <div>Loading slides...</div>
        <div style="font-size: 12px; margin-top: 10px;">Please wait for all content to load</div>
    </div>
`;

// Add all slides
slideContents.forEach((content, index) => {
    combinedHTML += `<div class="slide-page" id="slide-${index + 1}">${content}</div>`;
});

combinedHTML += `
</body>
</html>`;

fs.writeFileSync(outputPath, combinedHTML, 'utf-8');
console.log(`\n✅ Enhanced combined HTML file created: ${outputPath}`);
console.log(`📄 Includes ${allStyles.length} style blocks, ${allScripts.length} chart scripts, and ${slideContents.length} slides`);

