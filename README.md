# Scalix Pitch Deck

A modern, interactive investor pitch deck presentation for Scalix World - Desktop-First AI Development Platform.

## 🎯 Overview

This repository contains a complete investor pitch deck presentation with 16 slides covering:
- Company introduction and vision
- Market opportunity
- Product features and competitive advantages
- Business model and revenue streams
- Financial projections
- Team and investment opportunity

## 📁 Repository Structure

```
Scalix-Pitch/
├── public/
│   ├── slides-updated/          # Current slide HTML files (16 slides)
│   ├── slides-png/              # High-quality PNG exports (1280x2000)
│   ├── slides-svg/              # SVG exports
│   ├── presentation-viewer.html  # Main interactive slide viewer
│   └── combined-slides-for-pdf.html  # Combined slides for PDF generation
├── src/                         # React application source code
├── functions/                   # Firebase Cloud Functions
└── scripts/                     # Utility scripts for slide generation
```

## 🚀 Features

- **Interactive Presentation**: Navigate through slides with keyboard shortcuts
- **Multiple Formats**: HTML slides, PNG exports, and SVG exports
- **PDF Generation**: Scripts to generate PDF from slides
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and animations

## 📊 Slides Included

1. Title Slide - Scalix World Introduction
2. The Problem
3. Market Opportunity
4. Our Solution
5. Scalix Router - Enterprise AI Orchestration
6. Revolutionary Developer Experience
7. Breaking the Speed Barrier
8. Competitive Advantages
9. Subscription Tiers
10. Dual Revenue Streams
11. Go-to-Market Strategy
12. World-Class Team
13. Path to Profitability
14. Financial Projections
15. Seeking $1M Seed Round Investment
16. Thank You

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Google Chrome (for PDF/SVG generation)

### Installation

```bash
npm install
# or
pnpm install
```

### Running Locally

```bash
npm run dev
# or
pnpm dev
```

### Building

```bash
npm run build
# or
pnpm build
```

## 📄 Generating Exports

### PNG Export
```bash
node convert-svg-to-png.js
```
Generates high-quality PNG files (1280x2000) in `public/slides-png/`

### SVG Export
```bash
node generate-svgs-simple.js
```
Generates SVG files in `public/slides-svg/`

### PDF Export
```powershell
.\generate-pdf-best.ps1
```
Generates a combined PDF of all slides

## 🌐 Deployment

This project is configured for deployment on:
- **Firebase Hosting** (see `firebase.json`)
- **Vercel** (see `vercel.json`)

### Firebase Deployment
```bash
firebase deploy
```

### Vercel Deployment
```bash
vercel deploy
```

## 📝 Key Files

- `public/presentation-viewer.html` - Main presentation viewer
- `public/slides-updated/` - Individual slide HTML files
- `combine-slides-with-charts.js` - Script to combine slides for PDF
- `generate-svgs-simple.js` - Script to generate SVG exports
- `convert-svg-to-png.js` - Script to generate PNG exports

## 📢 Marketing Templates

Ready-to-use templates for sharing the pitch deck:

- **`MARKETING_TEMPLATES.md`** - Comprehensive templates with guidelines
  - WhatsApp blurbs (short & extended)
  - LinkedIn posts (3 variations)
  - Email templates (icebreaker, investor, developer, customer)

- **`QUICK_TEMPLATES.md`** - Quick copy-paste templates for immediate use

Perfect for:
- Sharing on social media
- Investor outreach
- Developer community engagement
- Customer/partner introductions

## 📧 Contact

- **Founder & CEO**: Kiran Ravi Kumar
- **Email**: team@scalix.world
- **Phone**: +44 7553879404
- **Company**: ENERGY FW LTD

## 📄 License

Copyright © 2025 ENERGY FW LTD. All rights reserved.

## 🔗 Links

- Website: [scalix.world](https://scalix.world)
- GitHub: [github.com/Kiran-EFW/Scalix-Pitch](https://github.com/Kiran-EFW/Scalix-Pitch)

---

Built with ❤️ for Scalix World

