import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slidesDir = path.join(__dirname, 'public', 'slides-updated');
const outputDir = path.join(__dirname, 'public', 'slides-svg');
const totalSlides = 16;
const targetWidth = 1280;
const targetHeight = 720;
const maxCaptureHeight = 1440; // Maximum height to capture (for tall slides)

// Create output directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Find Chrome executable
function findChrome() {
    const possiblePaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    ];
    
    for (const chromePath of possiblePaths) {
        if (fs.existsSync(chromePath)) {
            return chromePath;
        }
    }
    
    try {
        const { execSync } = require('child_process');
        const result = execSync('where chrome', { encoding: 'utf-8' }).trim();
        if (result) return result.split('\n')[0];
    } catch (e) {
        // Ignore
    }
    
    throw new Error('Chrome not found. Please install Google Chrome.');
}

// Start HTTP server
function startServer() {
    return new Promise((resolve) => {
        const server = createServer((req, res) => {
            let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
            
            if (req.url.startsWith('/slides-updated/')) {
                filePath = path.join(__dirname, 'public', req.url);
            } else if (req.url === '/scalix-logo.png') {
                filePath = path.join(__dirname, 'public', 'scalix-logo.png');
            }
            
            if (!fs.existsSync(filePath)) {
                res.writeHead(404);
                res.end('Not found');
                return;
            }
            
            const ext = extname(filePath);
            const contentType = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.json': 'application/json'
            }[ext] || 'text/plain';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(readFileSync(filePath));
        });
        
        server.listen(8081, () => {
            console.log('✅ Server started on http://localhost:8081');
            resolve(server);
        });
    });
}

// Get PNG dimensions
function getPNGDimensions(imageBuffer) {
    if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50 && imageBuffer[2] === 0x4E && imageBuffer[3] === 0x47) {
        const width = imageBuffer.readUInt32BE(16);
        const height = imageBuffer.readUInt32BE(20);
        return { width, height };
    }
    return null;
}

// Convert slide to SVG
async function convertSlideToSVG(slideNumber, chromePath, server) {
    return new Promise((resolve, reject) => {
        const slideUrl = `http://localhost:8081/slides-updated/slide-${slideNumber}.html`;
        const tempPng = path.join(__dirname, `temp-slide-${slideNumber}.png`);
        const outputPath = path.join(outputDir, `slide-${slideNumber}.svg`);
        
        console.log(`Processing slide ${slideNumber}...`);
        
        // Use larger viewport to capture full content, then scale down
        const chromeArgs = [
            '--headless=new',
            '--disable-gpu',
            `--window-size=${targetWidth},${maxCaptureHeight}`,
            '--hide-scrollbars',
            '--virtual-time-budget=5000',
            '--run-all-compositor-stages-before-draw',
            `--screenshot=${tempPng}`,
            slideUrl
        ];
        
        const chrome = spawn(chromePath, chromeArgs, {
            stdio: 'ignore',
            shell: false
        });
        
        chrome.on('close', (code) => {
            setTimeout(async () => {
                try {
                    if (fs.existsSync(tempPng)) {
                        // Read PNG
                        const pngBytes = fs.readFileSync(tempPng);
                        const base64Image = pngBytes.toString('base64');
                        
                        // Get actual image dimensions
                        const dimensions = getPNGDimensions(pngBytes);
                        const imgWidth = dimensions ? dimensions.width : targetWidth;
                        const imgHeight = dimensions ? dimensions.height : maxCaptureHeight;
                        
                        // Calculate scale to fit target size while maintaining aspect ratio
                        const scaleX = targetWidth / imgWidth;
                        const scaleY = targetHeight / imgHeight;
                        const scale = Math.min(scaleX, scaleY); // Use smaller scale to ensure it fits
                        
                        // Calculate scaled dimensions
                        const scaledWidth = imgWidth * scale;
                        const scaledHeight = imgHeight * scale;
                        
                        // Calculate centering offset
                        const offsetX = (targetWidth - scaledWidth) / 2;
                        const offsetY = (targetHeight - scaledHeight) / 2;
                        
                        // Create SVG with scaled and centered image
                        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${targetWidth}" height="${targetHeight}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${targetWidth} ${targetHeight}">
    <rect width="${targetWidth}" height="${targetHeight}" fill="#0a0e27"/>
    <image href="data:image/png;base64,${base64Image}" 
           x="${offsetX}" 
           y="${offsetY}" 
           width="${scaledWidth}" 
           height="${scaledHeight}" 
           preserveAspectRatio="none" />
</svg>`;
                        
                        // Save SVG
                        fs.writeFileSync(outputPath, svgContent, 'utf-8');
                        const scalePercent = (scale * 100).toFixed(1);
                        console.log(`✅ Created slide-${slideNumber}.svg (${imgWidth}x${imgHeight} → ${scalePercent}% scale to fit ${targetWidth}x${targetHeight})`);
                        
                        // Clean up temp file
                        fs.unlinkSync(tempPng);
                        resolve(outputPath);
                    } else {
                        reject(new Error(`Screenshot not created for slide ${slideNumber}`));
                    }
                } catch (error) {
                    reject(error);
                }
            }, 3000);
        });
        
        chrome.on('error', (error) => {
            reject(error);
        });
    });
}

// Main function
async function generateAllSVGs() {
    try {
        console.log('\n🎨 Starting SVG generation with auto-scaling...\n');
        
        const chromePath = findChrome();
        console.log(`✅ Found Chrome at: ${chromePath}\n`);
        
        const server = await startServer();
        
        // Wait for server to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Process all slides
        for (let i = 1; i <= totalSlides; i++) {
            try {
                await convertSlideToSVG(i, chromePath, server);
                // Small delay between slides
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`❌ Error processing slide ${i}:`, error.message);
            }
        }
        
        console.log(`\n✅ All SVG files generated in: ${outputDir}`);
        console.log(`📁 Output directory: ${outputDir}`);
        console.log(`📐 All slides scaled to fit ${targetWidth}x${targetHeight}\n`);
        
        server.close();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

generateAllSVGs();
