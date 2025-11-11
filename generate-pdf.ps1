# PDF Generation Script
$port = 8080
$currentDir = Get-Location
$publicDir = Join-Path $currentDir "public"
$outputPDF = Join-Path $currentDir "Scalix-Pitch-Deck.pdf"
$combinedHTML = "http://localhost:$port/combined-slides-for-pdf.html"

Write-Host "🚀 Starting PDF generation..." -ForegroundColor Cyan
Write-Host "📁 Output: $outputPDF" -ForegroundColor Cyan

# Find Chrome or Edge
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) {
    $chromePath = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
    if (-not (Test-Path $chromePath)) {
        $chromePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    }
}

if (-not (Test-Path $chromePath)) {
    Write-Host "❌ Chrome or Edge not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Using browser: $chromePath" -ForegroundColor Green

# Start HTTP server
Write-Host "📡 Starting HTTP server on port $port..." -ForegroundColor Cyan
$serverProcess = Start-Process -FilePath "python" -ArgumentList "-m", "http.server", $port, "--directory", $publicDir -PassThru -WindowStyle Hidden

try {
    # Wait for server to start
    Start-Sleep -Seconds 3
    Write-Host "✅ Server started" -ForegroundColor Green
    
    # Wait for content to load
    Write-Host "⏳ Waiting for content to load (15 seconds)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 15
    
    Write-Host "📄 Generating PDF..." -ForegroundColor Cyan
    
    # Generate PDF with Chrome headless
    $chromeArgs = @(
        "--headless=new",
        "--disable-gpu",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=15000",
        "--print-to-pdf=`"$outputPDF`"",
        "--print-to-pdf-no-header",
        "--no-pdf-header-footer",
        $url
    )
    
    $process = Start-Process -FilePath $chromePath -ArgumentList $chromeArgs -Wait -NoNewWindow -PassThru
    
    # Wait a bit more for PDF to be written
    Start-Sleep -Seconds 3
    
    if (Test-Path $outputPDF) {
        $fileSize = (Get-Item $outputPDF).Length / 1KB
        Write-Host "`n✅ PDF generated successfully!" -ForegroundColor Green
        Write-Host "📁 Location: $outputPDF" -ForegroundColor Cyan
        Write-Host "📏 Size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Cyan
        
        # Open the PDF
        Start-Process $outputPDF
    } else {
        Write-Host "`n❌ PDF generation failed" -ForegroundColor Red
        Write-Host "Trying alternative method..." -ForegroundColor Yellow
        
        # Alternative: Use file:// URL directly
        $fileUrl = "file:///$($publicDir.Replace('\', '/'))/combined-slides-for-pdf.html"
        Write-Host "Opening browser for manual PDF generation: $fileUrl" -ForegroundColor Cyan
        Start-Process $chromePath -ArgumentList $fileUrl
    }
    
} catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
} finally {
    # Stop the server
    Write-Host "`n🛑 Stopping server..." -ForegroundColor Cyan
    if ($serverProcess -and $serverProcess.Id) {
        Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
    }
}
