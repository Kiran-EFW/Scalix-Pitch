# Best PDF Generation Solution
# This script uses Chrome with optimal settings and ensures all resources load

$port = 8080
$publicDir = "$PWD\public"
$outputPDF = "$PWD\Scalix-Pitch-Deck.pdf"
$url = "http://localhost:$port/combined-slides-for-pdf.html"
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Enhanced PDF Generation" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# Start server
Write-Host "[1/4] Starting HTTP server..." -ForegroundColor Yellow
$server = Start-Process python -ArgumentList "-m","http.server",$port,"--directory",$publicDir -PassThru -WindowStyle Hidden
Start-Sleep 3

try {
    Write-Host "[2/4] Pre-loading page in browser (40 seconds)..." -ForegroundColor Yellow
    Write-Host "      This ensures all fonts, images, and charts load properly" -ForegroundColor Gray
    
    # Pre-load the page in a visible browser to ensure everything renders
    $preloadProcess = Start-Process $chromePath -ArgumentList $url -PassThru
    Start-Sleep 40
    
    Write-Host "[3/4] Closing pre-load browser..." -ForegroundColor Yellow
    Stop-Process -Id $preloadProcess.Id -Force -ErrorAction SilentlyContinue
    Start-Sleep 2
    
    Write-Host "[4/4] Generating PDF with optimal settings..." -ForegroundColor Yellow
    
    # Generate PDF with comprehensive Chrome settings
    $chromeArgs = @(
        "--headless=new",
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=40000",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-features=TranslateUI",
        "--force-color-profile=srgb",
        "--print-to-pdf=`"$outputPDF`"",
        "--print-to-pdf-no-header",
        "--no-pdf-header-footer",
        $url
    )
    
    $pdfProcess = Start-Process -FilePath $chromePath -ArgumentList $chromeArgs -Wait -NoNewWindow -PassThru
    
    Start-Sleep 5
    
    if (Test-Path $outputPDF) {
        $fileSize = (Get-Item $outputPDF).Length / 1KB
        Write-Host "`n========================================" -ForegroundColor Green
        Write-Host "  SUCCESS!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "File: $outputPDF" -ForegroundColor Cyan
        Write-Host "Size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Cyan
        Write-Host "`nOpening PDF..." -ForegroundColor Yellow
        Start-Process $outputPDF
    } else {
        Write-Host "`nPDF generation failed." -ForegroundColor Red
        Write-Host "Opening browser for manual PDF generation..." -ForegroundColor Yellow
        Write-Host "`nManual Steps:" -ForegroundColor Cyan
        Write-Host "1. Wait 15 seconds for page to fully load" -ForegroundColor White
        Write-Host "2. Press Ctrl+P" -ForegroundColor White
        Write-Host "3. Select 'Save as PDF'" -ForegroundColor White
        Write-Host "4. Click 'More settings'" -ForegroundColor White
        Write-Host "5. Paper size: Custom 1280px x 720px" -ForegroundColor White
        Write-Host "6. Enable 'Background graphics'" -ForegroundColor White
        Write-Host "7. Margins: None" -ForegroundColor White
        Write-Host "8. Click Save`n" -ForegroundColor White
        Start-Process $chromePath -ArgumentList $url
    }
    
} catch {
    Write-Host "`nError: $_" -ForegroundColor Red
} finally {
    Write-Host "`nCleaning up..." -ForegroundColor Gray
    if ($server -and $server.Id) {
        Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
    }
}

