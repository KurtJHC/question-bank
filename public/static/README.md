# Static Assets Directory

This directory contains static assets (CSS, JavaScript, images, etc.) that are served by the HTTP server.

## Directory Structure

The server expects static files to be organized as referenced in the HTML files:

- `/static/ui/vendors/` - Third-party vendor libraries
- `/static/ui/css/` - Application stylesheets
- `/static/ui/js/` - Application JavaScript files

## Adding Files

Place your static files in the appropriate subdirectories. The server will automatically serve them at the `/static/` path.

For example:
- `static/ui/css/style.css` → `http://localhost:3000/static/ui/css/style.css`
- `static/ui/vendors/jquery/js/jquery.min.js` → `http://localhost:3000/static/ui/vendors/jquery/js/jquery.min.js`


