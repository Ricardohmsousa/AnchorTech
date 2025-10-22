#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('=== Environment Variable Injection Script ===');

// Read the HTML file
const htmlPath = path.join(__dirname, 'build', 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error('ERROR: build/index.html not found!');
  process.exit(1);
}

console.log('Reading HTML file...');
let html = fs.readFileSync(htmlPath, 'utf8');

// Show current environment variables
console.log('=== Environment Variables ===');
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL || 'NOT SET');
console.log('REACT_APP_STRIPE_PUBLISHABLE_KEY:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('REACT_APP_FIREBASE_API_KEY:', process.env.REACT_APP_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
console.log('REACT_APP_FIREBASE_AUTH_DOMAIN:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'NOT SET');
console.log('REACT_APP_FIREBASE_PROJECT_ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID || 'NOT SET');

// Check if placeholders exist
const placeholders = html.match(/__REACT_APP_[A-Z_]+__/g);
console.log('Found placeholders:', placeholders || 'NONE');

// Replace placeholders
const replacements = {
  '__REACT_APP_API_URL__': process.env.REACT_APP_API_URL || '',
  '__REACT_APP_STRIPE_PUBLISHABLE_KEY__': process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
  '__REACT_APP_FIREBASE_API_KEY__': process.env.REACT_APP_FIREBASE_API_KEY || '',
  '__REACT_APP_FIREBASE_AUTH_DOMAIN__': process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  '__REACT_APP_FIREBASE_PROJECT_ID__': process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  '__REACT_APP_FIREBASE_STORAGE_BUCKET__': process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  '__REACT_APP_FIREBASE_MESSAGING_SENDER_ID__': process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  '__REACT_APP_FIREBASE_APP_ID__': process.env.REACT_APP_FIREBASE_APP_ID || ''
};

console.log('=== Performing Replacements ===');
for (const [placeholder, value] of Object.entries(replacements)) {
  const beforeCount = (html.match(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  html = html.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  const afterCount = (html.match(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log(`${placeholder}: replaced ${beforeCount - afterCount} occurrences with "${value ? value.substring(0, 20) + '...' : 'EMPTY'}"`);
}

// Write the updated HTML
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('HTML file updated successfully');

// Verify the result
const finalPlaceholders = html.match(/__REACT_APP_[A-Z_]+__/g);
console.log('Remaining placeholders:', finalPlaceholders || 'NONE');