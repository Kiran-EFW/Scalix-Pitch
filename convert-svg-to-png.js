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
const outputDir = path.join(__dirname, 'public', 'slides-png');
const totalSlides = 16;
const baseWidth = 1280;
const captureHeight = 2000; // Large height to capture all content

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
        
        server.listen(8082, () => {
            console.log('✅ Server started on http://localhost:8082');
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

// Convert slide to high-quality PNG
async function convertSlideToPNG(slideNumber, chromePath, server) {
    return new Promise((resolve, reject) => {
        const slideUrl = `http://localhost:8082/slides-updated/slide-${slideNumber}.html`;
        const outputPath = path.join(outputDir, `slide-${slideNumber}.png`);
        
        console.log(`Converting slide ${slideNumber}...`);
        
        // High-quality capture settings
        const chromeArgs = [
            '--headless=new',
            '--disable-gpu',
            `--window-size=${baseWidth},${captureHeight}`,
            '--hide-scrollbars',
            '--disable-web-security', // Allow loading external resources
            '--virtual-time-budget=8000', // Longer wait for content to load
            '--run-all-compositor-stages-before-draw', // Ensure all rendering is complete
            '--disable-background-timer-throttling', // Don't throttle timers
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            `--screenshot=${outputPath}`,
            slideUrl
        ];
        
        const chrome = spawn(chromePath, chromeArgs, {
            stdio: 'ignore',
            shell: false
        });
        
        chrome.on('close', (code) => {
            setTimeout(async () => {
                try {
                    if (fs.existsSync(outputPath)) {
                        // Read PNG to verify and get dimensions
                        const pngBytes = fs.readFileSync(outputPath);
                        const pngDims = getPNGDimensions(pngBytes);
                        const fileSizeKB = (pngBytes.length / 1024).toFixed(2);
                        
                        if (pngDims) {
                            console.log(`✅ Created slide-${slideNumber}.png (${pngDims.width}x${pngDims.height}, ${fileSizeKB} KB)`);
                        } else {
                            console.log(`✅ Created slide-${slideNumber}.png (${fileSizeKB} KB)`);
                        }
                        
                        resolve(outputPath);
                    } else {
                        reject(new Error(`PNG not created for slide ${slideNumber}`));
                    }
                } catch (error) {
                    reject(error);
                }
            }, 5000); // Longer wait to ensure high quality rendering
        });
        
        chrome.on('error', (error) => {
            reject(error);
        });
    });
}

// Main function
async function convertAllSlidesToPNG() {
    try {
        console.log('\n🖼️  Starting high-quality PNG conversion...\n');
        console.log('Settings:');
        console.log(`- Resolution: ${baseWidth}x${captureHeight} pixels`);
        console.log('- Extended wait times for full rendering');
        console.log('- All compositor stages enabled\n');
        
        const chromePath = findChrome();
        console.log(`✅ Found Chrome at: ${chromePath}\n`);
        
        const server = await startServer();
        
        // Wait for server to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Process all slides
        for (let i = 1; i <= totalSlides; i++) {
            try {
                await convertSlideToPNG(i, chromePath, server);
                // Small delay between conversions
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`❌ Error converting slide ${i}:`, error.message);
            }
        }
        
        console.log(`\n✅ All high-quality PNG files generated in: ${outputDir}`);
        console.log(`📁 Output directory: ${outputDir}`);
        console.log(`📐 Resolution: ${baseWidth}x${captureHeight} pixels\n`);
        
        server.close();
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

convertAllSlidesToPNG();
