# SoSo Family - Application Support

Single-page application support website with email contact functionality.

## Features

- Clean, professional design
- Responsive layout (mobile/desktop)
- Contact form with real-time validation
- EmailJS integration for email sending

## Tech Stack

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript
- EmailJS for email delivery

## Setup

1. Clone the repository
2. Configure EmailJS credentials in `scripts/main.js`
3. Open `index.html` in a browser or deploy to a web server

## EmailJS Configuration

Update the `EMAIL_CONFIG` object in `scripts/main.js`:

```javascript
const EMAIL_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
    toEmail: 'sosofamily.ca@gmail.com'
};
```

## License

All rights reserved.
