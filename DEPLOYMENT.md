# Deployment Guide - Maria Glinskaya Psychologist Website

## 🚀 Quick Start - Cloudflare Pages Deployment

### Option 1: GitHub Integration (Recommended)

1. **Login to Cloudflare**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "Pages" section

2. **Create New Project**
   - Click "Create a project"
   - Select "Connect to Git"
   - Authorize GitHub access
   - Select this repository: `alexionby/mary_psycholog`

3. **Configure Build Settings**
   ```
   Project name: mary-psycholog
   Production branch: main
   Build command: (leave empty)
   Build output directory: /
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for deployment to complete
   - Your site will be live at: `https://mary-psycholog.pages.dev`

### Option 2: Direct Upload

1. Go to Cloudflare Pages → "Create a project" → "Upload assets"
2. Select and upload these files:
   - index.html
   - styles.css
   - script.js
   - manifest.json
   - robots.txt
   - sitemap.xml
   - favicon.svg
3. Name your project and deploy

### Option 3: Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages publish . --project-name=mary-psycholog
```

## 📋 Post-Deployment Checklist

### Required Updates
- [ ] Update contact phone number in HTML (currently: +48 123 456 789)
- [ ] Update email address (currently: maria.glinskaya@psycholog.pl)
- [ ] Add real professional photo (replace placeholder SVG in About section)

### Optional Enhancements
- [ ] Set up custom domain (e.g., mariaglinska.com)
- [ ] Configure form backend (Formspree/EmailJS/Cloudflare Workers)
- [ ] Add Google Analytics or Yandex Metrica
- [ ] Create real PNG icons for better PWA support
- [ ] Add SSL certificate (automatic on Cloudflare)
- [ ] Set up email notifications for form submissions

## 🔧 Technical Details

### Files Structure
```
mary_psycholog/
├── index.html (32KB) - Main HTML page
├── styles.css (20KB) - Responsive styles
├── script.js (12KB) - Interactive features
├── manifest.json (4KB) - PWA manifest
├── robots.txt (4KB) - SEO crawler instructions
├── sitemap.xml (4KB) - SEO sitemap
├── favicon.svg (4KB) - Site icon
└── README.md - Documentation
```

### Performance Metrics
- **Total Size**: 80KB (uncompressed)
- **Expected Load Time**: < 1 second on 3G
- **PageSpeed Score**: Expected > 90
- **Mobile-First**: Optimized for mobile devices
- **No External Dependencies**: No CDN or external libraries

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 🛠️ Form Integration

The contact form currently shows a success message but doesn't send emails. Choose one:

### Option A: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form and get the endpoint
3. Update form action in index.html:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option B: EmailJS (Free)
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Add EmailJS script to index.html
3. Update script.js to use EmailJS API

### Option C: Cloudflare Workers (Advanced)
1. Create a Worker to handle form submissions
2. Use SendGrid, Mailgun, or Resend API for emails
3. Update form to POST to Worker endpoint

## 📊 SEO Configuration

### Update Sitemap
After deployment, update sitemap.xml with your actual domain:
```xml
<loc>https://your-domain.com/</loc>
```

### Google Search Console
1. Verify your site at [Google Search Console](https://search.google.com/search-console)
2. Submit your sitemap: `https://your-domain.com/sitemap.xml`

### Yandex Webmaster
1. Add site to [Yandex Webmaster](https://webmaster.yandex.com/)
2. Verify ownership
3. Submit sitemap

## 🔒 Security Best Practices

- [x] HTTPS enabled (automatic on Cloudflare)
- [x] Form validation on client-side
- [x] No sensitive data in console logs
- [x] No external dependencies (security risk minimized)
- [ ] Add server-side form validation (when backend integrated)
- [ ] Add CAPTCHA to prevent spam (optional)

## 📱 PWA Installation

Users can install the website as a PWA on mobile devices:
1. Visit the site on mobile
2. Click "Add to Home Screen" in browser menu
3. App icon will appear on home screen
4. Works offline (basic caching)

## 🎨 Customization Guide

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6b8cae;      /* Main brand color */
    --primary-dark: #4a6b8a;       /* Darker variant */
    --secondary-color: #f4a261;    /* Accent color */
}
```

### Update Content
Edit `index.html` sections:
- Hero section (lines 65-95)
- About section (lines 97-155)
- Services (lines 157-225)
- Pricing (lines 280-350)
- Contact info (lines 352-430)

### Add Analytics

#### Google Analytics
Add before closing `</head>` tag:
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Yandex Metrica
Add before closing `</head>` tag:
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 💡 Tips

1. **Test on Real Devices**: Test on actual mobile devices, not just browser emulation
2. **Monitor Performance**: Use Google PageSpeed Insights after deployment
3. **Update Regularly**: Keep content fresh for better SEO
4. **Backup**: Keep a copy of the site files
5. **SSL Certificate**: Ensure HTTPS is enabled (automatic on Cloudflare)

## 📞 Support

For technical issues or questions about the website structure, refer to:
- README.md - General documentation
- HTML comments in index.html
- CSS comments in styles.css
- JavaScript comments in script.js

## 🎯 Success Metrics

After deployment, monitor:
- Page load time (target: < 2s)
- Mobile PageSpeed score (target: > 90)
- Bounce rate (target: < 50%)
- Form submission rate
- Search engine rankings for target keywords
