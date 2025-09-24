import { chromium } from 'playwright';
import fs from 'fs';

async function captureSlideScreenshots() {
  console.log('🚀 Starting slide screenshot capture...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to the pitch deck
    console.log('📱 Navigating to pitch deck...');
    await page.goto('http://localhost:8083/pitch-deck', { waitUntil: 'networkidle' });
    
    // Wait for the page to load completely
    await page.waitForSelector('iframe', { timeout: 15000 });
    console.log('✅ Page loaded successfully');
    
    // Wait for the iframe to be fully loaded
    await page.waitForTimeout(3000);
    
    // Get the iframe element
    const iframe = page.frameLocator('iframe').first();
    
    // Wait for the presentation viewer to load
    await iframe.locator('.slide').first().waitFor({ timeout: 15000 });
    console.log('✅ Presentation viewer loaded');
    
    // Wait for all images to load in the first slide
    console.log('🖼️ Waiting for images to load...');
    await iframe.locator('img').first().waitFor({ timeout: 10000 });
    await page.waitForTimeout(2000); // Additional wait for all images
    
    // Create screenshots directory
    const screenshotsDir = '.playwright-mcp/slide-screenshots';
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Capture all 15 slides
    for (let i = 1; i <= 15; i++) {
      console.log(`📸 Capturing slide ${i}/15...`);
      
      // Navigate to the specific slide
      if (i > 1) {
        await iframe.locator('button:has-text("Next")').click();
        await page.waitForTimeout(2000); // Wait for slide transition
      }
      
      // Wait for slide to be fully loaded
      await iframe.locator('.slide').waitFor({ timeout: 5000 });
      await page.waitForTimeout(1000); // Additional wait for content to render
      
      // Take screenshot of the slide iframe
      const slideElement = iframe.locator('.slide');
      await slideElement.screenshot({ 
        path: `${screenshotsDir}/slide-${i.toString().padStart(2, '0')}.png`,
        type: 'png',
        quality: 100
      });
      
      console.log(`✅ Slide ${i} captured: slide-${i.toString().padStart(2, '0')}.png`);
    }
    
    console.log('🎉 All slides captured successfully!');
    console.log(`📁 Screenshots saved in: ${screenshotsDir}/`);
    console.log('📋 Files created:');
    
    // List all created files
    const files = fs.readdirSync(screenshotsDir);
    files.sort().forEach(file => {
      console.log(`   - ${file}`);
    });
    
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Run the capture function
captureSlideScreenshots().catch(console.error);
