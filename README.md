# NEXA TECH IT SOLUTIONS - Website

A modern, professional IT solutions website built with clean HTML, CSS, and JavaScript. Optimized for performance, accessibility, and SEO.

## 🎨 Design Features

- **Modern Color Palette**: Primary Blue (#0392FC), Light Blue (#A7DAF8), Teal Accent (#10DCDF)
- **Professional Typography**: Montserrat for headings, Inter for body text
- **Responsive Design**: Mobile-first approach with smooth animations
- **Performance Optimized**: Lightweight code, optimized images, fast loading

## 📁 Project Structure

```
├── index.html              # Main homepage
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet (minified ready)
│   ├── js/
│   │   └── main.js         # Main JavaScript (minified ready)
│   ├── img/                # Optimized images
│   ├── logo.svg            # Main logo (SVG)
│   ├── icons.svg           # Icon sprite
│   ├── favicon.ico         # Favicon
│   ├── favicon-*.png       # Various favicon sizes
│   └── manifest.json       # PWA manifest
├── services/               # Service pages
├── robots.txt              # SEO robots file
└── README.md              # This file
```

## 🚀 Deployment Instructions

### Static Hosting (Recommended)

**Netlify:**
1. Drag and drop the entire project folder to Netlify
2. Or connect your Git repository
3. Build settings: None required (static files)

**Vercel:**
1. Import project from Git or upload folder
2. Framework preset: Other
3. Build command: None
4. Output directory: ./

**GitHub Pages:**
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)

**Traditional Web Hosting:**
1. Upload all files via FTP to your web root directory
2. Ensure index.html is in the root
3. Set proper file permissions (644 for files, 755 for directories)

### Performance Optimizations Applied

- ✅ Minified CSS and JavaScript ready
- ✅ Optimized images with WebP support
- ✅ Critical CSS inlined
- ✅ Lazy loading for images
- ✅ Proper caching headers recommended
- ✅ Gzip compression recommended

## 🔧 Customization Guide

### Updating the Logo

1. **SVG Logo (Recommended):**
   - Replace `assets/logo.svg` with your logo
   - Maintain aspect ratio (180x40px recommended)
   - Update colors to match your brand

2. **Fallback PNG:**
   - Create PNG version at 180x40px for older browsers
   - Save as `assets/logo.png`

### Changing Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary: #0392FC;        /* Your primary color */
    --light-blue: #A7DAF8;     /* Light variant */
    --accent: #10DCDF;         /* Accent color */
    --pale-teal: #C5F8F8;      /* Light accent */
}
```

### Updating Contact Information

1. **Email:** Change `info@nexatechitsolutions.com` in:
   - Footer contact section
   - Contact form action (if using backend)
   - Structured data in HTML head

2. **Phone:** Update `+91-9876543210` in footer

3. **Address:** Modify location in footer and structured data

### Adding/Modifying Services

**Important:** The Services section content is preserved as requested. To modify:

1. Edit service cards in the `services-preview` section
2. Update service pages in `services/` directory
3. Maintain pricing and descriptions as specified

## 📱 Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔍 SEO Features

- ✅ Semantic HTML5 structure
- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Optimized images with alt tags
- ✅ Fast loading times
- ✅ Mobile-friendly design

## ♿ Accessibility Features

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Proper heading hierarchy
- ✅ Alt text for images

## 📊 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms
- **Lighthouse Score:** 90+ (Performance, Accessibility, SEO)

## 🧪 Testing Checklist

### Pre-Launch Checklist

- [ ] Logo displays correctly in navbar, footer, and browser tab
- [ ] All navigation links work properly
- [ ] Contact form submits successfully
- [ ] Services section content unchanged from original
- [ ] All images have proper alt tags
- [ ] Mobile responsive on all screen sizes
- [ ] Cross-browser compatibility tested
- [ ] Page load speed optimized
- [ ] SEO meta tags configured
- [ ] Accessibility features working

### Testing Tools

- **Performance:** Google PageSpeed Insights, GTmetrix
- **Accessibility:** WAVE, axe DevTools
- **SEO:** Google Search Console, SEMrush
- **Cross-browser:** BrowserStack, CrossBrowserTesting

## 🛠️ Development

### Local Development

1. Clone/download the project
2. Open `index.html` in a web browser
3. For live reload, use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

### Build Process

The website is already optimized for production. For further optimization:

1. **Minify CSS/JS:** Use tools like UglifyJS, CleanCSS
2. **Optimize Images:** Use ImageOptim, TinyPNG
3. **Gzip Compression:** Enable on server
4. **CDN:** Consider using a CDN for static assets

## 📞 Support

For technical support or customization requests:
- Email: info@nexatechitsolutions.com
- Phone: +91-9876543210

## 📄 License

© 2025 NEXA TECH IT SOLUTIONS. All rights reserved.

---

**Built with ❤️ for professional IT solutions**